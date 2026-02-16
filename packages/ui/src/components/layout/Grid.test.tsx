import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Grid } from './Grid'

describe('Grid', () => {
  it('renders children in a grid container', () => {
    render(
      <Grid>
        <div>Cell 1</div>
        <div>Cell 2</div>
      </Grid>
    )
    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
  })

  it('defaults to 1 column', () => {
    const { container } = render(<Grid><div>Child</div></Grid>)
    expect(container.firstChild).toHaveClass('grid', 'grid-cols-1')
  })

  it('renders specified columns', () => {
    const { container } = render(<Grid columns={3}><div>Child</div></Grid>)
    expect(container.firstChild).toHaveClass('grid-cols-3')
  })

  it('applies custom className', () => {
    const { container } = render(<Grid className="custom-grid"><div>Child</div></Grid>)
    expect(container.firstChild).toHaveClass('custom-grid')
  })
})
