export const getDifficultyColors = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return {
        solid: "bg-green-600 text-white",
        light: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      }
    case "intermediate":
      return {
        solid: "bg-yellow-600 text-white", 
        light: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      }
    case "advanced":
      return {
        solid: "bg-orange-600 text-white",
        light: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      }
    case "expert":
      return {
        solid: "bg-red-600 text-white",
        light: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      }
    default:
      return {
        solid: "bg-gray-600 text-white",
        light: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      }
  }
}
