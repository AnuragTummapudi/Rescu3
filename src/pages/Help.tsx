import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  HelpCircle,
  Shield,
  Clock,
  AlertTriangle,
  MessageCircle,
  Mail,
  Book
} from "lucide-react";
import { motion } from "framer-motion";
import { MainNavbar } from "@/components/MainNavbar";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Rescu3 and how does it work?",
        answer: "Rescu3 is a decentralized wallet recovery protocol that uses a commit-reveal scheme to help you regain access to your Ethereum wallet without compromising security. The process involves four phases: Commit, Reveal, Challenge, and Claim."
      },
      {
        question: "Do I need technical knowledge to use Rescu3?", 
        answer: "No! Our user interface is designed to be simple and intuitive. You just need to provide your lost wallet address and recovery wallet address. The complex cryptographic operations happen automatically."
      },
      {
        question: "How much does wallet recovery cost?",
        answer: "There's a small commit fee of 0.01 ETH to prevent spam and cover gas costs. This fee is refunded if your recovery is successful. No hidden fees or subscription costs."
      }
    ]
  },
  {
    category: "Security",
    questions: [
      {
        question: "Is my recovery attempt private?",
        answer: "Initially yes. During the commit phase, your wallet addresses are hashed and remain private. They only become public during the reveal phase, which is necessary for the recovery process to work."
      },
      {
        question: "What prevents malicious recovery attempts?",
        answer: "Multiple security measures: the commit-reveal scheme prevents front-running, the challenge period allows original owners to cancel unauthorized attempts, and cryptographic verification ensures all data is valid."
      },
      {
        question: "Can someone steal my wallet using this protocol?",
        answer: "No. The original wallet owner always has the ability to challenge and cancel any recovery attempt during the 24-hour challenge period by signing a message with their original wallet."
      }
    ]
  },
  {
    category: "Process",
    questions: [
      {
        question: "How long does the recovery process take?",
        answer: "The minimum time is about 25 hours: 1 minute commit delay + 24 hour challenge period. If challenged, the process is cancelled and you need to start over."
      },
      {
        question: "What happens if someone challenges my recovery?",
        answer: "If the original wallet owner challenges your recovery attempt, the process is immediately cancelled. This protects against unauthorized access. You can try again if you believe the challenge was incorrect."
      },
      {
        question: "Can I cancel my own recovery attempt?",
        answer: "Yes, if you have access to the original wallet, you can challenge and cancel your own recovery attempt at any time during the challenge period."
      }
    ]
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        question: "My transaction failed. What should I do?",
        answer: "Check that you have enough ETH for gas fees and the commit fee. Make sure your wallet addresses are valid Ethereum addresses. If problems persist, contact our support team."
      },
      {
        question: "I can't see my recovery progress. Why?",
        answer: "Make sure you're connected to the correct network (Sepolia testnet for testing, Ethereum mainnet for production). Check that the contract address is correct and your wallet is connected."
      },
      {
        question: "The challenge period expired but I can't claim. Why?",
        answer: "Ensure you're using the same wallet that made the original commit and that the challenge period has fully expired. Double-check that no challenge was submitted."
      }
    ]
  }
];

const helpCategories = [
  { name: "Quick Start", icon: Book, count: 5 },
  { name: "Security", icon: Shield, count: 8 },
  { name: "Troubleshooting", icon: AlertTriangle, count: 12 },
  { name: "Process", icon: Clock, count: 6 }
];

export default function Help() {
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Help & Support
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions and learn how to use Rescu3 effectively. 
              We're here to help you recover your wallet safely.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for help articles, guides, or common issues..."
                className="pl-12 h-14 text-lg glass-card border-premium"
              />
            </div>
          </motion.div>

          {/* Help Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {helpCategories.map((category, index) => (
              <Card key={category.name} className="p-6 text-center glass-card border-premium hover-lift cursor-pointer group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold mb-1">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count} articles
                </Badge>
              </Card>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">
                Quick answers to the most common questions about Rescu3.
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                >
                  <Card className="glass-card border-premium shadow-elegant overflow-hidden">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        {category.category}
                      </CardTitle>
                      <CardDescription>
                        Common questions about {category.category.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="border-border/40">
                            <AccordionTrigger className="text-left hover:text-primary transition-colors">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="p-8 glass-card border-premium text-center">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold mb-3">Live Chat Support</h3>
              <p className="text-muted-foreground mb-6">
                Get instant help from our support team. Available 24/7 for urgent recovery issues.
              </p>
              <Button className="w-full">
                Start Live Chat
              </Button>
            </Card>

            <Card className="p-8 glass-card border-premium text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold mb-3">Email Support</h3>
              <p className="text-muted-foreground mb-6">
                Send us a detailed message and we'll get back to you within 24 hours.
              </p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </Card>
          </motion.div>
        </div>
      </Layout>
    </div>
  );
}