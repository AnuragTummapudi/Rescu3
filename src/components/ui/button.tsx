import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
<<<<<<< HEAD
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-elegant hover:scale-105 transition-bounce",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-soft",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-elegant",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground font-bold shadow-elegant hover:scale-105 transition-bounce relative",
        glass: "glass-card text-foreground hover:shadow-elegant transition-elegant",
        connect: "bg-accent text-accent-foreground font-semibold shadow-soft hover:shadow-elegant hover:scale-105 transition-bounce",
=======
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl glow-primary hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:scale-[1.02]",
        outline: "border border-border bg-card text-card-foreground shadow-sm hover:bg-muted hover:border-primary/30 hover:scale-[1.02] transition-spring",
        secondary: "bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:scale-[1.02]",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground font-semibold shadow-2xl hover:shadow-primary/25 hover:scale-105 transition-spring glow-primary",
        glass: "glass-card text-foreground hover:bg-card/80 hover:border-primary/20 hover:shadow-lg transition-spring border border-border hover:scale-[1.02]",
        connect: "bg-accent text-accent-foreground font-semibold shadow-lg hover:bg-accent/90 hover:shadow-xl glow-accent hover:scale-[1.02]",
        success: "bg-success text-success-foreground shadow-lg hover:bg-success/90 glow-success hover:scale-[1.02]",
>>>>>>> f1fc7729fd0fb51c08e86acaed7ca1aaf96bb792
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }