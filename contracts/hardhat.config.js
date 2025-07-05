require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
<<<<<<< HEAD
      url: "https://sepolia.infura.io/v3/b1bcb0307b3b46ec8807d04758a62ba8",
      accounts: ["235f048c728067bbc4e0178f733d4b2b702d76872d98a4c2fd35d437f69551fc"]
=======
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY]
>>>>>>> f1fc7729fd0fb51c08e86acaed7ca1aaf96bb792
    }
  }
};