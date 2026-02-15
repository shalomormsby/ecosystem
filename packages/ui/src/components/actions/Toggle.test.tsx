import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('renders with default variant', () => {
    render(<Toggle aria-label="Bold">B</Toggle>)
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument()
  })

  it('handles pressed state changes', async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(<Toggle onPressedChange={onPressedChange} aria-label="Bold">B</Toggle>)

    await user.click(screen.getByRole('button'))
    expect(onPressedChange).toHaveBeenCalledWith(true)
  })

  it('renders pressed state', () => {
    render(<Toggle pressed aria-label="Bold">B</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on')
  })

  it('renders unpressed state', () => {
    render(<Toggle pressed={false} aria-label="Bold">B</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off')
  })

  it('applies custom className', () => {
    render(<Toggle className="custom-toggle" aria-label="Bold">B</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('custom-toggle')
  })

  it('can be disabled', () => {
    render(<Toggle disabled aria-label="Bold">B</Toggle>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
