import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Shield,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileText,
  Github,
  Twitter,
} from "lucide-react";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: Shield },
];

const supportItems = [];

const socialItems = [
  { title: "GitHub", url: "https://github.com/AnuragTummapudi/Rescu3.git", icon: Github, external: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-primary/20 text-primary border-r-4 border-primary font-bold glow-primary" 
      : "hover:bg-primary/10 text-muted-foreground hover:text-primary hover:glow-primary transition-glow";
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-border/40 glass-card backdrop-blur-xl relative overflow-hidden`}
      collapsible="icon"
    >
      {/* Neon accent lines */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-secondary opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-neon opacity-5"></div>
      
      <SidebarContent className="p-4 relative z-10">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
            <Shield className="w-4 h-4 text-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display font-black text-xl bg-gradient-neon bg-clip-text text-transparent text-neon">
              RESCU3
            </span>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all duration-200">
                    <NavLink to={item.url} className={`${getNavClass(item.url)} flex items-center gap-3 p-3 rounded-lg`}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all duration-200">
                    <NavLink to={item.url} className={`${getNavClass(item.url)} flex items-center gap-3 p-3 rounded-lg`}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Social Links */}
        {!collapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel>Connect</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {socialItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="transition-all duration-200">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}