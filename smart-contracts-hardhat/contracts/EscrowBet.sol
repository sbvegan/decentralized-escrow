// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract EscrowBet {
    // parameters
    address public bull; // bets the price will be higher than anchor at expiration
    address public bear; // bets the price will be lower than anchor at expiration
    address public assetDatafeed; // chainlink data feed to get the price
    int256 public anchorPrice; // anchor > expirationPrice --> bear and vice versa
    uint256 public initTimestamp; // timestamp the bet was initialized
    uint256 public activeTimestamp; // timestamp the bet was fully funded
    uint256 public paydayTimestamp; // payday / expiration time
    enum State {
        INITIALIZED,
        ACTIVE,
        COMPLETE
    } // contract state
    State public state;

    /** The constructor initializes the bet
    bool _bull - true --> bull && false --> bear
    address _assetDatafeed - address of the chainlink datafeed
    int256 _anchorPrice - the high or low point
    uint256 _paydayTimestamp - payday / expiration time
    */
    constructor(
        address _assetDatafeed,
        int256 _anchorPrice,
        uint256 _paydayTimestamp
    ) {
        // TODO: add parameter checks
        initTimestamp = block.timestamp;
        assetDatafeed = _assetDatafeed;
        anchorPrice = _anchorPrice;
        paydayTimestamp = _paydayTimestamp;
        state = State.INITIALIZED;
    }

    // TODO: deposit functionality
    function depositToken(address _token, uint256 _amount) public {
        IERC20(_token).approve(msg.sender, _amount);
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    }

    // TODO: checkUpkeep

    // TODO: performUpkeep

    // TODO: withdraw functionality

    // TODO: change state
}
