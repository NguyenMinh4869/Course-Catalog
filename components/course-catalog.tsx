"use client"
import { useState, useMemo } from "react"
import { CourseCard } from "@/components/course-card"
import { CourseFilter } from "@/components/course-filter"
import { Course, Difficulty } from "@/types/course"
import coursesData from "@/data/courses.json"

const courses: Course[] = coursesData

export function CourseCatalog() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("All")

  // Calculate course counts for each difficulty
  const courseCounts = useMemo(() => {
    const counts: Record<Difficulty, number> = {
      "All": courses.length,
      "Beginner": courses.filter(course => course.difficulty === "Beginner").length,
      "Intermediate": courses.filter(course => course.difficulty === "Intermediate").length,
      "Advanced": courses.filter(course => course.difficulty === "Advanced").length,
      "Expert": courses.filter(course => course.difficulty === "Expert").length,
    }
    return counts
  }, [])

  // Filter courses based on selected difficulty
  const filteredCourses = useMemo(() => {
    if (selectedDifficulty === "All") {
      return courses
    }
    return courses.filter(course => course.difficulty === selectedDifficulty)
  }, [selectedDifficulty])

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-montserrat)] text-foreground">
          Course Catalog
        </h1>
        <CourseFilter
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          courseCounts={courseCounts}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
