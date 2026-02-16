import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from './Alert'

describe('Alert', () => {
  it('renders with default variant', () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('bg-card')
  })

  it('renders destructive variant', () => {
    render(<Alert variant="destructive">Error</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('text-destructive')
  })

  it('renders title and description', () => {
    render(
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    )
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Alert className="custom-alert">Content</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('custom-alert')
  })

  it('has correct data-slot attributes', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Desc</AlertDescription>
      </Alert>
    )
    expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert')
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'alert-title')
    expect(screen.getByText('Desc')).toHaveAttribute('data-slot', 'alert-description')
  })
})
