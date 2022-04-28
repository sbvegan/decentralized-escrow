module.exports = [
    "0x9326BFA02ADD2366b30bacB125260Af641031331", // kovan eth/usd
    ethers.utils.parseUnits("0.01", "ether"), 
    300000000000, // $3000 eth, chainlink price feed has 8 decimal places
    1653609600 // May 27th
  ];