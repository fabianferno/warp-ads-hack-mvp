import { BigInt } from "@graphprotocol/graph-ts";
import {
  AdCreated as AdCreatedEvent,
  AuthorRoyaltiesDispersed as AuthorRoyaltiesDispersedEvent,
  AuthorRoyaltiesRequestFailed as AuthorRoyaltiesRequestFailedEvent,
  AuthorRoyaltiesRequested as AuthorRoyaltiesRequestedEvent,
  CreateAdRequested as CreateAdRequestedEvent,
  CreateAdRequestFailed as CreateAdRequestFailedEvent,
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
  ad.errorCode = BigInt.fromI32(0);

  ad.save();
}

export function handleCreateAdRequestFailed(
  event: CreateAdRequestFailedEvent
): void {
  let ad = Ad.load(event.params.adId.toString());
  if (ad == null) {
    ad = new Ad(event.params.adId.toString());
  }
  ad.errorCode = BigInt.fromI32(event.params.errorCode);
  ad.save();
}

export function handleAuthorRoyaltiesRequested(
  event: AuthorRoyaltiesRequestedEvent
): void {
  let user = User.load(event.transaction.from.toString());
  if (user == null) {
    user = new User(event.transaction.from.toString());
    user.address = event.transaction.from;
    user.totalClaimedAmount = BigInt.fromI32(0);
    user.lastClaimedTimestamp = BigInt.fromI32(0);
    user.save();
  }

  let claim = new Claim(event.params.requestId.toString());
  claim.claimer = user.id;
  claim.save();
}

export function handleAuthorRoyaltiesDispersed(
  event: AuthorRoyaltiesDispersedEvent
): void {
  let claim = Claim.load(event.params.claimId.toString());
  if (claim == null) {
    claim = new Claim(event.params.claimId.toString());
  }
  claim.amount = event.params.amount;
  claim.frameUrl = event.params.frameUrl;
  claim.errorCode = BigInt.fromI32(0);
  claim.save();

  let user = User.load(claim.claimer);
  if (user == null) {
    user = new User(event.transaction.from.toString());
  }
  user.address = event.transaction.from;
  user.farcasterId = event.params.farcasterId;
  user.totalClaimedAmount = user.totalClaimedAmount.plus(event.params.amount);
  user.lastClaimedTimestamp = event.block.timestamp;
  user.save();
}

export function handleAuthorRoyaltiesRequestFailed(
  event: AuthorRoyaltiesRequestFailedEvent
): void {
  let claim = Claim.load(event.params.requestId.toString());
  if (claim == null) {
    claim = new Claim(event.params.requestId.toString());
  }
  claim.errorCode = BigInt.fromI32(event.params.errorCode);
  claim.save();
}

export function handleInfluencerRoyaltiesRequested(
  event: InfluencerRoyaltiesRequestedEvent
): void {
  let user = User.load(event.transaction.from.toString());
  if (user == null) {
    user = new User(event.transaction.from.toString());
    user.address = event.transaction.from;
    user.totalClaimedAmount = BigInt.fromI32(0);
    user.lastClaimedTimestamp = BigInt.fromI32(0);
    user.save();
  }

  let claim = new Claim(event.params.requestId.toString());
  claim.claimer = user.id;
  claim.save();
}
export function handleInfluencerRoyaltiesDispersed(
  event: InfluencerRoyaltiesDispersedEvent
): void {
  let claim = Claim.load(event.params.claimId.toString());
  if (claim == null) {
    claim = new Claim(event.params.claimId.toString());
  }
  claim.amount = event.params.amount;
  claim.errorCode = BigInt.fromI32(0);
  claim.save();

  let user = User.load(claim.claimer);
  if (user == null) {
    user = new User(event.transaction.from.toString());
  }
  user.address = event.transaction.from;
  user.farcasterId = event.params.farcasterId;
  user.totalClaimedAmount = user.totalClaimedAmount.plus(event.params.amount);
  user.lastClaimedTimestamp = event.block.timestamp;
  user.save();
}

export function handleInfluencerRoyaltiesRequestFailed(
  event: InfluencerRoyaltiesRequestFailedEvent
): void {
  let claim = Claim.load(event.params.requestId.toString());
  if (claim == null) {
    claim = new Claim(event.params.requestId.toString());
  }
  claim.errorCode = BigInt.fromI32(event.params.errorCode);
  claim.save();
}

export function handleMessageProcessedTo(
  event: MessageProcessedToEvent
): void {}

export function handleMessageQueued(event: MessageQueuedEvent): void {}

export function handleMetaTxDecoded(event: MetaTxDecodedEvent): void {}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handlePhalaRequestSent(event: PhalaRequestSentEvent): void {}

export function handlePhalaResponseReceived(
  event: PhalaResponseReceivedEvent
): void {}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {}

export function handleRoleGranted(event: RoleGrantedEvent): void {}

export function handleRoleRevoked(event: RoleRevokedEvent): void {}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {}
