// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "src/EscrowBet.sol";

contract TestEscrowBet is Test {
    EscrowBet escrowBet;
    address deployer = 0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84; // foundry def

    // event log_named_address(string key, address val);

    function testValidBullInit() public {
        bool bull = true;
        address ethusdDatafeed = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419;
        int256 anchorPrice = 3000;
        uint256 may27th = 1653609600;
        escrowBet = new EscrowBet(bull, ethusdDatafeed, anchorPrice, may27th);
        assertEq(deployer, escrowBet.bull());
        assertEq(ethusdDatafeed, escrowBet.assetDatafeed());
        assertEq(anchorPrice, escrowBet.anchorPrice());
        assertEq(may27th, escrowBet.paydayTimestamp());
    }

    function testValidBearInit() public {
        bool bear = false;
        address ethusdDatafeed = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419;
        int256 anchorPrice = 3000;
        uint256 may27th = 1653609600;
        escrowBet = new EscrowBet(bear, ethusdDatafeed, anchorPrice, may27th);
        assertEq(deployer, escrowBet.bear());
        assertEq(ethusdDatafeed, escrowBet.assetDatafeed());
        assertEq(anchorPrice, escrowBet.anchorPrice());
    }
}
