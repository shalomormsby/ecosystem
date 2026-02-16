import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with default variant', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse', 'bg-muted', 'rounded-md')
  })

  it('renders circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />)
    expect(container.firstChild).toHaveClass('rounded-full')
  })

  it('renders rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />)
    expect(container.firstChild).toHaveClass('rounded-none')
  })

  it('renders text variant', () => {
    const { container } = render(<Skeleton variant="text" />)
    expect(container.firstChild).toHaveClass('rounded-sm', 'h-4')
  })

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width="200px" height="40px" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton.style.width).toBe('200px')
    expect(skeleton.style.height).toBe('40px')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-skeleton" />)
    expect(container.firstChild).toHaveClass('custom-skeleton')
  })
})
