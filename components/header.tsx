"use client"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { theme } = useTheme()
  
  const handleClearSearch = () => {
    onSearchChange("")
  }
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fast-theme-transition">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 relative">
            <img    
              src={theme === "dark" ? "/Logo DarkMode.png" : "/Logo.png"} 
              alt="Sonic Logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain -my-4 sm:-my-6 md:-my-8 transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Search Section */}
          <div className="flex-1 w-full sm:max-w-lg sm:mx-4 lg:mx-8">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-10 bg-background border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full transition-all duration-200" 
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-2 h-6 w-6 p-0 hover:bg-muted rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
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