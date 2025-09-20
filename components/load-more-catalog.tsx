"use client"
import { useState, useMemo } from "react"
import { CourseCard } from "@/components/course-card"
import { CourseFilter } from "@/components/course-filter"
import { Course, Difficulty } from "@/types/course"
import coursesData from "@/data/courses.json"
import { Button } from "@/components/ui/button"

const courses: Course[] = coursesData
const INITIAL_COURSES_COUNT = 8
const LOAD_MORE_COUNT = 4

interface LoadMoreCatalogProps {
  searchQuery: string
}

export function LoadMoreCatalog({ searchQuery }: LoadMoreCatalogProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("All")
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(INITIAL_COURSES_COUNT)

  // Calculate course counts for each difficulty (based on search results)
  const courseCounts = useMemo(() => {
    const searchFilteredCourses = searchQuery.trim() 
      ? courses.filter(course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : courses

    const counts: Record<Difficulty, number> = {
      "All": searchFilteredCourses.length,
      "Beginner": searchFilteredCourses.filter(course => course.difficulty === "Beginner").length,
      "Intermediate": searchFilteredCourses.filter(course => course.difficulty === "Intermediate").length,
      "Advanced": searchFilteredCourses.filter(course => course.difficulty === "Advanced").length,
      "Expert": searchFilteredCourses.filter(course => course.difficulty === "Expert").length,
    }
    return counts
  }, [searchQuery])

  // Filter courses based on search query and selected difficulty
  const filteredCourses = useMemo(() => {
    let filtered = courses

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty)
    }

    return filtered
  }, [searchQuery, selectedDifficulty])

  // Get visible courses
  const visibleCourses = filteredCourses.slice(0, visibleCoursesCount)
  const hasMoreCourses = visibleCoursesCount < filteredCourses.length

  // Reset visible count when filters change
  useMemo(() => {
    setVisibleCoursesCount(INITIAL_COURSES_COUNT)
  }, [searchQuery, selectedDifficulty])

  const handleLoadMore = () => {
    setVisibleCoursesCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredCourses.length))
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-montserrat)] text-foreground">
          Course Catalog
          <span className="text-lg font-normal text-muted-foreground ml-2">
            ({filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''})
          </span>
        </h1>
        <CourseFilter
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          courseCounts={courseCounts}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No courses found
          </h3>
          <p className="text-muted-foreground">
            {searchQuery.trim() 
              ? `No courses match "${searchQuery}". Try adjusting your search or filters.`
              : "No courses available with the current filters."
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 transition-all duration-500 ease-in-out">
            {visibleCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreCourses && (
            <div className="flex justify-center mt-8 sm:mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
                className="px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Load More Courses ({filteredCourses.length - visibleCoursesCount} remaining)
              </Button>
            </div>
          )}

          {/* Show All Button when there are hidden courses */}
          {hasMoreCourses && (
            <div className="text-center mt-4">
              <Button
                onClick={() => setVisibleCoursesCount(filteredCourses.length)}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Show All {filteredCourses.length} Courses
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
