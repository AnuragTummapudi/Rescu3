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
import { MainNavbar } from "@/components/MainNavbar";

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
      <MainNavbar />
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Layout showSidebar={false}>
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
    </div>
  );
}