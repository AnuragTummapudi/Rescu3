const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Checking balance for address:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  const balanceInEth = ethers.formatEther(balance);
  
  console.log("Balance:", balanceInEth, "ETH");
  
  // Estimate deployment cost
  const Rescu3 = await ethers.getContractFactory("Rescu3");
  const deploymentData = Rescu3.interface.encodeDeploy();
  const gasEstimate = await ethers.provider.estimateGas({
    data: deploymentData,
    from: deployer.address
  });
  
  const gasPrice = await ethers.provider.getGasPrice();
  const deploymentCost = gasEstimate * gasPrice;
  const deploymentCostInEth = ethers.formatEther(deploymentCost);
  
  console.log("Estimated deployment cost:", deploymentCostInEth, "ETH");
  console.log("Gas estimate:", gasEstimate.toString());
  console.log("Gas price:", ethers.formatUnits(gasPrice, "gwei"), "gwei");
  
  if (balance > deploymentCost) {
    console.log("✅ Sufficient balance for deployment");
  } else {
    console.log("❌ Insufficient balance for deployment");
    console.log("You need at least", deploymentCostInEth, "ETH");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 