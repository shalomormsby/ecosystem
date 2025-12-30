import React from 'react';

export interface FormFieldProps {
  /**
   * Label for the form field
   */
  label?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Error message (presence indicates error state)
   */
  error?: string;

  /**
   * Helper text displayed when no error
   */
  helperText?: string;

  /**
   * The input component (TextField, Select, etc.)
   */
  children: React.ReactNode;

  /**
   * Unique ID for the field (connects label to input)
   */
  htmlFor?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FormField Component
 *
 * A molecule that wraps form inputs with consistent label, error, and helper text layout.
 * Reduces boilerplate and ensures consistent form field styling across the app.
 *
 * Features:
 * - Automatic label-input association
 * - Error state with red message
 * - Helper text when no error
 * - Required field indicator
 * - Theme-aware colors
 * - Accessible markup
 *
 * Example:
 * ```tsx
 * <FormField
 *   label="Email"
 *   required
 *   error={errors.email}
 *   helperText="We'll never share your email"
 *   htmlFor="email-input"
 * >
 *   <TextField
 *     id="email-input"
 *     type="email"
 *     placeholder="you@example.com"
 *   />
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helperText,
  children,
  htmlFor,
  className = '',
}) => {
  const messageId = htmlFor ? `${htmlFor}-message` : undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}

      <div className="w-full">
        {children}
      </div>

      {(error || helperText) && (
        <p
          id={messageId}
          className={`
            mt-2 text-sm
            ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}
          `}
          role={error ? 'alert' : undefined}
          aria-live={error ? 'polite' : undefined}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';
