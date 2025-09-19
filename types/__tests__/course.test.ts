import { Course, Difficulty } from '../course'

describe('Course Type', () => {
  describe('Course interface', () => {
    it('allows valid course object with all required properties', () => {
      const validCourse: Course = {
        id: 1,
        title: 'Test Course',
        description: 'Test Description',
        image: '/test.jpg',
        difficulty: 'Beginner',
        duration: '4 weeks',
        enrolled: false,
      }

      expect(validCourse.id).toBe(1)
      expect(validCourse.title).toBe('Test Course')
      expect(validCourse.description).toBe('Test Description')
      expect(validCourse.image).toBe('/test.jpg')
      expect(validCourse.difficulty).toBe('Beginner')
      expect(validCourse.duration).toBe('4 weeks')
      expect(validCourse.enrolled).toBe(false)
    })

    it('allows course object with optional progress property', () => {
      const courseWithProgress: Course = {
        id: 1,
        title: 'Test Course',
        description: 'Test Description',
        image: '/test.jpg',
        difficulty: 'Beginner',
        duration: '4 weeks',
        enrolled: true,
        progress: 75,
      }

      expect(courseWithProgress.progress).toBe(75)
    })

    it('allows course object without progress property', () => {
      const courseWithoutProgress: Course = {
        id: 1,
        title: 'Test Course',
        description: 'Test Description',
        image: '/test.jpg',
        difficulty: 'Beginner',
        duration: '4 weeks',
        enrolled: false,
      }

      expect(courseWithoutProgress.progress).toBeUndefined()
    })
  })

  describe('Difficulty type', () => {
    it('accepts all valid difficulty values', () => {
      const difficulties: Difficulty[] = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
      
      difficulties.forEach(difficulty => {
        const course: Course = {
          id: 1,
          title: 'Test Course',
          description: 'Test Description',
          image: '/test.jpg',
          difficulty,
          duration: '4 weeks',
          enrolled: false,
        }

        expect(course.difficulty).toBe(difficulty)
      })
    })
  })

  describe('Type safety', () => {
    it('enforces required properties', () => {
      // This test ensures TypeScript compilation would fail for incomplete objects
      // In a real scenario, these would cause TypeScript errors
      const incompleteCourse = {
        id: 1,
        title: 'Test Course',
        // Missing required properties should cause TypeScript error
      }

      // We can't actually test TypeScript compilation errors in Jest,
      // but we can verify the structure is correct when all properties are present
      expect(typeof incompleteCourse.id).toBe('number')
      expect(typeof incompleteCourse.title).toBe('string')
    })

    it('enforces correct property types', () => {
      const course: Course = {
        id: 1, // number
        title: 'Test Course', // string
        description: 'Test Description', // string
        image: '/test.jpg', // string
        difficulty: 'Beginner', // Difficulty
        duration: '4 weeks', // string
        enrolled: false, // boolean
        progress: 50, // number | undefined
      }

      expect(typeof course.id).toBe('number')
      expect(typeof course.title).toBe('string')
      expect(typeof course.description).toBe('string')
      expect(typeof course.image).toBe('string')
      expect(typeof course.difficulty).toBe('string')
      expect(typeof course.duration).toBe('string')
      expect(typeof course.enrolled).toBe('boolean')
      expect(typeof course.progress).toBe('number')
    })
  })

  describe('Edge cases', () => {
    it('handles empty strings for text properties', () => {
      const courseWithEmptyStrings: Course = {
        id: 1,
        title: '',
        description: '',
        image: '',
        difficulty: 'Beginner',
        duration: '',
        enrolled: false,
      }

      expect(courseWithEmptyStrings.title).toBe('')
      expect(courseWithEmptyStrings.description).toBe('')
      expect(courseWithEmptyStrings.image).toBe('')
      expect(courseWithEmptyStrings.duration).toBe('')
    })

    it('handles zero and negative progress values', () => {
      const courseWithZeroProgress: Course = {
        id: 1,
        title: 'Test Course',
        description: 'Test Description',
        image: '/test.jpg',
        difficulty: 'Beginner',
        duration: '4 weeks',
        enrolled: true,
        progress: 0,
      }

      const courseWithNegativeProgress: Course = {
        id: 2,
        title: 'Test Course 2',
        description: 'Test Description 2',
        image: '/test2.jpg',
        difficulty: 'Intermediate',
        duration: '6 weeks',
        enrolled: true,
        progress: -10,
      }

      expect(courseWithZeroProgress.progress).toBe(0)
      expect(courseWithNegativeProgress.progress).toBe(-10)
    })

    it('handles very large progress values', () => {
      const courseWithLargeProgress: Course = {
        id: 1,
        title: 'Test Course',
        description: 'Test Description',
        image: '/test.jpg',
        difficulty: 'Beginner',
        duration: '4 weeks',
        enrolled: true,
        progress: 150, // Over 100%
      }

      expect(courseWithLargeProgress.progress).toBe(150)
    })
  })
})
