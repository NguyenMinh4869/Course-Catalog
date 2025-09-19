import { cn } from '../utils'

describe('cn utility function', () => {
  describe('Basic functionality', () => {
    it('merges class names correctly', () => {
      const result = cn('px-2 py-1', 'bg-blue-500')
      expect(result).toBe('px-2 py-1 bg-blue-500')
    })

    it('handles single class name', () => {
      const result = cn('text-lg')
      expect(result).toBe('text-lg')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('handles undefined and null values', () => {
      const result = cn('text-lg', undefined, null, 'bg-red-500')
      expect(result).toBe('text-lg bg-red-500')
    })
  })

  describe('Tailwind class merging', () => {
    it('merges conflicting Tailwind classes correctly', () => {
      const result = cn('px-2 px-4', 'py-1 py-3')
      expect(result).toBe('px-4 py-3')
    })

    it('handles multiple conflicting classes', () => {
      const result = cn('text-sm text-lg text-xl', 'bg-red-500 bg-blue-500')
      expect(result).toBe('text-xl bg-blue-500')
    })

    it('preserves non-conflicting classes', () => {
      const result = cn('px-2 py-1', 'text-lg font-bold', 'bg-blue-500')
      expect(result).toBe('px-2 py-1 text-lg font-bold bg-blue-500')
    })
  })

  describe('Conditional classes', () => {
    it('handles conditional classes with boolean', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('handles conditional classes with false condition', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class')
    })

    it('handles ternary operators', () => {
      const isError = true
      const result = cn('base-class', isError ? 'text-red-500' : 'text-green-500')
      expect(result).toBe('base-class text-red-500')
    })
  })

  describe('Object-based classes', () => {
    it('handles object with boolean values', () => {
      const result = cn({
        'text-lg': true,
        'font-bold': false,
        'text-red-500': true
      })
      expect(result).toBe('text-lg text-red-500')
    })

    it('handles mixed object and string inputs', () => {
      const result = cn('base-class', {
        'text-lg': true,
        'font-bold': false
      }, 'additional-class')
      expect(result).toBe('base-class text-lg additional-class')
    })
  })

  describe('Array inputs', () => {
    it('handles array of class names', () => {
      const result = cn(['px-2', 'py-1', 'text-lg'])
      expect(result).toBe('px-2 py-1 text-lg')
    })

    it('handles nested arrays', () => {
      const result = cn(['px-2', ['py-1', 'text-lg']])
      expect(result).toBe('px-2 py-1 text-lg')
    })

    it('handles mixed array and string inputs', () => {
      const result = cn('base-class', ['px-2', 'py-1'], 'text-lg')
      expect(result).toBe('base-class px-2 py-1 text-lg')
    })
  })

  describe('Complex scenarios', () => {
    it('handles complex mixed inputs', () => {
      const isActive = true
      const isDisabled = false
      const result = cn(
        'base-class',
        {
          'active-class': isActive,
          'disabled-class': isDisabled,
          'text-lg': true
        },
        isActive && 'conditional-class',
        ['px-2', 'py-1'],
        'final-class'
      )
      expect(result).toBe('base-class active-class text-lg conditional-class px-2 py-1 final-class')
    })

    it('handles empty strings and whitespace', () => {
      const result = cn('', '  ', 'text-lg', '')
      expect(result).toBe('text-lg')
    })
  })

  describe('Edge cases', () => {
    it('handles all falsy values', () => {
      const result = cn(false, null, undefined, 0, '')
      expect(result).toBe('')
    })

    it('handles numeric values', () => {
      const result = cn('text-lg', 0, 1, 'px-2')
      expect(result).toBe('text-lg 1 px-2')
    })

    it('handles very long class strings', () => {
      const longClass = 'px-2 py-1 text-lg font-bold bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-lg shadow-md transition-colors duration-200'
      const result = cn(longClass, 'additional-class')
      expect(result).toContain('px-2 py-1 text-lg font-bold bg-blue-500')
      expect(result).toContain('additional-class')
    })
  })

  describe('Type safety', () => {
    it('accepts ClassValue type inputs', () => {
      const classValue: string = 'text-lg'
      const result = cn(classValue)
      expect(result).toBe('text-lg')
    })

    it('handles mixed type inputs', () => {
      const inputs: (string | boolean | undefined)[] = ['text-lg', true, undefined]
      const result = cn(...inputs)
      expect(result).toBe('text-lg')
    })
  })
})
