'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { cn } from '../../lib/utils';

export interface MagneticProps {
    children: React.ReactNode;
    /**
     * The strength of the magnetic pull. Higher numbers = strong pull.
     * @default 0.2
     */
    strength?: number;
    /**
     * The active area padding around the element in pixels.
     * @default 100
     */
    range?: number;
    className?: string;
}

/**
 * Wraps an element to give it a magnetic attraction to the cursor.
 */
export function Magnetic({ children, strength = 0.2, range = 100, className }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    const springOptions = { damping: 15, stiffness: 150, mass: 0.1 };
    const smoothX = useSpring(position.x, springOptions);
    const smoothY = useSpring(position.y, springOptions);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        position.x.set(middleX * strength);
        position.y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        position.x.set(0);
        position.y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: smoothX, y: smoothY }}
            className={cn("inline-block", className)}
        >
            {children}
        </motion.div>
    );
}
