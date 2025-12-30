'use client';

import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useCustomizer } from '../../features/customizer/store';

interface RainbowNeonGlowTextProps {
    /**
     * Blur amount in pixels - how soft the glow appears
     * @default 20
     */
    blurRadius?: number;
    /**
     * Glow distance from text in pixels - how far the glow extends
     * @default 8
     */
    glowDistance?: number;
    /**
     * Animation speed in seconds for one full rotation
     * @default 3
     */
    animationSpeed?: number;
    /**
     * Direction of glow rotation
     * @default 'clockwise'
     */
    direction?: 'clockwise' | 'counterclockwise';
    /**
     * Intensity of the glow opacity (0-1)
     * @default 0.9
     */
    glowOpacity?: number;
    /**
     * Array of colors for the rainbow effect (minimum 2 colors)
     * @default ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#0000ff', '#8800ff', '#ff0088']
     */
    colors?: string[];
    /**
     * Motion intensity override (0-10). If not provided, uses global customizer setting.
     */
    intensity?: number;
    /**
     * Font family to use
     * @default 'Clash Display, sans-serif'
     */
    fontFamily?: string;
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
 * A motion component that creates a rotating rainbow neon glow around text.
 * The glow moves in a circle around the text edge, creating a dynamic effect.
 *
 * **Key Features:**
 * - Rotating rainbow glow that moves around text edges
 * - Customizable colors, blur, distance, and direction
 * - Tight glow that hugs the text outline
 * - Respects global motion intensity settings
 * - Works in both Light and Dark modes
 *
 * **Usage:**
 * ```tsx
 * <RainbowNeonGlowText
 *   blurRadius={20}
 *   glowDistance={8}
 *   direction="clockwise"
 *   colors={['#ff0000', '#00ff00', '#0000ff']}
 * >
 *   Glowing Text
 * </RainbowNeonGlowText>
 * ```
 */
export const RainbowNeonGlowText = ({
    children,
    blurRadius = 20,
    glowDistance = 8,
    animationSpeed = 3,
    direction = 'clockwise',
    glowOpacity = 0.9,
    colors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#0000ff', '#8800ff', '#ff0088'],
    intensity,
    fontFamily = 'Clash Display, sans-serif',
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

    // Generate glow positions around a circle (12 positions for smooth rotation)
    const glowPositions = useMemo(() => {
        const positions = [];
        const numPositions = 12;
        for (let i = 0; i < numPositions; i++) {
            const angle = (i / numPositions) * Math.PI * 2;
            const x = Math.cos(angle) * glowDistance;
            const y = Math.sin(angle) * glowDistance;
            const colorIndex = Math.floor((i / numPositions) * colors.length) % colors.length;
            positions.push({ x, y, color: colors[colorIndex] });
        }
        return positions;
    }, [glowDistance, colors]);

    // Create rotating text-shadow keyframes
    const createTextShadowKeyframes = () => {
        const numSteps = 12;
        const keyframes = [];

        for (let step = 0; step < numSteps; step++) {
            const shadows = glowPositions.map((_, index) => {
                const rotatedIndex = direction === 'clockwise'
                    ? (index + step) % glowPositions.length
                    : (index - step + glowPositions.length) % glowPositions.length;
                const pos = glowPositions[index];
                const color = glowPositions[rotatedIndex].color;
                return `${pos.x}px ${pos.y}px ${blurRadius}px ${color}`;
            }).join(', ');

            keyframes.push(shadows);
        }

        return keyframes;
    };

    const textShadowKeyframes = useMemo(() => createTextShadowKeyframes(), [glowPositions, blurRadius, direction]);

    const wrapperStyle = {
        position: 'relative' as const,
        display: 'inline-block',
        fontFamily,
        ...style,
    };

    // If motion is disabled (intensity 0), render static glow
    if (effectiveIntensity === 0) {
        const staticShadow = glowPositions.map((pos, i) =>
            `${pos.x}px ${pos.y}px ${blurRadius}px ${pos.color}`
        ).join(', ');

        return (
            <div
                className={className}
                style={{
                    ...wrapperStyle,
                    textShadow: staticShadow,
                    opacity: glowOpacity,
                    whiteSpace: 'nowrap',
                }}
            >
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={className}
            style={{
                ...wrapperStyle,
                opacity: glowOpacity,
                whiteSpace: 'nowrap',
                willChange: 'text-shadow',
            }}
            animate={{
                textShadow: textShadowKeyframes
            }}
            transition={{
                duration: scaledDuration,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {children}
        </motion.div>
    );
};
