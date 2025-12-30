'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import { useCustomizer } from '../../features/customizer/store';
import { useThemeStore } from '../../store/theme';
import { studioTokens } from '../../tokens/studio';
import { sageTokens } from '../../tokens/sage';
import { voltTokens } from '../../tokens/volt';

// Theme token map
const themeTokens = {
    studio: studioTokens,
    sage: sageTokens,
    volt: voltTokens,
};

interface VariableWeightTextProps extends HTMLMotionProps<'div'> {
    minWeight?: number;
    maxWeight?: number;
    duration?: number;
    intensity?: number;
}

export const VariableWeightText = ({
    children,
    minWeight = 200,
    maxWeight = 700,
    duration,
    intensity,
    className,
    ...props
}: VariableWeightTextProps) => {
    const { motion: motionIntensity } = useCustomizer();
    const { theme } = useThemeStore();

    // Use provided intensity or global intensity
    const effectiveIntensity = intensity ?? motionIntensity;

    // Get duration from theme tokens based on intensity
    const tokens = themeTokens[theme];
    // Default to a slower breath if not specified, scaled by intensity
    // If intensity is high (10), duration is faster? Or generic scaling?
    // Existing code: duration = parseFloat(tokens.motion.getDuration(effectiveIntensity)) / 1000
    // "Breathing" usually implies a slower, rhythmic cycle. 
    // Let's use 'slow' or 'slower' as base if no duration provided.
    const baseDuration = duration ?? 2; // Default 2 seconds for a full breath cycle
    const calculatedDuration = baseDuration * (10 / (effectiveIntensity || 5)); // Adjust speed based on intensity?? 
    // Actually, let's stick to the pattern in FadeIn but adapted.
    // The existing pattern scales duration: duration = tokens.motion.getDuration(effectiveIntensity).
    // But that's for transitions. For a continuous loop, we might want it to respect intensity by speed or amplitude.
    // If intensity is 0, we shouldn't animate.

    // If motion is disabled (intensity 0), render static at standard weight (or max/min?)
    // Let's render at maxWeight or normal to be legible.
    if (effectiveIntensity === 0) {
        return (
            <div
                className={className}
                style={{
                    fontWeight: maxWeight,
                    textAlign: 'center',
                    display: 'inline-block', // Ensure it respects text-align
                    width: '100%'
                }}
                {...props as any}
            >
                {children}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ fontWeight: minWeight }}
            animate={{ fontWeight: maxWeight }}
            transition={{
                duration: calculatedDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            style={{
                textAlign: 'center',
                display: 'inline-block',
                width: '100%', // Ensure it takes width to center properly in container
                // We might want to avoid forcing width: 100% if the user wants it inline.
                // But "center-aligned mode" implies checking the container.
                // Actually, if we use text-align: center, the text *inside* this div checks out.
                // But if this div is narrow, it won't matter.
                // Let's assume this component wraps the text and controls its own alignment.
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
