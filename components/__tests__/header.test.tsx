import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../header'

// Mock next-themes
const mockTheme = 'light'
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
  }),
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="x-icon" />,
}))

// Mock UI components
jest.mock('@/components/ui/input', () => ({
  Input: ({ placeholder, value, onChange, className, ...props }: any) => (
    <input 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  ),
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, size, ...props }: any) => (
    <button 
      data-testid="clear-button"
      onClick={onClick} 
      className={className}
      size={size}
      {...props}
    >
      {children}
    </button>
  ),
}))

// Mock ThemeToggle component
jest.mock('../theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />
}))

describe('Header', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders header with all required elements', () => {
    render(<Header {...defaultProps} />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByAltText('Sonic Logo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search courses...')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('displays correct logo for light theme', () => {
    render(<Header {...defaultProps} />)
    
    const logo = screen.getByAltText('Sonic Logo')
    expect(logo).toHaveAttribute('src', '/Logo.png')
  })

  it('displays correct logo for dark theme', () => {
    jest.doMock('next-themes', () => ({
      useTheme: () => ({
        theme: 'dark',
      }),
    }))

    render(<Header {...defaultProps} />)
    
    const logo = screen.getByAltText('Sonic Logo')
    expect(logo).toHaveAttribute('src', '/Logo DarkMode.png')
  })

  it('renders search input with correct attributes', () => {
    render(<Header {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search courses...')
    expect(searchInput).toHaveAttribute('type', 'text')
    expect(searchInput).toHaveValue('')
  })

  it('calls onSearchChange when search input changes', () => {
    const mockOnSearchChange = jest.fn()
    render(<Header {...defaultProps} onSearchChange={mockOnSearchChange} />)
    
    const searchInput = screen.getByPlaceholderText('Search courses...')
    searchInput.focus()
    searchInput.value = 'test search'
    searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('test search')
  })

  it('displays search query value', () => {
    render(<Header {...defaultProps} searchQuery="test query" />)
    
    const searchInput = screen.getByPlaceholderText('Search courses...')
    expect(searchInput).toHaveValue('test query')
  })

  it('applies correct CSS classes to header', () => {
    render(<Header {...defaultProps} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('border-b')
    expect(header).toHaveClass('bg-background/95')
    expect(header).toHaveClass('backdrop-blur')
  })

  it('applies correct CSS classes to search input', () => {
    render(<Header {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search courses...')
    expect(searchInput).toHaveClass('pl-10')
    expect(searchInput).toHaveClass('pr-4')
    expect(searchInput).toHaveClass('bg-background')
    expect(searchInput).toHaveClass('border-border')
  })

  it('renders search icon', () => {
    render(<Header {...defaultProps} />)
    
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })

  it('renders clear button when search query is not empty', () => {
    render(<Header {...defaultProps} searchQuery="test" />)
    
    const clearButton = screen.getByTestId('clear-button')
    expect(clearButton).toBeInTheDocument()
  })

  it('does not render clear button when search query is empty', () => {
    render(<Header {...defaultProps} searchQuery="" />)
    
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument()
  })

  it('calls onSearchChange with empty string when clear button is clicked', () => {
    const mockOnSearchChange = jest.fn()
    render(<Header {...defaultProps} searchQuery="test" onSearchChange={mockOnSearchChange} />)
    
    const clearButton = screen.getByTestId('clear-button')
    clearButton.click()
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('')
  })

  it('has proper responsive layout classes', () => {
    render(<Header {...defaultProps} />)
    
    const container = screen.getByRole('banner').querySelector('.container')
    expect(container).toHaveClass('mx-auto')
    expect(container).toHaveClass('px-4')
    expect(container).toHaveClass('py-2')
  })

  it('has proper logo sizing classes', () => {
    render(<Header {...defaultProps} />)
    
    const logo = screen.getByAltText('Sonic Logo')
    expect(logo).toHaveClass('w-20')
    expect(logo).toHaveClass('h-20')
    expect(logo).toHaveClass('sm:w-24')
    expect(logo).toHaveClass('sm:h-24')
  })
})
