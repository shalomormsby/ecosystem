import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Popover, PopoverTrigger, PopoverContent } from './Popover'

describe('Popover', () => {
  it('renders trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument()
  })

  it('opens on click', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('renders open when controlled', () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Visible content</PopoverContent>
      </Popover>
    )
    expect(screen.getByText('Visible content')).toBeInTheDocument()
  })
})
