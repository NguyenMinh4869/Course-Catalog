import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CourseCard } from '../course-card'
import { Course } from '@/types/course'

// Mock the difficulty colors utility
jest.mock('@/lib/difficulty-colors', () => ({
  getDifficultyColors: jest.fn((difficulty: string) => {
    const colors = {
      beginner: { solid: 'bg-green-600 text-white' },
      intermediate: { solid: 'bg-yellow-600 text-white' },
      advanced: { solid: 'bg-orange-600 text-white' },
      expert: { solid: 'bg-red-600 text-white' },
      default: { solid: 'bg-gray-600 text-white' }
    }
    return colors[difficulty.toLowerCase()] || colors.default
  })
})

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, className, ...props }: any) => (
    <div data-testid="card-header" className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div data-testid="card-content" className={className} {...props}>
      {children}
    </div>
  ),
  CardFooter: ({ children, className, ...props }: any) => (
    <div data-testid="card-footer" className={className} {...props}>
      {children}
    </div>
  ),
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, onClick, ...props }: any) => (
    <button 
      data-testid="button" 
      className={className} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}))

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className, ...props }: any) => (
    <span data-testid="badge" className={className} {...props}>
      {children}
    </span>
  ),
}))

jest.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className, ...props }: any) => (
    <div 
      data-testid="progress" 
      className={className} 
      data-value={value}
      {...props}
    />
  ),
}))

describe('CourseCard', () => {
  const mockCourse: Course = {
    id: 1,
    title: 'Test Course Title',
    description: 'This is a test course description that should be displayed properly.',
    image: '/test-image.jpg',
    difficulty: 'Beginner',
    duration: '4 weeks',
    enrolled: false,
  }

  const enrolledCourse: Course = {
    ...mockCourse,
    id: 2,
    enrolled: true,
    progress: 65,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders course card with all required elements', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByTestId('card-header')).toBeInTheDocument()
      expect(screen.getByTestId('card-content')).toBeInTheDocument()
      expect(screen.getByTestId('card-footer')).toBeInTheDocument()
    })

    it('displays course title correctly', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByText('Test Course Title')).toBeInTheDocument()
    })

    it('displays course description correctly', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByText('This is a test course description that should be displayed properly.')).toBeInTheDocument()
    })

    it('displays course image with correct attributes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/test-image.jpg')
      expect(image).toHaveAttribute('width', '300')
      expect(image).toHaveAttribute('height', '200')
    })

    it('displays difficulty badge with correct text', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByTestId('badge')).toBeInTheDocument()
      expect(screen.getByText('Beginner')).toBeInTheDocument()
    })

    it('displays duration and student count', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByText('4 weeks')).toBeInTheDocument()
      expect(screen.getByText('1.2k students')).toBeInTheDocument()
    })

    it('displays clock and users icons', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByTestId('clock-icon')).toBeInTheDocument()
      expect(screen.getByTestId('users-icon')).toBeInTheDocument()
    })
  })

  describe('Button Text', () => {
    it('displays "Start Learning" for non-enrolled courses', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.getByText('Start Learning')).toBeInTheDocument()
    })

    it('displays "Continue" for enrolled courses', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      expect(screen.getByText('Continue')).toBeInTheDocument()
    })
  })

  describe('Progress Section', () => {
    it('does not display progress section for non-enrolled courses', () => {
      render(<CourseCard course={mockCourse} />)
      
      expect(screen.queryByText('Progress')).not.toBeInTheDocument()
      expect(screen.queryByTestId('progress')).not.toBeInTheDocument()
    })

    it('displays progress section for enrolled courses', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      expect(screen.getByText('Progress')).toBeInTheDocument()
      expect(screen.getByText('65%')).toBeInTheDocument()
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('displays correct progress value', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toHaveAttribute('data-value', '65')
    })
  })

  describe('Image Fallback', () => {
    it('uses placeholder image when course image is not provided', () => {
      const courseWithoutImage = { ...mockCourse, image: '' }
      render(<CourseCard course={courseWithoutImage} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveAttribute('src', '/placeholder.svg')
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to card', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('group', 'hover:shadow-xl', 'hover:-translate-y-1', 'transition-all')
    })

    it('applies correct CSS classes to image', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveClass('w-full', 'h-48', 'object-cover', 'group-hover:scale-110')
    })

    it('applies correct CSS classes to title', () => {
      render(<CourseCard course={mockCourse} />)
      
      const title = screen.getByText('Test Course Title')
      expect(title).toHaveClass('font-bold', 'line-clamp-2', 'group-hover:text-primary')
    })

    it('applies correct CSS classes to description', () => {
      render(<CourseCard course={mockCourse} />)
      
      const description = screen.getByText('This is a test course description that should be displayed properly.')
      expect(description).toHaveClass('text-sm', 'line-clamp-3', 'group-hover:text-muted-foreground/80')
    })

    it('applies correct CSS classes to button', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByTestId('button')
      expect(button).toHaveClass('w-full', 'bg-primary', 'group-hover:scale-105')
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text for course image', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toBeInTheDocument()
    })

    it('has proper button accessibility', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Start Learning')
    })
  })

  describe('Different Difficulty Levels', () => {
    const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    
    difficulties.forEach(difficulty => {
      it(`renders correctly for ${difficulty} difficulty`, () => {
        const course = { ...mockCourse, difficulty }
        render(<CourseCard course={course} />)
        
        expect(screen.getByText(difficulty)).toBeInTheDocument()
        expect(screen.getByTestId('badge')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles course with very long title', () => {
      const longTitleCourse = {
        ...mockCourse,
        title: 'This is a very long course title that should be truncated properly with line-clamp-2 class'
      }
      render(<CourseCard course={longTitleCourse} />)
      
      expect(screen.getByText(longTitleCourse.title)).toBeInTheDocument()
    })

    it('handles course with very long description', () => {
      const longDescCourse = {
        ...mockCourse,
        description: 'This is a very long course description that should be truncated properly with line-clamp-3 class and should not break the layout of the card component'
      }
      render(<CourseCard course={longDescCourse} />)
      
      expect(screen.getByText(longDescCourse.description)).toBeInTheDocument()
    })

    it('handles course with undefined progress', () => {
      const courseWithUndefinedProgress = {
        ...mockCourse,
        enrolled: true,
        progress: undefined
      }
      render(<CourseCard course={courseWithUndefinedProgress} />)
      
      expect(screen.queryByText('Progress')).not.toBeInTheDocument()
    })

    it('handles course with 0% progress', () => {
      const courseWithZeroProgress = {
        ...mockCourse,
        enrolled: true,
        progress: 0
      }
      render(<CourseCard course={courseWithZeroProgress} />)
      
      expect(screen.getByText('Progress')).toBeInTheDocument()
      expect(screen.getByText('0%')).toBeInTheDocument()
    })

    it('handles course with 100% progress', () => {
      const courseWithFullProgress = {
        ...mockCourse,
        enrolled: true,
        progress: 100
      }
      render(<CourseCard course={courseWithFullProgress} />)
      
      expect(screen.getByText('Progress')).toBeInTheDocument()
      expect(screen.getByText('100%')).toBeInTheDocument()
    })
  })

  describe('Interactive Behavior', () => {
    it('button is clickable', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      // Button should be clickable (no error thrown)
      expect(button).toBeInTheDocument()
    })

    it('maintains hover classes for animations', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('group')
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveClass('group-hover:scale-110')
      
      const title = screen.getByText('Test Course Title')
      expect(title).toHaveClass('group-hover:text-primary')
    })
  })

  describe('Component Structure', () => {
    it('has correct component hierarchy', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      const header = screen.getByTestId('card-header')
      const content = screen.getByTestId('card-content')
      const footer = screen.getByTestId('card-footer')
      
      expect(card).toContainElement(header)
      expect(card).toContainElement(content)
      expect(card).toContainElement(footer)
    })

    it('has proper image container structure', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      const badge = screen.getByTestId('badge')
      
      // Image and badge should be in the same container
      expect(image.closest('div')).toContainElement(badge)
    })
  })
})
