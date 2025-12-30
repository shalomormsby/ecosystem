import React, { forwardRef } from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label for the switch
   */
  label?: React.ReactNode;

  /**
   * Size of the switch
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Helper text displayed below the switch
   */
  helperText?: string;

  /**
   * Whether the label should appear on the left
   * @default false
   */
  labelLeft?: boolean;
}

/**
 * Switch Component
 *
 * A toggle switch input with optional label and helper text.
 *
 * Features:
 * - Three size options (sm, md, lg)
 * - Optional inline label (left or right)
 * - Smooth toggle animation
 * - Theme-aware colors using CSS variables
 * - Full keyboard accessibility with focus indicators
 * - Ref forwarding support
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = 'md',
      helperText,
      labelLeft = false,
      className = '',
      id,
      checked,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${switchId}-helper` : undefined;

    // Size configurations
    const sizeConfig = {
      sm: {
        track: 'w-9 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-4',
        label: 'text-sm',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
        label: 'text-base',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7',
        label: 'text-lg',
      },
    };

    const config = sizeConfig[size];

    const LabelComponent = label ? (
      <span
        className={`
          ${config.label}
          text-[var(--color-text-primary)]
          select-none
          ${props.disabled ? 'opacity-50' : ''}
        `}
      >
        {label}
      </span>
    ) : null;

    return (
      <div className="w-full">
        <label
          htmlFor={switchId}
          className={`
            flex items-center gap-3
            ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            ${labelLeft ? 'flex-row-reverse justify-end' : ''}
          `}
        >
          {labelLeft && LabelComponent}

          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              role="switch"
              aria-checked={checked}
              aria-describedby={helperTextId}
              checked={checked}
              className="sr-only peer"
              {...props}
            />

            {/* Track */}
            <div
              className={`
                ${config.track}
                rounded-full
                transition-colors
                duration-200
                bg-[var(--color-border)]
                peer-checked:bg-[var(--color-primary)]
                peer-focus:ring-2
                peer-focus:ring-[var(--color-focus)]
                peer-focus:ring-opacity-50
                peer-disabled:opacity-50
              `}
            />

            {/* Thumb */}
            <div
              className={`
                ${config.thumb}
                absolute
                left-0.5
                top-0.5
                rounded-full
                bg-[var(--color-background)]
                transition-transform
                duration-200
                peer-checked:${config.translate}
                shadow-md
              `}
            />
          </div>

          {!labelLeft && LabelComponent}
        </label>

        {helperText && (
          <p
            id={helperTextId}
            className="mt-2 text-sm text-[var(--color-text-secondary)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
