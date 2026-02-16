import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const statCardVariants = cva(
  "rounded-2xl border bg-surface text-foreground shadow-sm p-6",
  {
    variants: {
      variant: {
        default: "bg-surface border-border",
        glass: "bg-glass border-glass-border backdrop-blur-md",
        outline: "bg-transparent border-border",
      },
      size: {
        sm: "p-4 rounded-xl",
        default: "p-6 rounded-2xl",
        lg: "p-8 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const statCardValueVariants = cva("font-bold font-heading tracking-tight", {
  variants: {
    size: {
      sm: "text-2xl",
      default: "text-3xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const statCardChangeVariants = cva(
  "inline-flex items-center gap-1 text-sm font-medium rounded-full px-2 py-0.5",
  {
    variants: {
      trend: {
        up: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50",
        down: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50",
        flat: "text-foreground-secondary bg-muted",
      },
    },
    defaultVariants: {
      trend: "flat",
    },
  }
)

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** The metric label (e.g. "Revenue", "Active Users") */
  label: string
  /** The metric value (e.g. "$1.2M", "12,345") */
  value: string | number
  /** Percentage change (e.g. 5.2 for +5.2%, -3.1 for -3.1%) */
  change?: number
  /** Direction of the trend */
  trend?: "up" | "down" | "flat"
  /** Optional icon displayed in the top-right */
  icon?: React.ReactNode
  /** Additional description text below the value */
  description?: string
}

const TrendUpIcon = () => (
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const TrendDownIcon = () => (
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
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
)

const MinusIcon = () => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

function StatCard({
  className,
  variant,
  size,
  label,
  value,
  change,
  trend,
  icon,
  description,
  ...props
}: StatCardProps) {
  const resolvedTrend = trend ?? (change !== undefined ? (change > 0 ? "up" : change < 0 ? "down" : "flat") : undefined)

  return (
    <div
      data-slot="stat-card"
      role="article"
      className={cn(statCardVariants({ variant, size }), className)}
      {...props}
    >
      <dl className="space-y-1">
        <div className="flex items-center justify-between">
          <dt className="text-sm font-medium text-foreground-secondary">{label}</dt>
          {icon && (
            <div className="text-foreground-secondary" aria-hidden="true">
              {icon}
            </div>
          )}
        </div>
        <dd className={cn(statCardValueVariants({ size }))}>
          {value}
        </dd>
        {(change !== undefined || description) && (
          <dd className="flex items-center gap-2 pt-1">
            {change !== undefined && resolvedTrend && (
              <span className={cn(statCardChangeVariants({ trend: resolvedTrend }))}>
                {resolvedTrend === "up" && <TrendUpIcon />}
                {resolvedTrend === "down" && <TrendDownIcon />}
                {resolvedTrend === "flat" && <MinusIcon />}
                <span>
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
              </span>
            )}
            {description && (
              <span className="text-sm text-foreground-secondary">{description}</span>
            )}
          </dd>
        )}
      </dl>
    </div>
  )
}

function StatCardGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="stat-card-group"
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    />
  )
}

export { StatCard, statCardVariants, StatCardGroup }
