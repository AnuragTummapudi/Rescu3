import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { LayoutDashboard, Cog, Info, HelpCircle, Github } from "lucide-react";

export function MainNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-6 container mx-auto px-6"
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
        <a href="https://github.com/AnuragTummapudi/Rescu3.git" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Github className="h-5 w-5" />
        </a>
        <ConnectButton />
      </div>
    </motion.nav>
  );
} 