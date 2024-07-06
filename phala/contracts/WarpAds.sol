// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@phala/solidity/contracts/PhatRollupAnchor.sol";

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

    event CreateAdRequested(uint256 reqId, string query);
    event AdCreated(uint256 adId, string metadata, string[] labels, uint256 price);
    event AuthorRoyaltiesRequested(uint256 adId, uint256 farcasterId, address claimer);
    event AuthorRoyaltiesDispersed(uint256 adId, uint256 farcasterId, address claimer, uint256 amount);
    event AuthorRoyaltiesRequestFailed(uint256 adId, uint256 farcasterId, address claimer, uint8 errorCode);
    event InfluencerRoyaltiesRequested(uint256 adId, uint256 farcasterId, address claimer);
    event InfluencerRoyaltiesDispersed(uint256 adId, uint256 farcasterId, address claimer, uint256 amount);
    event InfluencerRoyaltiesRequestFailed(uint256 adId, uint256 farcasterId, address claimer, uint8 errorCode);

    event PhalaRequestSent(uint reqId, bytes request);
    event PhalaResponseReceived(uint reqId, string request, bytes response);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint256=>AdsRequest) public createAdsRequests;
    mapping(uint256=>Ad) public ads;
    mapping(uint256=>Claims) public claims;

    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor, uint256 basePrice) {
        // _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
        BASE_PRICE = basePrice;
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
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
