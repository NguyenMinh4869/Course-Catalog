"use client"
import { useState, useMemo } from "react"
import { CourseCard } from "@/components/course-card"
import { CourseFilter } from "@/components/course-filter"

type Difficulty = "All" | "Beginner" | "Intermediate" | "Advanced" | "Expert"

const courses = [
  {
    id: 1,
    title: "Intro to Sonic Smart Contracts",
    description: "Learn the fundamentals of smart contract development on the Sonic blockchain platform.",
    image: "/Intro to Sonic Smart Contracts.jpg",
    difficulty: "Beginner",
    duration: "4 weeks",
    enrolled: false,
  },
  {
    id: 2,
    title: "Unlocking Rewards on Sonic",
    description: "Discover how to maximize rewards and incentives within the Sonic ecosystem.",
    image: "/Unlocking Rewards on Sonic.PNG",
    difficulty: "Intermediate",
    duration: "3 weeks",
    enrolled: false,
  },
  {
    id: 3,
    title: "Sonic dApp Development",
    description: "Build decentralized applications on Sonic with modern development practices.",
    image: "/Sonic dApp Development.PNG",
    difficulty: "Advanced",
    duration: "6 weeks",
    enrolled: false,
  },
  {
    id: 4,
    title: "Sonic Network Architecture",
    description: "Understand the technical foundations and architecture of the Sonic network.",
    image: "/Sonic Network Architecture.png",
    difficulty: "Intermediate",
    duration: "5 weeks",
    enrolled: false,
  },
  {
    id: 5,
    title: "Fast Fashion on Sonic",
    description: "Explore NFT marketplaces and digital asset trading on the Sonic platform.",
    image: "/Fast Fashion on Sonic.png",
    difficulty: "Beginner",
    duration: "2 weeks",
    enrolled: false,
  },
  {
    id: 6,
    title: "Advanced DeFi Protocols on Sonic",
    description: "Deep dive into complex DeFi protocols and yield farming strategies.",
    image: "/Advanced DeFi Protocols on Sonic.png",
    difficulty: "Advanced",
    duration: "8 weeks",
    enrolled: false,
  },
  {
    id: 7,
    title: "Sonic dApp Development",
    description: "Build sophisticated decentralized applications with advanced features.",
    image: "/Sonic dApp Development.PNG",
    difficulty: "Expert",
    duration: "10 weeks",
    enrolled: false,
  },
  {
    id: 8,
    title: "Sonic Network Architecture",
    description: "Master the technical architecture and infrastructure of Sonic.",
    image: "/Sonic Network Architecture.png",
    difficulty: "Expert",
    duration: "12 weeks",
    enrolled: false,
  },
]

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black font-[family-name:var(--font-montserrat)] text-foreground">
          Course Catalog
        </h1>
        <CourseFilter
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          courseCounts={courseCounts}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
