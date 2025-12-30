import React from 'react';
import { Radio, type RadioProps } from '../../atoms/Input/Radio';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps {
  /**
   * Name attribute for the radio group (required for grouping)
   */
  name: string;

  /**
   * Radio button options
   */
  options: RadioOption[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Label for the radio group
   */
  label?: string;

  /**
   * Whether the group is required
   * @default false
   */
  required?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text for the entire group
   */
  helperText?: string;

  /**
   * Size of radio buttons
   * @default 'md'
   */
  size?: RadioProps['size'];

  /**
   * Layout direction
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * RadioGroup Component
 *
 * A molecule that manages a group of radio buttons with consistent
 * layout, labels, and error handling.
 *
 * Features:
 * - Manages radio button state
 * - Proper fieldset/legend for accessibility
 * - Vertical or horizontal layout
 * - Error state handling
 * - Individual radio helper text
 * - Theme-aware colors
 * - Full keyboard navigation
 *
 * Example:
 * ```tsx
 * <RadioGroup
 *   name="plan"
 *   label="Choose your plan"
 *   value={selectedPlan}
 *   onChange={setSelectedPlan}
 *   options={[
 *     { value: 'free', label: 'Free', helperText: '$0/month' },
 *     { value: 'pro', label: 'Pro', helperText: '$10/month' },
 *     { value: 'enterprise', label: 'Enterprise', helperText: 'Contact us' },
 *   ]}
 * />
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  required = false,
  error,
  helperText,
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  const groupId = `radio-group-${name}`;
  const errorId = error ? `${groupId}-error` : undefined;
  const helperTextId = helperText ? `${groupId}-helper` : undefined;
  const describedBy = [errorId, helperTextId].filter(Boolean).join(' ') || undefined;

  const handleChange = (optionValue: string) => {
    onChange?.(optionValue);
  };

  const layoutClasses = direction === 'horizontal'
    ? 'flex flex-wrap gap-4'
    : 'flex flex-col gap-3';

  return (
    <fieldset
      className={`w-full ${className}`}
      aria-describedby={describedBy}
      aria-invalid={!!error}
    >
      {label && (
        <legend className="block mb-3 text-sm font-medium text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </legend>
      )}

      <div className={layoutClasses}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            disabled={option.disabled}
            size={size}
            error={!!error}
            helperText={option.helperText}
          />
        ))}
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-[var(--color-error)]"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={helperTextId}
          className="mt-2 text-sm text-[var(--color-text-secondary)]"
        >
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';
