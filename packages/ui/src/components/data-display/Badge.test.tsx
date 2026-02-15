import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Active')).toHaveClass('bg-primary')
  })

  it('renders different variants', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary')

    rerender(<Badge variant="destructive">Destructive</Badge>)
    expect(screen.getByText('Destructive')).toHaveClass('bg-destructive')

    rerender(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('text-foreground')

    rerender(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toHaveClass('bg-success')
  })

  it('renders dot indicator when dot prop is true', () => {
    render(<Badge dot>Status</Badge>)
    const dot = screen.getByText('Status').querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('animate-pulse')
  })

  it('does not render dot when dot prop is false', () => {
    render(<Badge>No Dot</Badge>)
    const dot = screen.getByText('No Dot').querySelector('[aria-hidden="true"]')
    expect(dot).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Styled</Badge>)
    expect(screen.getByText('Styled')).toHaveClass('custom-badge')
  })
})
