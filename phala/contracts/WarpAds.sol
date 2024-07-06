// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@phala/solidity/contracts/PhatRollupAnchor.sol";

error InsufficentFeeToCreateAd(uint256 providedAmount, uint256 minimumAmount);

contract WarpAds is PhatRollupAnchor, Ownable {

    struct AdsRequest {
        string query;
        address creator;
        string inputMetadata;
        string[] labels;
        uint256 pricePaid;
    }

    struct Ad{
        string[] labels;
        uint256 pricePaid;
        address creator;
        string metadata;
    }

    struct ClaimsRequest{
        uint256 farcasterId;
        address claimer;
        string frameUrl;
    }

    struct Claims{
        uint256 farcasterId;
        address claimer;
        uint256 totalClaimed;
        uint256 lastClaimedTimestamp;
    }

    uint256 public immutable BASE_PRICE;

    enum PhalaRequestErrorCode{
        NO_ERROR, 
        INVALID_REQUEST,
        INVALID_FARCASTER_OWNER,
        NO_REVENUE ,
        AIRSTACK_ERROR, 
        WARP_ADS_API_ERROR
    }

    event CreateAdRequested(uint256 requestId, string query);
    event AdCreated(uint256 adId, string metadata, string[] labels, uint256 price);
    event AuthorRoyaltiesRequested(uint256 requestId, string frameUrl, uint256 farcasterId, address claimer);
    event AuthorRoyaltiesDispersed(uint256 requestId, uint256 amount);
    event AuthorRoyaltiesRequestFailed(uint256 requestId, uint8 errorCode);
    event InfluencerRoyaltiesRequested(uint256 requestId, uint256 farcasterId, address claimer);
    event InfluencerRoyaltiesDispersed(uint256 requestId, uint256 amount);
    event InfluencerRoyaltiesRequestFailed(uint256 adId, uint8 errorCode);

    event PhalaRequestSent(uint reqId, bytes request);
    event PhalaResponseReceived(uint reqId, string request, bytes response);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint256=>AdsRequest) public createAdsRequests;
    mapping(uint256=>Ad) public ads;
    uint256 public adId;
    uint256 public claimId;
    mapping(uint256=>ClaimsRequest) public claimsRequests;
    mapping(uint256=>Claims) public claims;

    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(uint256 basePrice) Ownable(msg.sender) {
        BASE_PRICE = basePrice;
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function createAd(string calldata query, string memory inputMetadata, string[] memory labels) public payable {
        if(msg.value < BASE_PRICE){
            revert InsufficentFeeToCreateAd(msg.value, BASE_PRICE);
        }
        uint256 _bumpPrice= msg.value - BASE_PRICE;
        createAdsRequests[adId] = AdsRequest(query, msg.sender, inputMetadata, labels, _bumpPrice);
        // Make Phala Network request 
        emit CreateAdRequested(adId, query);
        adId += 1;
      //  // uint256 reqId = _request(query);
      //  // createAdsRequests[reqId] = AdsRequest(query, msg.sender, inputMetadata, labels, price);
    }

    function createAdCallback(uint256 _createAdRequestId, string memory metadata) public {
        AdsRequest memory req = createAdsRequests[_createAdRequestId];
        ads[_createAdRequestId] = Ad(req.labels, req.pricePaid, req.creator, metadata);
        emit AdCreated(_createAdRequestId, metadata, req.labels, req.pricePaid);
    }

    function claimAuthorRoyalties(string memory frameUrl, uint256 farcasterId) public {
        claimsRequests[claimId] = ClaimsRequest(farcasterId, msg.sender, frameUrl);
        // Make Phala Request
        emit AuthorRoyaltiesRequested(claimId, frameUrl, farcasterId, msg.sender);
        claimId += 1;
    }

    function claimInfluencerRoyalties(uint256 farcasterId) public {
        claims[claimId] = Claims(farcasterId, msg.sender, 0, block.timestamp);
        // Make Phala Request
        emit InfluencerRoyaltiesRequested(claimId, farcasterId, msg.sender);
        claimId += 1;
    }

    function claimAuthorRoyaltiesCallback(uint256 _claimId, uint256 amount, uint8 errorCode) public {
        ClaimsRequest memory _claimRequest = claimsRequests[_claimId];
        if(errorCode == 0){
            payable(_claimRequest.claimer).transfer(amount);
            if(claims[_claimId].lastClaimedTimestamp == 0){
                claims[_claimId]=Claims(_claimRequest.farcasterId, _claimRequest.claimer, amount, block.timestamp);
            }else{
                claims[_claimId].totalClaimed += amount;
                claims[_claimId].lastClaimedTimestamp = block.timestamp;
            }
            emit AuthorRoyaltiesDispersed(_claimId, amount);
        } else {
            emit AuthorRoyaltiesRequestFailed(_claimId, errorCode);
        }
    }

    function claimInfluencerRoyaltiesCallback(uint256 _claimId,  uint256 amount, uint8 errorCode) public {
       ClaimsRequest memory _claimRequest = claimsRequests[_claimId];
        if(errorCode == 0){
            payable(_claimRequest.claimer).transfer(amount);
            if(claims[_claimId].lastClaimedTimestamp == 0){
                claims[_claimId]=Claims(_claimRequest.farcasterId, _claimRequest.claimer, amount, block.timestamp);
            }else{
                claims[_claimId].totalClaimed += amount;
                claims[_claimId].lastClaimedTimestamp = block.timestamp;
            }
            emit InfluencerRoyaltiesDispersed(_claimId, amount);
        } else {
            emit InfluencerRoyaltiesRequestFailed(_claimId, errorCode);
        }
    }



    function _request(string calldata reqData) internal returns(uint256) {
        uint id = nextRequest;
        requests[id] = reqData;
        _pushMessage(abi.encode(id, reqData));
        nextRequest += 1;
    }

    // For test
    function malformedRequest(bytes calldata malformedData) public {
        uint id = 0;
        requests[id] = "malformed_req";
        _pushMessage(malformedData);
    }

    function _onMessageReceived(bytes calldata action) internal override {
        // Optional to check length of action
        // require(action.length == 32 * 3, "cannot parse action");
        (uint respType, uint id, uint256 data) = abi.decode(
            action,
            (uint, uint, uint256)
        );
        if (respType == TYPE_RESPONSE) {
            emit PhalaResponseReceived(id, requests[id], "");
        } else if (respType == TYPE_ERROR) {
        }
    }
}
