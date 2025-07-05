import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { sepolia } from "wagmi/chains";
import { parseEther } from "viem";
import { CONTRACT_CONFIG, COMMIT_FEE } from "@/config/contract";
import { generateCommitHash, generateNonce, formatTimeRemaining } from "@/utils/contract";
import { 
  Clock, 
  Shield, 
  CheckCircle2, 
  Send, 
  Eye, 
  AlertTriangle, 
  Trophy,
  Loader2
} from "lucide-react";

type Phase = "commit" | "reveal" | "challenge" | "claim";

interface RecoveryState {
  currentPhase: Phase;
  commitCompleted: boolean;
  revealCompleted: boolean;
  challengeActive: boolean;
  challengeTimeRemaining: number;
  canClaim: boolean;
}

export function RecoveryPhases() {
  const { toast } = useToast();
  const { address } = useAccount();
  
  // Load form data from localStorage on component mount
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('rescu3-form-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved form data:', e);
      }
    }
    return {
      lostWalletAddress: "",
      recoveryWalletAddress: "",
      nonce: ""
    };
  });
  
  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('rescu3-form-data', JSON.stringify(formData));
  }, [formData]);
  
  const [commitHash, setCommitHash] = useState<string>("");
  const [challengeTimeRemaining, setChallengeTimeRemaining] = useState(0);

  // Contract write functions
  const { 
    writeContract: commitWrite, 
    isPending: isCommitPending,
    data: commitTxHash 
  } = useWriteContract();

  const { 
    writeContract: revealWrite, 
    isPending: isRevealPending,
    data: revealTxHash 
  } = useWriteContract();

  const { 
    writeContract: challengeWrite, 
    isPending: isChallengePending 
  } = useWriteContract();

  const { 
    writeContract: claimWrite, 
    isPending: isClaimPending 
  } = useWriteContract();

  // Wait for transaction confirmations
  const { isLoading: isCommitConfirming } = useWaitForTransactionReceipt({
    hash: commitTxHash,
  });

  const { isLoading: isRevealConfirming } = useWaitForTransactionReceipt({
    hash: revealTxHash,
  });

  // Read contract state
  const { data: pendingRecovery, refetch: refetchPendingRecovery } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'pendingRecoveries',
    args: [formData.lostWalletAddress as `0x${string}`],
    query: {
      enabled: !!formData.lostWalletAddress && formData.lostWalletAddress.length === 42,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  const { data: commitData, refetch: refetchCommitData } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'commits',
    args: [commitHash as `0x${string}`],
    query: {
      enabled: !!commitHash,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  // Determine current phase based on contract state
  const determineCurrentPhase = useCallback((): Phase => {
    if (!pendingRecovery || pendingRecovery[0] === '0x0000000000000000000000000000000000000000') {
      if (commitData && commitData[1] > 0 && !commitData[2]) {
        return "reveal";
      }
      return "commit";
    }
    
    const revealedAt = Number(pendingRecovery[1]);
    const now = Math.floor(Date.now() / 1000);
    
    if (now < revealedAt + 300) { // 5 minutes challenge period
      return "challenge";
    }
    
    return "claim";
  }, [pendingRecovery, commitData]);

  const [recoveryState, setRecoveryState] = useState<RecoveryState>({
    currentPhase: "commit",
    commitCompleted: false,
    revealCompleted: false,
    challengeActive: false,
    challengeTimeRemaining: 0,
    canClaim: false
  });

  // Update recovery state based on contract data
  useEffect(() => {
    const currentPhase = determineCurrentPhase();
    const commitCompleted = !!(commitData && commitData[1] > 0);
    const revealCompleted = !!(pendingRecovery && pendingRecovery[0] !== '0x0000000000000000000000000000000000000000');
    
    let challengeTimeRemaining = 0;
    let challengeActive = false;
    let canClaim = false;

    if (revealCompleted && pendingRecovery) {
      const revealedAt = Number(pendingRecovery[1]);
      const now = Math.floor(Date.now() / 1000);
      const challengeEndTime = revealedAt + 300; // 5 minutes
      
      if (now < challengeEndTime) {
        challengeActive = true;
        challengeTimeRemaining = challengeEndTime - now;
      } else {
        canClaim = true;
      }
    }

    setRecoveryState({
      currentPhase,
      commitCompleted,
      revealCompleted,
      challengeActive,
      challengeTimeRemaining,
      canClaim
    });

    setChallengeTimeRemaining(challengeTimeRemaining);
  }, [determineCurrentPhase, commitData, pendingRecovery]);

  // Challenge countdown timer
  useEffect(() => {
    if (challengeTimeRemaining > 0) {
      const timer = setInterval(() => {
        setChallengeTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Refetch contract data when timer hits 0
            refetchCommitData();
            refetchPendingRecovery();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [challengeTimeRemaining, refetchCommitData, refetchPendingRecovery]);

  const handleCommit = async () => {
    if (!formData.lostWalletAddress || !formData.recoveryWalletAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in both wallet addresses.",
        variant: "destructive"
      });
      return;
    }

    // Validate addresses
    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.lostWalletAddress)) {
      toast({
        title: "Invalid Address",
        description: "Lost wallet address is not valid.",
        variant: "destructive"
      });
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.recoveryWalletAddress)) {
      toast({
        title: "Invalid Address", 
        description: "Recovery wallet address is not valid.",
        variant: "destructive"
      });
      return;
    }

    if (formData.lostWalletAddress.toLowerCase() === formData.recoveryWalletAddress.toLowerCase()) {
      toast({
        title: "Addresses Cannot Be The Same",
        description: "Lost wallet and recovery wallet must be different.",
        variant: "destructive"
      });
      return;
    }

    try {
      const nonce = generateNonce();
      const hash = generateCommitHash(
        formData.lostWalletAddress,
        formData.recoveryWalletAddress,
        nonce
      );

      setFormData(prev => ({ ...prev, nonce }));
      setCommitHash(hash);

      await commitWrite({
        ...CONTRACT_CONFIG,
        functionName: 'commit',
        args: [hash],
        value: parseEther(COMMIT_FEE),
        account: address!,
        chain: sepolia,
      });

      toast({
        title: "Commit Transaction Sent",
        description: "Please wait for confirmation...",
      });

      // Refetch data after successful commit
      setTimeout(() => {
        refetchCommitData();
        refetchPendingRecovery();
      }, 2000);

    } catch (error) {
      console.error("Commit error:", error);
      toast({
        title: "Commit Failed",
        description: "Transaction was rejected or failed.",
        variant: "destructive"
      });
    }
  };

  const handleReveal = async () => {
    if (!formData.nonce) {
      toast({
        title: "Missing Nonce",
        description: "Please enter the nonce from your commit.",
        variant: "destructive"
      });
      return;
    }

    try {
      await revealWrite({
        ...CONTRACT_CONFIG,
        functionName: 'reveal',
        args: [
          formData.lostWalletAddress as `0x${string}`,
          formData.recoveryWalletAddress as `0x${string}`,
          BigInt(formData.nonce)
        ],
        account: address!,
        chain: sepolia,
      });

      toast({
        title: "Reveal Transaction Sent",
        description: "Please wait for confirmation...",
      });

      // Refetch data after successful reveal
      setTimeout(() => {
        refetchCommitData();
        refetchPendingRecovery();
      }, 2000);

    } catch (error) {
      console.error("Reveal error:", error);
      toast({
        title: "Reveal Failed",
        description: "Transaction was rejected or failed.",
        variant: "destructive"
      });
    }
  };

  const handleChallenge = async () => {
    try {
      await challengeWrite({
        ...CONTRACT_CONFIG,
        functionName: 'challenge',
        args: [formData.lostWalletAddress as `0x${string}`],
        account: address!,
        chain: sepolia,
      });

      toast({
        title: "Challenge Transaction Sent",
        description: "Cancelling the recovery...",
      });

      // Refetch data after successful challenge
      setTimeout(() => {
        refetchCommitData();
        refetchPendingRecovery();
      }, 2000);

    } catch (error) {
      console.error("Challenge error:", error);
      toast({
        title: "Challenge Failed",
        description: "Transaction was rejected or failed.",
        variant: "destructive"
      });
    }
  };

  const handleClaim = async () => {
    try {
      await claimWrite({
        ...CONTRACT_CONFIG,
        functionName: 'claim',
        args: [formData.lostWalletAddress as `0x${string}`],
        account: address!,
        chain: sepolia,
      });

      toast({
        title: (
          <span>
            <span role="img" aria-label="Party Popper" className="animate-bounce">🎉</span> Congratulations!
          </span>
        ),
        description: "Ownership has been successfully claimed. Wallet recovery is complete.",
        duration: 7000,
      });
      // Dispatch event for dashboard stats
      window.dispatchEvent(new Event('rescu3-claim-success'));
      // Clear form and localStorage after claim
      setFormData({
        lostWalletAddress: "",
        recoveryWalletAddress: "",
        nonce: ""
      });
      setCommitHash("");
      localStorage.removeItem('rescu3-form-data');

    } catch (error) {
      console.error("Claim error:", error);
      toast({
        title: "Claim Failed",
        description: "Transaction was rejected or failed.",
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => formatTimeRemaining(seconds);

  const getPhaseProgress = () => {
    const phases = ["commit", "reveal", "challenge", "claim"];
    const currentIndex = phases.indexOf(recoveryState.currentPhase);
    return ((currentIndex + 1) / phases.length) * 100;
  };

  const isLoading = isCommitPending || isRevealPending || isChallengePending || isClaimPending || 
                   isCommitConfirming || isRevealConfirming;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Recovery Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={getPhaseProgress()} className="w-full mb-4" />
          <div className="flex justify-between text-sm">
            <span className={recoveryState.commitCompleted ? "text-primary font-medium" : "text-muted-foreground"}>
              Commit
            </span>
            <span className={recoveryState.revealCompleted ? "text-primary font-medium" : "text-muted-foreground"}>
              Reveal
            </span>
            <span className={recoveryState.challengeActive ? "text-orange-500 font-medium" : "text-muted-foreground"}>
              Challenge
            </span>
            <span className={recoveryState.canClaim ? "text-primary font-medium" : "text-muted-foreground"}>
              Claim
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Phase 1: Commit */}
      <AnimatePresence mode="wait">
        {recoveryState.currentPhase === "commit" && (
          <motion.div
            key="commit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Send className="h-5 w-5" />
                  Phase 1: Commit Recovery Intent
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                </CardTitle>
                <CardDescription>
                  Submit a hashed commitment of your recovery details to prevent front-running.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lostWallet" className="text-sm font-medium">Lost Wallet Address</Label>
                    <Input
                      id="lostWallet"
                      placeholder="0x..."
                      value={formData.lostWalletAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, lostWalletAddress: e.target.value }))}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recoveryWallet" className="text-sm font-medium">Recovery Wallet Address</Label>
                    <Input
                      id="recoveryWallet"
                      placeholder="0x..."
                      value={formData.recoveryWalletAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, recoveryWalletAddress: e.target.value }))}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCommit} 
                  disabled={isLoading || !formData.lostWalletAddress || !formData.recoveryWalletAddress}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Committing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Start Commit
                    </>
                  )}
                </Button>
                
                {/* Reset button */}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFormData({
                      lostWalletAddress: "",
                      recoveryWalletAddress: "",
                      nonce: ""
                    });
                    setCommitHash("");
                    localStorage.removeItem('rescu3-form-data');
                    toast({
                      title: "Form Reset",
                      description: "All data has been cleared. You can start fresh.",
                    });
                  }}
                  className="w-full"
                  size="sm"
                >
                  Reset Form
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Phase 2: Reveal */}
        {recoveryState.currentPhase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5" />
                  Phase 2: Reveal Recovery Details
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                </CardTitle>
                <CardDescription>
                  Disclose the original addresses and nonce to validate your commitment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="revealLost" className="text-sm font-medium">Lost Wallet Address</Label>
                    <Input
                      id="revealLost"
                      value={formData.lostWalletAddress}
                      readOnly
                      className="bg-muted font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revealRecovery" className="text-sm font-medium">Recovery Address</Label>
                    <Input
                      id="revealRecovery"
                      value={formData.recoveryWalletAddress}
                      readOnly
                      className="bg-muted font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nonce" className="text-sm font-medium">Nonce (Auto-generated)</Label>
                    <Input
                      id="nonce"
                      value={formData.nonce}
                      readOnly
                      className="bg-muted font-mono text-sm"
                      placeholder="Nonce will appear here after commit"
                    />
                    <p className="text-xs text-muted-foreground">
                      This nonce was automatically generated during your commit. If this field is empty, please refresh the page or start a new recovery process.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleReveal} 
                  disabled={isLoading || !formData.nonce}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Revealing...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Reveal
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Phase 3: Challenge */}
        {recoveryState.currentPhase === "challenge" && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Phase 3: Challenge Window
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                    {formatTime(challengeTimeRemaining)}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Original wallet owner can challenge this recovery within the time limit.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Challenge Period Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If you are the original owner of the lost wallet, you can cancel this recovery.
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleChallenge}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Challenging...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Challenge Recovery (Original Owner)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Phase 4: Claim */}
        {recoveryState.currentPhase === "claim" && (
          <motion.div
            key="claim"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5" />
                  Phase 4: Claim Ownership
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Ready
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Challenge period has passed. You can now claim ownership of the wallet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Eligible for Claim</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No challenges were submitted. You can now complete the recovery process.
                  </p>
                </div>
                <Button 
                  onClick={handleClaim}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      <Trophy className="mr-2 h-4 w-4" />
                      Claim Ownership
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}