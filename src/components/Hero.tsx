import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Shield, Zap, Users, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  const stats = [
    { label: "Wallets Protected", value: "10K+", icon: Shield },
    { label: "Recovery Success", value: "99.9%", icon: CheckCircle },
    { label: "Active Users", value: "5K+", icon: Users },
    { label: "Response Time", value: "<1min", icon: Zap },
  ];

  const features = [
    {
      icon: "🔐",
      title: "No Seed Phrases",
      description: "Revolutionary recovery without traditional backup methods",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⛓️",
      title: "Fully Decentralized",
      description: "Trustless smart contract protocol on Ethereum",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🛡️",
      title: "Military-Grade Security",
      description: "Multi-phase commit-reveal process with guardian network",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Quick recovery process with minimal waiting time",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🌍",
      title: "Global Access",
      description: "Available worldwide, 24/7 recovery assistance",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: "💎",
      title: "Zero Fees",
      description: "Only pay minimal gas fees, no hidden charges",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 lg:pt-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 mesh-bg opacity-40" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-success/5 rounded-full blur-3xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-warning/5 rounded-full blur-2xl"
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12 lg:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-6xl mx-auto mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-6 lg:mb-8"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Next-Gen Wallet Recovery Protocol
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 lg:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Never Lose
              </span>
              <br />
              <span className="text-foreground">Your Wallet Again</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              Rescu3 revolutionizes Web3 security with our decentralized wallet recovery protocol. 
              <span className="text-primary font-medium"> No seed phrases, no central authority, just pure innovation.</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 lg:mb-16 px-4"
          >
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                <Wallet className="mr-2 h-5 w-5" />
                Start Recovery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="w-full sm:w-auto">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                      className="w-full"
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button variant="glass" size="xl" onClick={openConnectModal} className="w-full sm:w-auto">
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button variant="destructive" size="xl" onClick={openChainModal} className="w-full sm:w-auto">
                              Wrong Network
                            </Button>
                          );
                        }

                        return (
                          <Button variant="glass" size="xl" onClick={openAccountModal} className="w-full sm:w-auto">
                            <span className="truncate">
                              {account.displayName}
                              {account.displayBalance ? ` (${account.displayBalance})` : ''}
                            </span>
                          </Button>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-4xl mx-auto px-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-center p-4 rounded-xl glass-card hover:scale-105 transition-spring"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary-light text-primary mb-2 lg:mb-3">
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-7xl mx-auto mb-16 lg:mb-20 px-4"
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Rescu3</span>?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of wallet security with our cutting-edge features designed for the modern Web3 user.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                className="glass-card p-6 lg:p-8 rounded-2xl hover:shadow-xl transition-spring group cursor-pointer hover:scale-[1.02]"
              >
                <div className="text-3xl lg:text-4xl mb-4 group-hover:scale-110 transition-spring">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg lg:text-xl mb-3 text-foreground group-hover:text-primary transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="max-w-6xl mx-auto text-center px-4"
        >
          <div className="glass-card p-8 lg:p-12 rounded-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Recovery Made <span className="bg-gradient-primary bg-clip-text text-transparent">Simple</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-3xl mx-auto">
              Our four-phase recovery process ensures maximum security while maintaining simplicity. 
              Learn how Rescu3 can protect your digital assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="group w-full sm:w-auto">
                  Learn How It Works
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="success" size="lg" className="w-full sm:w-auto">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}