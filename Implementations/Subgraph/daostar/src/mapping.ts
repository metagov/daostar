import { BigInt, log, dataSource, json, Bytes, JSONValueKind } from '@graphprotocol/graph-ts'
import { DAOURIRegistered } from '../generated/EIP4824Index/EIP4824Index'
import { DAOURIUpdate } from '../generated/templates/EIP4824Registration/EIP4824Registration'
import { RegistrationInstance, RegistrationNetwork, DAOMetadata } from '../generated/schema'
import { EIP4824Registration, DAOMetadataTemplate } from '../generated/templates'
import { getChainId } from './getChainId'

export function handleNewRegistration(event: DAOURIRegistered): void {
    const chainName = dataSource.network() // returns network name

    let registrationNetwork = RegistrationNetwork.load(chainName)
    if (!registrationNetwork) {
        registrationNetwork = new RegistrationNetwork(chainName)
        registrationNetwork.chainId = getChainId().toString()
        registrationNetwork.save()
    }

    let daoAddress = event.params.daoAddress.toHex()
    let daoId = daoAddress
    let registrationInstance = RegistrationInstance.load(daoId)

    if (!registrationInstance) {
        EIP4824Registration.create(event.params.daoAddress)
        let newAddress = event.params.daoAddress.toHex()
        registrationInstance = new RegistrationInstance(newAddress)
        registrationInstance.registrationNetwork = registrationNetwork.id // Set the relationship correctly
        registrationInstance.registrationAddress = event.params.daoAddress
        registrationInstance.daoAddress = event.params.daoAddress
        registrationInstance.daoURI = 'placeholder'
        registrationInstance.save()
    }
}

export function handleNewURI(event: DAOURIUpdate): void {
    let registrationAddress = event.address.toHex()
    let registrationInstance = RegistrationInstance.load(registrationAddress)

    if (!registrationInstance) {
        log.warning('Invalid Registration: {}', [registrationAddress])
    } else {
        registrationInstance.daoAddress = event.params.daoAddress
        if (event.params.daoURI) {
            registrationInstance.daoURI = event.params.daoURI
            const ipfsHash = event.params.daoURI.substring(event.params.daoURI.length - 46)
            log.info('Fetching ipfs data for: {}', [ipfsHash])
            DAOMetadataTemplate.create(ipfsHash) // Spawning the file data source template
        }
        registrationInstance.save()
    }
}

// Handler to process the fetched file from IPFS
export function handleDAOMetadata(content: Bytes): void {
    let metadataId = dataSource.stringParam()
    let metadata = DAOMetadata.load(metadataId)
    if (!metadata) {
        metadata = new DAOMetadata(metadataId)
    }

    const value = json.fromBytes(content).toObject()

    if (value) {
        let daoName = value.get('name')
        if (daoName !== null && daoName.kind === JSONValueKind.STRING) {
            metadata.daoName = daoName.toString()
        } else {
            metadata.daoName = ''
        }

        let daoDescription = value.get('description')
        if (daoDescription !== null && daoDescription.kind === JSONValueKind.STRING) {
            metadata.daoDescription = daoDescription.toString()
        } else {
            metadata.daoDescription = ''
        }

        let membersURI = value.get('membersURI')
        if (membersURI !== null && membersURI.kind === JSONValueKind.STRING) {
            metadata.membersURI = membersURI.toString()
        } else {
            metadata.membersURI = ''
        }

        let issuersURI = value.get('issuersURI')
        if (issuersURI !== null && issuersURI.kind === JSONValueKind.STRING) {
            metadata.issuersURI = issuersURI.toString()
        } else {
            metadata.issuersURI = ''
        }

        let proposalsURI = value.get('proposalsURI')
        if (proposalsURI !== null && proposalsURI.kind === JSONValueKind.STRING) {
            metadata.proposalsURI = proposalsURI.toString()
        } else {
            metadata.proposalsURI = ''
        }

        let governanceURI = value.get('governanceURI')
        if (governanceURI !== null && governanceURI.kind === JSONValueKind.STRING) {
            metadata.governanceURI = governanceURI.toString()
        } else {
            metadata.governanceURI = ''
        }

        let activityLogURI = value.get('activityLogURI')
        if (activityLogURI !== null && activityLogURI.kind === JSONValueKind.STRING) {
            metadata.activityLogURI = activityLogURI.toString()
        } else {
            metadata.activityLogURI = ''
        }

        let contractsRegistryURI = value.get('contractsRegistryURI')
        if (contractsRegistryURI !== null && contractsRegistryURI.kind === JSONValueKind.STRING) {
            metadata.contractsRegistryURI = contractsRegistryURI.toString()
        } else {
            metadata.contractsRegistryURI = ''
        }

        let managerAddress = value.get('managerAddress')
        if (managerAddress !== null && managerAddress.kind === JSONValueKind.STRING) {
            metadata.managerAddress = managerAddress.toString()
        } else {
            metadata.managerAddress = ''
        }

        metadata.save()

        // Update the registration instance with the metadata relationship
        let registrationInstance = RegistrationInstance.load(metadataId)
        if (registrationInstance) {
            registrationInstance.daoMetadata = metadata.id
            registrationInstance.save()
        }
    }
}
