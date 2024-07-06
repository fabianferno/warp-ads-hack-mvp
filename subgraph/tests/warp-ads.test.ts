import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AdCreated } from "../generated/schema"
import { AdCreated as AdCreatedEvent } from "../generated/WarpAds/WarpAds"
import { handleAdCreated } from "../src/warp-ads"
import { createAdCreatedEvent } from "./warp-ads-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let adId = BigInt.fromI32(234)
    let metadata = "Example string value"
    let labels = ["Example string value"]
    let price = BigInt.fromI32(234)
    let newAdCreatedEvent = createAdCreatedEvent(adId, metadata, labels, price)
    handleAdCreated(newAdCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdCreated created and stored", () => {
    assert.entityCount("AdCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "adId",
      "234"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadata",
      "Example string value"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "labels",
      "[Example string value]"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
