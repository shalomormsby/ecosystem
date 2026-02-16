import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Container } from './Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Content here</Container>)
    expect(screen.getByText('Content here')).toBeInTheDocument()
  })

  it('defaults to standard max-width', () => {
    const { container } = render(<Container>Content</Container>)
    expect(container.firstChild).toHaveClass('max-w-7xl')
  })

  it('renders wide variant', () => {
    const { container } = render(<Container variant="wide">Content</Container>)
    expect(container.firstChild).toHaveClass('max-w-[1440px]')
  })

  it('renders narrow variant', () => {
    const { container } = render(<Container variant="narrow">Content</Container>)
    expect(container.firstChild).toHaveClass('max-w-4xl')
  })

  it('includes padding by default', () => {
    const { container } = render(<Container>Content</Container>)
    expect(container.firstChild).toHaveClass('px-4')
  })

  it('removes padding when padding=false', () => {
    const { container } = render(<Container padding={false}>Content</Container>)
    expect(container.firstChild).not.toHaveClass('px-4')
  })

  it('renders as different HTML elements', () => {
    render(<Container as="main">Main content</Container>)
    expect(screen.getByText('Main content').tagName).toBe('MAIN')
  })

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-container">Content</Container>)
    expect(container.firstChild).toHaveClass('custom-container')
  })
})
