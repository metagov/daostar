import { BigInt, ipfs, json, JSONValueKind, log, dataSource } from '@graphprotocol/graph-ts'
import { NewRegistration } from '../generated/EIP4824RegistrationSummoner/EIP4824RegistrationSummoner'
import { NewURI } from '../generated/templates/EIP4824Registration/EIP4824Registration'
import { RegistrationInstance, RegistrationNetwork } from '../generated/schema'
import { EIP4824Registration } from '../generated/templates'
import { getChainId } from './getChainId'

export function handleNewRegistration(event: NewRegistration): void {
    const chainName = dataSource.network() // returns network name

    let registrationNetwork = RegistrationNetwork.load(chainName)
    if (!registrationNetwork) {
        registrationNetwork = new RegistrationNetwork(chainName)
        registrationNetwork.chainId = getChainId().toString();

        registrationNetwork.save()
    }

    let daoAddress = event.params.daoAddress.toHex()
    let daoId = daoAddress
    let registrationInstance = RegistrationInstance.load(daoId)

    if (!registrationInstance) {
        EIP4824Registration.create(event.params.registration)
        let newAddress = event.params.daoAddress.toHex()
        registrationInstance = new RegistrationInstance(newAddress)
    }

    registrationInstance.registrationNetwork = chainName
    registrationInstance.registrationAddress = event.params.registration
    registrationInstance.daoAddress = event.params.daoAddress
    registrationInstance.daoURI = event.params.daoURI

    // retrieve registration info from IPFS
    log.info('Fetching ipfs data for uri: {}', [event.params.daoURI])
    if (event.params.daoURI) {
        const ipfsHash = event.params.daoURI.substring(event.params.daoURI.length - 46)
        log.info('Fetching ipfs data for: {}', [ipfsHash])
        let ipfsData = ipfs.cat(ipfsHash)
        if (ipfsData) {
            log.debug('IPFS data found for : {}', [ipfsHash])
            let daoMetadata = json.fromBytes(ipfsData).toObject()

            const daoName = daoMetadata.get('name')
            log.info('My name is: {}', [daoName ? daoName.toString() : 'unknown'])
            const daoDescription = daoMetadata.get('description')
            log.info('My description is: {}', [daoDescription && daoDescription.kind == JSONValueKind.STRING ? daoDescription.toString() : 'unknown'])
            const membersURI = daoMetadata.get('membersURI')
            const proposalsURI = daoMetadata.get('proposalsURI')
            const governanceURI = daoMetadata.get('governanceURI')
            const activityLogURI = daoMetadata.get('activityLogURI')
            const issuersURI = daoMetadata.get('issuersURI')
            const managerAddress = daoMetadata.get('managerAddress');
            const contractsRegistryURI = daoMetadata.get('contractsRegistryURI');

            registrationInstance.daoName = daoName && daoName.kind == JSONValueKind.STRING ? daoName.toString() : ''
            registrationInstance.daoDescription = daoDescription && daoDescription.kind == JSONValueKind.STRING ? daoDescription.toString() : ''
            registrationInstance.membersURI = membersURI && membersURI.kind == JSONValueKind.STRING ? membersURI.toString() : ''
            registrationInstance.proposalsURI = proposalsURI && proposalsURI.kind == JSONValueKind.STRING ? proposalsURI.toString() : ''
            registrationInstance.governanceURI = governanceURI && governanceURI.kind == JSONValueKind.STRING ? governanceURI.toString() : ''
            registrationInstance.activityLogURI = activityLogURI && activityLogURI.kind == JSONValueKind.STRING ? activityLogURI.toString() : ''
            registrationInstance.issuersURI = issuersURI && issuersURI.kind == JSONValueKind.STRING ? issuersURI.toString() : ''
            registrationInstance.contractsRegistryURI = contractsRegistryURI && contractsRegistryURI.kind == JSONValueKind.STRING ? contractsRegistryURI.toString() : ''
            registrationInstance.managerAddress = managerAddress && managerAddress.kind == JSONValueKind.STRING ? managerAddress.toString() : ''
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
            const ipfsHash = event.params.daoURI.substring(-46)
            log.info('Fetching ipfs data for: {}', [ipfsHash])
            let ipfsData = ipfs.cat(ipfsHash)
            if (ipfsData) {
                log.debug('IPFS data found for : {}', [ipfsHash])
                let daoMetadata = json.fromBytes(ipfsData).toObject()

                const daoName = daoMetadata.get('name')
                log.info('My name is: {}', [daoName ? daoName.toString() : 'unknown'])
                const daoDescription = daoMetadata.get('description')
                log.info('My description is: {}', [
                    daoDescription && daoDescription.kind == JSONValueKind.STRING ? daoDescription.toString() : 'unknown',
                ])
                const membersURI = daoMetadata.get('membersURI')
                const proposalsURI = daoMetadata.get('proposalsURI')
                const governanceURI = daoMetadata.get('governanceURI')
                const activityLogURI = daoMetadata.get('activityLogURI')

                registrationInstance.daoName = daoName && daoName.kind == JSONValueKind.STRING ? daoName.toString() : ''
                registrationInstance.daoDescription = daoDescription && daoDescription.kind == JSONValueKind.STRING ? daoDescription.toString() : ''
                registrationInstance.membersURI = membersURI && membersURI.kind == JSONValueKind.STRING ? membersURI.toString() : ''
                registrationInstance.proposalsURI = proposalsURI && proposalsURI.kind == JSONValueKind.STRING ? proposalsURI.toString() : ''
                registrationInstance.governanceURI = governanceURI && governanceURI.kind == JSONValueKind.STRING ? governanceURI.toString() : ''
                registrationInstance.activityLogURI = activityLogURI && activityLogURI.kind == JSONValueKind.STRING ? activityLogURI.toString() : ''
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
