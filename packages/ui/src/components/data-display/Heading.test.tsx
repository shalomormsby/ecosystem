import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders h1', () => {
    render(<Heading level={1}>Page Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Title')
  })

  it('renders h2', () => {
    render(<Heading level={2}>Section</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section')
  })

  it('renders h3', () => {
    render(<Heading level={3}>Subsection</Heading>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection')
  })

  it('renders all levels (4, 5, 6)', () => {
    const { rerender } = render(<Heading level={4}>H4</Heading>)
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()

    rerender(<Heading level={5}>H5</Heading>)
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument()

    rerender(<Heading level={6}>H6</Heading>)
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Heading level={1} className="custom-heading">Title</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('custom-heading')
  })
})
