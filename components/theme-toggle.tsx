"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-180 dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-180 scale-0 opacity-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
