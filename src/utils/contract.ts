import { keccak256, encodePacked } from 'viem';

/**
 * Generate commit hash for the Rescu3 protocol
 */
export function generateCommitHash(
  lostAddress: string,
  recoveryAddress: string,
  nonce: string
): `0x${string}` {
  return keccak256(
    encodePacked(
      ['address', 'address', 'uint256'],
      [lostAddress as `0x${string}`, recoveryAddress as `0x${string}`, BigInt(nonce)]
    )
  );
}

/**
 * Generate a random nonce for commit-reveal
 */
export function generateNonce(): string {
  return Math.floor(Math.random() * 1000000).toString();
}

/**
 * Format time remaining in human readable format
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}