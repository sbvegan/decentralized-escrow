const hre = require("hardhat");

async function deploy() {
  const ethusdDatafeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
  const anchorPrice = 3000;
  const may27th = 1653609600;

  // We get the contract to deploy
  const EscrowBet = await hre.ethers.getContractFactory("EscrowBet");
  const escrowBet = await EscrowBet.deploy(ethusdDatafeed, anchorPrice, may27th);

  await escrowBet.deployed();

  console.log("escrowBet deployed to:", escrowBet.address);
}

async function main() {
  await deploy()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
