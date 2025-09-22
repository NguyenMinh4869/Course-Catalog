import { getDifficultyColors } from '../difficulty-colors'

describe('getDifficultyColors', () => {
  describe('Valid difficulty levels', () => {
    it('returns correct colors for Beginner difficulty', () => {
      const result = getDifficultyColors('Beginner')
      
      expect(result).toEqual({
        solid: 'bg-green-600 text-white'
      })
    })

    it('returns correct colors for Intermediate difficulty', () => {
      const result = getDifficultyColors('Intermediate')
      
      expect(result).toEqual({
        solid: 'bg-yellow-600 text-white'
      })
    })

    it('returns correct colors for Advanced difficulty', () => {
      const result = getDifficultyColors('Advanced')
      
      expect(result).toEqual({
        solid: 'bg-orange-600 text-white'
      })
    })

    it('returns correct colors for Expert difficulty', () => {
      const result = getDifficultyColors('Expert')
      
      expect(result).toEqual({
        solid: 'bg-red-600 text-white'
      })
    })
  })

  describe('Case insensitive matching', () => {
    it('handles lowercase input', () => {
      const result = getDifficultyColors('beginner')
      
      expect(result).toEqual({
        solid: 'bg-green-600 text-white'
      })
    })

    it('handles uppercase input', () => {
      const result = getDifficultyColors('EXPERT')
      
      expect(result).toEqual({
        solid: 'bg-red-600 text-white'
      })
    })

    it('handles mixed case input', () => {
      const result = getDifficultyColors('InTeRmEdIaTe')
      
      expect(result).toEqual({
        solid: 'bg-yellow-600 text-white'
      })
    })
  })

  describe('Edge cases', () => {
    it('returns default colors for unknown difficulty', () => {
      const result = getDifficultyColors('Unknown')
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white'
      })
    })

    it('returns default colors for empty string', () => {
      const result = getDifficultyColors('')
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white'
      })
    })

    it('returns default colors for null input', () => {
      const result = getDifficultyColors(null as any)
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white'
      })
    })

    it('returns default colors for undefined input', () => {
      const result = getDifficultyColors(undefined as any)
      
      expect(result).toEqual({
        solid: 'bg-gray-600 text-white'
      })
    })
  })

  describe('Return value structure', () => {
    it('always returns an object with solid property', () => {
      const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Unknown', '']
      
      difficulties.forEach(difficulty => {
        const result = getDifficultyColors(difficulty)
        
        expect(result).toHaveProperty('solid')
        expect(typeof result.solid).toBe('string')
      })
    })

    it('solid property contains background and text color classes', () => {
      const result = getDifficultyColors('Beginner')
      
      expect(result.solid).toContain('bg-')
      expect(result.solid).toContain('text-')
    })

    // light variant removed
  })
})
