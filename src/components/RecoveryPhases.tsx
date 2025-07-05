import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
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
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    lostWalletAddress: "",
    recoveryWalletAddress: "",
    nonce: ""
  });

  const [recoveryState, setRecoveryState] = useState<RecoveryState>({
    currentPhase: "commit",
    commitCompleted: false,
    revealCompleted: false,
    challengeActive: false,
    challengeTimeRemaining: 0,
    canClaim: false
  });

  const handleCommit = async () => {
    setIsLoading(true);
    try {
      // Simulate contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRecoveryState(prev => ({
        ...prev,
        commitCompleted: true,
        currentPhase: "reveal"
      }));

      toast({
        title: "Commit Successful",
        description: "Your recovery intent has been committed to the blockchain.",
      });
    } catch (error) {
      toast({
        title: "Commit Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReveal = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRecoveryState(prev => ({
        ...prev,
        revealCompleted: true,
        challengeActive: true,
        challengeTimeRemaining: 86400, // 24 hours in seconds
        currentPhase: "challenge"
      }));

      toast({
        title: "Reveal Successful",
        description: "Challenge period has started. 24 hours remaining.",
      });

      // Start countdown
      const interval = setInterval(() => {
        setRecoveryState(prev => {
          const newTime = prev.challengeTimeRemaining - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            return {
              ...prev,
              challengeActive: false,
              canClaim: true,
              currentPhase: "claim"
            };
          }
          return { ...prev, challengeTimeRemaining: newTime };
        });
      }, 1000);

    } catch (error) {
      toast({
        title: "Reveal Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChallenge = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRecoveryState({
        currentPhase: "commit",
        commitCompleted: false,
        revealCompleted: false,
        challengeActive: false,
        challengeTimeRemaining: 0,
        canClaim: false
      });

      toast({
        title: "Recovery Challenged",
        description: "The recovery has been cancelled by the original owner.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaim = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Recovery Complete! 🎉",
        description: "Wallet ownership has been successfully transferred.",
      });

      // Reset for demo
      setTimeout(() => {
        setRecoveryState({
          currentPhase: "commit",
          commitCompleted: false,
          revealCompleted: false,
          challengeActive: false,
          challengeTimeRemaining: 0,
          canClaim: false
        });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const getPhaseProgress = () => {
    const phases = ["commit", "reveal", "challenge", "claim"];
    const currentIndex = phases.indexOf(recoveryState.currentPhase);
    return ((currentIndex + 1) / phases.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Recovery Progress
          </CardTitle>
          <Progress value={getPhaseProgress()} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm">
            <span className={recoveryState.commitCompleted ? "text-green-400" : "text-muted-foreground"}>
              Commit
            </span>
            <span className={recoveryState.revealCompleted ? "text-green-400" : "text-muted-foreground"}>
              Reveal
            </span>
            <span className={recoveryState.challengeActive ? "text-yellow-400" : "text-muted-foreground"}>
              Challenge
            </span>
            <span className={recoveryState.canClaim ? "text-green-400" : "text-muted-foreground"}>
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
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Phase 1: Commit Recovery Intent
                  <Badge variant="secondary">Active</Badge>
                </CardTitle>
                <CardDescription>
                  Submit a hashed commitment of your recovery details to prevent front-running.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lostWallet">Lost Wallet Address</Label>
                    <Input
                      id="lostWallet"
                      placeholder="0x..."
                      value={formData.lostWalletAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, lostWalletAddress: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recoveryWallet">Recovery Wallet Address</Label>
                    <Input
                      id="recoveryWallet"
                      placeholder="0x..."
                      value={formData.recoveryWalletAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, recoveryWalletAddress: e.target.value }))}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCommit} 
                  disabled={isLoading || !formData.lostWalletAddress || !formData.recoveryWalletAddress}
                  className="w-full"
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
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Phase 2: Reveal Recovery Details
                  <Badge variant="secondary">Active</Badge>
                </CardTitle>
                <CardDescription>
                  Disclose the original addresses and nonce to validate your commitment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="revealLost">Lost Wallet Address</Label>
                    <Input
                      id="revealLost"
                      value={formData.lostWalletAddress}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revealRecovery">Recovery Address</Label>
                    <Input
                      id="revealRecovery"
                      value={formData.recoveryWalletAddress}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nonce">Nonce</Label>
                    <Input
                      id="nonce"
                      placeholder="Enter nonce"
                      value={formData.nonce}
                      onChange={(e) => setFormData(prev => ({ ...prev, nonce: e.target.value }))}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleReveal} 
                  disabled={isLoading || !formData.nonce}
                  className="w-full"
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
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Phase 3: Challenge Window
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
                    {formatTime(recoveryState.challengeTimeRemaining)}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Original wallet owner can challenge this recovery within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Challenge Period Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If you are the original owner of the lost wallet, you can cancel this recovery by signing a message.
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleChallenge}
                  disabled={isLoading}
                  className="w-full"
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
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Phase 4: Claim Ownership
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                    Ready
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Challenge period has passed. You can now claim ownership of the wallet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Eligible for Claim</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No challenges were submitted. You can now complete the recovery process.
                  </p>
                </div>
                <Button 
                  variant="hero" 
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