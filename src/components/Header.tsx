// DEPRECATED: Use MainNavbar instead.
// This file is no longer used.

import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-border/40 glass-card backdrop-blur-xl flex items-center justify-between px-6 relative">
      <div className="absolute inset-0 bg-gradient-neon opacity-5"></div>
      <div className="flex items-center gap-8 relative z-10">
        <h1 className="font-display font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <nav className="flex gap-4">
          <Link to="/how-it-works" className="hover:text-primary font-medium transition-colors">How it Works</Link>
          <Link to="/about" className="hover:text-primary font-medium transition-colors">About</Link>
          <Link to="/help" className="hover:text-primary font-medium transition-colors">Help</Link>
          <Link to="/faq" className="hover:text-primary font-medium transition-colors">FAQ</Link>
          <a href="https://github.com/AnuragTummapudi/Rescu3.git" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-medium transition-colors">GitHub</a>
        </nav>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <Button variant="ghost" size="icon" className="hover:glow-primary hover:text-primary">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:glow-primary hover:text-primary">
          <Settings className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-gradient-primary opacity-50" />
        <ConnectButton />
      </div>
    </header>
  );
}