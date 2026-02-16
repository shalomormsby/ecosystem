import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible'

describe('Collapsible', () => {
  it('renders trigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByRole('button', { name: /toggle/i })).toBeInTheDocument()
  })

  it('shows content when opened', async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Hidden content')).toBeVisible()
  })

  it('renders open by default when open prop is true', () => {
    render(
      <Collapsible open>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByText('Visible content')).toBeVisible()
  })
})
