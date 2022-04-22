// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract EscrowBet {
    // Wager parameters
    // participants
    address bull;
    address bear;
    // asset
    // chainlink data feed to get the price
    // anchor price bull wins if asset is > anchor at expiration
    // and vice versa for the bear
    // payday / expiration time
    // enum for contract state: INITIALIZED, ACTIVE, COMPLETE

    // constructor that allows one of the participants to initialize the bet

    // checkUpkeep

    // performUpkeep

    // withdraw functionality

    // change state
}
