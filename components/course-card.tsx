import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users } from "lucide-react"
import Image from "next/image"
import { getDifficultyColors } from "@/lib/difficulty-colors"
import { Course } from "@/types/course"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const difficultyColors = getDifficultyColors(course.difficulty)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className={difficultyColors.solid}>{course.difficulty}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-bold font-[family-name:var(--font-montserrat)] text-card-foreground line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground font-[family-name:var(--font-open-sans)] line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>1.2k students</span>
          </div>
        </div>

        {course.enrolled && course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium" size="sm">
          {course.enrolled ? "Continue" : "Start Learning"}
        </Button>
      </CardFooter>
    </Card>
  )
}
