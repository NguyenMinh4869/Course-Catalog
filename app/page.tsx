import { Header } from "@/components/header"
import { CourseCatalog } from "@/components/course-catalog"
import { ContinueLearning } from "@/components/continue-learning"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <CourseCatalog />
        <ContinueLearning />
      </main>
    </div>
  )
}
