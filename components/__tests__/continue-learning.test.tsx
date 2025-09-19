import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock the difficulty colors utility
jest.mock('@/lib/difficulty-colors', () => ({
  getDifficultyColors: jest.fn((difficulty: string) => ({
    solid: 'bg-green-600 text-white'
  }))
}))

// Mock CourseCard component
jest.mock('../course-card', () => ({
  CourseCard: ({ course }: any) => (
    <div data-testid="course-card" data-course-id={course.id}>
      {course.title}
    </div>
  )
}))

// Mock continue learning data
jest.mock('@/data/continue-learning.json', () => [
  {
    id: 9,
    title: 'Intro to Sonic Smart Contracts',
    description: 'Learn the fundamentals of smart contract development on the Sonic blockchain platform.',
    image: '/Intro to Sonic Smart Contracts.jpg',
    difficulty: 'Beginner',
    duration: '4 weeks',
    enrolled: true,
    progress: 65
  },
  {
    id: 10,
    title: 'Advanced DeFi Protocols on Sonic',
    description: 'Deep dive into complex DeFi protocols and yield farming strategies.',
    image: '/Advanced DeFi Protocols on Sonic.png',
    difficulty: 'Advanced',
    duration: '8 weeks',
    enrolled: true,
    progress: 30
  },
  {
    id: 11,
    title: 'Sonic Network Architecture',
    description: 'Understand the technical foundations and architecture of the Sonic network.',
    image: '/Sonic Network Architecture.png',
    difficulty: 'Intermediate',
    duration: '5 weeks',
    enrolled: true,
    progress: 85
  }
])

// Import after mocks
const { ContinueLearning } = require('../continue-learning')

describe('ContinueLearning', () => {
  it('renders the continue learning section', () => {
    render(<ContinueLearning />)
    
    expect(screen.getByText('Continue Learning')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<ContinueLearning />)
    
    expect(screen.getByText('Keep progressing through personalized courses selected for you')).toBeInTheDocument()
  })

  it('renders the "View All" link', () => {
    render(<ContinueLearning />)
    
    expect(screen.getByText('View All →')).toBeInTheDocument()
  })

  it('renders course cards for continue learning courses', () => {
    render(<ContinueLearning />)
    
    const courseCards = screen.getAllByTestId('course-card')
    expect(courseCards).toHaveLength(3)
  })

  it('displays correct course titles', () => {
    render(<ContinueLearning />)
    
    expect(screen.getByText('Intro to Sonic Smart Contracts')).toBeInTheDocument()
    expect(screen.getByText('Advanced DeFi Protocols on Sonic')).toBeInTheDocument()
    expect(screen.getByText('Sonic Network Architecture')).toBeInTheDocument()
  })

  it('applies correct CSS classes to main section', () => {
    render(<ContinueLearning />)
    
    const section = screen.getByText('Continue Learning').closest('section')
    expect(section).toHaveClass('bg-[#FDF8EE]')
    expect(section).toHaveClass('dark:bg-[#111112]')
    expect(section).toHaveClass('border')
    expect(section).toHaveClass('border-[#8B4513]')
    expect(section).toHaveClass('dark:border-[#333333]')
    expect(section).toHaveClass('rounded-[20px]')
  })

  it('applies correct CSS classes to title', () => {
    render(<ContinueLearning />)
    
    const title = screen.getByText('Continue Learning')
    expect(title).toHaveClass('text-xl')
    expect(title).toHaveClass('sm:text-2xl')
    expect(title).toHaveClass('font-black')
    expect(title).toHaveClass('font-[family-name:var(--font-montserrat)]')
  })

  it('applies correct CSS classes to description', () => {
    render(<ContinueLearning />)
    
    const description = screen.getByText('Keep progressing through personalized courses selected for you')
    expect(description).toHaveClass('text-sm')
    expect(description).toHaveClass('text-[#111112]/70')
    expect(description).toHaveClass('dark:text-gray-300')
    expect(description).toHaveClass('mb-4')
    expect(description).toHaveClass('leading-relaxed')
  })

  it('applies correct CSS classes to view all link', () => {
    render(<ContinueLearning />)
    
    const viewAllLink = screen.getByText('View All →')
    expect(viewAllLink).toHaveClass('text-sm')
    expect(viewAllLink).toHaveClass('text-[#111112]')
    expect(viewAllLink).toHaveClass('dark:text-blue-400')
    expect(viewAllLink).toHaveClass('hover:text-[#111112]/80')
    expect(viewAllLink).toHaveClass('dark:hover:text-blue-300')
    expect(viewAllLink).toHaveClass('underline')
  })

  it('applies correct CSS classes to course grid', () => {
    render(<ContinueLearning />)
    
    const courseGrid = screen.getAllByTestId('course-card')[0].closest('div')?.parentElement
    expect(courseGrid).toHaveClass('grid')
    expect(courseGrid).toHaveClass('grid-cols-1')
    expect(courseGrid).toHaveClass('sm:grid-cols-2')
    expect(courseGrid).toHaveClass('lg:grid-cols-3')
    expect(courseGrid).toHaveClass('gap-4')
    expect(courseGrid).toHaveClass('sm:gap-6')
    expect(courseGrid).toHaveClass('items-stretch')
  })

  it('has proper responsive layout structure', () => {
    render(<ContinueLearning />)
    
    const mainContainer = screen.getByText('Continue Learning').closest('section')?.querySelector('div')
    expect(mainContainer).toHaveClass('flex')
    expect(mainContainer).toHaveClass('flex-col')
    expect(mainContainer).toHaveClass('lg:flex-row')
    expect(mainContainer).toHaveClass('gap-6')
    expect(mainContainer).toHaveClass('lg:gap-8')
  })

  it('has proper text content structure', () => {
    render(<ContinueLearning />)
    
    const textContent = screen.getByText('Continue Learning').closest('div')
    expect(textContent).toHaveClass('flex-1')
    expect(textContent).toHaveClass('lg:max-w-md')
  })

  it('renders all continue learning courses with correct data', () => {
    render(<ContinueLearning />)
    
    const courseCards = screen.getAllByTestId('course-card')
    
    // Check that all 3 courses are rendered
    expect(courseCards).toHaveLength(3)
    
    // Check course IDs
    expect(courseCards[0]).toHaveAttribute('data-course-id', '9')
    expect(courseCards[1]).toHaveAttribute('data-course-id', '10')
    expect(courseCards[2]).toHaveAttribute('data-course-id', '11')
  })

  it('has proper dark mode classes', () => {
    render(<ContinueLearning />)
    
    const section = screen.getByText('Continue Learning').closest('section')
    expect(section).toHaveClass('dark:bg-[#111112]')
    expect(section).toHaveClass('dark:border-[#333333]')
    
    const title = screen.getByText('Continue Learning')
    expect(title).toHaveClass('dark:text-white')
    
    const description = screen.getByText('Keep progressing through personalized courses selected for you')
    expect(description).toHaveClass('dark:text-gray-300')
  })

  it('has proper transition classes', () => {
    render(<ContinueLearning />)
    
    const section = screen.getByText('Continue Learning').closest('section')
    expect(section).toHaveClass('transition-colors')
    expect(section).toHaveClass('duration-300')
  })
})
