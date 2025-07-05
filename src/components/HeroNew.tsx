import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wallet, Shield, Zap, Users, CheckCircle, Star, Quote, Clock, LayoutDashboard, Cog, Info, HelpCircle, Github } from "lucide-react";
import { Link } from "react-router-dom";
import heroWallet from "@/assets/hero-wallet.jpg";

export function HeroNew() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-6"
        >
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              Rescu3
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/how-it-works" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Cog className="h-4 w-4" />
              <span>How it Works</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <ConnectButton />
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto pt-20 pb-32"
        >
          <Badge variant="secondary" className="mb-8">
            🚀 Revolutionary Wallet Recovery System
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Recover
            </span>{" "}
            <span className="text-foreground">Your Wallet</span>
            <br />
            <span className="text-foreground">Without</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Seed Phrases
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            The first decentralized wallet recovery protocol that lets you regain access to lost Ethereum wallets 
            using our secure commit-reveal mechanism. No seed phrases required.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="group">
                <Wallet className="mr-2 h-5 w-5" />
                Start Recovery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32"
        >
          {[
            {
              icon: Shield,
              title: "Commit-Reveal Protocol",
              description: "Secure two-phase recovery system that prevents front-running attacks"
            },
            {
              icon: Zap,
              title: "Fast Recovery",
              description: "Complete wallet recovery in as little as 25 hours"
            },
            {
              icon: Users,
              title: "Decentralized",
              description: "Built on Ethereum with no central authority"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Card className="glass-card hover-lift border-premium text-center h-full">
                <CardContent className="p-8">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-7xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Platform <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features that make Rescu3 the most secure and user-friendly decentralized wallet recovery solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Commit-Reveal Protocol",
                description: "Secure two-phase recovery system that prevents front-running attacks while maintaining privacy",
                color: "bg-blue-500/10 text-blue-600"
              },
              {
                icon: Clock,
                title: "Challenge Period",
                description: "Built-in 24-hour challenge window allows original wallet owners to cancel unauthorized recovery attempts",
                color: "bg-orange-500/10 text-orange-600"
              },
              {
                icon: CheckCircle,
                title: "Non-Custodial",
                description: "Your wallet remains under your control. We never hold your private keys or have access to your funds",
                color: "bg-green-500/10 text-green-600"
              },
              {
                icon: Star,
                title: "Transparent Process",
                description: "All recovery attempts are publicly visible on-chain, ensuring full transparency and accountability",
                color: "bg-purple-500/10 text-purple-600"
              },
              {
                icon: Zap,
                title: "Fast Recovery",
                description: "Complete wallet recovery in as little as 25 hours with our streamlined protocol",
                color: "bg-yellow-500/10 text-yellow-600"
              },
              {
                icon: Shield,
                title: "Cryptographic Security",
                description: "Uses industry-standard cryptographic hashing to secure your recovery commitment",
                color: "bg-red-500/10 text-red-600"
              },
              {
                icon: Users,
                title: "Decentralized",
                description: "Built on Ethereum - no central authority or single point of failure",
                color: "bg-indigo-500/10 text-indigo-600"
              },
              {
                icon: CheckCircle,
                title: "Easy to Use",
                description: "Simple web interface makes wallet recovery accessible to everyone, no technical expertise required",
                color: "bg-pink-500/10 text-pink-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <Card className="glass-card border-premium hover-lift h-full group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problem Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="bg-gradient-primary bg-clip-text text-transparent">Problem</span> We Solve
          </h2>
          <p className="text-xl text-muted-foreground mb-12">Critical issues facing cryptocurrency users today</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: "$500M+", label: "Lost Forever", desc: "Crypto assets lost due to forgotten keys annually" },
              { value: "20%", label: "Lost Access", desc: "Of all Bitcoin is estimated to be lost forever" },
              { value: "0", label: "Recovery Options", desc: "Traditional Web3 offers no wallet recovery methods" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <Card className="glass-card border-premium hover-lift h-full">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-destructive mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground mb-3">{stat.label}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{stat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="bg-gradient-primary bg-clip-text text-transparent">Rescu3</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our secure four-phase recovery process ensures only legitimate owners can recover their wallets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                step: "01", 
                title: "Commit", 
                description: "Submit encrypted recovery intent to prevent front-running" 
              },
              { 
                step: "02", 
                title: "Reveal", 
                description: "Disclose wallet addresses after secure time delay" 
              },
              { 
                step: "03", 
                title: "Challenge", 
                description: "24-hour window for legitimate owner to dispute" 
              },
              { 
                step: "04", 
                title: "Claim", 
                description: "Complete recovery and transfer wallet control" 
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                className="relative"
              >
                <Card className="glass-card border-premium hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{phase.step}</div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">{phase.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{phase.description}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-primary rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}