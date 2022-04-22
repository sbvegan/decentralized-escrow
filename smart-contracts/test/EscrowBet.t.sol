// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "src/EscrowBet.sol";

contract TestEscrowBet is Test {
    EscrowBet c;

    function setUp() public {
        c = new EscrowBet();
    }

    function testBar() public {
        assertEq(uint256(2), 2, "ok");
    }
}
