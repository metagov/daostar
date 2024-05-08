import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { NewRegistration } from "../generated/schema"
import { NewRegistration as NewRegistrationEvent } from "../generated/EIP4824Registration.json/EIP4824Registration.json"
import { handleNewRegistration } from "../src/eip-4824-registration-json"
import { createNewRegistrationEvent } from "./eip-4824-registration-json-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let daoAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let daoURI = "Example string value"
    let registration = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newNewRegistrationEvent = createNewRegistrationEvent(
      daoAddress,
      daoURI,
      registration
    )
    handleNewRegistration(newNewRegistrationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewRegistration created and stored", () => {
    assert.entityCount("NewRegistration", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewRegistration",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewRegistration",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoURI",
      "Example string value"
    )
    assert.fieldEquals(
      "NewRegistration",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "registration",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
