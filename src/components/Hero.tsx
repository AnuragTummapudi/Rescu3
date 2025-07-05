import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import heroWallet from "@/assets/hero-wallet.jpg";

export function Hero() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Professional Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-glow/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent/15 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-primary-glow/10 rounded-full animate-pulse" style={{ animationDelay: '5s' }} />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.01]" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-6xl mx-auto mb-32"
        >
          {/* Floating Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12 relative"
          >
            <div className="relative inline-block">
              <img 
                src={heroWallet} 
                alt="Rescu3 Wallet Recovery" 
                className="w-96 h-56 mx-auto rounded-2xl shadow-lg border border-border glow-primary"
              />
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/10 rounded-full blur-sm animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/15 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Rescu3
              </span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground/80 leading-tight">
              Decentralized Wallet Recovery
            </h2>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Recover your Ethereum wallet without seed phrases using our secure,{" "}
            <span className="text-primary-glow font-medium">decentralized commit-reveal protocol</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group">
                <Wallet className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="scale-110">
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
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button variant="connect" size="xl" onClick={openConnectModal}>
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button variant="destructive" size="xl" onClick={openChainModal}>
                              Wrong Network
                            </Button>
                          );
                        }

                        return (
                          <div className="flex gap-3">
                            <Button variant="outline" size="xl" onClick={openChainModal}>
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 8,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 20, height: 20 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </Button>

                            <Button variant="glass" size="xl" onClick={openAccountModal}>
                              {account.displayName}
                              {account.displayBalance ? ` (${account.displayBalance})` : ''}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </motion.div>

          {/* Enhanced Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
              {[
                { 
                  title: "No Seed Phrases", 
                  desc: "Revolutionary recovery without traditional backup methods",
                  icon: "🔐"
                },
                { 
                  title: "Fully Decentralized", 
                  desc: "Trustless smart contract protocol on Ethereum",
                  icon: "⛓️"
                },
                { 
                  title: "Military-Grade Security", 
                  desc: "Multi-phase commit-reveal process with guardian network",
                  icon: "🛡️"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className="glass-card p-8 rounded-2xl hover:bg-card/80 hover:shadow-lg transition-smooth group cursor-pointer border border-border"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-smooth">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 bg-gradient-primary bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Problem Statement Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="glass-card p-12 rounded-2xl text-center border border-border">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-destructive">$500M+</span> Lost Forever
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              Every year, millions of dollars in crypto assets are permanently lost due to forgotten private keys 
              and lost seed phrases. Traditional Web3 has no recovery mechanism.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="glass-card p-6 rounded-xl bg-destructive/5 border border-destructive/20">
                <h3 className="text-xl font-semibold mb-3 text-destructive">The Problem</h3>
                <p className="text-muted-foreground">
                  Lost private key = Lost wallet forever. No recovery options exist in traditional Web3.
                </p>
              </div>
              <div className="glass-card p-6 rounded-xl bg-primary/5 border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-primary">Our Solution</h3>
                <p className="text-muted-foreground">
                  Reactive recovery protocol that works after key loss, no prior setup required.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="bg-gradient-primary bg-clip-text text-transparent">Rescu3</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our secure commit-reveal protocol ensures only legitimate owners can recover their wallets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Commit", desc: "Submit hashed recovery intent on-chain" },
              { step: "02", title: "Reveal", desc: "Disclose addresses after time delay" },
              { step: "03", title: "Challenge", desc: "Optional window for dispute by real owner" },
              { step: "04", title: "Claim", desc: "Execute recovery and transfer control" }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2 + index * 0.2 }}
                className="glass-card p-6 rounded-xl relative group hover:bg-card/80 hover:shadow-md transition-smooth border border-border"
              >
                <div className="text-6xl font-bold text-primary/20 absolute top-4 right-4 group-hover:text-primary/30 transition-smooth">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{phase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-primary" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-center max-w-4xl mx-auto"
        >
            <div className="glass-card p-12 rounded-2xl border border-border">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Secure Your Wallet?
              </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the future of Web3 security. Never lose access to your wallet again.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group">
                <Wallet className="mr-2 h-6 w-6" />
                Launch App
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}