import { BigInt, log } from '@graphprotocol/graph-ts'
import { NewRegistration } from '../generated/EIP4824RegistrationSummoner/EIP4824RegistrationSummoner'
import { NewURI } from '../generated/templates/EIP4824Registration/EIP4824Registration'
import { RegistrationInstance } from '../generated/schema'
import { EIP4824Registration } from '../generated/templates'

/* 
 * Goerli
*/

export function handleNewRegistrationGoerli(event: NewRegistration): void {
    let chainId = '5'
    handleNewRegistration(event, chainId)
}

export function handleNewURIGoerli(event: NewURI): void {
    let chainId = '5'
    handleNewURI(event, chainId)
}

/* 
 * Mainnet
*/

export function handleNewRegistrationMainnet(event: NewRegistration): void {
    let chainId = '1'
    handleNewRegistration(event, chainId)
}

export function handleNewURIMainnet(event: NewURI): void {
    let chainId = '1'
    handleNewURI(event, chainId)
}

export function handleNewRegistration(event: NewRegistration, chainId: string): void {
    let daoAddress = event.params.daoAddress.toHex()
    let daoId = chainId + '-' + daoAddress
    let registrationInstance = RegistrationInstance.load(daoId)

    if (!registrationInstance) {
        EIP4824Registration.create(event.params.registration)
        let newAddress = event.params.daoAddress.toHex()
        registrationInstance = new RegistrationInstance(newAddress)
    }

    registrationInstance.registrationAddress = event.params.registration
    registrationInstance.daoAddress = event.params.daoAddress
    registrationInstance.daoURI = event.params.daoURI
    registrationInstance.network = BigInt.fromString(chainId)
    registrationInstance.save()
}


function handleNewURI(event: NewURI, chainId: string): void {
    let daoAddress = event.params.daoAddress.toHex()
    let daoId = chainId + '-' + daoAddress
    let registrationInstance = RegistrationInstance.load(daoId)

    if (!registrationInstance) log.warning('Invalid instance', [])
    else {
        registrationInstance.daoURI = event.params.daoURI
        registrationInstance.save()
    }
}
