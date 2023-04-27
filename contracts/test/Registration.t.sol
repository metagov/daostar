// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {EIP4824Registration, EIP4824RegistrationSummoner, EIP4824Index} from "../src/Registration.sol";

contract ContractTest is Test {
    address deployer;
    address dao;
    address manager;
    address anyone;

    EIP4824Index indexer;
    EIP4824RegistrationSummoner summoner;
    EIP4824Registration registration;
    EIP4824Registration registrationWithManager;

    bytes32 public constant REGISTRATION_ROLE = keccak256("REGISTRATION_ROLE");

    uint256 salt = 1;

    string daoUri = "ipfs://dao";

    modifier _as(address _prankee) {
        vm.startPrank(_prankee);
        _;
        vm.stopPrank();
    }

    function setUp() public {
        deployer = getFundedAccount(1);
        dao = getFundedAccount(2);
        manager = getFundedAccount(3);
        anyone = getFundedAccount(4);

        vm.startPrank(deployer);
        indexer = new EIP4824Index();
        EIP4824Registration template = new EIP4824Registration();
        summoner = new EIP4824RegistrationSummoner(
            address(template),
            address(indexer)
        );
        vm.stopPrank();

        address[] memory _targets = new address[](0);
        bytes[] memory _data = new bytes[](0);

        vm.startPrank(dao);
        (address registrationAddress, ) = summoner.summonRegistration(
            bytes32(salt),
            daoUri,
            address(0),
            _targets,
            _data
        );
        registration = EIP4824Registration(registrationAddress);

        (address registrationWithManagerAddress, ) = summoner
            .summonRegistration(
                bytes32(salt + 1),
                daoUri,
                manager,
                _targets,
                _data
            );

        registrationWithManager = EIP4824Registration(
            registrationWithManagerAddress
        );
        vm.stopPrank();
    }

    function test_summoner() public _as(manager) {
        // Predicts address
        (address predicted, bool exists) = summoner.registrationAddress(
            dao,
            bytes32(salt)
        );
        assertEq(predicted, address(registration));
        assertTrue(exists);

        // Cannot reinitialize
        vm.expectRevert();
        registration.initialize(dao, manager, daoUri, address(indexer));
    }

    function test_managerCannotSetUriIfNoManager() public _as(manager) {
        vm.expectRevert();
        registration.setURI("new");
    }

    function test_DAOCanSetUriWithNoManager() public _as(dao) {
        assertEq(registration.daoURI(), daoUri);
        registration.setURI("new");
        assertEq(registration.daoURI(), "new");
    }

    function test_managerCanSetUri() public _as(manager) {
        assertEq(registrationWithManager.daoURI(), daoUri);
        registrationWithManager.setURI("new");
        assertEq(registrationWithManager.daoURI(), "new");
    }

    function test_DAOCanSetUri() public _as(dao) {
        assertEq(registrationWithManager.daoURI(), daoUri);
        registrationWithManager.setURI("new");
        assertEq(registrationWithManager.daoURI(), "new");
    }

    function test_LogRegistrationFailsWithNoERC165() public _as(dao) {
        vm.expectRevert();
        indexer.logRegistration(dao);
    }

    function test_LogRegistrationSucceedsWithDefaultRole() public {
        vm.startPrank(deployer);
        indexer.logRegistrationPermissioned(dao);
        vm.stopPrank();
    }

    function test_LogRegistrationSucceedsWithRole() public {
        vm.startPrank(deployer);
        indexer.grantRole(REGISTRATION_ROLE, dao);
        vm.stopPrank();

        vm.startPrank(dao);
        indexer.logRegistrationPermissioned(dao);
        vm.stopPrank();
    }

    function getFundedAccount(uint256 num) internal returns (address) {
        address addr = vm.addr(num);
        // Fund with some ETH
        vm.deal(addr, 1e19);

        return addr;
    }
}
