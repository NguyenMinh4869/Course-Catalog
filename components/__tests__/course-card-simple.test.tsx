import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock the difficulty colors utility with relative path
jest.mock('../../lib/difficulty-colors', () => ({
  getDifficultyColors: jest.fn((difficulty: string) => ({
    solid: 'bg-green-600 text-white'
  }))
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="course-image"
      {...props}
    />
  ),
}))

// Mock UI components
jest.mock('../../ui/card', () => ({
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

jest.mock('../../ui/button', () => ({
  Button: ({ children, className, ...props }: any) => (
    <button 
      data-testid="button" 
      className={className} 
      {...props}
    >
      {children}
    </button>
  ),
}))

jest.mock('../../ui/badge', () => ({
  Badge: ({ children, className, ...props }: any) => (
    <span data-testid="badge" className={className} {...props}>
      {children}
    </span>
  ),
}))

jest.mock('../../ui/progress', () => ({
  Progress: ({ value, className, ...props }: any) => (
    <div 
      data-testid="progress" 
      className={className} 
      data-value={value}
      {...props}
    />
  ),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Clock: ({ className, ...props }: any) => (
    <div data-testid="clock-icon" className={className} {...props} />
  ),
  Users: ({ className, ...props }: any) => (
    <div data-testid="users-icon" className={className} {...props} />
  ),
}))

// Import after mocks
const { CourseCard } = require('../course-card')

describe('CourseCard', () => {
  const mockCourse = {
    id: 1,
    title: 'Test Course Title',
    description: 'This is a test course description that should be displayed properly.',
    image: '/test-image.jpg',
    difficulty: 'Beginner',
    duration: '4 weeks',
    enrolled: false,
  }

  const enrolledCourse = {
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
      
      const image = screen.getByTestId('course-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/test-image.jpg')
      expect(image).toHaveAttribute('alt', 'Test Course Title')
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
      
      const image = screen.getByTestId('course-image')
      expect(image).toHaveAttribute('src', '/placeholder.svg')
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to card', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('group')
      expect(card).toHaveClass('hover:shadow-xl')
      expect(card).toHaveClass('hover:-translate-y-1')
      expect(card).toHaveClass('transition-all')
    })

    it('applies correct CSS classes to image', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByTestId('course-image')
      expect(image).toHaveClass('w-full')
      expect(image).toHaveClass('h-48')
      expect(image).toHaveClass('object-cover')
      expect(image).toHaveClass('group-hover:scale-110')
    })

    it('applies correct CSS classes to title', () => {
      render(<CourseCard course={mockCourse} />)
      
      const title = screen.getByText('Test Course Title')
      expect(title).toHaveClass('font-bold')
      expect(title).toHaveClass('line-clamp-2')
      expect(title).toHaveClass('group-hover:text-primary')
    })

    it('applies correct CSS classes to description', () => {
      render(<CourseCard course={mockCourse} />)
      
      const description = screen.getByText('This is a test course description that should be displayed properly.')
      expect(description).toHaveClass('text-sm')
      expect(description).toHaveClass('line-clamp-3')
      expect(description).toHaveClass('group-hover:text-muted-foreground/80')
    })

    it('applies correct CSS classes to button', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByTestId('button')
      expect(button).toHaveClass('w-full')
      expect(button).toHaveClass('bg-primary')
      expect(button).toHaveClass('group-hover:scale-105')
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text for course image', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByTestId('course-image')
      expect(image).toHaveAttribute('alt', 'Test Course Title')
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
      
      const image = screen.getByTestId('course-image')
      const badge = screen.getByTestId('badge')
      
      // Image and badge should be in the same container
      expect(image.closest('div')).toContainElement(badge)
    })
  })
})
