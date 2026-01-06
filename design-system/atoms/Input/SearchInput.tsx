import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
    className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ value, onChange, onClear, placeholder = 'Search...', className = '', ...props }, ref) => {
        return (
            <div className={`relative flex items-center w-full ${className}`}>
                {/* Search Icon */}
                <div className="absolute left-3 text-[var(--color-text-muted)] pointer-events-none flex items-center justify-center">
                    <Search className="w-4 h-4" />
                </div>

                <input
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`
            w-full pl-9 pr-8 py-2 
            bg-[var(--color-surface)] 
            border border-[var(--color-border)] 
            rounded-full 
            text-sm 
            text-[var(--color-text-primary)] 
            placeholder-[var(--color-text-muted)]
            transition-all duration-200
            focus:outline-none 
            focus:ring-2 
            focus:ring-[var(--color-focus)] 
            focus:border-transparent
            hover:border-[var(--color-primary)]/50
          `}
                    {...props}
                />

                {/* Clear Button */}
                {value && onClear && (
                    <button
                        onClick={onClear}
                        className="absolute right-3 p-0.5 rounded-full hover:bg-[var(--color-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        );
    }
);

SearchInput.displayName = 'SearchInput';
