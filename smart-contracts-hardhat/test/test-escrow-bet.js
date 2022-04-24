const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", () => {
  it("should initialize the contract", async function () {
    const ethusdDatafeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    const anchorPrice = 3000;
    const may27th = 1653609600;

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(ethusdDatafeed, anchorPrice, may27th);
    await escrow.deployed();

    expect(await escrow.assetDatafeed()).to.equal(ethusdDatafeed);
  });

  it("should place the bull bet (no counter party)", () => {

  })

  it("should place the bear bet (no counter party)", () => {

  })

  it("should place the bull bet (counter party)", () => {

  })

  it("should place the bear bet (counter party)", () => {

  })
});
