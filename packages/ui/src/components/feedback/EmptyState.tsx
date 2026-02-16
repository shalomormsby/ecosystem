import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "py-8 px-4 gap-2",
        default: "py-12 px-6 gap-3",
        lg: "py-16 px-8 gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const emptyStateIconVariants = cva(
  "flex items-center justify-center rounded-full bg-muted text-foreground-secondary",
  {
    variants: {
      size: {
        sm: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
        default: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
        lg: "h-16 w-16 [&>svg]:h-8 [&>svg]:w-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const emptyStateTitleVariants = cva("font-semibold font-heading tracking-tight text-foreground", {
  variants: {
    size: {
      sm: "text-base",
      default: "text-lg",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Icon displayed above the title */
  icon?: React.ReactNode
  /** Primary message */
  title: string
  /** Secondary explanation text */
  description?: string
  /** Call-to-action element (e.g. Button) */
  action?: React.ReactNode
}

function EmptyState({
  className,
  size,
  icon,
  title,
  description,
  action,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      role="status"
      className={cn(emptyStateVariants({ size }), className)}
      {...props}
    >
      {icon && (
        <div
          data-slot="empty-state-icon"
          className={cn(emptyStateIconVariants({ size }))}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3
        data-slot="empty-state-title"
        className={cn(emptyStateTitleVariants({ size }))}
      >
        {title}
      </h3>
      {description && (
        <p
          data-slot="empty-state-description"
          className="max-w-sm text-sm text-foreground-secondary"
        >
          {description}
        </p>
      )}
      {action && (
        <div data-slot="empty-state-action" className="mt-2">
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

export { EmptyState, emptyStateVariants }
