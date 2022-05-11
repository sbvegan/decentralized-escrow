const hre = require("hardhat");

const deployParameters = {
  datafeed: "0x9326BFA02ADD2366b30bacB125260Af641031331", // kovan eth/usd
  wager: ethers.utils.parseUnits("0.01", "ether"),
  anchorPrice: 300000000000, // $3000 eth, chainlink price feed has 8 decimal places
  expiration: 1653609600 // May 27th
}

async function deployFactory() {
  const EscrowFactory = await hre.ethers.getContractFactory("EscrowFactory");
  const escrowFactory = await EscrowFactory.deploy();
  await escrowFactory.deployed();

  console.log("escrowFactory deployed to:", escrowFactory.address);
  return escrowFactory;
}

async function deployEscrow(escrowFactoryContract) {
  const escrowAddress = await escrowFactoryContract.createEscrow(
    deployParameters.datafeed,
    deployParameters.wager,
    deployParameters.anchorPrice,
    deployParameters.expiration
  );
  console.log("escrow deployed to:", escrowAddress);
}

async function main() {
  const escrowFactoryContract = await deployFactory()
  const escrowContract = await deployEscrow(escrowFactoryContract)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
