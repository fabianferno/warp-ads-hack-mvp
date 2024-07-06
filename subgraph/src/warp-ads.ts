import { BigInt } from "@graphprotocol/graph-ts";
import {
  AdCreated as AdCreatedEvent,
  AuthorRoyaltiesDispersed as AuthorRoyaltiesDispersedEvent,
  AuthorRoyaltiesRequestFailed as AuthorRoyaltiesRequestFailedEvent,
  AuthorRoyaltiesRequested as AuthorRoyaltiesRequestedEvent,
  CreateAdRequested as CreateAdRequestedEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  InfluencerRoyaltiesDispersed as InfluencerRoyaltiesDispersedEvent,
  InfluencerRoyaltiesRequestFailed as InfluencerRoyaltiesRequestFailedEvent,
  InfluencerRoyaltiesRequested as InfluencerRoyaltiesRequestedEvent,
  MessageProcessedTo as MessageProcessedToEvent,
  MessageQueued as MessageQueuedEvent,
  MetaTxDecoded as MetaTxDecodedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PhalaRequestSent as PhalaRequestSentEvent,
  PhalaResponseReceived as PhalaResponseReceivedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
} from "../generated/WarpAds/WarpAds";
import { user as User, ad as Ad, claim as Claim } from "../generated/schema";

export function handleCreateAdRequested(event: CreateAdRequestedEvent): void {
  let ad = new Ad(event.params.requestId.toString());
  ad.owner = event.transaction.from;
  ad.save();
}

export function handleAdCreated(event: AdCreatedEvent): void {
  let ad = Ad.load(event.params.adId.toString());
  if (ad == null) {
    ad = new Ad(event.params.adId.toString());
  }
  ad.labels = event.params.labels;
  ad.metadata = event.params.metadata;
  ad.pricePaid = event.params.price;

  ad.save();
}

export function handleAuthorRoyaltiesDispersed(
  event: AuthorRoyaltiesDispersedEvent
): void {
  let claim = new Claim(event.params.requestId.toString());
  claim.amount = event.params.amount;
  claim.claimer;

  let user = new User(event.transaction.from.toString());
  user.address = event.transaction.from;
  user.farcasterId = BigInt.fromI32(0);
  user.totalClaimedAmount = user.totalClaimedAmount.plus(event.params.amount);
  user.lastClaimedTimestamp = event.block.timestamp;
  user.save();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuthorRoyaltiesRequestFailed(
  event: AuthorRoyaltiesRequestFailedEvent
): void {
  let entity = new AuthorRoyaltiesRequestFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.errorCode = event.params.errorCode;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuthorRoyaltiesRequested(
  event: AuthorRoyaltiesRequestedEvent
): void {
  let entity = new AuthorRoyaltiesRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.frameUrl = event.params.frameUrl;
  entity.farcasterId = event.params.farcasterId;
  entity.claimer = event.params.claimer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInfluencerRoyaltiesDispersed(
  event: InfluencerRoyaltiesDispersedEvent
): void {
  let entity = new InfluencerRoyaltiesDispersed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInfluencerRoyaltiesRequestFailed(
  event: InfluencerRoyaltiesRequestFailedEvent
): void {
  let entity = new InfluencerRoyaltiesRequestFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.adId = event.params.adId;
  entity.errorCode = event.params.errorCode;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInfluencerRoyaltiesRequested(
  event: InfluencerRoyaltiesRequestedEvent
): void {
  let entity = new InfluencerRoyaltiesRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.farcasterId = event.params.farcasterId;
  entity.claimer = event.params.claimer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMessageProcessedTo(event: MessageProcessedToEvent): void {
  let entity = new MessageProcessedTo(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.param0 = event.params.param0;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMessageQueued(event: MessageQueuedEvent): void {
  let entity = new MessageQueued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.idx = event.params.idx;
  entity.data = event.params.data;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMetaTxDecoded(event: MetaTxDecodedEvent): void {
  let entity = new MetaTxDecoded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePhalaRequestSent(event: PhalaRequestSentEvent): void {
  let entity = new PhalaRequestSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.reqId = event.params.reqId;
  entity.request = event.params.request;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePhalaResponseReceived(
  event: PhalaResponseReceivedEvent
): void {
  let entity = new PhalaResponseReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.reqId = event.params.reqId;
  entity.request = event.params.request;
  entity.response = event.params.response;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
