// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract Escrow is KeeperCompatibleInterface {
    // chainlink price feed
    AggregatorV3Interface internal priceFeed;

    // participants
    address public bull; // bets the price will be higher than anchor at expiration
    address public bear; // bets the price will be lower than anchor at expiration
    // parameters
    uint256 public immutable anchorPrice; // anchor > expirationPrice --> bear and vice versa
    uint256 public immutable wager; // the amount each party has to put up
    // timekeeping
    uint256 public immutable paydayTimestamp; // payday / expiration time

    // TODO: add state tracking or emit
    // enum State {
    //     INITIALIZED,
    //     ACTIVE,
    //     COMPLETE
    // } // contract state
    // State public state;

    /** The constructor initializes the escrow betting contract
    address _assetPriceFeed - address of the chainlink datafeed
    int256 _anchorPrice - the high or low point
    uint256 _paydayTimestamp - payday / expiration time
    */
    constructor(
        address _assetPriceFeed,
        uint256 _wager,
        uint256 _anchorPrice,
        uint256 _paydayTimestamp
    ) {
        // TODO: add parameter checks
        priceFeed = AggregatorV3Interface(_assetPriceFeed);
        wager = _wager;
        anchorPrice = _anchorPrice;
        paydayTimestamp = _paydayTimestamp;
        // state = State.INITIALIZED;
    }

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

    function sendWinnings(bool bullWins) private {
        if (bullWins) {
            payable(bull).transfer(address(this).balance);
        } else {
            payable(bear).transfer(address(this).balance);
        }
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }

    function checkUpkeep(bytes calldata)
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        upkeepNeeded = block.timestamp > paydayTimestamp;
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if (block.timestamp > paydayTimestamp) {
            if (getLatestPrice() >= int256(anchorPrice)) {
                // let's just say tie goes to the bulls
                sendWinnings(true);
            } else {
                sendWinnings(false);
            }
        }
    }

    // TODO: change state
}
