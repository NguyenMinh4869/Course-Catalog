import { CourseCard } from "@/components/course-card"

const continueCourses = [
  {
    id: 9,
    title: "Intro to Sonic Smart Contracts",
    description: "Learn the fundamentals of smart contract development on the Sonic blockchain platform.",
    image: "/Intro to Sonic Smart Contracts.jpg",
    difficulty: "Beginner",
    duration: "4 weeks",
    enrolled: true,
    progress: 65,
  },
  {
    id: 10,
    title: "Advanced DeFi Protocols on Sonic",
    description: "Deep dive into complex DeFi protocols and yield farming strategies.",
    image: "/Advanced DeFi Protocols on Sonic.png",
    difficulty: "Advanced",
    duration: "8 weeks",
    enrolled: true,
    progress: 30,
  },
  {
    id: 11,
    title: "Sonic Network Architecture",
    description: "Understand the technical foundations and architecture of the Sonic network.",
    image: "/Sonic Network Architecture.png",
    difficulty: "Intermediate",
    duration: "5 weeks",
    enrolled: true,
    progress: 85,
  },
]

export function ContinueLearning() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black font-[family-name:var(--font-montserrat)] text-foreground">
          Continue Learning
        </h2>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {continueCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
