import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('renders a label element', () => {
    render(<Label>Name</Label>)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('associates with input via htmlFor', () => {
    render(<Label htmlFor="name-input">Name</Label>)
    expect(screen.getByText('Name')).toHaveAttribute('for', 'name-input')
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Email</Label>)
    expect(screen.getByText('Email')).toHaveClass('custom-label')
  })
})
