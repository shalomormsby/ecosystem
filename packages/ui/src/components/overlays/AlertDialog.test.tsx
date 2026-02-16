import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog'

describe('AlertDialog', () => {
  it('renders trigger', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    )

    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument()
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument()
  })

  it('renders action and cancel buttons', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>Sure?</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
  })
})
