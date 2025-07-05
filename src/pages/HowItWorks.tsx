<<<<<<< HEAD
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Eye, 
  Clock, 
  Trophy,
  ArrowRight,
  Shield,
  Lock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    phase: "Phase 1",
    title: "Commit",
    icon: Send,
    duration: "Instant",
    description: "Submit a cryptographic commitment of your recovery details. This prevents front-running while keeping your information private.",
    details: [
      "Hash your lost wallet + recovery wallet + nonce",
      "Submit hash to smart contract with small fee",
      "Your actual addresses remain private",
      "Timestamp recorded for timing requirements"
    ],
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30"
  },
  {
    phase: "Phase 2", 
    title: "Reveal",
    icon: Eye,
    duration: "After 1 minute",
    description: "Disclose the original addresses and nonce to validate your commitment. The smart contract verifies your hash matches.",
    details: [
      "Wait for minimum commit delay (1 minute)",
      "Reveal original wallet addresses and nonce",
      "Smart contract validates hash matches commitment",
      "Recovery attempt becomes publicly visible"
    ],
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30"
  },
  {
    phase: "Phase 3",
    title: "Challenge Window", 
    icon: Clock,
    duration: "5 minutes",
    description: "Original wallet owner has time to challenge the recovery if unauthorized. This protects against malicious recovery attempts.",
    details: [
      "24-hour challenge period begins",
      "Original owner can cancel recovery",
      "Requires signature from lost wallet",
      "Recovery cancelled if challenged"
    ],
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-500/30"
  },
  {
    phase: "Phase 4",
    title: "Claim",
    icon: Trophy,
    duration: "After challenge period",
    description: "If no challenge occurs, claim ownership of the wallet. The recovery process completes and you regain access.",
    details: [
      "Challenge period expires without challenge",
      "Recovery address can claim ownership",
      "Smart contract transfers control",
      "Wallet recovery is complete"
    ],
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30"
  }
];

const securityFeatures = [
  {
    icon: Shield,
    title: "Cryptographic Security",
    description: "Uses SHA-256 hashing to protect your commitment from front-running attacks."
  },
  {
    icon: Lock,
    title: "Time Delays",
    description: "Built-in delays prevent rushed decisions and give legitimate owners time to respond."
  },
  {
    icon: CheckCircle,
    title: "Verification",
    description: "Smart contract automatically verifies all commitments and revelations are valid."
  },
  {
    icon: AlertTriangle,
    title: "Challenge System",
    description: "Original owners can always cancel unauthorized recovery attempts."
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-hero">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Layout>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              How Rescu3 Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our four-phase commit-reveal protocol ensures secure, decentralized wallet recovery 
              without compromising on safety or transparency.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className={`glass-card border-premium hover-lift shadow-elegant`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
                          <step.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {step.phase}
                          </Badge>
                          <CardTitle className="text-2xl font-display font-bold">
                            {step.title}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge variant="outline" className="px-4 py-2 font-medium">
                        {step.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Security First</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every aspect of our protocol is designed with security in mind, 
                protecting both legitimate users and original wallet owners.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="text-center p-6 glass-card border-premium hover-lift h-full">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-semibold mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <Card className="p-8 glass-card border-premium shadow-elegant">
              <h3 className="text-2xl font-display font-bold text-center mb-8">Recovery Timeline</h3>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="w-8 h-8" />
                  </div>
                  <div className="font-medium">Commit</div>
                  <div className="text-sm text-muted-foreground">Instant</div>
                </div>
                <ArrowRight className="text-muted-foreground rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="font-medium">Reveal</div>
                  <div className="text-sm text-muted-foreground">+1 minute</div>
                </div>
                <ArrowRight className="text-muted-foreground rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="font-medium">Challenge</div>
                  <div className="text-sm text-muted-foreground">5 minutes</div>
                </div>
                <ArrowRight className="text-muted-foreground rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="font-medium">Claim</div>
                  <div className="text-sm text-muted-foreground">Ready!</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center glass-card border-premium shadow-elegant rounded-2xl p-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Ready to Start Recovery?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our secure, transparent process makes wallet recovery simple and safe. 
              Start your recovery journey today.
            </p>
            <Button size="lg" className="group">
              Start Recovery Process
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </Layout>
=======
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Eye, 
  AlertTriangle, 
  Trophy, 
  Clock, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Lock,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const phases = [
    {
      phase: "01",
      title: "Commit",
      icon: Send,
      description: "Submit your hashed recovery intent to the blockchain",
      details: [
        "Generate a secure hash of your recovery details",
        "Pay a small fee (0.01 ETH) to prevent spam",
        "Your commitment is recorded on-chain",
        "No sensitive information is revealed yet"
      ],
      color: "from-blue-500 to-cyan-500",
      time: "Instant"
    },
    {
      phase: "02", 
      title: "Reveal",
      icon: Eye,
      description: "Disclose your addresses after the time delay",
      details: [
        "Wait for the minimum delay period (1 minute)",
        "Reveal the original wallet and recovery addresses",
        "Provide the nonce used in the commitment",
        "Smart contract validates your commitment"
      ],
      color: "from-purple-500 to-pink-500",
      time: "After 1 min"
    },
    {
      phase: "03",
      title: "Challenge",
      icon: AlertTriangle,
      description: "Optional dispute window for the original owner",
      details: [
        "5-minute window for challenges",
        "Original owner can cancel the recovery",
        "Requires signature from the lost wallet",
        "Protects against unauthorized recovery"
      ],
      color: "from-orange-500 to-red-500",
      time: "5 min window"
    },
    {
      phase: "04",
      title: "Claim",
      icon: Trophy,
      description: "Execute the recovery and transfer ownership",
      details: [
        "Challenge period must be completed",
        "Only the recovery address can claim",
        "Ownership is transferred on-chain",
        "Recovery process is complete"
      ],
      color: "from-green-500 to-emerald-500",
      time: "After challenge"
    }
  ];

  const benefits = [
    {
      icon: Lock,
      title: "No Seed Phrases Required",
      description: "Revolutionary approach that doesn't rely on traditional backup methods"
    },
    {
      icon: Shield,
      title: "Decentralized Security",
      description: "No central authority or trusted third parties involved"
    },
    {
      icon: Clock,
      title: "Time-Locked Safety",
      description: "Built-in delays prevent unauthorized access attempts"
    },
    {
      icon: Users,
      title: "Community Verified",
      description: "Open-source protocol audited by security experts"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            Secure Recovery Protocol
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">Rescu3</span> Works
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our four-phase commit-reveal protocol ensures maximum security while maintaining 
            simplicity. Here's how we revolutionize wallet recovery.
          </p>
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="relative"
                >
                  <Card className="glass-card h-full hover:shadow-xl transition-spring group cursor-pointer hover:scale-[1.02]">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${phase.color} p-4 mb-4 group-hover:scale-110 transition-spring`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-muted-foreground/30 mb-2">
                        {phase.phase}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                        {phase.title}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit mx-auto">
                        {phase.time}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center mb-4">
                        {phase.description}
                      </p>
                      <ul className="space-y-2">
                        {phase.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why This <span className="bg-gradient-primary bg-clip-text text-transparent">Approach</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our protocol combines the best of cryptographic security with user-friendly design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="glass-card p-8 rounded-2xl hover:shadow-xl transition-spring group cursor-pointer hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-light text-primary group-hover:scale-110 transition-spring">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Secure Your Wallet?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Rescu3 for their wallet security. 
              Start your recovery setup today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="group">
                  <Shield className="mr-2 h-5 w-5" />
                  Start Recovery Setup
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="xl">
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
>>>>>>> f1fc7729fd0fb51c08e86acaed7ca1aaf96bb792
    </div>
  );
}