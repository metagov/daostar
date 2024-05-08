import { NewRegistration as NewRegistrationEvent } from "../generated/EIP4824Registration.json/EIP4824Registration.json"
import { NewRegistration } from "../generated/schema"

export function handleNewRegistration(event: NewRegistrationEvent): void {
  let entity = new NewRegistration(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.daoAddress = event.params.daoAddress
  entity.daoURI = event.params.daoURI
  entity.registration = event.params.registration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
