import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has default loading label for screen readers', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...')
    expect(screen.getByText('Loading...')).toHaveClass('sr-only')
  })

  it('accepts custom label', () => {
    render(<Spinner label="Saving data..." />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving data...')
  })

  it('renders SVG spinner', () => {
    render(<Spinner />)
    const svg = screen.getByRole('status').querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('animate-spin')
  })

  it('applies custom className', () => {
    render(<Spinner className="custom-spinner" />)
    expect(screen.getByRole('status')).toHaveClass('custom-spinner')
  })
})
