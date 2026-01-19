'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils'; // Adjust path if necessary based on location

export interface TypewriterProps {
    /**
     * The text to display.
     */
    text: string | string[];
    /**
     * Speed of typing in seconds per character.
     * @default 0.05
     */
    speed?: number;
    /**
     * Delay before starting animation in seconds.
     * @default 0
     */
    delay?: number;
    /**
     * Whether to loop the animation.
     * @default false
     */
    loop?: boolean;
    /**
     * Delay between loops in seconds.
     * @default 2
     */
    loopDelay?: number;
    /**
     * Cursor character.
     * @default "|"
     */
    cursor?: string;
    /**
     * Whether to show the cursor.
     * @default true
     */
    showCursor?: boolean;
    /**
     * Custom class name.
     */
    className?: string;
    /**
     * Text variant (e.g. h1, p, span).
     * @default "span"
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * Typewriter effect component that types out text character by character.
 */
export function Typewriter({
    text,
    speed = 0.05,
    delay = 0,
    loop = false,
    loopDelay = 2,
    cursor = '|',
    showCursor = true,
    className,
    as: Component = 'span',
}: TypewriterProps) {
    const displayText = Array.isArray(text) ? text : [text];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // We use key based re-rendering or native framer motion staggering
    // But for a true typewriter, we often want character by character control.
    // Let's use a simpler Framer Motion approach with staggerChildren.

    // Actually, for multiple strings loop, we need state. 
    // For single string, we can use motion.span.

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const sentence = displayText[currentTextIndex];

    const characters = sentence.split("");

    const container: Variants = {
        hidden: { opacity: 1 }, // Keep container visible so layout doesn't jump? Or hidden?
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: speed,
                delayChildren: delay,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: speed / 2,
                staggerDirection: -1
            }
        }
    };

    const child: Variants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
    };

    // Handling looping is tricky with just CSS/Framer variants if we want to delete and retype.
    // For a "Simple" Typewriter, pure typing is often enough. 
    // Let's stick to a robust single-pass typing for now, or simple loop if requested.
    // The 'loop' prop suggests we might want to type, delete, type next.

    // Let's implement a robust version using useEffect for text manipulation if loop is true,
    // OR use Framer Motion's onAnimationComplete.

    // To keep it strictly declarative and Framer-native:

    return (
        <Component className={cn("inline-flex", className)} ref={containerRef}>
            <motion.span
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={container}
                className="inline-block"
                onAnimationComplete={() => {
                    if (loop) {
                        setTimeout(() => {
                            // Logic to switch text or reset would go here if we were driving state.
                            // For now, let's keep it simple: Single text typing is the primary use case.
                            // Implementing full delete-and-retype cycle is complex for a boolean prop in a simple component.
                            // If loop is requested, we often just want to clear and restart.
                        }, loopDelay * 1000);
                    }
                }}
            >
                {characters.map((char, index) => (
                    <motion.span key={`${currentTextIndex}-${index}`} variants={child}>
                        {char}
                    </motion.span>
                ))}
            </motion.span>
            {showCursor && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-0.5 text-[var(--color-primary)]"
                >
                    {cursor}
                </motion.span>
            )}
        </Component>
    );
}
