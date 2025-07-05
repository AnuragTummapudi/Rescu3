import abiJson from '@/abi/Rescu3.json';

export const CONTRACT_ABI = abiJson.abi;

// This needs to be updated to a deployed contract address on Sepolia
// For testing purposes, you'll need to deploy the contract first
export const CONTRACT_ADDRESS = '0xf278Da163822526163fe4344836BC0eE322aBa40' as const;

export const COMMIT_FEE = '0.01'; // ETH

export const CONTRACT_CONFIG = {
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
} as const;

// Contract constants
export const COMMIT_DELAY = 60; // 1 minute in seconds
export const CHALLENGE_PERIOD = 300; // 5 minutes in seconds