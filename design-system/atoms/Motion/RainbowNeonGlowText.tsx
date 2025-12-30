'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useCustomizer } from '../../features/customizer/store';

interface RainbowNeonGlowTextProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Blur radius in pixels
     * @default 40
     */
    blurRadius?: number;
    /**
     * Animation speed in seconds for one full cycle
     * @default 5
     */
    animationSpeed?: number;
    /**
     * Intensity of the glow opacity (0-1)
     * @default 0.8
     */
    glowOpacity?: number;
    /**
     * Motion intensity override (0-10). If not provided, uses global customizer setting.
     */
    intensity?: number;
    /**
     * Text content to animate
     */
    children?: React.ReactNode;
}

/**
 * RainbowNeonGlowText
 *
 * A motion component that adds a smooth, animated rainbow neon glow behind text.
 * Great for highlighting headlines or creating unique focal points.
 *
 * **Key Features:**
 * - Animated rainbow gradient background
 * - Customizable blur, opacity, and speed
 * - Respects global motion intensity settings
 * - Works in both Light and Dark modes
 *
 * **Usage:**
 * ```tsx
 * <RainbowNeonGlowText blurRadius={40} animationSpeed={5}>
 *   Glowing Text
 * </RainbowNeonGlowText>
 * ```
 */
export const RainbowNeonGlowText = ({
    children,
    blurRadius = 40,
    animationSpeed = 5,
    glowOpacity = 0.8,
    intensity,
    className,
    style,
    ...props
}: RainbowNeonGlowTextProps) => {
    const { motion: motionIntensity } = useCustomizer();

    // Use provided intensity or global intensity
    const effectiveIntensity = intensity ?? motionIntensity;

    // Scale duration based on intensity (higher intensity = faster animation)
    const scaledDuration = effectiveIntensity > 0
        ? animationSpeed * (5 / effectiveIntensity)
        : animationSpeed;

    const wrapperStyle = {
        position: 'relative' as const,
        display: 'inline-block',
        ...style,
    };

    // If motion is disabled (intensity 0), render static glow (or no glow if preferred, but usually static is better for accessibility if it's purely decorative, or just render text)
    // Here we'll render static gradient to maintain visual style but stop movement
    if (effectiveIntensity === 0) {
        return (
            <div className={className} style={wrapperStyle} {...props}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        background: 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                        backgroundSize: '200% 100%',
                        filter: `blur(${blurRadius}px)`,
                        opacity: glowOpacity,
                        zIndex: 0,
                        borderRadius: '100%',
                    }}
                />
                <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
                    {children}
                </span>
            </div>
        );
    }

    return (
        <div className={className} style={wrapperStyle} {...props}>
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                    backgroundSize: '200% 100%',
                    filter: `blur(${blurRadius}px)`,
                    opacity: glowOpacity,
                    zIndex: 0,
                    borderRadius: '100%',
                    willChange: 'background-position',
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "200% 50%"]
                }}
                transition={{
                    duration: scaledDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
                {children}
            </span>
        </div>
    );
};
