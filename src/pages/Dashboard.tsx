import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletStatus } from "@/components/WalletStatus";
import { RecoveryPhases } from "@/components/RecoveryPhases";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Zap, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { isConnected } = useAccount();

  const quickStats = [
    { label: "Active Recoveries", value: "12", icon: Shield, color: "text-blue-500" },
    { label: "Success Rate", value: "99.9%", icon: TrendingUp, color: "text-green-500" },
    { label: "Avg. Time", value: "6min", icon: Zap, color: "text-orange-500" },
    { label: "Community", value: "5.2K", icon: Users, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-spring w-fit">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Recovery Dashboard
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Manage your wallet recovery process securely
              </p>
            </div>
          </div>
          
          <div className="scale-105 lg:scale-110">
            <ConnectButton />
          </div>
        </motion.div>

        {!isConnected ? (
          /* Not Connected State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12 lg:py-20"
          >
            <div className="glass-card max-w-lg mx-auto p-8 lg:p-12 rounded-2xl">
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-gradient-primary p-4 lg:p-5 mb-6">
                <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h2 className="text-xl lg:text-2xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm lg:text-base">
                Connect your wallet to access the recovery dashboard and start securing your digital assets.
              </p>
              <ConnectButton />
              
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">New to Rescu3?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/how-it-works">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Learn How It Works
                    </Button>
                  </Link>
                  <Link to="/faq">
                    <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Connected State */
          <>
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="glass-card hover:shadow-lg transition-spring hover:scale-[1.02]">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-lg lg:text-2xl font-bold">{stat.value}</p>
                        </div>
                        <Icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Wallet Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="xl:col-span-1 space-y-6"
              >
                <WalletStatus />
                
                {/* Quick Actions */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                      <Zap className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-sm lg:text-base" asChild>
                      <Link to="/how-it-works">
                        <Shield className="h-4 w-4 mr-2" />
                        Learn Recovery Process
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm lg:text-base" asChild>
                      <Link to="/faq">
                        <Users className="h-4 w-4 mr-2" />
                        Get Help & Support
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Column - Recovery Phases */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="xl:col-span-2"
              >
                <RecoveryPhases />
              </motion.div>
            </div>
          </>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-6 lg:p-8 rounded-2xl max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              Rescu3 is a decentralized wallet recovery protocol built on Ethereum.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs text-muted-foreground">
              <span>✅ Open Source</span>
              <span>✅ Audited Smart Contracts</span>
              <span>✅ No Central Authority</span>
              <span>✅ Community Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}