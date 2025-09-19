import { getDifficultyColors } from '../difficulty-colors'

describe('getDifficultyColors', () => {
  describe('Valid difficulty levels', () => {
    it('returns correct colors for Beginner difficulty', () => {
      const result = getDifficultyColors('Beginner')
      
      expect(result).toEqual({
        solid: 'bg-green-600 text-white',
        light: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      })
    })

    it('returns correct colors for Intermediate difficulty', () => {
      const result = getDifficultyColors('Intermediate')
      
      expect(result).toEqual({
        solid: 'bg-yellow-600 text-white',
        light: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      })
    })

    it('returns correct colors for Advanced difficulty', () => {
      const result = getDifficultyColors('Advanced')
      
      expect(result).toEqual({
        solid: 'bg-orange-600 text-white',
        light: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      })
    })

    it('returns correct colors for Expert difficulty', () => {
      const result = getDifficultyColors('Expert')
      
      expect(result).toEqual({
        solid: 'bg-red-600 text-white',
        light: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      })
    })
  })

  describe('Case insensitive matching', () => {
    it('handles lowercase input', () => {
      const result = getDifficultyColors('beginner')
      
      expect(result).toEqual({
        solid: 'bg-green-600 text-white',
        light: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      })
    })

    it('handles uppercase input', () => {
      const result = getDifficultyColors('EXPERT')
      
      expect(result).toEqual({
        solid: 'bg-red-600 text-white',
        light: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      })
    })

    it('handles mixed case input', () => {
      const result = getDifficultyColors('InTeRmEdIaTe')
      
      expect(result).toEqual({
        solid: 'bg-yellow-600 text-white',
        light: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      })
    })
  })

  describe('Edge cases', () => {
    it('returns default colors for unknown difficulty', () => {
      const result = getDifficultyColors('Unknown')
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white',
        light: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      })
    })

    it('returns default colors for empty string', () => {
      const result = getDifficultyColors('')
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white',
        light: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      })
    })

    it('returns default colors for null input', () => {
      const result = getDifficultyColors(null as any)
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white',
        light: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      })
    })

    it('returns default colors for undefined input', () => {
      const result = getDifficultyColors(undefined as any)
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white',
        light: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      })
    })
  })

  describe('Return value structure', () => {
    it('always returns an object with solid and light properties', () => {
      const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Unknown', '']
      
      difficulties.forEach(difficulty => {
        const result = getDifficultyColors(difficulty)
        
        expect(result).toHaveProperty('solid')
        expect(result).toHaveProperty('light')
        expect(typeof result.solid).toBe('string')
        expect(typeof result.light).toBe('string')
      })
    })

    it('solid property contains background and text color classes', () => {
      const result = getDifficultyColors('Beginner')
      
      expect(result.solid).toContain('bg-')
      expect(result.solid).toContain('text-')
    })

    it('light property contains background and text color classes for both light and dark modes', () => {
      const result = getDifficultyColors('Beginner')
      
      expect(result.light).toContain('bg-')
      expect(result.light).toContain('text-')
      expect(result.light).toContain('dark:bg-')
      expect(result.light).toContain('dark:text-')
    })
  })
})
