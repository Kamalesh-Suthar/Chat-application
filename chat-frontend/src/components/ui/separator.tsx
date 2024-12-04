"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "relative shrink-0 bg-foreground-500",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        children ? "my-6" : "my-0",
        className
      )}
      {...props}
    >
      {children && (
        <span className="bg-background px-4 h-fit absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
          {children}
        </span>
      )}
    </SeparatorPrimitive.Root>
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
