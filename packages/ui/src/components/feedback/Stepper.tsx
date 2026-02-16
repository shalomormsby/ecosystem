import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const stepperVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row items-start",
      vertical: "flex-col",
    },
    size: {
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
  },
})

const stepperIndicatorVariants = cva(
  "flex items-center justify-center rounded-full border-2 shrink-0 font-medium transition-colors",
  {
    variants: {
      status: {
        pending: "border-border bg-muted text-foreground-secondary",
        active: "border-primary bg-primary text-primary-foreground",
        completed: "border-primary bg-primary text-primary-foreground",
        error: "border-destructive bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-7 w-7 text-xs",
        default: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
    },
  }
)

export interface StepperProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof stepperVariants> {
  /** Zero-based index of the current step */
  currentStep: number
  /** Called when a step is clicked (only when clickable is true) */
  onStepClick?: (step: number) => void
  /** Allow clicking steps to navigate */
  clickable?: boolean
}

export interface StepperStepProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /** Step label text */
  label: string
  /** Optional description below the label */
  description?: string
  /** Custom icon for the indicator */
  icon?: React.ReactNode
  /** Status (auto-computed from currentStep if not provided) */
  status?: "pending" | "active" | "completed" | "error"
  /** Mark step as optional */
  optional?: boolean
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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
    width="16"
    height="16"
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

interface StepperContextValue {
  currentStep: number
  orientation: "horizontal" | "vertical"
  size: "sm" | "default" | "lg"
  clickable: boolean
  onStepClick?: (step: number) => void
}

const StepperContext = React.createContext<StepperContextValue>({
  currentStep: 0,
  orientation: "horizontal",
  size: "default",
  clickable: false,
})

function Stepper({
  className,
  orientation = "horizontal",
  size = "default",
  currentStep,
  onStepClick,
  clickable = false,
  children,
  ...props
}: StepperProps) {
  return (
    <StepperContext.Provider
      value={{ currentStep, orientation: orientation ?? "horizontal", size: size ?? "default", clickable, onStepClick }}
    >
      <ol
        data-slot="stepper"
        className={cn(stepperVariants({ orientation, size }), className)}
        aria-label="Progress"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          const totalSteps = React.Children.count(children)
          const isLast = index === totalSteps - 1

          const childStatus =
            (child.props as StepperStepProps).status ??
            (index < currentStep
              ? "completed"
              : index === currentStep
                ? "active"
                : "pending")

          return (
            <StepperStepInternal
              {...(child.props as StepperStepProps)}
              status={childStatus}
              stepIndex={index}
              isLast={isLast}
            />
          )
        })}
      </ol>
    </StepperContext.Provider>
  )
}

interface StepperStepInternalProps extends StepperStepProps {
  stepIndex: number
  isLast: boolean
}

function StepperStepInternal({
  className,
  label,
  description,
  icon,
  status = "pending",
  optional = false,
  stepIndex,
  isLast,
  ...props
}: StepperStepInternalProps) {
  const { orientation, size, clickable, onStepClick } = React.useContext(StepperContext)

  const indicatorContent = (() => {
    if (icon) return icon
    if (status === "completed") return <CheckIcon />
    if (status === "error") return <XIcon />
    return stepIndex + 1
  })()

  const isHorizontal = orientation === "horizontal"

  const handleClick = () => {
    if (clickable && onStepClick) {
      onStepClick(stepIndex)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onStepClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onStepClick(stepIndex)
    }
  }

  return (
    <li
      data-slot="stepper-step"
      className={cn(
        "flex",
        isHorizontal ? "flex-1 items-start" : "items-start",
        className
      )}
      aria-current={status === "active" ? "step" : undefined}
      {...props}
    >
      <div
        className={cn(
          "flex",
          isHorizontal ? "flex-col items-center flex-1" : "flex-row items-start gap-3"
        )}
      >
        {/* Indicator + Separator row */}
        <div
          className={cn(
            "flex items-center",
            isHorizontal ? "w-full" : "flex-col"
          )}
        >
          {/* Indicator */}
          <button
            type="button"
            className={cn(
              stepperIndicatorVariants({ status, size: size ?? "default" }),
              clickable
                ? "cursor-pointer hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                : "cursor-default"
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={clickable ? 0 : -1}
            aria-label={`Step ${stepIndex + 1}: ${label}${status === "completed" ? " (completed)" : status === "active" ? " (current)" : status === "error" ? " (error)" : ""}`}
          >
            {indicatorContent}
          </button>

          {/* Separator */}
          {!isLast && isHorizontal && (
            <div
              data-slot="stepper-separator"
              className={cn(
                "h-0.5 flex-1 mx-2",
                status === "completed" ? "bg-primary" : "bg-border"
              )}
              aria-hidden="true"
            />
          )}
          {!isLast && !isHorizontal && (
            <div
              data-slot="stepper-separator"
              className={cn(
                "w-0.5 min-h-6 my-1",
                status === "completed" ? "bg-primary" : "bg-border"
              )}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Label + Description */}
        <div
          className={cn(
            isHorizontal ? "mt-2 text-center" : "",
            "min-w-0"
          )}
        >
          <p
            className={cn(
              "text-sm font-medium",
              status === "active" ? "text-foreground" : "text-foreground-secondary"
            )}
          >
            {label}
          </p>
          {(description || optional) && (
            <p className="text-xs text-foreground-secondary mt-0.5">
              {description}
              {optional && !description && "Optional"}
              {optional && description && " (Optional)"}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}

/** Public sub-component for declaring steps */
function StepperStep(_props: StepperStepProps) {
  // Rendered internally by Stepper - this is just for the public API
  return null
}

export { Stepper, StepperStep, stepperVariants }
