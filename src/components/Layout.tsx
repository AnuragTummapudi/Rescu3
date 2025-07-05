import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
        {/* Futuristic background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pulse-glow" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-hero relative overflow-hidden">
        {/* Background effects for sidebar layout */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl pulse-glow" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl pulse-glow" style={{ animationDelay: '2s' }} />
        </div>
        <AppSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <Header />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}