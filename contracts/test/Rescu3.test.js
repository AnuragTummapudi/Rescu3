const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rescu3", function () {
  let contract, owner, addr1, addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Rescu3 = await ethers.getContractFactory("Rescu3");
    contract = await Rescu3.deploy();
    await contract.waitForDeployment();
  });

  it("should commit, reveal, and claim successfully", async function () {
    const nonce = 1234;
    const hash = ethers.keccak256(
      ethers.solidityPacked(["address", "address", "uint256"], [addr1.address, addr2.address, nonce])
    );

    await contract.connect(addr1).commit(hash, { value: ethers.parseEther("0.01") });
    await ethers.provider.send("evm_increaseTime", [60]);
    await contract.connect(addr1).reveal(addr1.address, addr2.address, nonce);

    await ethers.provider.send("evm_increaseTime", [300]);
    await contract.connect(addr2).claim(addr1.address);
  });
});