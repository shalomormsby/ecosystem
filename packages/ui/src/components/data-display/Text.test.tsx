import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from './Text'

describe('Text', () => {
  it('renders as paragraph by default', () => {
    render(<Text>Hello world</Text>)
    const el = screen.getByText('Hello world')
    expect(el).toBeInTheDocument()
    expect(el.tagName).toBe('P')
  })

  it('renders as span', () => {
    render(<Text as="span">Inline</Text>)
    expect(screen.getByText('Inline').tagName).toBe('SPAN')
  })

  it('renders as div', () => {
    render(<Text as="div">Block</Text>)
    expect(screen.getByText('Block').tagName).toBe('DIV')
  })

  it('applies variant styles', () => {
    const { rerender } = render(<Text variant="primary">Primary</Text>)
    expect(screen.getByText('Primary')).toHaveClass('text-[var(--color-text-primary)]')

    rerender(<Text variant="secondary">Secondary</Text>)
    expect(screen.getByText('Secondary')).toHaveClass('text-[var(--color-text-secondary)]')

    rerender(<Text variant="muted">Muted</Text>)
    expect(screen.getByText('Muted')).toHaveClass('text-[var(--color-text-muted)]')
  })

  it('applies size styles', () => {
    render(<Text size="lg">Large</Text>)
    expect(screen.getByText('Large')).toHaveClass('text-lg')
  })

  it('applies weight styles', () => {
    render(<Text weight="bold">Bold</Text>)
    expect(screen.getByText('Bold')).toHaveClass('font-bold')
  })

  it('applies custom className', () => {
    render(<Text className="custom-text">Styled</Text>)
    expect(screen.getByText('Styled')).toHaveClass('custom-text')
  })
})
