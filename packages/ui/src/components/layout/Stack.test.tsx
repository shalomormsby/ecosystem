import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stack } from './Stack'

describe('Stack', () => {
  it('renders children in a flex container', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('defaults to column direction', () => {
    const { container } = render(<Stack><div>Child</div></Stack>)
    expect(container.firstChild).toHaveClass('flex-col')
  })

  it('renders row direction', () => {
    const { container } = render(<Stack direction="row"><div>Child</div></Stack>)
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('applies alignment', () => {
    const { container } = render(<Stack align="center"><div>Child</div></Stack>)
    expect(container.firstChild).toHaveClass('items-center')
  })

  it('applies justify', () => {
    const { container } = render(<Stack justify="between"><div>Child</div></Stack>)
    expect(container.firstChild).toHaveClass('justify-between')
  })

  it('applies custom className', () => {
    const { container } = render(<Stack className="custom-stack"><div>Child</div></Stack>)
    expect(container.firstChild).toHaveClass('custom-stack')
  })
})
