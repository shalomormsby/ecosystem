import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { XRayTarget } from '../dev/XRayTarget';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline: 'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        const getTokens = () => {
            switch (variant) {
                case 'default':
                    return { bg: 'var(--color-primary)', text: 'var(--color-primary-foreground)' };
                case 'destructive':
                    return { bg: 'var(--color-destructive)', text: 'var(--color-destructive-foreground)' };
                case 'secondary':
                    return { bg: 'var(--color-secondary)', text: 'var(--color-secondary-foreground)' };
                case 'ghost':
                    return { bg: 'transparent', text: 'var(--color-foreground)' };
                case 'outline':
                    return { bg: 'transparent', text: 'var(--color-foreground)', border: 'var(--color-border)' };
                default:
                    return { bg: 'var(--color-primary)', text: 'var(--color-primary-foreground)' };
            }
        };

        return (
            <XRayTarget
                component="Button"
                type="primitive"
                variant={variant || 'default'}
                tokens={getTokens()}
            >
                <Comp
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                />
            </XRayTarget>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants };
