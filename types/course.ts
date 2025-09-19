export interface Course {
  id: number
  title: string
  description: string
  image: string
  difficulty: string
  duration: string
  enrolled: boolean
  progress?: number
}

export type Difficulty = "All" | "Beginner" | "Intermediate" | "Advanced" | "Expert"
