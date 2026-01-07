import * as React from 'react';
import { Text, Pressable, type ViewStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Pressable as SlotPressable } from '@rn-primitives/slot';

const buttonVariants = cva(
    'flex-row items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const buttonTextVariants = cva('text-sm font-medium', {
    variants: {
        variant: {
            default: 'text-primary-foreground',
            destructive: 'text-destructive-foreground',
            outline: 'text-foreground',
            secondary: 'text-secondary-foreground',
            ghost: 'text-foreground',
            link: 'text-primary',
        },
    },
    defaultVariants: {
        variant: 'default',
    }
});

interface ButtonProps
    extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    className?: string;
    textClassName?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
    ({ className, textClassName, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? SlotPressable : Pressable;
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {({ pressed }: { pressed: boolean }) => (
                    /* 
                       Note: In a real Native implementation, we might separate Text/Pressable logic more strictly 
                       or use a dedicated Text component. For simplicity in v1, we assume children are Text-like 
                       or pass explicit text. But `rn-primitives` Slot pattern usually expects a single child.
                       If not asChild, we wrap strings in Text.
                    */
                    <React.Fragment>
                        {/* 
                    We need to handle Text styling because Native doesn't cascade styles like CSS. 
                    However, NativeWind handles 'text-*' classes on the parent View/Pressable 
                    and propagates them (mostly). But safer is to apply to Text directly.
                */}
                        {typeof props.children === 'string' ? (
                            <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
                                {props.children}
                            </Text>
                        ) : (
                            typeof props.children === 'function'
                                ? (props.children as any)({ pressed })
                                : props.children
                        )}
                    </React.Fragment>
                )}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
