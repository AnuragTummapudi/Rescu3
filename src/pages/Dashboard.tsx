import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletStatus } from "@/components/WalletStatus";
import { RecoveryPhases } from "@/components/RecoveryPhases";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Rescu3 Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your wallet recovery process
              </p>
            </div>
          </div>
          
          <div className="scale-110">
            <ConnectButton />
          </div>
        </motion.div>

        {!isConnected ? (
          /* Not Connected State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="glass-card max-w-md mx-auto p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to access the recovery dashboard.
              </p>
              <ConnectButton />
            </div>
          </motion.div>
        ) : (
          /* Connected State */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Wallet Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <WalletStatus />
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
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          <p>
            Rescu3 is a decentralized wallet recovery protocol. Always verify contract addresses on Etherscan.
          </p>
        </motion.div>
      </div>
    </div>
  );
}