const hre = require("hardhat");

async function deploy() {
  const deployParameters = {
    datafeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    wager: 100, // 100 wei bet - high rollers
    anchorPrice: 3000, // needs proper amount of decimals
    expiration: 1653609600 // May 27th
  }

  // We get the contract to deploy
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    deployParameters.datafeed,
    deployParameters.wager,
    deployParameters.anchorPrice,
    deployParameters.expiration
  );
  await escrow.deployed();

  console.log("escrow deployed to:", escrow.address);
  return escrow;
}

async function main() {
  const escrowContract = await deploy()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
