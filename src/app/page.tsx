// Potential improvements:
// - Use Server Components for non-interactive parts of the UI to improve performance and reduce client-side JavaScript.
// - Move interactive parts (like sliders and switches) into separate Client Components.
// - Move the font configuration to the layout.tsx file for better performance and to follow Next.js best practices.
// - Use a theme provider (like next-themes) to wrap the app for more robust dark mode implementation.
// - Use Next.js Image component for optimized image loading, especially for the background SVGs.
// - Implement proper internationalization (i18n) if the app needs to support multiple languages

// as  this is a single component app focusing on the output rather than Next.js best practices. 
// For a more comprehensive example of a well-structured Next.js app, you can refer to https://www.codewarnab.in/projects

"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun } from "lucide-react"

export default function Component() {
  const [pageviews, setPageviews] = React.useState(100)
  const [isYearly, setIsYearly] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const getPriceForPageviews = (views: number) => {
    if (views <= 10) return 8
    if (views <= 50) return 12
    if (views <= 100) return 16
    if (views <= 500) return 24
    return 36
  }

  const basePrice = getPriceForPageviews(pageviews)
  const finalPrice = isYearly ? basePrice * 0.75 : basePrice

  return (
    <div className="min-h-svh w-full bg-[hsl(230,100%,99%)] dark:bg-gray-900 font-['Manrope'] text-[15px] relative overflow-hidden transition-colors duration-300">
      {/* Main background SVG */}
      <svg
        className="absolute inset-0 w-full h-[449px]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#F1F5FE"
          fillRule="evenodd"
          d="M0 0h1440v449H191.5C85.737 449 0 363.263 0 257.5V0z"
          className="dark:fill-gray-800 transition-colors duration-300"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen md:p-4 px-4 pb-4 pt-1">
        <div className="text-center mb-8 md:mb-12 relative max-w-[450px] mx-auto px-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="146"
            height="145"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          >
            <g fill="none" fillRule="evenodd" stroke="hsl(224, 65%, 95%)" className="dark:stroke-gray-700">
              <circle cx="63" cy="82" r="62.5" />
              <circle cx="105" cy="41" r="40.5" />
            </g>
          </svg>
          <h1 className="text-[20px] md:text-[28px] font-extrabold text-[hsl(227,35%,25%)] dark:text-white mb-2 leading-tight">
            Simple, traffic-based pricing
          </h1>
          <p className="text-[13px] md:text-[15px] text-[hsl(225,20%,60%)] dark:text-gray-400 leading-loose">
            Sign-up for our 30-day trial.<br className="md:hidden" /> No credit card required.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[375px] md:max-w-xl lg:p-6 p-4 md:p-10">
          <div className="lg:space-y-8 md:space-y-10 space-y-2">
            {/* Pageviews and Price */}
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-8 text-center md:text-left w-full">
              <div className="uppercase text-[hsl(225,20%,60%)] dark:text-gray-400 tracking-[0.15em] text-[12px] md:text-[14px] font-extrabold order-1 md:order-none">
                {pageviews < 1000 ? `${pageviews}K` : `${pageviews / 1000}M`} Pageviews
              </div>
              <div className="items-center gap-2 order-2 md:order-none hidden md:flex">
                <span className="text-[32px] md:text-4xl font-extrabold text-[hsl(227,35%,25%)] dark:text-white">${finalPrice.toFixed(2)}</span>
                <span className="text-[hsl(225,20%,60%)] dark:text-gray-400 text-[14px] md:text-[15px]">/ month</span>
              </div>
            </div>

            {/* Slider */}
            <div className="pt-6 lg:pb-8 pb-5 md:py-4">
              <Slider
                value={[pageviews]}
                min={10}
                max={1000}
                step={1}
                onValueChange={(value) => setPageviews(value[0])}
                className="dark:bg-gray-700"
              />
            </div>
            <div className="md:hidden flex items-center justify-center md:justify-end gap-2 pb-3">
              <span className="text-[32px] md:text-4xl font-extrabold text-[hsl(227,35%,25%)] dark:text-white">${finalPrice.toFixed(2)}</span>
              <span className="text-[hsl(225,20%,60%)] dark:text-gray-400 text-[14px] md:text-[15px]">/ month</span>
            </div>
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 text-[12px] md:pl-0 pl-3 md:text-sm text-[hsl(225,20%,60%)] dark:text-gray-400">
              <span>Monthly Billing</span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-[hsl(174,86%,45%)] hover:data-[state=checked]:bg-[hsl(174,77%,80%)] data-[state=unchecked]:bg-[hsl(224,65%,95%)] hover:data-[state=unchecked]:bg-[hsl(224,65%,90%)] dark:data-[state=unchecked]:bg-gray-600"
              />
              <span className="flex items-center gap-2">
                Yearly Billing
                <span className="bg-[hsl(15,100%,95%)] dark:bg-gray-700 text-[hsl(15,100%,70%)] dark:text-orange-300 rounded-full text-[10px] flex flex-col items-center px-2 py-[2px]">
                  <span className="md:hidden">-25%</span>
                  <span className="hidden md:inline">25% discount</span>
                </span>
              </span>
            </div>

            <div className="border-t border-[hsl(224,65%,95%)] dark:border-gray-700 pt-8">
              <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center">
                <ul className="space-y-4 md:space-y-3 text-center md:text-left">
                  <li className="flex items-center justify-center md:justify-start gap-4 md:gap-2 text-[hsl(225,20%,60%)] dark:text-gray-400 text-[12px] md:text-[14px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" className="shrink-0">
                      <path fill="none" stroke="hsl(174, 86%, 45%)" strokeWidth="2" d="M1 4.134l1.907 1.908L7.949 1" />
                    </svg>
                    <span>Unlimited websites</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-4 md:gap-2 text-[hsl(225,20%,60%)] dark:text-gray-400 text-[12px] md:text-[14px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" className="shrink-0">
                      <path fill="none" stroke="hsl(174, 86%, 45%)" strokeWidth="2" d="M1 4.134l1.907 1.908L7.949 1" />
                    </svg>
                    <span>100% data ownership</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-4 md:gap-2 text-[hsl(225,20%,60%)] dark:text-gray-400 text-[12px] md:text-[14px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" className="shrink-0">
                      <path fill="none" stroke="hsl(174, 86%, 45%)" strokeWidth="2" d="M1 4.134l1.907 1.908L7.949 1" />
                    </svg>
                    <span>Email reports</span>
                  </li>
                </ul>
                <div className="w-full text-center md:text-right">
                  <button className="bg-[hsl(227,35%,25%)] text-[hsl(226,100%,87%)] dark:bg-blue-600 dark:text-white rounded-full px-12 py-3 hover:bg-opacity-90 transition-colors font-semibold text-[12px] md:text-[14px] hover:text-white">
                    Start my trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 z-20">
        <Switch
          checked={isDarkMode}
          onCheckedChange={setIsDarkMode}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
        >
          <span className="sr-only">Toggle dark mode</span>
          {isDarkMode ? (
            <Moon className="h-4 w-4 text-gray-100" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-500" />
          )}
        </Switch>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;800&display=swap');
        .range-slider {
          background: linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(224, 65%, 95%) 100%) !important;
        }
      `}</style>
    </div>
  )
}