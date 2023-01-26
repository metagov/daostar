import { BigInt, ipfs, json, log } from '@graphprotocol/graph-ts'
import { NewRegistration } from '../generated/EIP4824RegistrationSummoner/EIP4824RegistrationSummoner'
import { NewURI } from '../generated/templates/EIP4824Registration/EIP4824Registration'
import { RegistrationInstance } from '../generated/schema'
import { EIP4824Registration } from '../generated/templates'

export function handleNewRegistration(event: NewRegistration): void {
    let daoAddress = event.params.daoAddress.toHex()
    let daoId = daoAddress
    let registrationInstance = RegistrationInstance.load(daoId)

    if (!registrationInstance) {
        EIP4824Registration.create(event.params.registration)
        let newAddress = event.params.daoAddress.toHex()
        registrationInstance = new RegistrationInstance(newAddress)
    }

    registrationInstance.registrationAddress = event.params.registration
    registrationInstance.daoAddress = event.params.daoAddress
    registrationInstance.daoURI = event.params.daoURI

    // retrieve registration info from IPFS
    log.info('Fetching ipfs data for uri: {}', [event.params.daoURI])
    if (event.params.daoURI) {
        const ipfsHash = event.params.daoURI.substring(7)
        log.info('Fetching ipfs data for: {}', [ipfsHash])
        let ipfsData = ipfs.cat(ipfsHash)
        if (ipfsData) {
            log.debug('IPFS data found for : {}', [ipfsHash])
            let daoMetadata = json.fromBytes(ipfsData).toObject()

            const daoName = daoMetadata.get('name')
            log.info('My name is: {}', [daoName ? daoName.toString() : 'unknown'])
            const daoDescription = daoMetadata.get('description')
            const membersURI = daoMetadata.get('membersURI')
            const proposalsURI = daoMetadata.get('proposalsURI')
            const governanceURI = daoMetadata.get('governanceURI')
            const activityLogURI = daoMetadata.get('activityLogURI')

            registrationInstance.daoName = daoName ? daoName.toString() : ''
            registrationInstance.daoDescription = daoDescription ? daoDescription.toString() : ''
            registrationInstance.membersURI = membersURI ? membersURI.toString() : ''
            registrationInstance.proposalsURI = proposalsURI ? proposalsURI.toString() : ''
            registrationInstance.governanceURI = governanceURI ? governanceURI.toString() : ''
            registrationInstance.activityLogURI = activityLogURI ? activityLogURI.toString() : ''
            registrationInstance.save() // For some reason this does not work without this additional save
        } else {
            log.warning('IPFS data missing for : {}', [ipfsHash])
        }
    }

    log.info('Saving registration for : {}', [event.params.daoURI])
    registrationInstance.save()
}

export function handleNewURI(event: NewURI): void {
    let daoAddress = event.params.daoAddress.toHex()
    let daoId = daoAddress
    let registrationInstance = RegistrationInstance.load(daoId)

    if (!registrationInstance) log.warning('Invalid instance', [])
    else {
        if (event.params.daoURI) {
            const ipfsHash = event.params.daoURI.substring(7)
            log.info('Fetching ipfs data for: {}', [ipfsHash])
            let ipfsData = ipfs.cat(ipfsHash)
            if (ipfsData) {
                log.debug('IPFS data found for : {}', [ipfsHash])
                let daoMetadata = json.fromBytes(ipfsData).toObject()

                const daoName = daoMetadata.get('name')
                log.info('My name is: {}', [daoName ? daoName.toString() : 'unknown'])
                const daoDescription = daoMetadata.get('description')
                const membersURI = daoMetadata.get('membersURI')
                const proposalsURI = daoMetadata.get('proposalsURI')
                const governanceURI = daoMetadata.get('governanceURI')
                const activityLogURI = daoMetadata.get('activityLogURI')

                registrationInstance.daoName = daoName ? daoName.toString() : ''
                registrationInstance.daoDescription = daoDescription ? daoDescription.toString() : ''
                registrationInstance.membersURI = membersURI ? membersURI.toString() : ''
                registrationInstance.proposalsURI = proposalsURI ? proposalsURI.toString() : ''
                registrationInstance.governanceURI = governanceURI ? governanceURI.toString() : ''
                registrationInstance.activityLogURI = activityLogURI ? activityLogURI.toString() : ''
                registrationInstance.save() // For some reason this does not work without this additional save
            } else {
                log.warning('IPFS data missing for : {}', [ipfsHash])
            }
        }
        registrationInstance.daoURI = event.params.daoURI
        // TODO resolve IPFS here
        registrationInstance.save()
    }
}
