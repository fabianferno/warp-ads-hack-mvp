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

    event AdCreated(uint256 adId, string metadata, string[] labels, uint256 price);
    event AuthorRoyaltiesRequested(uint256 requestId);
    event AuthorRoyaltiesDispersed(uint256 claimId,string frameUrl, uint256 farcasterId, uint256 amount);
    event AuthorRoyaltiesRequestFailed(uint256 requestId, uint8 errorCode);
    event InfluencerRoyaltiesRequested(uint256 requestId);
    event InfluencerRoyaltiesDispersed(uint256 claimId, uint256 farcasterId, uint256 amount);
    event InfluencerRoyaltiesRequestFailed(uint256 requestId, uint8 errorCode);

    event PhalaRequestSent(uint reqId, bytes request);
    event PhalaResponseReceived(uint reqId, bytes response);
    
    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint256=>Ad) public ads;
    uint256 public adId;
    uint256 public claimId;
    mapping(uint256=>ClaimsRequest) public claimsRequests;
    mapping(uint256=>Claims) public claims;

    mapping(uint => bytes) requests;
    uint nextRequest = 1;

    constructor(uint256 basePrice) Ownable(msg.sender) {
        BASE_PRICE = basePrice;
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }


    function createAd(string memory metadata, string[] memory labels) public payable {
        if(msg.value < BASE_PRICE){
            revert InsufficentFeeToCreateAd(msg.value, BASE_PRICE);
        }
        ads[adId] = Ad(labels, msg.value, msg.sender, metadata);
        emit AdCreated(adId, metadata, labels, msg.value);
        adId += 1;
    }

    function claimAuthorRoyalties(string memory frameUrl, uint256 farcasterId) public {
        claimsRequests[claimId] = ClaimsRequest(farcasterId, msg.sender, frameUrl);
        _request(abi.encode(claimId, msg.sender, frameUrl, farcasterId));
        emit AuthorRoyaltiesRequested(claimId);
        claimId += 1;
    }

    function claimInfluencerRoyalties(uint256 farcasterId) public {
        claimsRequests[claimId] = ClaimsRequest(farcasterId, msg.sender, "");
        _request(abi.encode(claimId, msg.sender, "null",  farcasterId));
        emit InfluencerRoyaltiesRequested(claimId);
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
            emit AuthorRoyaltiesDispersed(_claimId,_claimRequest.frameUrl,  _claimRequest.farcasterId, amount);
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
            emit InfluencerRoyaltiesDispersed(_claimId, _claimRequest.farcasterId, amount);
        } else {
            emit InfluencerRoyaltiesRequestFailed(_claimId, errorCode);
        }
    }

    function _request(bytes memory _requestData) internal  {
        requests[nextRequest] = _requestData;
        _pushMessage(_requestData);
        nextRequest += 1;
    }

    function _onMessageReceived(bytes calldata action) internal override {
        (uint256 _claimId, uint256 _amount, uint8 _errorCode) = abi.decode(
            action,
            (uint256, uint256, uint8)
        );
        ClaimsRequest memory _claimRequest = claimsRequests[_claimId];
        if (_errorCode == 0) {
             if(claims[_claimRequest.farcasterId].lastClaimedTimestamp == 0){
                claims[_claimRequest.farcasterId]=Claims(_claimRequest.farcasterId, _claimRequest.claimer, _amount, block.timestamp);
            }else{
                claims[_claimRequest.farcasterId].totalClaimed += _amount;
                claims[_claimRequest.farcasterId].lastClaimedTimestamp = block.timestamp;
            }
            if(bytes(_claimRequest.frameUrl).length > 0)
                emit AuthorRoyaltiesDispersed(_claimId, _claimRequest.frameUrl, _claimRequest.farcasterId, _amount);
            else 
                emit InfluencerRoyaltiesDispersed(_claimId, _claimRequest.farcasterId, _amount);
            emit PhalaResponseReceived(_claimId, requests[_claimId]);
        } else  {
            if(bytes(_claimRequest.frameUrl).length > 0)
                emit AuthorRoyaltiesRequestFailed(claimId, _errorCode);
            else 
                emit InfluencerRoyaltiesRequestFailed(claimId, _errorCode);
        }
    }
}
