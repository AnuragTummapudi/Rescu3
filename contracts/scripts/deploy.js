async function main() {
  const Rescu3 = await ethers.getContractFactory("Rescu3");
  const rescu3 = await Rescu3.deploy();
  await rescu3.deployed();
  console.log(`Rescu3 deployed to: ${rescu3.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});