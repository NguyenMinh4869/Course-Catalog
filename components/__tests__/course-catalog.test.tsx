import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock the CourseCard component
jest.mock('../course-card', () => ({
  CourseCard: ({ course }: any) => (
    <div data-testid="course-card" data-course-id={course.id}>
      {course.title}
    </div>
  )
}))

// Mock the CourseFilter component
jest.mock('../course-filter', () => ({
  CourseFilter: ({ selectedDifficulty, onDifficultyChange, courseCounts }: any) => (
    <div data-testid="course-filter">
      <select 
        data-testid="difficulty-select"
        value={selectedDifficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
      >
        <option value="All">All ({courseCounts.All})</option>
        <option value="Beginner">Beginner ({courseCounts.Beginner})</option>
        <option value="Intermediate">Intermediate ({courseCounts.Intermediate})</option>
        <option value="Advanced">Advanced ({courseCounts.Advanced})</option>
        <option value="Expert">Expert ({courseCounts.Expert})</option>
      </select>
    </div>
  )
}))

// Mock courses data
jest.mock('@/data/courses.json', () => [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of web development',
    image: '/course1.jpg',
    difficulty: 'Beginner',
    duration: '4 weeks',
    enrolled: false
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and patterns',
    image: '/course2.jpg',
    difficulty: 'Advanced',
    duration: '8 weeks',
    enrolled: true,
    progress: 75
  },
  {
    id: 3,
    title: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts and syntax',
    image: '/course3.jpg',
    difficulty: 'Beginner',
    duration: '6 weeks',
    enrolled: false
  },
  {
    id: 4,
    title: 'Expert System Design',
    description: 'Design scalable and maintainable systems',
    image: '/course4.jpg',
    difficulty: 'Expert',
    duration: '12 weeks',
    enrolled: false
  }
])

// Import after mocks
const { CourseCatalog } = require('../course-catalog')

describe('CourseCatalog', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders course catalog with title and filter', () => {
      render(<CourseCatalog searchQuery="" />)
      
      expect(screen.getByText('Course Catalog')).toBeInTheDocument()
      expect(screen.getByTestId('course-filter')).toBeInTheDocument()
    })

    it('displays all courses by default', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(4)
    })

    it('renders course cards with correct data', () => {
      render(<CourseCatalog searchQuery="" />)
      
      expect(screen.getByText('Introduction to Web Development')).toBeInTheDocument()
      expect(screen.getByText('Advanced React Patterns')).toBeInTheDocument()
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
      expect(screen.getByText('Expert System Design')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('filters courses by title', () => {
      render(<CourseCatalog searchQuery="React" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(1)
      expect(screen.getByText('Advanced React Patterns')).toBeInTheDocument()
    })

    it('filters courses by description', () => {
      render(<CourseCatalog searchQuery="basics" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(1)
      expect(screen.getByText('Introduction to Web Development')).toBeInTheDocument()
    })

    it('filters courses by difficulty', () => {
      render(<CourseCatalog searchQuery="Beginner" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(2)
      expect(screen.getByText('Introduction to Web Development')).toBeInTheDocument()
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
    })

    it('shows search result count when searching', () => {
      render(<CourseCatalog searchQuery="React" />)
      
      expect(screen.getByText('(1 result)')).toBeInTheDocument()
    })

    it('shows plural form for multiple results', () => {
      render(<CourseCatalog searchQuery="Beginner" />)
      
      expect(screen.getByText('(2 results)')).toBeInTheDocument()
    })

    it('is case insensitive', () => {
      render(<CourseCatalog searchQuery="javascript" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(1)
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
    })

    it('handles empty search query', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(4)
      expect(screen.queryByText(/result/)).not.toBeInTheDocument()
    })

    it('handles whitespace-only search query', () => {
      render(<CourseCatalog searchQuery="   " />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(4)
    })
  })

  describe('Difficulty Filter', () => {
    it('filters courses by difficulty when selected', async () => {
      const user = userEvent.setup()
      render(<CourseCatalog searchQuery="" />)
      
      const select = screen.getByTestId('difficulty-select')
      await user.selectOptions(select, 'Beginner')
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(2)
    })

    it('shows all courses when "All" is selected', async () => {
      const user = userEvent.setup()
      render(<CourseCatalog searchQuery="" />)
      
      const select = screen.getByTestId('difficulty-select')
      await user.selectOptions(select, 'All')
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(4)
    })

    it('filters by Advanced difficulty', async () => {
      const user = userEvent.setup()
      render(<CourseCatalog searchQuery="" />)
      
      const select = screen.getByTestId('difficulty-select')
      await user.selectOptions(select, 'Advanced')
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(1)
      expect(screen.getByText('Advanced React Patterns')).toBeInTheDocument()
    })

    it('filters by Expert difficulty', async () => {
      const user = userEvent.setup()
      render(<CourseCatalog searchQuery="" />)
      
      const select = screen.getByTestId('difficulty-select')
      await user.selectOptions(select, 'Expert')
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(1)
      expect(screen.getByText('Expert System Design')).toBeInTheDocument()
    })
  })

  describe('Combined Search and Filter', () => {
    it('applies both search and difficulty filter', async () => {
      const user = userEvent.setup()
      render(<CourseCatalog searchQuery="JavaScript" />)
      
      const select = screen.getByTestId('difficulty-select')
      await user.selectOptions(select, 'Beginner')
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(1)
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
    })

    it('shows no results when search and filter don\'t match', async () => {
      const user = userEvent.setup()
      render(<CourseCatalog searchQuery="React" />)
      
      const select = screen.getByTestId('difficulty-select')
      await user.selectOptions(select, 'Beginner')
      
      expect(screen.getByText('No courses found')).toBeInTheDocument()
    })
  })

  describe('No Results State', () => {
    it('shows no courses found message when no results', () => {
      render(<CourseCatalog searchQuery="nonexistent" />)
      
      expect(screen.getByText('No courses found')).toBeInTheDocument()
      expect(screen.getByText('🔍')).toBeInTheDocument()
    })

    it('shows search-specific message when searching', () => {
      render(<CourseCatalog searchQuery="nonexistent" />)
      
      expect(screen.getByText('No courses match "nonexistent". Try adjusting your search or filters.')).toBeInTheDocument()
    })

    it('shows filter-specific message when not searching', () => {
      render(<CourseCatalog searchQuery="" />)
      
      // This will show the filter message when no courses match the filter
      // We need to trigger a filter that returns no results
      const select = screen.getByTestId('difficulty-select')
      fireEvent.change(select, { target: { value: 'Intermediate' } })
      
      expect(screen.getByText('No courses available with the current filters.')).toBeInTheDocument()
    })
  })

  describe('Course Counts', () => {
    it('calculates correct course counts for all difficulties', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const select = screen.getByTestId('difficulty-select')
      const options = select.querySelectorAll('option')
      
      expect(options[0]).toHaveTextContent('All (4)')
      expect(options[1]).toHaveTextContent('Beginner (2)')
      expect(options[2]).toHaveTextContent('Intermediate (0)')
      expect(options[3]).toHaveTextContent('Advanced (1)')
      expect(options[4]).toHaveTextContent('Expert (1)')
    })

    it('updates course counts based on search results', () => {
      render(<CourseCatalog searchQuery="Beginner" />)
      
      const select = screen.getByTestId('difficulty-select')
      const options = select.querySelectorAll('option')
      
      expect(options[0]).toHaveTextContent('All (2)')
      expect(options[1]).toHaveTextContent('Beginner (2)')
      expect(options[2]).toHaveTextContent('Intermediate (0)')
      expect(options[3]).toHaveTextContent('Advanced (0)')
      expect(options[4]).toHaveTextContent('Expert (0)')
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main section', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const section = screen.getByText('Course Catalog').closest('section')
      expect(section).toBeInTheDocument()
    })

    it('applies correct CSS classes to title', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const title = screen.getByText('Course Catalog')
      expect(title).toHaveClass('text-2xl')
      expect(title).toHaveClass('sm:text-3xl')
      expect(title).toHaveClass('font-black')
      expect(title).toHaveClass('font-[family-name:var(--font-montserrat)]')
    })

    it('applies correct CSS classes to course grid', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const courseGrid = screen.getAllByTestId('course-card')[0].closest('div')
      expect(courseGrid).toHaveClass('grid')
      expect(courseGrid).toHaveClass('grid-cols-1')
      expect(courseGrid).toHaveClass('sm:grid-cols-2')
      expect(courseGrid).toHaveClass('lg:grid-cols-3')
      expect(courseGrid).toHaveClass('xl:grid-cols-4')
    })

    it('applies correct CSS classes to no results section', () => {
      render(<CourseCatalog searchQuery="nonexistent" />)
      
      const noResultsSection = screen.getByText('No courses found').closest('div')
      expect(noResultsSection).toHaveClass('text-center')
      expect(noResultsSection).toHaveClass('py-12')
    })
  })

  describe('Responsive Layout', () => {
    it('has proper responsive header layout', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const header = screen.getByText('Course Catalog').closest('div')
      expect(header).toHaveClass('flex')
      expect(header).toHaveClass('flex-col')
      expect(header).toHaveClass('sm:flex-row')
      expect(header).toHaveClass('sm:items-center')
      expect(header).toHaveClass('justify-between')
    })

    it('has proper responsive course grid', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const courseGrid = screen.getAllByTestId('course-card')[0].closest('div')
      expect(courseGrid).toHaveClass('grid')
      expect(courseGrid).toHaveClass('grid-cols-1')
      expect(courseGrid).toHaveClass('sm:grid-cols-2')
      expect(courseGrid).toHaveClass('lg:grid-cols-3')
      expect(courseGrid).toHaveClass('xl:grid-cols-4')
      expect(courseGrid).toHaveClass('gap-4')
      expect(courseGrid).toHaveClass('sm:gap-6')
    })
  })

  describe('Edge Cases', () => {
    it('handles search query with special characters', () => {
      render(<CourseCatalog searchQuery="React & JavaScript" />)
      
      expect(screen.getByText('No courses found')).toBeInTheDocument()
    })

    it('handles very long search query', () => {
      const longQuery = 'a'.repeat(100)
      render(<CourseCatalog searchQuery={longQuery} />)
      
      expect(screen.getByText('No courses found')).toBeInTheDocument()
    })

    it('handles search query with numbers', () => {
      render(<CourseCatalog searchQuery="123" />)
      
      expect(screen.getByText('No courses found')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('passes correct props to CourseFilter', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const filter = screen.getByTestId('course-filter')
      expect(filter).toBeInTheDocument()
      
      const select = screen.getByTestId('difficulty-select')
      expect(select).toHaveValue('All')
    })

    it('passes correct props to CourseCard components', () => {
      render(<CourseCatalog searchQuery="" />)
      
      const courseCards = screen.getAllByTestId('course-card')
      expect(courseCards).toHaveLength(4)
      
      // Check that each course card has the correct course ID
      expect(courseCards[0]).toHaveAttribute('data-course-id', '1')
      expect(courseCards[1]).toHaveAttribute('data-course-id', '2')
      expect(courseCards[2]).toHaveAttribute('data-course-id', '3')
      expect(courseCards[3]).toHaveAttribute('data-course-id', '4')
    })
  })
})
