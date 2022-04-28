const { expect } = require("chai");
const chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN))

describe("Escrow", () => {

  let ethusdDatafeed;
  let wager;
  let anchorPrice;
  let may27th;
  let owner;
  let bull;
  let bear;
  const provider = ethers.getDefaultProvider();

  beforeEach(async () => {
    // test accounts
    [bull, bear] = await ethers.getSigners();
    // contract constructor parameters
    ethusdDatafeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    wager = ethers.utils.parseUnits("1.0", "ether");
    anchorPrice = 3000;
    may27th = 1653609600;
    // deploy contract
    Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(ethusdDatafeed, wager, anchorPrice, may27th);
    await escrow.deployed();
  })

  it("should place the bull bet (no counter party)", async () => {
    await escrow.connect(bull).bullDeposit({
      value: wager,
    });
    expect(await escrow.bull()).to.equal(bull.address)
    expect((await escrow.showContractBalance()).toString()).to.equal(wager.toString())
  })

  it("should place the bear bet (no counter party)", async () => {
    await escrow.connect(bear).bearDeposit({
      value: wager,
    });
    expect(await escrow.bear()).to.equal(bear.address)
    expect((await escrow.showContractBalance()).toString()).to.equal(wager.toString())
  })

  // TODO: test depositing incorrect balance
  // TODO: test depositing in the bull/bear address twice

  it("should place both bets", async () => {
    await escrow.connect(bear).bearDeposit({
      value: wager,
    });
    await escrow.connect(bull).bullDeposit({
      value: wager,
    });
    expect(await escrow.bear()).to.equal(bear.address)
    expect(await escrow.bull()).to.equal(bull.address)
    expect((await escrow.showContractBalance()).toString()).to.equal((wager * 2).toString())
  })

});
