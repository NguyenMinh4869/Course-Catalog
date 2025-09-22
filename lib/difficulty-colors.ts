export const getDifficultyColors = (difficulty: string) => {
  if (!difficulty) {
    return {
      solid: "bg-gray-600 text-white"
    }
  }
  
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return {
        solid: "bg-green-600 text-white"
      }
    case "intermediate":
      return {
        solid: "bg-yellow-600 text-white" 
      }
    case "advanced":
      return {
        solid: "bg-orange-600 text-white"
      }
    case "expert":
      return {
        solid: "bg-red-600 text-white"
      }
    default:
      return {
        solid: "bg-gray-600 text-white"
      }
  }
}
