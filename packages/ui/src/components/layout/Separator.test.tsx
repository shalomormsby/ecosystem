import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders with horizontal orientation by default', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
  })

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-sep" />)
    expect(container.firstChild).toHaveClass('custom-sep')
  })

  it('has separator role when not decorative', () => {
    const { container } = render(<Separator decorative={false} />)
    expect(container.querySelector('[role="separator"]')).toBeInTheDocument()
  })
})
