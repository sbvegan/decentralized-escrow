// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

contract Escrow {
    // participants
    address public bull; // bets the price will be higher than anchor at expiration
    address public bear; // bets the price will be lower than anchor at expiration
    // parameters
    address public assetDatafeed; // chainlink data feed to get the price
    uint256 public anchorPrice; // anchor > expirationPrice --> bear and vice versa
    uint256 public wager; // the amount each party has to put up
    // timekeeping
    uint256 public initTimestamp; // timestamp the bet was initialized
    uint256 public activeTimestamp; // timestamp the bet was fully funded
    uint256 public paydayTimestamp; // payday / expiration time
    // TODO: account for one deposit made
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
        uint256 _wager,
        uint256 _anchorPrice,
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
    // TODO: refactor
    function bullDeposit() public payable {
        require(bull == address(0), "The bull deposit was already made.");
        require(msg.value == wager, "Must deposit wager ammount.");
        bull = msg.sender;
    }

    function bearDeposit() public payable {
        require(bear == address(0), "The bear deposit was already made.");
        require(msg.value == wager, "Must deposit wager ammount.");
        bear = msg.sender;
    }

    function showContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // TODO: checkUpkeep

    // TODO: performUpkeep

    // TODO: withdraw functionality

    // TODO: change state
}
