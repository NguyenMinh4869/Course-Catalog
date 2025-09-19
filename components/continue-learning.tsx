import { CourseCard } from "@/components/course-card"
import { getDifficultyColors } from "@/lib/difficulty-colors"
import { Course } from "@/types/course"
import continueCoursesData from "@/data/continue-learning.json"

const continueCourses: Course[] = continueCoursesData

export function ContinueLearning() {
  return (
    <section className="bg-[#FDF8EE] dark:bg-[#111112] border border-[#8B4513] dark:border-[#333333] rounded-[20px] p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Section - Text Content */}
        <div className="flex-1 lg:max-w-md">
          <h2 className="text-xl sm:text-2xl font-black font-[family-name:var(--font-montserrat)] text-[#111112] dark:text-white mb-3 transition-colors duration-300">
            Continue Learning
          </h2>
          <p className="text-sm text-[#111112]/70 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-300">
            Keep progressing through personalized courses selected for you
          </p>
          <button className="text-sm text-[#111112] dark:text-blue-400 hover:text-[#111112]/80 dark:hover:text-blue-300 underline transition-colors duration-300">
            View All →
          </button>
        </div>

        {/* Right Section - Course Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {continueCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-[#111112] rounded-[16px] shadow-lg dark:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl border border-gray-100 dark:border-[#333333] h-full">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColors(course.difficulty).solid} transition-colors duration-300`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4 flex flex-col flex-1 min-h-0">
                <div className="space-y-3 flex-1 min-h-0">
                  <h3 className="font-bold text-lg text-[#111112] dark:text-white line-clamp-2 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#111112]/70 dark:text-gray-300 line-clamp-3 leading-relaxed transition-colors duration-300">
                    {course.description}
                  </p>
                </div>
                
                {/* Progress Section - Fixed at bottom */}
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#111112]/60 dark:text-gray-400 font-medium">
                      Progress
                    </span>
                    <span className="text-xs text-[#111112] dark:text-white font-semibold">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-[#026a0d] h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="w-full bg-[#026a0d] dark:bg-[#026a0d] hover:bg-[#026a0d]/90 dark:hover:bg-[#026a0d]/80 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 mt-4 hover:shadow-lg">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
