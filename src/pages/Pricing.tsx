import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Crown, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out wallet recovery",
      icon: Shield,
      features: [
        "1 wallet recovery attempt",
        "Basic support",
        "Standard processing time",
        "Community forum access"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      description: "Best for regular crypto users",
      icon: Zap,
      features: [
        "Unlimited wallet recoveries",
        "Priority support",
        "Faster processing",
        "Advanced security features",
        "Multi-chain support",
        "API access"
      ],
      buttonText: "Start Pro Plan",
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations and institutions",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integration",
        "SLA guarantee",
        "Advanced analytics",
        "White-label solution"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the pricing work?",
      answer: "We offer a simple, transparent pricing model. Pay only when you successfully recover a wallet."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You can try our service with one free wallet recovery attempt to see how it works."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major cryptocurrencies including ETH, BTC, USDC, and traditional payment methods."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Absolutely! You can change your plan at any time. Changes take effect immediately."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-hero">
      <MainNavbar />
      <Layout>
        <div className="space-y-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6">
              💰 Simple & Transparent Pricing
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              <span className="text-foreground">Choose Your</span>{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Recovery Plan
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Start with our free plan and upgrade as your needs grow. 
              No hidden fees, no subscriptions - pay only for successful recoveries.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 bg-gradient-primary">
                    Most Popular
                  </Badge>
                )}
                <Card className={`glass-card border-premium hover-lift h-full ${plan.popular ? 'shadow-elegant' : ''}`}>
                  <CardHeader className="text-center pb-8">
                    <plan.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {plan.price}
                      {plan.price !== "Custom" && <span className="text-lg text-muted-foreground">/recovery</span>}
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/dashboard" className="block">
                      <Button variant={plan.buttonVariant} size="lg" className="w-full">
                        {plan.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="glass-card border-premium">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-6">
                  Why Our <span className="bg-gradient-primary bg-clip-text text-transparent">Pricing</span> Makes Sense
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">No Risk</div>
                    <p className="text-muted-foreground text-sm">Pay only when we successfully recover your wallet</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">Transparent</div>
                    <p className="text-muted-foreground text-sm">No hidden fees or surprise charges</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">Fair Value</div>
                    <p className="text-muted-foreground text-sm">Much cheaper than losing your crypto forever</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="glass-card border-premium hover-lift h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-primary">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Card className="glass-card border-premium shadow-elegant">
              <CardContent className="p-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to <span className="bg-gradient-primary bg-clip-text text-transparent">Recover</span> Your Wallet?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Start with our free plan today. No credit card required, no commitments. 
                  Recover your first wallet and see the power of Rescu3.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/dashboard">
                    <Button variant="hero" size="lg" className="group">
                      Start Free Recovery
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/help">
                    <Button variant="outline" size="lg">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Layout>
    </div>
  );
};

export default Pricing;