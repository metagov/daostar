import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { NewRegistration } from "../generated/EIP-4824 Registration/EIP-4824 Registration"

export function createNewRegistrationEvent(
  daoAddress: Address,
  daoURI: string,
  registration: Address
): NewRegistration {
  let newRegistrationEvent = changetype<NewRegistration>(newMockEvent())

  newRegistrationEvent.parameters = new Array()

  newRegistrationEvent.parameters.push(
    new ethereum.EventParam(
      "daoAddress",
      ethereum.Value.fromAddress(daoAddress)
    )
  )
  newRegistrationEvent.parameters.push(
    new ethereum.EventParam("daoURI", ethereum.Value.fromString(daoURI))
  )
  newRegistrationEvent.parameters.push(
    new ethereum.EventParam(
      "registration",
      ethereum.Value.fromAddress(registration)
    )
  )

  return newRegistrationEvent
}
