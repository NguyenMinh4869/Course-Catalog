import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '../theme-provider'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="theme-provider" {...props}>
      {children}
    </div>
  ),
}))

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )

    expect(getByTestId('theme-provider')).toBeInTheDocument()
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('passes props to underlying ThemeProvider', () => {
    const props = {
      attribute: 'class',
      defaultTheme: 'dark',
      enableSystem: true,
      disableTransitionOnChange: true
    }

    const { getByTestId } = render(
      <ThemeProvider {...props}>
        <div>Test Content</div>
      </ThemeProvider>
    )

    const provider = getByTestId('theme-provider')
    expect(provider).toBeInTheDocument()
  })

  it('renders without props', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )

    expect(getByTestId('theme-provider')).toBeInTheDocument()
  })
})
