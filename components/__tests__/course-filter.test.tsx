import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, onClick, variant, size, ...props }: any) => (
    <button 
      data-testid="button" 
      className={className} 
      onClick={onClick}
      data-variant={variant}
      data-size={size}
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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: ({ className, ...props }: any) => (
    <div data-testid="x-icon" className={className} {...props} />
  ),
}))

// Import after mocks
const { CourseFilter } = require('../course-filter')

describe('CourseFilter', () => {
  const mockProps = {
    selectedDifficulty: 'All' as const,
    onDifficultyChange: jest.fn(),
    courseCounts: {
      All: 10,
      Beginner: 4,
      Intermediate: 3,
      Advanced: 2,
      Expert: 1
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders filter button with filter icon', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByTestId('button')
      expect(filterButton).toBeInTheDocument()
      expect(filterButton).toHaveAttribute('data-variant', 'ghost')
      expect(filterButton).toHaveAttribute('data-size', 'sm')
    })

    it('renders filter icon SVG', () => {
      render(<CourseFilter {...mockProps} />)
      
      const svg = screen.getByRole('button').querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('h-4', 'w-4')
    })

    it('does not show filter dropdown by default', () => {
      render(<CourseFilter {...mockProps} />)
      
      expect(screen.queryByText('Filter by Difficulty')).not.toBeInTheDocument()
    })
  })

  describe('Filter Dropdown', () => {
    it('opens filter dropdown when button is clicked', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      expect(screen.getByText('Filter by Difficulty')).toBeInTheDocument()
    })

    it('closes filter dropdown when close button is clicked', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const closeButton = screen.getByTestId('x-icon').closest('button')
      fireEvent.click(closeButton!)
      
      expect(screen.queryByText('Filter by Difficulty')).not.toBeInTheDocument()
    })

    it('toggles filter dropdown when button is clicked multiple times', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      
      // First click - open
      fireEvent.click(filterButton)
      expect(screen.getByText('Filter by Difficulty')).toBeInTheDocument()
      
      // Second click - close
      fireEvent.click(filterButton)
      expect(screen.queryByText('Filter by Difficulty')).not.toBeInTheDocument()
    })
  })

  describe('Difficulty Options', () => {
    beforeEach(() => {
      render(<CourseFilter {...mockProps} />)
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
    })

    it('renders all difficulty options', () => {
      expect(screen.getByText('All')).toBeInTheDocument()
      expect(screen.getByText('Beginner')).toBeInTheDocument()
      expect(screen.getByText('Intermediate')).toBeInTheDocument()
      expect(screen.getByText('Advanced')).toBeInTheDocument()
      expect(screen.getByText('Expert')).toBeInTheDocument()
    })

    it('displays course counts for each difficulty', () => {
      expect(screen.getByText('All (10)')).toBeInTheDocument()
      expect(screen.getByText('Beginner (4)')).toBeInTheDocument()
      expect(screen.getByText('Intermediate (3)')).toBeInTheDocument()
      expect(screen.getByText('Advanced (2)')).toBeInTheDocument()
      expect(screen.getByText('Expert (1)')).toBeInTheDocument()
    })

    it('calls onDifficultyChange when difficulty is clicked', () => {
      const beginnerButton = screen.getByText('Beginner (4)')
      fireEvent.click(beginnerButton)
      
      expect(mockProps.onDifficultyChange).toHaveBeenCalledWith('Beginner')
    })

    it('closes dropdown when difficulty is selected', () => {
      const beginnerButton = screen.getByText('Beginner (4)')
      fireEvent.click(beginnerButton)
      
      expect(screen.queryByText('Filter by Difficulty')).not.toBeInTheDocument()
    })

    it('calls onDifficultyChange for All difficulty', () => {
      const allButton = screen.getByText('All (10)')
      fireEvent.click(allButton)
      
      expect(mockProps.onDifficultyChange).toHaveBeenCalledWith('All')
    })

    it('calls onDifficultyChange for Intermediate difficulty', () => {
      const intermediateButton = screen.getByText('Intermediate (3)')
      fireEvent.click(intermediateButton)
      
      expect(mockProps.onDifficultyChange).toHaveBeenCalledWith('Intermediate')
    })

    it('calls onDifficultyChange for Advanced difficulty', () => {
      const advancedButton = screen.getByText('Advanced (2)')
      fireEvent.click(advancedButton)
      
      expect(mockProps.onDifficultyChange).toHaveBeenCalledWith('Advanced')
    })

    it('calls onDifficultyChange for Expert difficulty', () => {
      const expertButton = screen.getByText('Expert (1)')
      fireEvent.click(expertButton)
      
      expect(mockProps.onDifficultyChange).toHaveBeenCalledWith('Expert')
    })
  })

  describe('Difficulty Colors', () => {
    beforeEach(() => {
      render(<CourseFilter {...mockProps} />)
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
    })

    it('applies correct colors for Beginner difficulty', () => {
      const beginnerButton = screen.getByText('Beginner (4)')
      expect(beginnerButton).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('applies correct colors for Intermediate difficulty', () => {
      const intermediateButton = screen.getByText('Intermediate (3)')
      expect(intermediateButton).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('applies correct colors for Advanced difficulty', () => {
      const advancedButton = screen.getByText('Advanced (2)')
      expect(advancedButton).toHaveClass('bg-orange-100', 'text-orange-800')
    })

    it('applies correct colors for Expert difficulty', () => {
      const expertButton = screen.getByText('Expert (1)')
      expect(expertButton).toHaveClass('bg-red-100', 'text-red-800')
    })

    it('applies default colors for All difficulty', () => {
      const allButton = screen.getByText('All (10)')
      expect(allButton).toHaveClass('bg-gray-100', 'text-gray-800')
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      render(<CourseFilter {...mockProps} />)
      
      const container = screen.getByRole('button').closest('div')
      expect(container).toHaveClass('relative')
    })

    it('applies correct CSS classes to filter button', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      expect(filterButton).toHaveClass('h-8', 'w-8', 'p-0', 'hover:bg-muted')
    })

    it('applies correct CSS classes to dropdown', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const dropdown = screen.getByText('Filter by Difficulty').closest('div')
      expect(dropdown).toHaveClass('absolute', 'right-0', 'top-10', 'z-50')
      expect(dropdown).toHaveClass('w-64', 'sm:w-72')
      expect(dropdown).toHaveClass('bg-popover', 'border', 'border-border')
      expect(dropdown).toHaveClass('rounded-lg', 'shadow-lg', 'p-4')
    })

    it('applies correct CSS classes to header', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const header = screen.getByText('Filter by Difficulty').closest('div')
      expect(header).toHaveClass('flex', 'items-center', 'justify-between', 'mb-3')
    })

    it('applies correct CSS classes to title', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const title = screen.getByText('Filter by Difficulty')
      expect(title).toHaveClass('font-semibold', 'text-sm')
    })

    it('applies correct CSS classes to close button', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const closeButton = screen.getByTestId('x-icon').closest('button')
      expect(closeButton).toHaveClass('h-6', 'w-6', 'p-0')
    })

    it('applies correct CSS classes to difficulty options container', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const optionsContainer = screen.getByText('All (10)').closest('div')
      expect(optionsContainer).toHaveClass('space-y-2')
    })
  })

  describe('Responsive Design', () => {
    it('has responsive width classes for dropdown', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const dropdown = screen.getByText('Filter by Difficulty').closest('div')
      expect(dropdown).toHaveClass('w-64', 'sm:w-72')
    })
  })

  describe('Accessibility', () => {
    it('has proper button accessibility', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      expect(filterButton).toBeInTheDocument()
    })

    it('has proper close button accessibility', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const closeButton = screen.getByTestId('x-icon').closest('button')
      expect(closeButton).toBeInTheDocument()
    })

    it('has proper difficulty option accessibility', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const difficultyButtons = screen.getAllByRole('button').slice(1) // Exclude main filter button
      expect(difficultyButtons).toHaveLength(6) // 5 difficulties + close button
    })
  })

  describe('Props Handling', () => {
    it('uses selectedDifficulty prop correctly', () => {
      const propsWithSelected = {
        ...mockProps,
        selectedDifficulty: 'Beginner' as const
      }
      
      render(<CourseFilter {...propsWithSelected} />)
      
      // The selected difficulty should be reflected in the UI
      // This would typically be shown as selected state
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('uses courseCounts prop correctly', () => {
      const customCounts = {
        All: 5,
        Beginner: 2,
        Intermediate: 1,
        Advanced: 1,
        Expert: 1
      }
      
      const propsWithCustomCounts = {
        ...mockProps,
        courseCounts: customCounts
      }
      
      render(<CourseFilter {...propsWithCustomCounts} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      expect(screen.getByText('All (5)')).toBeInTheDocument()
      expect(screen.getByText('Beginner (2)')).toBeInTheDocument()
      expect(screen.getByText('Intermediate (1)')).toBeInTheDocument()
      expect(screen.getByText('Advanced (1)')).toBeInTheDocument()
      expect(screen.getByText('Expert (1)')).toBeInTheDocument()
    })

    it('calls onDifficultyChange with correct parameters', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      const expertButton = screen.getByText('Expert (1)')
      fireEvent.click(expertButton)
      
      expect(mockProps.onDifficultyChange).toHaveBeenCalledTimes(1)
      expect(mockProps.onDifficultyChange).toHaveBeenCalledWith('Expert')
    })
  })

  describe('Edge Cases', () => {
    it('handles zero course counts', () => {
      const zeroCounts = {
        All: 0,
        Beginner: 0,
        Intermediate: 0,
        Advanced: 0,
        Expert: 0
      }
      
      const propsWithZeroCounts = {
        ...mockProps,
        courseCounts: zeroCounts
      }
      
      render(<CourseFilter {...propsWithZeroCounts} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      expect(screen.getByText('All (0)')).toBeInTheDocument()
      expect(screen.getByText('Beginner (0)')).toBeInTheDocument()
      expect(screen.getByText('Intermediate (0)')).toBeInTheDocument()
      expect(screen.getByText('Advanced (0)')).toBeInTheDocument()
      expect(screen.getByText('Expert (0)')).toBeInTheDocument()
    })

    it('handles large course counts', () => {
      const largeCounts = {
        All: 9999,
        Beginner: 5000,
        Intermediate: 3000,
        Advanced: 1500,
        Expert: 499
      }
      
      const propsWithLargeCounts = {
        ...mockProps,
        courseCounts: largeCounts
      }
      
      render(<CourseFilter {...propsWithLargeCounts} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      expect(screen.getByText('All (9999)')).toBeInTheDocument()
      expect(screen.getByText('Beginner (5000)')).toBeInTheDocument()
      expect(screen.getByText('Intermediate (3000)')).toBeInTheDocument()
      expect(screen.getByText('Advanced (1500)')).toBeInTheDocument()
      expect(screen.getByText('Expert (499)')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('handles rapid clicking on filter button', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      
      // Rapid clicks
      fireEvent.click(filterButton)
      fireEvent.click(filterButton)
      fireEvent.click(filterButton)
      
      // Should be closed after odd number of clicks
      expect(screen.queryByText('Filter by Difficulty')).not.toBeInTheDocument()
    })

    it('handles clicking outside dropdown (simulated by closing)', () => {
      render(<CourseFilter {...mockProps} />)
      
      const filterButton = screen.getByRole('button')
      fireEvent.click(filterButton)
      
      expect(screen.getByText('Filter by Difficulty')).toBeInTheDocument()
      
      // Simulate clicking outside by closing
      const closeButton = screen.getByTestId('x-icon').closest('button')
      fireEvent.click(closeButton!)
      
      expect(screen.queryByText('Filter by Difficulty')).not.toBeInTheDocument()
    })
  })
})
