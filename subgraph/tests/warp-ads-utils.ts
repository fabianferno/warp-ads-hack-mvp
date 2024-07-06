import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  AdCreated,
  AuthorRoyaltiesDispersed,
  AuthorRoyaltiesRequestFailed,
  AuthorRoyaltiesRequested,
  CreateAdRequested,
  EIP712DomainChanged,
  InfluencerRoyaltiesDispersed,
  InfluencerRoyaltiesRequestFailed,
  InfluencerRoyaltiesRequested,
  MessageProcessedTo,
  MessageQueued,
  MetaTxDecoded,
  OwnershipTransferred,
  PhalaRequestSent,
  PhalaResponseReceived,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/WarpAds/WarpAds"

export function createAdCreatedEvent(
  adId: BigInt,
  metadata: string,
  labels: Array<string>,
  price: BigInt
): AdCreated {
  let adCreatedEvent = changetype<AdCreated>(newMockEvent())

  adCreatedEvent.parameters = new Array()

  adCreatedEvent.parameters.push(
    new ethereum.EventParam("adId", ethereum.Value.fromUnsignedBigInt(adId))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam("labels", ethereum.Value.fromStringArray(labels))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return adCreatedEvent
}

export function createAuthorRoyaltiesDispersedEvent(
  requestId: BigInt,
  amount: BigInt
): AuthorRoyaltiesDispersed {
  let authorRoyaltiesDispersedEvent = changetype<AuthorRoyaltiesDispersed>(
    newMockEvent()
  )

  authorRoyaltiesDispersedEvent.parameters = new Array()

  authorRoyaltiesDispersedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  authorRoyaltiesDispersedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return authorRoyaltiesDispersedEvent
}

export function createAuthorRoyaltiesRequestFailedEvent(
  requestId: BigInt,
  errorCode: i32
): AuthorRoyaltiesRequestFailed {
  let authorRoyaltiesRequestFailedEvent =
    changetype<AuthorRoyaltiesRequestFailed>(newMockEvent())

  authorRoyaltiesRequestFailedEvent.parameters = new Array()

  authorRoyaltiesRequestFailedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  authorRoyaltiesRequestFailedEvent.parameters.push(
    new ethereum.EventParam(
      "errorCode",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(errorCode))
    )
  )

  return authorRoyaltiesRequestFailedEvent
}

export function createAuthorRoyaltiesRequestedEvent(
  requestId: BigInt,
  frameUrl: string,
  farcasterId: BigInt,
  claimer: Address
): AuthorRoyaltiesRequested {
  let authorRoyaltiesRequestedEvent = changetype<AuthorRoyaltiesRequested>(
    newMockEvent()
  )

  authorRoyaltiesRequestedEvent.parameters = new Array()

  authorRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  authorRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam("frameUrl", ethereum.Value.fromString(frameUrl))
  )
  authorRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "farcasterId",
      ethereum.Value.fromUnsignedBigInt(farcasterId)
    )
  )
  authorRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )

  return authorRoyaltiesRequestedEvent
}

export function createCreateAdRequestedEvent(
  requestId: BigInt,
  query: string
): CreateAdRequested {
  let createAdRequestedEvent = changetype<CreateAdRequested>(newMockEvent())

  createAdRequestedEvent.parameters = new Array()

  createAdRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  createAdRequestedEvent.parameters.push(
    new ethereum.EventParam("query", ethereum.Value.fromString(query))
  )

  return createAdRequestedEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

export function createInfluencerRoyaltiesDispersedEvent(
  requestId: BigInt,
  amount: BigInt
): InfluencerRoyaltiesDispersed {
  let influencerRoyaltiesDispersedEvent =
    changetype<InfluencerRoyaltiesDispersed>(newMockEvent())

  influencerRoyaltiesDispersedEvent.parameters = new Array()

  influencerRoyaltiesDispersedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  influencerRoyaltiesDispersedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return influencerRoyaltiesDispersedEvent
}

export function createInfluencerRoyaltiesRequestFailedEvent(
  adId: BigInt,
  errorCode: i32
): InfluencerRoyaltiesRequestFailed {
  let influencerRoyaltiesRequestFailedEvent =
    changetype<InfluencerRoyaltiesRequestFailed>(newMockEvent())

  influencerRoyaltiesRequestFailedEvent.parameters = new Array()

  influencerRoyaltiesRequestFailedEvent.parameters.push(
    new ethereum.EventParam("adId", ethereum.Value.fromUnsignedBigInt(adId))
  )
  influencerRoyaltiesRequestFailedEvent.parameters.push(
    new ethereum.EventParam(
      "errorCode",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(errorCode))
    )
  )

  return influencerRoyaltiesRequestFailedEvent
}

export function createInfluencerRoyaltiesRequestedEvent(
  requestId: BigInt,
  farcasterId: BigInt,
  claimer: Address
): InfluencerRoyaltiesRequested {
  let influencerRoyaltiesRequestedEvent =
    changetype<InfluencerRoyaltiesRequested>(newMockEvent())

  influencerRoyaltiesRequestedEvent.parameters = new Array()

  influencerRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  influencerRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "farcasterId",
      ethereum.Value.fromUnsignedBigInt(farcasterId)
    )
  )
  influencerRoyaltiesRequestedEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )

  return influencerRoyaltiesRequestedEvent
}

export function createMessageProcessedToEvent(
  param0: BigInt
): MessageProcessedTo {
  let messageProcessedToEvent = changetype<MessageProcessedTo>(newMockEvent())

  messageProcessedToEvent.parameters = new Array()

  messageProcessedToEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromUnsignedBigInt(param0))
  )

  return messageProcessedToEvent
}

export function createMessageQueuedEvent(
  idx: BigInt,
  data: Bytes
): MessageQueued {
  let messageQueuedEvent = changetype<MessageQueued>(newMockEvent())

  messageQueuedEvent.parameters = new Array()

  messageQueuedEvent.parameters.push(
    new ethereum.EventParam("idx", ethereum.Value.fromUnsignedBigInt(idx))
  )
  messageQueuedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return messageQueuedEvent
}

export function createMetaTxDecodedEvent(): MetaTxDecoded {
  let metaTxDecodedEvent = changetype<MetaTxDecoded>(newMockEvent())

  metaTxDecodedEvent.parameters = new Array()

  return metaTxDecodedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPhalaRequestSentEvent(
  reqId: BigInt,
  request: Bytes
): PhalaRequestSent {
  let phalaRequestSentEvent = changetype<PhalaRequestSent>(newMockEvent())

  phalaRequestSentEvent.parameters = new Array()

  phalaRequestSentEvent.parameters.push(
    new ethereum.EventParam("reqId", ethereum.Value.fromUnsignedBigInt(reqId))
  )
  phalaRequestSentEvent.parameters.push(
    new ethereum.EventParam("request", ethereum.Value.fromBytes(request))
  )

  return phalaRequestSentEvent
}

export function createPhalaResponseReceivedEvent(
  reqId: BigInt,
  request: string,
  response: Bytes
): PhalaResponseReceived {
  let phalaResponseReceivedEvent = changetype<PhalaResponseReceived>(
    newMockEvent()
  )

  phalaResponseReceivedEvent.parameters = new Array()

  phalaResponseReceivedEvent.parameters.push(
    new ethereum.EventParam("reqId", ethereum.Value.fromUnsignedBigInt(reqId))
  )
  phalaResponseReceivedEvent.parameters.push(
    new ethereum.EventParam("request", ethereum.Value.fromString(request))
  )
  phalaResponseReceivedEvent.parameters.push(
    new ethereum.EventParam("response", ethereum.Value.fromBytes(response))
  )

  return phalaResponseReceivedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
