import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Visual variant of the select
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled';

  /**
   * Size of the select
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Helper text displayed below the select
   */
  helperText?: string;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Options for the select dropdown
   */
  options?: SelectOption[];

  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Select Component
 *
 * A dropdown select field with support for outlined and filled variants,
 * multiple sizes, error states, and helper text.
 *
 * Features:
 * - Two visual variants (outlined, filled)
 * - Three size options (sm, md, lg)
 * - Error state with red border
 * - Optional label and helper text
 * - Flexible options prop or children
 * - Theme-aware colors using CSS variables
 * - Full keyboard accessibility
 * - Ref forwarding support
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = 'outlined',
      size = 'md',
      error = false,
      helperText,
      label,
      required = false,
      options,
      placeholder,
      className = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${selectId}-helper` : undefined;

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    // Variant classes
    const variantClasses = {
      outlined: `
        bg-[var(--color-background)]
        border-2
        ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'}
        focus:border-[var(--color-primary)]
      `,
      filled: `
        bg-[var(--color-surface)]
        border-2 border-transparent
        ${error ? 'border-[var(--color-error)]' : ''}
        focus:border-[var(--color-primary)]
      `,
    };

    const baseClasses = `
      w-full
      rounded-lg
      text-[var(--color-text-primary)]
      transition-colors
      duration-200
      focus:outline-none
      focus:ring-2
      focus:ring-[var(--color-focus)]
      focus:ring-opacity-50
      disabled:opacity-50
      disabled:cursor-not-allowed
      appearance-none
      bg-no-repeat
      bg-right
      pr-10
    `;

    // Custom chevron using CSS
    const chevronStyle = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
      backgroundPosition: 'right 0.75rem center',
      backgroundSize: '1rem',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block mb-2 text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
            {required && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          aria-describedby={helperTextId}
          aria-invalid={error}
          aria-required={required}
          style={chevronStyle}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options ? (
            options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>

        {helperText && (
          <p
            id={helperTextId}
            className={`
              mt-2 text-sm
              ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}
            `}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
