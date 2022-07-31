const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const DANKToken = await hre.ethers.getContractFactory("DANKToken");
  const dANKToken = await DANKToken.deploy("DANKUSH", "DANK");

  await dANKToken.deployed();

  console.log("Token deployed to:", dANKToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });