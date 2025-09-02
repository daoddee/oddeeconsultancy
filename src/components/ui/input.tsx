import * as React from "react"
import { cn } from "./utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-offset-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
