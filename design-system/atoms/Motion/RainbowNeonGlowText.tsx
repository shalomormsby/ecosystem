'use client';

import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useCustomizer } from '../../features/customizer/store';

interface RainbowNeonGlowTextProps {
    /**
     * Blur amount in pixels - how soft the glow appears
     * @default 6
     */
    blurRadius?: number;
    /**
     * Border width in pixels - controls the glow thickness
     * @default 2
     */
    borderWidth?: number;
    /**
     * Animation speed in seconds for one full rotation
     * @default 4
     */
    animationSpeed?: number;
    /**
     * Direction of glow rotation
     * @default 'clockwise'
     */
    direction?: 'clockwise' | 'counterclockwise';
    /**
     * Array of colors for the rainbow effect (minimum 2 colors)
     * @default ['#ff0088', '#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#0000ff', '#8800ff']
     */
    colors?: string[];
    /**
     * Motion intensity override (0-10). If not provided, uses global customizer setting.
     */
    intensity?: number;
    /**
     * Border radius for the glow effect
     * @default '0.5rem'
     */
    borderRadius?: string;
    /**
     * Text content to animate
     */
    children?: React.ReactNode;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * Inline styles
     */
    style?: React.CSSProperties;
}

/**
 * RainbowNeonGlowText
 *
 * A motion component that creates a subtle rotating rainbow glow along element edges.
 * The glow moves smoothly in a circle, creating a refined neon effect.
 * Works for text, buttons, dividers, and any other elements.
 *
 * **Key Features:**
 * - Silky-smooth rotating rainbow glow using conic gradients
 * - Subtle edge glow that doesn't overwhelm content
 * - Works for any element type (text, buttons, dividers, etc.)
 * - Seamless looping animation
 * - Customizable colors, blur, and rotation speed
 * - Respects global motion intensity settings
 *
 * **Usage:**
 * ```tsx
 * // Text
 * <RainbowNeonGlowText>
 *   Glowing Text
 * </RainbowNeonGlowText>
 *
 * // Button
 * <RainbowNeonGlowText borderRadius="0.5rem">
 *   <button className="px-6 py-3">Click Me</button>
 * </RainbowNeonGlowText>
 *
 * // Divider
 * <RainbowNeonGlowText borderRadius="0">
 *   <div className="h-px w-full" />
 * </RainbowNeonGlowText>
 * ```
 */
export const RainbowNeonGlowText = ({
    children,
    blurRadius = 6,
    borderWidth = 2,
    animationSpeed = 4,
    direction = 'clockwise',
    colors = ['#ff0088', '#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#0000ff', '#8800ff'],
    intensity,
    borderRadius = '0.5rem',
    className,
    style,
}: RainbowNeonGlowTextProps) => {
    const { motion: motionIntensity } = useCustomizer();

    // Use provided intensity or global intensity
    const effectiveIntensity = intensity ?? motionIntensity;

    // Scale duration based on intensity (higher intensity = faster animation)
    const scaledDuration = effectiveIntensity > 0
        ? animationSpeed * (5 / effectiveIntensity)
        : animationSpeed;

    // Create conic gradient from colors
    const conicGradient = useMemo(() => {
        const colorStops = colors.map((color, index) => {
            const percentage = (index / colors.length) * 100;
            return `${color} ${percentage}%`;
        }).join(', ');
        // Add the first color at the end for seamless loop
        return `conic-gradient(from 0deg, ${colorStops}, ${colors[0]} 100%)`;
    }, [colors]);

    const wrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        padding: `${borderWidth}px`,
        borderRadius,
        overflow: 'hidden',
        ...style,
    };

    // If motion is disabled (intensity 0), render static glow
    if (effectiveIntensity === 0) {
        return (
            <div
                className={className}
                style={{
                    ...wrapperStyle,
                    background: conicGradient,
                }}
            >
                {/* Blurred glow layer - positioned behind */}
                <div
                    style={{
                        position: 'absolute',
                        inset: `-${blurRadius * 2}px`,
                        background: conicGradient,
                        filter: `blur(${blurRadius}px)`,
                        opacity: 0.6,
                        zIndex: 0,
                    }}
                />
                {/* Content with background */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        background: 'var(--color-background)',
                        borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }

    // Animated version
    return (
        <div
            className={className}
            style={wrapperStyle}
        >
            {/* Rotating gradient border layer */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: `-50%`,
                    background: conicGradient,
                    willChange: 'transform',
                    zIndex: 0,
                }}
                animate={{
                    rotate: direction === 'clockwise' ? 360 : -360,
                }}
                transition={{
                    duration: scaledDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Blurred glow layer */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: `-${blurRadius * 2}px`,
                    background: conicGradient,
                    filter: `blur(${blurRadius}px)`,
                    opacity: 0.6,
                    willChange: 'transform',
                    zIndex: 0,
                }}
                animate={{
                    rotate: direction === 'clockwise' ? 360 : -360,
                }}
                transition={{
                    duration: scaledDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Content with background to mask inner area */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'var(--color-background)',
                    borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
