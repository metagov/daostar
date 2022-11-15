// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

/// @title EIP-4824 DAOs
/// @dev See <https://eips.ethereum.org/EIPS/eip-4824>
interface EIP4824 {
    /// @notice A distinct Uniform Resource Identifier (URI) pointing to a JSON object following the "EIP-4824 DAO JSON-LD Schema". This JSON file splits into four URIs: membersURI, proposalsURI, activityLogURI, and governanceURI. The membersURI should point to a JSON file that conforms to the "EIP-4824 Members JSON-LD Schema". The proposalsURI should point to a JSON file that conforms to the "EIP-4824 Proposals JSON-LD Schema". The activityLogURI should point to a JSON file that conforms to the "EIP-4824 Activity Log JSON-LD Schema". The governanceURI should point to a flatfile, normatively a .md file. Each of the JSON files named above can be statically-hosted or dynamically-generated.
    function daoURI() external view returns (string memory _daoURI);
}

error NotDaoOrManager();
error NotDao();
error NotCandidate();
error AlreadyInitialized();
error OfferExpired();

/// @title EIP-4824: DAO Registration
contract EIP4824Registration is EIP4824 {
    event NewURI(string daoURI, address daoAddress);
    event NewOffer(address candidate, uint256 expiration);
    event NewManager(address manager);

    struct Offer {
        address candidate;
        uint256 expiration;
    }

    string private _daoURI;

    address daoAddress;

    Offer offer;
    address manager;

    modifier daoOrManagerOnly() {
        if ((msg.sender != daoAddress) && (msg.sender != manager))
            revert NotDaoOrManager();
        _;
    }

    modifier daoOnly() {
        if (msg.sender != daoAddress) revert NotDao();
        _;
    }

    constructor() {
        daoAddress = address(0xdead);
    }

    /// @notice Set the initial DAO URI and offer manager role to an address
    /// @dev Throws if initialized already
    /// @param _daoAddress The primary address for a DAO
    /// @param _candidate The address being offered manager
    /// @param _offerExpiration The expiration for the offer, or 0 if forever
    /// @param daoURI_ The URI which will resolve to the governance docs
    function initialize(
        address _daoAddress,
        address _candidate,
        uint256 _offerExpiration,
        string memory daoURI_
    ) external {
        initialize(_daoAddress, daoURI_);
        offerManager(_candidate, _offerExpiration);
    }

    /// @notice Set the initial DAO URI
    /// @dev Throws if initialized already
    /// @param _daoAddress The primary address for a DAO
    /// @param daoURI_ The URI which will resolve to the governance docs
    function initialize(address _daoAddress, string memory daoURI_) public {
        if (daoAddress != address(0)) revert AlreadyInitialized();
        daoAddress = _daoAddress;
        setURI(daoURI_);
    }

    /// @notice Update the URI for a DAO
    /// @dev Throws if not called by dao or manager
    /// @param daoURI_ The URI which will resolve to the governance docs
    function setURI(string memory daoURI_) public daoOrManagerOnly {
        _daoURI = daoURI_;
        emit NewURI(daoURI_, daoAddress);
    }

    /// @notice Offer manager to a new address
    /// @dev Throws if not called by DAO
    /// @param _candidate The address being offered manager
    /// @param _offerExpiration The expiration for the offer, or 0 if forever
    function offerManager(address _candidate, uint256 _offerExpiration)
        public
        daoOnly
    {
        offer = Offer(_candidate, _offerExpiration);
        emit NewOffer(_candidate, _offerExpiration);
    }

    /// @notice Revoke manager role
    /// @dev Throws if not called by DAO
    function revokeManager()
        public
        daoOnly
    {
        manager = address(0);
        emit NewManager(manager); // TODO diff event name?
    }

    /// @notice Accept manager offer
    /// @dev Throws if not called by candidate or offer expired
    function acceptOffer() external {
        if (offer.candidate != msg.sender) revert NotCandidate();
        if ((offer.expiration < block.timestamp) && (offer.expiration != 0))
            revert OfferExpired();
        manager = msg.sender;
        offer.candidate = address(0);
        emit NewManager(manager);
    }

    function daoURI() external view returns (string memory daoURI_) {
        return _daoURI;
    }
}

contract CloneFactory {
    // implementation of eip-1167 - see https://eips.ethereum.org/EIPS/eip-1167
    function createClone(address target) internal returns (address result) {
        bytes20 targetBytes = bytes20(target);
        assembly {
            let clone := mload(0x40)
            mstore(
                clone,
                0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
            )
            mstore(add(clone, 0x14), targetBytes)
            mstore(
                add(clone, 0x28),
                0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
            )
            result := create(0, clone, 0x37)
        }
    }
}

contract EIP4824RegistrationSummoner is CloneFactory {
    event NewRegistration(
        address indexed daoAddress,
        string daoURI,
        address registration
    );

    address public template; /*Template contract to clone*/

    constructor(address _template) {
        template = _template;
    }

    function summonRegistration(string calldata daoURI_) external {
        EIP4824Registration reg = EIP4824Registration(createClone(template)); /*Create a new clone of the template*/
        reg.initialize(msg.sender, daoURI_);
        emit NewRegistration(msg.sender, daoURI_, address(reg));
    }
}
