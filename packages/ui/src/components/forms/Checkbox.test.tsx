import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders as a checkbox', () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('handles checked state', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={onCheckedChange} aria-label="Accept" />)

    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('renders checked state', () => {
    render(<Checkbox checked aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked')
  })

  it('renders unchecked state', () => {
    render(<Checkbox checked={false} aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked')
  })

  it('can be disabled', () => {
    render(<Checkbox disabled aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Checkbox className="custom-check" aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-check')
  })
})
