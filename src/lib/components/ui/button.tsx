'use client';

import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradientDefault: "bg-gradient-to-br !text-white from-gray-300 to-black dark:from-gray-500 dark:to-white dark:!text-black dark:hover:from-gray-200 dark:hover:to-gray-600 dark:hover:text-gray-600 font-semibold text-gray-600 hover:from-gray-200 hover:to-gray-600 hover:text-gray-700",
        gradientBlue: "bg-gradient-to-br from-gray-100 to-blue-200 dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-gray-200 dark:hover:to-blue-300 dark:hover:text-sky-600 font-semibold text-sky-600 hover:from-gray-200 hover:to-sky-400 hover:text-sky-700",
        gradientDarkBlue: "bg-gradient-to-br from-gray-100 to-blue-400 dark:from-blue-900 dark:to-blue-500 dark:text-white dark:hover:from-gray-200 dark:hover:to-sky-400 dark:hover:text-sky-800 font-semibold text-sky-700 hover:from-gray-200 hover:to-sky-600 hover:text-sky-800",
        gradientSky: "bg-gradient-to-br from-gray-100 to-sky-200 dark:from-sky-800 dark:to-sky-400 dark:text-white dark:hover:from-gray-200 dark:hover:to-cyan-400 dark:hover:text-cyan-800 font-semibold text-cyan-700 hover:from-gray-200 hover:to-cyan-400 hover:text-cyan-800",
        gradientRed: "bg-gradient-to-br from-gray-100 to-red-200 dark:from-red-800 dark:to-red-400 dark:text-white font-semibold text-orange-700 dark:hover:from-gray-200 dark:hover:to-orange-400 dark:hover:text-orange-800 hover:from-gray-200 hover:to-orange-400 hover:text-orange-800",
        gradientGhost: "bg-gradient-to-br from-gray-100 to-slate-200 dark:from-slate-800 dark:to-slate-400 dark:text-white font-semibold text-stone-700 dark:hover:from-gray-200 dark:hover:to-stone-400 dark:hover:text-stone-800 hover:from-gray-200 hover:to-stone-400 hover:text-stone-800"
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
