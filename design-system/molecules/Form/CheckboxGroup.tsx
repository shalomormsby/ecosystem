import React from 'react';
import { Checkbox, type CheckboxProps } from '../../atoms/Input/Checkbox';

export interface CheckboxOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  helperText?: string;
}

export interface CheckboxGroupProps {
  /**
   * Name attribute for the checkbox group
   */
  name: string;

  /**
   * Checkbox options
   */
  options: CheckboxOption[];

  /**
   * Currently selected values
   */
  value?: string[];

  /**
   * Callback fired when selection changes
   */
  onChange?: (values: string[]) => void;

  /**
   * Label for the checkbox group
   */
  label?: string;

  /**
   * Whether the group is required (at least one must be selected)
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
   * Size of checkboxes
   * @default 'md'
   */
  size?: CheckboxProps['size'];

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
 * CheckboxGroup Component
 *
 * A molecule that manages a group of checkboxes with consistent
 * layout, labels, and error handling.
 *
 * Features:
 * - Manages multiple checkbox state
 * - Proper fieldset/legend for accessibility
 * - Vertical or horizontal layout
 * - Error state handling
 * - Individual checkbox helper text
 * - Theme-aware colors
 * - Full keyboard navigation
 *
 * Example:
 * ```tsx
 * <CheckboxGroup
 *   name="interests"
 *   label="Select your interests"
 *   value={selectedInterests}
 *   onChange={setSelectedInterests}
 *   options={[
 *     { value: 'design', label: 'Design', helperText: 'UI/UX design' },
 *     { value: 'dev', label: 'Development', helperText: 'Frontend & backend' },
 *     { value: 'marketing', label: 'Marketing', helperText: 'Growth & content' },
 *   ]}
 * />
 * ```
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  options,
  value = [],
  onChange,
  label,
  required = false,
  error,
  helperText,
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  const groupId = `checkbox-group-${name}`;
  const errorId = error ? `${groupId}-error` : undefined;
  const helperTextId = helperText ? `${groupId}-helper` : undefined;
  const describedBy = [errorId, helperTextId].filter(Boolean).join(' ') || undefined;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);

    onChange(newValue);
  };

  const layoutClasses = direction === 'horizontal'
    ? 'flex flex-wrap gap-4'
    : 'flex flex-col gap-3';

  return (
    <fieldset
      className={`w-full ${className}`}
      aria-describedby={describedBy}
      aria-invalid={!!error}
      aria-required={required}
    >
      {label && (
        <legend className="block mb-3 text-sm font-medium text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </legend>
      )}

      <div className={layoutClasses}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={`${name}-${option.value}`}
            value={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
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

CheckboxGroup.displayName = 'CheckboxGroup';
