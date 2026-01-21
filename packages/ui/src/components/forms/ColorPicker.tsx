'use client';

/**
 * ColorPicker Component
 * Combined visual color picker and hex input for selecting colors
 */

import { useState, useEffect } from 'react';
import { Label } from './Label';
import { Input } from './Input';

export interface ColorPickerProps {
  label?: string;
  description?: string;
  value: string;  // Hex color value
  onChange: (hex: string) => void;
  optional?: boolean;
  disabled?: boolean;
}

export function ColorPicker({
  label,
  description,
  value,
  onChange,
  optional = false,
  disabled = false,
}: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(value);
  const [isValid, setIsValid] = useState(true);

  // Sync hex input with value prop
  useEffect(() => {
    setHexInput(value);
  }, [value]);

  // Validate hex color format
  const validateHex = (hex: string): boolean => {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
  };

  const handleHexChange = (newHex: string) => {
    setHexInput(newHex);

    if (validateHex(newHex)) {
      setIsValid(true);
      onChange(newHex);
    } else {
      setIsValid(false);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setHexInput(newColor);
    setIsValid(true);
    onChange(newColor);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-baseline justify-between">
          <Label className="text-sm font-medium">
            {label}
            {optional && <span className="text-xs text-muted-foreground ml-1">(optional)</span>}
          </Label>
        </div>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}

      <div className="flex gap-3 items-center">
        {/* Visual Color Picker */}
        <div className="relative">
          <input
            type="color"
            value={hexInput}
            onChange={handleColorPickerChange}
            disabled={disabled}
            className="
              w-16 h-16
              rounded-lg
              cursor-pointer
              border-2 border-border
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all
              hover:scale-105
            "
            title="Pick a color"
          />
        </div>

        {/* Hex Input */}
        <div className="flex-1">
          <Input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#000000"
            disabled={disabled}
            className={`font-mono ${!isValid ? 'border-error' : ''}`}
            aria-invalid={!isValid}
          />
          {!isValid && (
            <p className="text-xs text-error mt-1">
              Invalid hex format (use #RRGGBB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
