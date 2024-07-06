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
  RoleRevoked as RoleRevokedEvent
} from "../generated/WarpAds/WarpAds"
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
} from "../generated/schema"

export function handleAdCreated(event: AdCreatedEvent): void {
  let entity = new AdCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.adId = event.params.adId
  entity.metadata = event.params.metadata
  entity.labels = event.params.labels
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorRoyaltiesDispersed(
  event: AuthorRoyaltiesDispersedEvent
): void {
  let entity = new AuthorRoyaltiesDispersed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorRoyaltiesRequestFailed(
  event: AuthorRoyaltiesRequestFailedEvent
): void {
  let entity = new AuthorRoyaltiesRequestFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.errorCode = event.params.errorCode

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorRoyaltiesRequested(
  event: AuthorRoyaltiesRequestedEvent
): void {
  let entity = new AuthorRoyaltiesRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.frameUrl = event.params.frameUrl
  entity.farcasterId = event.params.farcasterId
  entity.claimer = event.params.claimer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreateAdRequested(event: CreateAdRequestedEvent): void {
  let entity = new CreateAdRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.query = event.params.query

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInfluencerRoyaltiesDispersed(
  event: InfluencerRoyaltiesDispersedEvent
): void {
  let entity = new InfluencerRoyaltiesDispersed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInfluencerRoyaltiesRequestFailed(
  event: InfluencerRoyaltiesRequestFailedEvent
): void {
  let entity = new InfluencerRoyaltiesRequestFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.adId = event.params.adId
  entity.errorCode = event.params.errorCode

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInfluencerRoyaltiesRequested(
  event: InfluencerRoyaltiesRequestedEvent
): void {
  let entity = new InfluencerRoyaltiesRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.farcasterId = event.params.farcasterId
  entity.claimer = event.params.claimer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageProcessedTo(event: MessageProcessedToEvent): void {
  let entity = new MessageProcessedTo(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageQueued(event: MessageQueuedEvent): void {
  let entity = new MessageQueued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.idx = event.params.idx
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetaTxDecoded(event: MetaTxDecodedEvent): void {
  let entity = new MetaTxDecoded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePhalaRequestSent(event: PhalaRequestSentEvent): void {
  let entity = new PhalaRequestSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.reqId = event.params.reqId
  entity.request = event.params.request

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePhalaResponseReceived(
  event: PhalaResponseReceivedEvent
): void {
  let entity = new PhalaResponseReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.reqId = event.params.reqId
  entity.request = event.params.request
  entity.response = event.params.response

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
