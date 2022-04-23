const hre = require("hardhat");
/**Steps
 * 
 * Alice and Bob create a keeper compatible escrow contract
 * with the following parameters: 
        Alice’s address
        Bob’s address
        Minimum wager size
        Time the wager concludes
 * Alice deposits her funds
 * Bob deposits his funds
 * The pot is good
 * Fund the LINK required for the Keepers
 * Chainlink keepers monitor the contract and waits until 
 * the `checkUpKeep` conditions are met
 * Is it payday?
        Keeper runs `performUpkeep` and the winner receives the 
        funds to their wallet
 */

const deployParameters = {
    datafeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    wager: 100, // 100 wei bet - high rollers
    anchorPrice: 3000, // needs proper amount of decimals
    expiration: 1653609600 // May 27th
}

async function deploy() {

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
