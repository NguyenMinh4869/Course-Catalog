import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

describe('CourseCard Animations', () => {
  const mockCourse: Course = {
    id: 1,
    title: 'Test Course Title',
    description: 'This is a test course description.',
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

  describe('Hover Animation Classes', () => {
    it('applies correct hover classes to card container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('group')
      expect(card).toHaveClass('hover:shadow-xl')
      expect(card).toHaveClass('hover:shadow-primary/10')
      expect(card).toHaveClass('hover:-translate-y-1')
      expect(card).toHaveClass('transition-all')
      expect(card).toHaveClass('duration-300')
      expect(card).toHaveClass('ease-out')
    })

    it('applies correct hover classes to image', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveClass('group-hover:scale-110')
      expect(image).toHaveClass('transition-transform')
      expect(image).toHaveClass('duration-500')
      expect(image).toHaveClass('ease-out')
    })

    it('applies correct hover classes to badge', () => {
      render(<CourseCard course={mockCourse} />)
      
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('group-hover:scale-105')
      expect(badge).toHaveClass('transition-transform')
      expect(badge).toHaveClass('duration-300')
      expect(badge).toHaveClass('ease-out')
    })

    it('applies correct hover classes to title', () => {
      render(<CourseCard course={mockCourse} />)
      
      const title = screen.getByText('Test Course Title')
      expect(title).toHaveClass('group-hover:text-primary')
      expect(title).toHaveClass('transition-colors')
      expect(title).toHaveClass('duration-300')
    })

    it('applies correct hover classes to description', () => {
      render(<CourseCard course={mockCourse} />)
      
      const description = screen.getByText('This is a test course description.')
      expect(description).toHaveClass('group-hover:text-muted-foreground/80')
      expect(description).toHaveClass('transition-colors')
      expect(description).toHaveClass('duration-300')
    })

    it('applies correct hover classes to content container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const content = screen.getByTestId('card-content')
      expect(content).toHaveClass('group-hover:bg-card/50')
      expect(content).toHaveClass('transition-colors')
      expect(content).toHaveClass('duration-300')
    })

    it('applies correct hover classes to footer container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const footer = screen.getByTestId('card-footer')
      expect(footer).toHaveClass('group-hover:bg-card/30')
      expect(footer).toHaveClass('transition-colors')
      expect(footer).toHaveClass('duration-300')
    })

    it('applies correct hover classes to button', () => {
      render(<CourseCard course={mockCourse} />)
      
      const button = screen.getByTestId('button')
      expect(button).toHaveClass('group-hover:scale-105')
      expect(button).toHaveClass('group-hover:shadow-lg')
      expect(button).toHaveClass('transition-all')
      expect(button).toHaveClass('duration-300')
      expect(button).toHaveClass('ease-out')
    })
  })

  describe('Progress Section Animations', () => {
    it('applies correct hover classes to progress section for enrolled courses', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressSection = screen.getByText('Progress').closest('div')
      expect(progressSection).toHaveClass('group-hover:scale-[1.02]')
      expect(progressSection).toHaveClass('transition-transform')
      expect(progressSection).toHaveClass('duration-300')
      expect(progressSection).toHaveClass('ease-out')
    })

    it('applies correct hover classes to progress bar', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toHaveClass('group-hover:h-2.5')
      expect(progressBar).toHaveClass('transition-all')
      expect(progressBar).toHaveClass('duration-300')
      expect(progressBar).toHaveClass('ease-out')
    })

    it('applies correct hover classes to progress text', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressText = screen.getByText('Progress')
      expect(progressText).toHaveClass('group-hover:text-foreground')
      expect(progressText).toHaveClass('transition-colors')
      expect(progressText).toHaveClass('duration-300')
    })

    it('applies correct hover classes to progress percentage', () => {
      render(<CourseCard course={enrolledCourse} />)
      
      const progressPercentage = screen.getByText('65%')
      expect(progressPercentage).toHaveClass('group-hover:text-primary')
      expect(progressPercentage).toHaveClass('transition-colors')
      expect(progressPercentage).toHaveClass('duration-300')
    })
  })

  describe('Icon Animations', () => {
    it('applies correct hover classes to clock icon container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const clockContainer = screen.getByText('4 weeks').closest('div')
      expect(clockContainer).toHaveClass('group-hover:scale-105')
      expect(clockContainer).toHaveClass('transition-transform')
      expect(clockContainer).toHaveClass('duration-300')
      expect(clockContainer).toHaveClass('ease-out')
    })

    it('applies correct hover classes to users icon container', () => {
      render(<CourseCard course={mockCourse} />)
      
      const usersContainer = screen.getByText('1.2k students').closest('div')
      expect(usersContainer).toHaveClass('group-hover:scale-105')
      expect(usersContainer).toHaveClass('transition-transform')
      expect(usersContainer).toHaveClass('duration-300')
      expect(usersContainer).toHaveClass('ease-out')
    })

    it('applies correct hover classes to duration text', () => {
      render(<CourseCard course={mockCourse} />)
      
      const durationText = screen.getByText('4 weeks')
      expect(durationText).toHaveClass('group-hover:text-foreground')
      expect(durationText).toHaveClass('transition-colors')
      expect(durationText).toHaveClass('duration-300')
    })

    it('applies correct hover classes to student count text', () => {
      render(<CourseCard course={mockCourse} />)
      
      const studentCountText = screen.getByText('1.2k students')
      expect(studentCountText).toHaveClass('group-hover:text-foreground')
      expect(studentCountText).toHaveClass('transition-colors')
      expect(studentCountText).toHaveClass('duration-300')
    })
  })

  describe('Overlay Animations', () => {
    it('applies correct hover classes to image overlay', () => {
      render(<CourseCard course={mockCourse} />)
      
      // The overlay is a div with specific classes
      const imageContainer = screen.getByAltText('Test Course Title').closest('div')
      const overlay = imageContainer?.querySelector('div[class*="bg-black"]')
      
      expect(overlay).toHaveClass('bg-black/0')
      expect(overlay).toHaveClass('group-hover:bg-black/10')
      expect(overlay).toHaveClass('transition-colors')
      expect(overlay).toHaveClass('duration-300')
    })
  })

  describe('Animation Timing', () => {
    it('uses consistent timing for most animations', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      const title = screen.getByText('Test Course Title')
      const description = screen.getByText('This is a test course description.')
      const button = screen.getByTestId('button')
      
      // Most animations use 300ms duration
      expect(card).toHaveClass('duration-300')
      expect(title).toHaveClass('duration-300')
      expect(description).toHaveClass('duration-300')
      expect(button).toHaveClass('duration-300')
    })

    it('uses longer timing for image scale animation', () => {
      render(<CourseCard course={mockCourse} />)
      
      const image = screen.getByAltText('Test Course Title')
      expect(image).toHaveClass('duration-500')
    })

    it('uses ease-out timing for smooth animations', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      const image = screen.getByAltText('Test Course Title')
      const button = screen.getByTestId('button')
      
      expect(card).toHaveClass('ease-out')
      expect(image).toHaveClass('ease-out')
      expect(button).toHaveClass('ease-out')
    })
  })

  describe('Responsive Animation Classes', () => {
    it('maintains animation classes across different screen sizes', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      const image = screen.getByAltText('Test Course Title')
      const button = screen.getByTestId('button')
      
      // Animation classes should be present regardless of screen size
      expect(card).toHaveClass('group')
      expect(image).toHaveClass('group-hover:scale-110')
      expect(button).toHaveClass('group-hover:scale-105')
    })
  })

  describe('Animation Performance', () => {
    it('uses transform properties for better performance', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      const image = screen.getByAltText('Test Course Title')
      const badge = screen.getByTestId('badge')
      
      // Transform-based animations are GPU accelerated
      expect(card).toHaveClass('hover:-translate-y-1')
      expect(image).toHaveClass('group-hover:scale-110')
      expect(badge).toHaveClass('group-hover:scale-105')
    })

    it('uses transition classes for smooth animations', () => {
      render(<CourseCard course={mockCourse} />)
      
      const card = screen.getByTestId('card')
      const image = screen.getByAltText('Test Course Title')
      const title = screen.getByText('Test Course Title')
      
      expect(card).toHaveClass('transition-all')
      expect(image).toHaveClass('transition-transform')
      expect(title).toHaveClass('transition-colors')
    })
  })
})
