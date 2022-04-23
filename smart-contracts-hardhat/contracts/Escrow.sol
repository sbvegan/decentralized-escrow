// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

contract Escrow {
    // participants
    address public bull; // bets the price will be higher than anchor at expiration
    address public bear; // bets the price will be lower than anchor at expiration
    // parameters
    address public assetDatafeed; // chainlink data feed to get the price
    int256 public anchorPrice; // anchor > expirationPrice --> bear and vice versa
    int256 public wager; // the amount each party has to put up
    // timekeeping
    uint256 public initTimestamp; // timestamp the bet was initialized
    uint256 public activeTimestamp; // timestamp the bet was fully funded
    uint256 public paydayTimestamp; // payday / expiration time
    enum State {
        INITIALIZED,
        ACTIVE,
        COMPLETE
    } // contract state
    State public state;

    /** The constructor initializes the escrow betting contract
    address _assetDatafeed - address of the chainlink datafeed
    int256 _anchorPrice - the high or low point
    uint256 _paydayTimestamp - payday / expiration time
    */
    constructor(
        address _assetDatafeed,
        int256 _wager,
        int256 _anchorPrice,
        uint256 _paydayTimestamp
    ) {
        // TODO: add parameter checks
        initTimestamp = block.timestamp;
        assetDatafeed = _assetDatafeed;
        wager = _wager;
        anchorPrice = _anchorPrice;
        paydayTimestamp = _paydayTimestamp;
        state = State.INITIALIZED;
    }

    // TODO: deposit functionality

    // TODO: checkUpkeep

    // TODO: performUpkeep

    // TODO: withdraw functionality

    // TODO: change state
}
