"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export function Header() {
  const { theme } = useTheme()
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 relative">
            <img    
              src={theme === "dark" ? "/Logo DarkMode.png" : "/Logo.png"} 
              alt="Sonic Logo" 
              className="w-32 h-32 object-contain -my-8"
            />
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10 pr-4 bg-background border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}