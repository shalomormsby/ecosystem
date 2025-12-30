import React, { forwardRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label for the checkbox
   */
  label?: React.ReactNode;

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;
}

/**
 * Checkbox Component
 *
 * A checkbox input with optional label and helper text.
 *
 * Features:
 * - Three size options (sm, md, lg)
 * - Optional inline label
 * - Error state
 * - Theme-aware colors using CSS variables
 * - Full keyboard accessibility with focus indicators
 * - Ref forwarding support
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      error = false,
      helperText,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${checkboxId}-helper` : undefined;

    // Size classes for the checkbox
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Size classes for the label text
    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const checkboxClasses = `
      ${sizeClasses[size]}
      rounded
      border-2
      ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'}
      text-[var(--color-primary)]
      bg-[var(--color-background)]
      focus:outline-none
      focus:ring-2
      focus:ring-[var(--color-focus)]
      focus:ring-opacity-50
      disabled:opacity-50
      disabled:cursor-not-allowed
      cursor-pointer
      transition-colors
      duration-200
      checked:bg-[var(--color-primary)]
      checked:border-[var(--color-primary)]
    `;

    return (
      <div className="w-full">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            aria-describedby={helperTextId}
            aria-invalid={error}
            className={`
              ${checkboxClasses}
              ${className}
            `}
            {...props}
          />

          {label && (
            <label
              htmlFor={checkboxId}
              className={`
                ${labelSizeClasses[size]}
                text-[var(--color-text-primary)]
                cursor-pointer
                select-none
                ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {label}
            </label>
          )}
        </div>

        {helperText && (
          <p
            id={helperTextId}
            className={`
              mt-2 text-sm
              ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}
              ${label ? 'ml-7' : ''}
            `}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
