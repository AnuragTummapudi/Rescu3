import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Target, 
  Users, 
  Award,
  ArrowRight,
  Github,
  Twitter,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { MainNavbar } from "@/components/MainNavbar";

const stats = [
  { label: "Built at ETHIndia 2024", value: "Hackathon Project", icon: Shield },
  { label: "Open Source", value: "MIT License", icon: Github },
  { label: "100% Student Team", value: "4 Members", icon: Users },
  { label: "Deployed on Sepolia", value: "Live Demo", icon: Globe }
];

const team = [
  {
    name: "Anurag Tummapudi",
    role: "Full Stack & Smart Contracts",
    bio: "Web3 developer, Solidity & React enthusiast.",
    avatar: "AT"
  },
  {
    name: "Shazia Mohommed",
    role: "Frontend & UI/UX",
    bio: "Passionate about user experience and clean design.",
    avatar: "SM"
  },
  {
    name: "Saran Gaddanti",
    role: "Backend & Integration",
    bio: "Loves building scalable dApps and APIs.",
    avatar: "SG"
  },
  {
    name: "Prem Jangam",
    role: "Testing & Documentation",
    bio: "Ensures quality and clarity in every release.",
    avatar: "PJ"
  }
];

export default function About() {
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
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              About Rescu3
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the future of decentralized wallet recovery. Our mission is to make 
              cryptocurrency accessible and secure for everyone, without compromising on decentralization.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center p-6 glass-card border-premium hover-lift">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Cryptocurrency adoption is hindered by the fear of losing access to digital assets. 
                Traditional recovery methods compromise security or require trusted third parties.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Rescu3 solves this with a fully decentralized, cryptographically secure protocol 
                that puts users back in control of their digital assets without sacrificing security.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2">
                  Decentralized
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  Open Source
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  Audited
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 glass-card border-premium">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Decentralized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">0</div>
                    <div className="text-sm text-muted-foreground">Trusted Parties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">24h</div>
                    <div className="text-sm text-muted-foreground">Recovery Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">$0</div>
                    <div className="text-sm text-muted-foreground">Hidden Fees</div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experts in blockchain, cryptography, and decentralized systems working 
                to make wallet recovery safe and accessible.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="text-center p-6 glass-card border-premium hover-lift">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
                      {member.avatar}
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center glass-card border-premium shadow-elegant rounded-2xl p-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Join the Revolution</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Be part of the movement towards truly decentralized financial freedom. 
              Start recovering wallets securely today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    </div>
  );
}