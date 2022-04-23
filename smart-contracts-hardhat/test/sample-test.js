const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowBet", function () {
  it("should", async function () {
    const EscrowBet = await ethers.getContractFactory("EscrowBet");
    const escrowBet = await EscrowBet.deploy("Hello, world!");
    await escrowBet.deployed();

    expect(await EscrowBet.greet()).to.equal("Hola, mundo!");
  });
});
