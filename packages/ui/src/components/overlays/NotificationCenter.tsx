'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

// ============================================================================
// Types
// ============================================================================

export interface NotificationItem {
  id: string
  title: string
  description?: string
  timestamp: string | Date
  read?: boolean
  icon?: React.ReactNode
  action?: { label: string; onClick: () => void }
}

export interface NotificationCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of notification items */
  notifications: NotificationItem[]
  /** Callback when a notification is marked as read */
  onMarkRead?: (id: string) => void
  /** Callback to mark all notifications as read */
  onMarkAllRead?: () => void
  /** Callback when a notification is dismissed */
  onDismiss?: (id: string) => void
  /** Custom trigger element (defaults to bell icon with badge) */
  trigger?: React.ReactNode
  /** Maximum height of the notification list */
  maxHeight?: number
  /** Empty state message */
  emptyMessage?: string
}

// ============================================================================
// Inline Icons (avoiding external dependency)
// ============================================================================

const BellIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ============================================================================
// Helper Functions
// ============================================================================

function formatTimestamp(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

function groupNotifications(notifications: NotificationItem[]): Record<string, NotificationItem[]> {
  const groups: Record<string, NotificationItem[]> = {}

  for (const notification of notifications) {
    const date = typeof notification.timestamp === 'string'
      ? new Date(notification.timestamp)
      : notification.timestamp
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / 86400000)

    let group: string
    if (diffDays === 0) group = 'Today'
    else if (diffDays === 1) group = 'Yesterday'
    else if (diffDays < 7) group = 'This Week'
    else group = 'Older'

    if (!groups[group]) groups[group] = []
    groups[group].push(notification)
  }

  return groups
}

// ============================================================================
// NotificationCenter Component
// ============================================================================

function NotificationCenter({
  className,
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  trigger,
  maxHeight = 400,
  emptyMessage = 'No notifications',
  ...props
}: NotificationCenterProps) {
  const [open, setOpen] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length
  const grouped = groupNotifications(notifications)
  const groupOrder = ['Today', 'Yesterday', 'This Week', 'Older']

  // Close on escape
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Close on click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div
      data-slot="notification-center"
      className={cn("relative inline-block", className)}
      ref={panelRef}
      {...props}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {trigger || <BellIcon />}
        {unreadCount > 0 && (
          <span
            data-slot="notification-badge"
            className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground"
            aria-hidden="true"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          data-slot="notification-panel"
          className="absolute right-0 top-full mt-2 z-50 w-80 rounded-lg border border-border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          role="dialog"
          aria-label="Notifications"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-1.5 text-xs font-normal text-foreground-secondary">
                  ({unreadCount} unread)
                </span>
              )}
            </h3>
            {unreadCount > 0 && onMarkAllRead && (
              <button
                type="button"
                onClick={() => {
                  onMarkAllRead()
                }}
                className="text-xs text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight }}
            role="list"
            aria-label="Notification list"
          >
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <BellIcon className="text-foreground-secondary mb-2 opacity-40" />
                <p className="text-sm text-foreground-secondary">{emptyMessage}</p>
              </div>
            ) : (
              groupOrder
                .filter(group => grouped[group]?.length > 0)
                .map(group => (
                  <div key={group}>
                    <div className="sticky top-0 bg-popover/95 backdrop-blur-sm px-4 py-1.5 border-b border-border/50">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-foreground-secondary">
                        {group}
                      </span>
                    </div>
                    {grouped[group].map(notification => (
                      <div
                        key={notification.id}
                        data-slot="notification-item"
                        className={cn(
                          "flex gap-3 px-4 py-3 border-b border-border/30 last:border-0 transition-colors",
                          !notification.read && "bg-primary/5"
                        )}
                        role="listitem"
                      >
                        {/* Icon */}
                        {notification.icon && (
                          <div className="shrink-0 mt-0.5 text-foreground-secondary" aria-hidden="true">
                            {notification.icon}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              "text-sm truncate",
                              !notification.read ? "font-semibold text-foreground" : "font-medium text-foreground"
                            )}>
                              {notification.title}
                            </p>
                            {/* Unread dot */}
                            {!notification.read && (
                              <span
                                className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-primary"
                                aria-label="Unread"
                              />
                            )}
                          </div>
                          {notification.description && (
                            <p className="text-xs text-foreground-secondary mt-0.5 line-clamp-2">
                              {notification.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[11px] text-foreground-secondary">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.action && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  notification.action!.onClick()
                                }}
                                className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="shrink-0 flex flex-col gap-1">
                          {!notification.read && onMarkRead && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onMarkRead(notification.id)
                              }}
                              className="rounded-sm p-1 text-foreground-secondary hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              aria-label={`Mark "${notification.title}" as read`}
                            >
                              <CheckIcon />
                            </button>
                          )}
                          {onDismiss && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDismiss(notification.id)
                              }}
                              className="rounded-sm p-1 text-foreground-secondary hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              aria-label={`Dismiss "${notification.title}"`}
                            >
                              <XIcon />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { NotificationCenter }
