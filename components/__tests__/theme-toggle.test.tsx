import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../theme-toggle'

// Mock next-themes
const mockSetTheme = jest.fn()
const mockTheme = 'light'

jest.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    theme: mockTheme,
  }),
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Sun: () => <div data-testid="sun-icon" />,
  Moon: () => <div data-testid="moon-icon" />,
}))

// Mock UI Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, size, ...props }: any) => (
    <button 
      data-testid="theme-toggle-button" 
      onClick={onClick} 
      className={className}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    expect(button).toBeInTheDocument()
  })

  it('renders sun and moon icons', () => {
    render(<ThemeToggle />)
    
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  it('calls setTheme when clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    await user.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    await user.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('applies correct CSS classes', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    expect(button).toHaveClass('h-9')
    expect(button).toHaveClass('w-9')
    expect(button).toHaveClass('px-0')
  })

  it('has correct size attribute', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    expect(button).toHaveAttribute('data-size', 'sm')
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('handles multiple clicks', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByTestId('theme-toggle-button')
    
    await user.click(button)
    await user.click(button)
    await user.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledTimes(3)
    expect(mockSetTheme).toHaveBeenNthCalledWith(1, 'dark')
    expect(mockSetTheme).toHaveBeenNthCalledWith(2, 'dark')
    expect(mockSetTheme).toHaveBeenNthCalledWith(3, 'dark')
  })
})

