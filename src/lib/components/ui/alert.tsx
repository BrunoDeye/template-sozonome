import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
        "bg-gradient-to-br from-red-300 to-red-600 shadow-xl hover:from-red-200 hover:to-red-600 dark:border-sky-500 dark:from-red-600 dark:to-red-300 dark:!text-black dark:shadow-lg dark:shadow-red-400 dark:hover:from-red-500 dark:hover:to-red-200 dark:[&>svg]:hover:!text-red-50 dark:hover:!text-red-950 border-none !text-black dark:border-sky-950 [&>svg]:text-black dark:[&>svg]:text-white",
        accent:
          "bg-gradient-to-br from-gray-100 to-amber-400 text-yellow-600 shadow-xl hover:from-gray-100 hover:to-yellow-400 dark:border-sky-500 dark:from-yellow-400 dark:to-amber-100 dark:!text-black dark:shadow-lg dark:shadow-yellow-400 dark:hover:from-yellow-500 dark:hover:to-amber-200 dark:[&>svg]:hover:!text-amber-50 dark:hover:!text-amber-950 border-none text-yellow-950 dark:border-sky-950 [&>svg]:text-yellow-950 dark:[&>svg]:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed z-50", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
