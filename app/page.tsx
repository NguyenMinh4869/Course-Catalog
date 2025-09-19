"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { CourseCatalog } from "@/components/course-catalog"
import { ContinueLearning } from "@/components/continue-learning"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
        <CourseCatalog searchQuery={searchQuery} />
        <ContinueLearning />
      </main>
    </div>
  )
}
