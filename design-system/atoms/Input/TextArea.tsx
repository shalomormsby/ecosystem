import React, { forwardRef } from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Visual variant of the textarea
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled';

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;

  /**
   * Label for the textarea
   */
  label?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether to allow resizing
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * TextArea Component
 *
 * A multi-line text input field with support for outlined and filled variants,
 * error states, and helper text.
 *
 * Features:
 * - Two visual variants (outlined, filled)
 * - Error state with red border
 * - Optional label and helper text
 * - Configurable resize behavior
 * - Theme-aware colors using CSS variables
 * - Full keyboard accessibility
 * - Ref forwarding support
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = 'outlined',
      error = false,
      helperText,
      label,
      required = false,
      resize = 'vertical',
      className = '',
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${textareaId}-helper` : undefined;

    // Resize classes
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
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
      px-4 py-2
      text-base
      rounded-lg
      text-[var(--color-text-primary)]
      placeholder:text-[var(--color-text-muted)]
      transition-colors
      duration-200
      focus:outline-none
      focus:ring-2
      focus:ring-[var(--color-focus)]
      focus:ring-opacity-50
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block mb-2 text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
            {required && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-describedby={helperTextId}
          aria-invalid={error}
          aria-required={required}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${resizeClasses[resize]}
            ${className}
          `}
          {...props}
        />

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

TextArea.displayName = 'TextArea';
