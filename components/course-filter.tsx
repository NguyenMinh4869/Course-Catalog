"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Difficulty } from "@/types/course"

interface CourseFilterProps {
  selectedDifficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  courseCounts: Record<Difficulty, number>
}

const difficulties: Difficulty[] = ["All", "Beginner", "Intermediate", "Advanced", "Expert"]

export function CourseFilter({ selectedDifficulty, onDifficultyChange, courseCounts }: CourseFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "Expert":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 hover:bg-muted"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-64 sm:w-72 bg-popover border border-border rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Filter by Difficulty</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => {
                  onDifficultyChange(difficulty)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between p-2 rounded-md text-left hover:bg-muted transition-colors ${
                  selectedDifficulty === difficulty ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(difficulty)}>
                    {difficulty}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {courseCounts[difficulty]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
