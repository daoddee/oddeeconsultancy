import * as React from "react"
import { cn } from "./utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 shadow-sm"
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-slate-900 text-white hover:opacity-90",
      outline:
        "border border-slate-300 text-slate-900 bg-transparent hover:bg-slate-50",
      ghost: "bg-transparent hover:bg-slate-100"
    }
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
