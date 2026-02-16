import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip'

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows content on hover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful info</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByText('Hover me'))
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })
})
