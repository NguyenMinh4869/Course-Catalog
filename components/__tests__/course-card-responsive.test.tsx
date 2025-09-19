import React from 'react'
import { render, screen } from '@testing-library/react'
import { CourseCard } from '../course-card'
import { Course } from '@/types/course'

// Mock the difficulty colors utility
jest.mock('@/lib/difficulty-colors', () => ({
  getDifficultyColors: jest.fn((difficulty: string) => ({
    solid: 'bg-green-600 text-white'
  }))
}))

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

describe('CourseCard Responsive Design', () => {
  const mockCourse: Course = {
    id: 1,
    title: 'Test Course Title',
    description: 'This is a test course description that should be responsive.',
    image: '/test-image.jpg',
    difficulty: 'Beginner',
    duration: '4 weeks',
    enrolled: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Image Responsiveness', () => {
    it('applies responsive image classes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveClass('w-full')
      expect(image).toHaveClass('h-48')
      expect(image).toHaveClass('object-cover')
    })

    it('maintains aspect ratio with object-cover', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveClass('object-cover')
    })
  })

  describe('Typography Responsiveness', () => {
    it('applies responsive font classes to title', () => {
      render(<CourseCard course={mockCourse} />)
      
      const title = screen.getByText('Test Course Title')
      expect(title).toHaveClass('font-bold')
      expect(title).toHaveClass('line-clamp-2')
    })

    it('applies responsive font classes to description', () => {
      render(<CourseCard course={mockCourse} />)
      
      const description = screen.getByText('This is a test course description that should be responsive.')
      expect(description).toHaveClass('text-sm')
      expect(description).toHaveClass('line-clamp-3')
    })

    it('uses line-clamp for text truncation', () => {
      render(<CourseCard course={mockCourse} />)
      
      const title = screen.getByText('Test Course Title')
      const description = screen.getByText('This is a test course description that should be responsive.')
      
      expect(title).toHaveClass('line-clamp-2')
      expect(description).toHaveClass('line-clamp-3')
    })
  })

  describe('Layout Responsiveness', () => {
    it('applies responsive spacing classes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const content = screen.getByTestId('card-content')
      const footer = screen.getByTestId('card-footer')
      
      expect(content).toHaveClass('p-4')
      expect(content).toHaveClass('space-y-3')
      expect(footer).toHaveClass('p-4')
      expect(footer).toHaveClass('pt-0')
    })

    it('applies responsive gap classes to metadata', () => {
      render(<CourseCard course={mockCourse} />)
      
      const metadataContainer = screen.getByText('4 weeks').closest('div')?.parentElement
      expect(metadataContainer).toHaveClass('gap-4')
    })

    it('applies responsive gap classes to individual metadata items', () => {
      render(<CourseCard course={mockCourse} />)
      
      const clockContainer = screen.getByText('4 weeks').closest('div')
      const usersContainer = screen.getByText('1.2k students').closest('div')
      
      expect(clockContainer).toHaveClass('gap-1')
      expect(usersContainer).toHaveClass('gap-1')
    })
  })

  describe('Button Responsiveness', () => {
    it('applies full width to button', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByTestId('button')
      expect(button).toHaveClass('w-full')
    })

    it('applies small size to button', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByTestId('button')
      expect(button).toHaveAttribute('size', 'sm')
    })
  })

  describe('Progress Bar Responsiveness', () => {
    const enrolledCourse: Course = {
      ...mockCourse,
      enrolled: true,
      progress: 65,
    }

    it('applies responsive height to progress bar', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toHaveClass('h-2')
    })

    it('applies responsive spacing to progress section', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressSection = screen.getByText('Progress').closest('div')
      expect(progressSection).toHaveClass('space-y-2')
    })
  })

  describe('Badge Responsiveness', () => {
    it('applies responsive positioning to badge', () => {
      render(<CourseCard course={mockCourse} />)
      
      const badge = screen.getByTestId('badge')
      expect(badge).toBeInTheDocument()
    })

    it('positions badge absolutely within image container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const imageContainer = screen.getByAltText('Test Course Title').closest('div')
      const badge = screen.getByTestId('badge')
      
      expect(imageContainer).toHaveClass('relative')
      expect(badge.closest('div')).toHaveClass('absolute')
      expect(badge.closest('div')).toHaveClass('top-3')
      expect(badge.closest('div')).toHaveClass('left-3')
    })
  })

  describe('Overflow Handling', () => {
    it('handles overflow in image container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const imageContainer = screen.getByAltText('Test Course Title').closest('div')
      expect(imageContainer).toHaveClass('overflow-hidden')
    })

    it('handles overflow in card container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('overflow-hidden')
    })
  })

  describe('Border Radius Responsiveness', () => {
    it('applies rounded corners to image', () => {
      render(<CourseCard course={mockCourse} />)
      
      const imageContainer = screen.getByAltText('Test Course Title').closest('div')
      expect(imageContainer).toHaveClass('rounded-t-lg')
    })
  })

  describe('Icon Responsiveness', () => {
    it('applies consistent icon sizing', () => {
      render(<CourseCard course={mockCourse} />)
      
      const clockIcon = screen.getByTestId('clock-icon')
      const usersIcon = screen.getByTestId('users-icon')
      
      expect(clockIcon).toHaveClass('h-3')
      expect(clockIcon).toHaveClass('w-3')
      expect(usersIcon).toHaveClass('h-3')
      expect(usersIcon).toHaveClass('w-3')
    })
  })

  describe('Text Responsiveness', () => {
    it('applies consistent text sizing to metadata', () => {
      render(<CourseCard course={mockCourse} />)
      
      const durationText = screen.getByText('4 weeks')
      const studentCountText = screen.getByText('1.2k students')
      
      expect(durationText).toHaveClass('text-xs')
      expect(studentCountText).toHaveClass('text-xs')
    })

    it('applies consistent text sizing to progress labels', () => {
      const enrolledCourse: Course = {
        ...mockCourse,
        enrolled: true,
        progress: 65,
      }

      render(<CourseCard course={enrolledCourse} />)
      
      const progressLabel = screen.getByText('Progress')
      const progressPercentage = screen.getByText('65%')
      
      expect(progressLabel).toHaveClass('text-xs')
      expect(progressPercentage).toHaveClass('text-xs')
    })
  })

  describe('Container Responsiveness', () => {
    it('applies proper container classes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('group')
      expect(card).toHaveClass('border-border')
      expect(card).toHaveClass('bg-card')
    })

    it('applies proper header container classes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const header = screen.getByTestId('card-header')
      expect(header).toHaveClass('p-0')
    })

    it('applies proper content container classes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const content = screen.getByTestId('card-content')
      expect(content).toHaveClass('p-4')
      expect(content).toHaveClass('space-y-3')
    })

    it('applies proper footer container classes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const footer = screen.getByTestId('card-footer')
      expect(footer).toHaveClass('p-4')
      expect(footer).toHaveClass('pt-0')
    })
  })

  describe('Accessibility in Responsive Design', () => {
    it('maintains proper alt text for images', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toBeInTheDocument()
    })

    it('maintains proper button accessibility', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Start Learning')
    })
  })
})
