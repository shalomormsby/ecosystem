import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { createRef } from 'react'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(<Textarea aria-label="Message" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('accepts placeholder text', () => {
    render(<Textarea placeholder="Write here..." />)
    expect(screen.getByPlaceholderText('Write here...')).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Textarea aria-label="Message" />)

    await user.type(screen.getByRole('textbox'), 'Hello world')
    expect(screen.getByRole('textbox')).toHaveValue('Hello world')
  })

  it('can be disabled', () => {
    render(<Textarea disabled aria-label="Message" />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Textarea className="custom-textarea" aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} aria-label="Message" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })
})
