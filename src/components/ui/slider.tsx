"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[hsl(224,65%,95%)]">
      <SliderPrimitive.Range className="absolute h-full bg-[hsl(174,77%,80%)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative block h-10 w-10 rounded-full bg-[hsl(174,86%,45%)] hover:bg-[hsl(174,60%,47%)] transition-colors focus-visible:outline-none    shadow-[0_0_15px_rgba(165,243,235,0.7)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="15"
        viewBox="0 0 22 13"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <g fill="#80FFF3" fillRule="evenodd">
          <path d="M16 2.558v7.884a1 1 0 001.735.679l3.639-3.943a1 1 0 000-1.356l-3.64-3.943A1 1 0 0016 2.558zM6 2.558v7.884a1 1 0 01-1.735.679L.626 7.178a1 1 0 010-1.356l3.64-3.943A1 1 0 016 2.558z" />
        </g>
      </svg>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }