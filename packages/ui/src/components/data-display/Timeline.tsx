import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const timelineVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row overflow-x-auto",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineItemStatusVariants = cva(
  "flex items-center justify-center rounded-full border-2 shrink-0",
  {
    variants: {
      status: {
        pending: "border-border bg-muted text-foreground-secondary",
        active: "border-primary bg-primary text-primary-foreground",
        completed: "border-primary bg-primary text-primary-foreground",
        error: "border-destructive bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-6 w-6 [&>svg]:h-3 [&>svg]:w-3",
        default: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
    },
  }
)

export interface TimelineProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof timelineVariants> {}

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /** Event title */
  title: string
  /** Event description */
  description?: string
  /** Timestamp text */
  timestamp?: string
  /** Custom icon for the indicator */
  icon?: React.ReactNode
  /** Status of this event */
  status?: "pending" | "active" | "completed" | "error"
  /** Whether this is the last item (hides connector) */
  isLast?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
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
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const CircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="6" />
  </svg>
)

function Timeline({
  className,
  orientation = "vertical",
  children,
  ...props
}: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      className={cn(timelineVariants({ orientation }), className)}
      {...props}
    >
      {children}
    </ol>
  )
}

function TimelineItem({
  className,
  title,
  description,
  timestamp,
  icon,
  status = "pending",
  isLast = false,
  size = "default",
  ...props
}: TimelineItemProps) {
  const defaultIcon = (() => {
    switch (status) {
      case "completed":
        return <CheckIcon />
      case "error":
        return <XIcon />
      case "active":
        return <CircleIcon />
      default:
        return <CircleIcon />
    }
  })()

  return (
    <li
      data-slot="timeline-item"
      className={cn("relative flex gap-4", className)}
      aria-current={status === "active" ? "step" : undefined}
      {...props}
    >
      {/* Indicator column */}
      <div className="flex flex-col items-center">
        <div
          data-slot="timeline-icon"
          className={cn(timelineItemStatusVariants({ status, size }))}
          aria-hidden="true"
        >
          {icon ?? defaultIcon}
        </div>
        {!isLast && (
          <div
            data-slot="timeline-connector"
            className={cn(
              "w-0.5 grow bg-border",
              size === "sm" ? "min-h-4" : size === "lg" ? "min-h-8" : "min-h-6"
            )}
          />
        )}
      </div>

      {/* Content column */}
      <div className={cn("pb-6", isLast && "pb-0")}>
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground leading-none">{title}</p>
          {timestamp && (
            <time className="text-xs text-foreground-secondary">{timestamp}</time>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-foreground-secondary">{description}</p>
        )}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem, timelineVariants }
