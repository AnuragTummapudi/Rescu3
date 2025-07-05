// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Rescu3 {
    struct CommitData {
        address depositor;
        uint256 timestamp;
        bool revealed;
    }

    struct PendingRecovery {
        address recoveryAddress;
        uint256 revealedAt;
    }

    mapping(bytes32 => CommitData) public commits;
    mapping(address => PendingRecovery) public pendingRecoveries;

    uint256 public constant COMMIT_DELAY = 60; // e.g., 1 minute delay before reveal
    uint256 public constant CHALLENGE_PERIOD = 300; // e.g., 5 minutes
    uint256 public constant COMMIT_FEE = 0.01 ether;

    event Committed(bytes32 hash, address depositor);
    event Revealed(address lost, address recovery);
    event Challenged(address lost);
    event Claimed(address lost, address recovery);

    modifier onlyExactFee() {
        require(msg.value == COMMIT_FEE, "Incorrect fee");
        _;
    }

    function commit(bytes32 h) external payable onlyExactFee {
        require(commits[h].timestamp == 0, "Hash already committed");
        commits[h] = CommitData(msg.sender, block.timestamp, false);
        emit Committed(h, msg.sender);
    }

    function reveal(address lost, address recovery, uint256 nonce) external {
        bytes32 h = keccak256(abi.encodePacked(lost, recovery, nonce));
        CommitData storage data = commits[h];

        require(data.timestamp > 0, "No such commit");
        require(block.timestamp >= data.timestamp + COMMIT_DELAY, "Too early to reveal");
        require(!data.revealed, "Already revealed");

        data.revealed = true;
        pendingRecoveries[lost] = PendingRecovery(recovery, block.timestamp);

        emit Revealed(lost, recovery);
    }

    function challenge(address lost) external {
        PendingRecovery storage rec = pendingRecoveries[lost];
        require(rec.recoveryAddress != address(0), "No pending recovery");

        require(block.timestamp < rec.revealedAt + CHALLENGE_PERIOD, "Challenge period over");

        delete pendingRecoveries[lost];

        emit Challenged(lost);
    }

    function claim(address lost) external {
        PendingRecovery storage rec = pendingRecoveries[lost];
        require(rec.recoveryAddress != address(0), "No pending recovery");

        require(block.timestamp >= rec.revealedAt + CHALLENGE_PERIOD, "Challenge period not over");
        require(msg.sender == rec.recoveryAddress, "Only recovery address can claim");

        // Assets would be reassigned here — e.g., token transfers if this was a token contract

        delete pendingRecoveries[lost];

        emit Claimed(lost, rec.recoveryAddress);
    }
}