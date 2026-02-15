import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

describe('Avatar', () => {
  it('renders fallback text', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('shows fallback when image has not loaded', () => {
    // Radix Avatar only renders <img> after the load event fires,
    // which never happens in jsdom — so fallback is shown instead
    render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('applies custom className to avatar root', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(container.firstChild).toHaveClass('custom-avatar')
  })
})
