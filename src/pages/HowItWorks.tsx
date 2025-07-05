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
    </div>
  );
}