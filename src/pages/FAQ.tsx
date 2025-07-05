import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HelpCircle, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowRight,
  MessageCircle,
  Mail,
  Github
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "What is Rescu3?",
          answer: "Rescu3 is a decentralized wallet recovery protocol that allows you to recover your Ethereum wallet without seed phrases. It uses a secure commit-reveal mechanism to ensure only legitimate owners can recover their wallets."
        },
        {
          question: "How is this different from traditional wallet recovery?",
          answer: "Traditional wallets require seed phrases or private keys for recovery. Rescu3 eliminates this requirement by using a cryptographic commit-reveal protocol that works even after you've lost access to your original wallet."
        },
        {
          question: "Is Rescu3 safe to use?",
          answer: "Yes, Rescu3 is built on battle-tested cryptographic principles and smart contract security. The protocol includes multiple safety mechanisms like time delays and challenge periods to prevent unauthorized access."
        }
      ]
    },
    {
      title: "Security & Safety",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "What prevents someone else from recovering my wallet?",
          answer: "The protocol includes a challenge period where the original owner can cancel any unauthorized recovery attempt. Additionally, the commit-reveal mechanism ensures that recovery details remain hidden until the appropriate time."
        },
        {
          question: "Can I trust the smart contract?",
          answer: "Our smart contracts are open-source and have been audited by leading security firms. The code is immutable once deployed, ensuring no backdoors or unauthorized changes can be made."
        },
        {
          question: "What if I lose access to my recovery wallet too?",
          answer: "You can set up multiple recovery addresses and use different devices. We recommend using hardware wallets or trusted devices for your recovery addresses."
        }
      ]
    },
    {
      title: "Process & Timing",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "How long does the recovery process take?",
          answer: "The complete process takes approximately 6 minutes: 1 minute delay after commit, 5 minutes challenge period. If no challenges are made, you can claim your wallet immediately after."
        },
        {
          question: "Can I cancel a recovery process?",
          answer: "Yes, if you're the original owner, you can challenge and cancel any recovery attempt during the 5-minute challenge period by signing a message with your original wallet."
        },
        {
          question: "What happens if someone challenges my recovery?",
          answer: "If a valid challenge is submitted during the challenge period, the recovery process is cancelled and you'll need to start over. This protects against unauthorized recovery attempts."
        }
      ]
    },
    {
      title: "Costs & Fees",
      icon: DollarSign,
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          question: "How much does it cost to use Rescu3?",
          answer: "There's a small commit fee of 0.01 ETH to prevent spam attacks. You'll also pay standard Ethereum gas fees for each transaction. No additional fees are charged by Rescu3."
        },
        {
          question: "What happens to the commit fee?",
          answer: "The commit fee helps prevent spam and abuse of the system. It's held in the smart contract and helps maintain the security and integrity of the protocol."
        },
        {
          question: "Are there any hidden costs?",
          answer: "No, Rescu3 is completely transparent. You only pay the commit fee and standard Ethereum gas fees. There are no subscription fees, hidden charges, or additional costs."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      title: "Community Discord",
      description: "Join our community for real-time support and discussions",
      icon: MessageCircle,
      action: "Join Discord",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Email Support",
      description: "Get help directly from our support team",
      icon: Mail,
      action: "Send Email",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "GitHub Issues",
      description: "Report bugs or request features on GitHub",
      icon: Github,
      action: "View GitHub",
      color: "from-gray-500 to-gray-700"
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
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Got <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>?
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Find answers to common questions about Rescu3, our recovery protocol, 
            and how to keep your wallet secure.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl">{category.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left hover:text-primary transition-smooth">
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
              );
            })}
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need More <span className="bg-gradient-primary bg-clip-text text-transparent">Help</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our community and support team are here to help you with any questions or issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="glass-card p-8 rounded-2xl text-center hover:shadow-xl transition-spring group cursor-pointer hover:scale-[1.02]"
                >
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${option.color} p-4 mb-6 group-hover:scale-110 transition-spring`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-smooth">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {option.description}
                  </p>
                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                    {option.action}
                  </Button>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Still have questions? Try our demo or start setting up your wallet recovery today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="group">
                  <Shield className="mr-2 h-5 w-5" />
                  Try Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}