const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowBet", function () {
  it("should initialize the contract", async function () {
    const ethusdDatafeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    const anchorPrice = 3000;
    const may27th = 1653609600;

    const EscrowBet = await ethers.getContractFactory("EscrowBet");
    const escrowBet = await EscrowBet.deploy(ethusdDatafeed, anchorPrice, may27th);
    await escrowBet.deployed();

    expect(await escrowBet.assetDatafeed()).to.equal(ethusdDatafeed);
  });
});
