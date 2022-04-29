const hre = require("hardhat");

async function deploy() {
  const deployParameters = {
    datafeed: "0x9326BFA02ADD2366b30bacB125260Af641031331", // kovan eth/usd
    wager: ethers.utils.parseUnits("0.01", "ether"), 
    anchorPrice: 300000000000, // $3000 eth, chainlink price feed has 8 decimal places
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
