// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {EIP4824Registration, EIP4824RegistrationSummoner} from "../src/Registration.sol";

contract ContractScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        EIP4824Registration template = new EIP4824Registration();
        EIP4824RegistrationSummoner summoner = new EIP4824RegistrationSummoner(
            address(template)
        );

        vm.stopBroadcast();
    }
}
