import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletStatus } from "@/components/WalletStatus";
import { RecoveryPhases } from "@/components/RecoveryPhases";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { MainNavbar } from "@/components/MainNavbar";

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const [recoveryCount, setRecoveryCount] = useState(0);

  useEffect(() => {
    // Load recovery count from localStorage
    const count = localStorage.getItem('rescu3-recovery-count');
    if (count) setRecoveryCount(Number(count));
    // Listen for claim event (custom event dispatched after claim)
    const handler = () => {
      setRecoveryCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('rescu3-recovery-count', String(newCount));
        return newCount;
      });
    };
    window.addEventListener('rescu3-claim-success', handler);
    return () => window.removeEventListener('rescu3-claim-success', handler);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* <MainNavbar /> */}
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between p-6 border-b border-border/50"
        >
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-display font-black text-primary">
                RESCU3 DASHBOARD
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Manage your wallet recovery process with <span className="text-primary font-semibold">next-gen technology</span>
              </p>
            </div>
          </div>
          
          <ConnectButton />
        </motion.div>

        {!isConnected ? (
          /* Not Connected State */
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex flex-col items-center glass-card max-w-md mx-auto p-12 rounded-3xl border shadow-lg">
                <div className="text-6xl mb-6 animate-bounce">🔗</div>
                <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-8 font-body">
                  Please connect your wallet to access the recovery dashboard.
                </p>
                <ConnectButton />
              </div>
            </motion.div>
          </div>
        ) : (
          /* Connected State */
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Wallet Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <WalletStatus />
                <div className="mb-6">
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Trophy className="h-5 w-5 text-primary" />
                        Recovery Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">{recoveryCount}</div>
                      <div className="text-sm text-muted-foreground">Wallets Recovered</div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Right Column - Recovery Phases */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <RecoveryPhases />
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              <div className="glass-card p-4 rounded-xl border max-w-2xl mx-auto">
                <p className="font-body">
                  <span className="text-primary font-bold">Rescu3</span> is a decentralized wallet recovery protocol.{" "}
                  <span className="text-primary">Always verify contract addresses on Etherscan.</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}