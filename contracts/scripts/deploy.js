async function main() {
  const Rescu3 = await ethers.getContractFactory("Rescu3");
  const rescu3 = await Rescu3.deploy();
  await rescu3.deployed();
<<<<<<< HEAD
  console.log(`Rescu3 deployed to: ${rescu3.address}`);
=======
  console.log(`Deployed to: ${rescu3.address}`);
>>>>>>> f1fc7729fd0fb51c08e86acaed7ca1aaf96bb792
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});