import React from 'react';
import { cn } from '../../lib/utils';

export interface OpenGraphCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
}

/**
 * OpenGraphCard
 * 
 * A specialized component designed for generating Open Graph images (1200x630px).
 * It features a dark theme with "Sage" branding elements (ethereal gradients/waves).
 * 
 * NOTE: This component uses inline styles to ensure compatibility with Next.js Open Graph generation (Satori).
 */
export function OpenGraphCard({
    title = 'Sage UI',
    description = "The Solopreneur's Development Stack",
    className,
    ...props
}: OpenGraphCardProps) {
    return (
        <div
            className={cn(className)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                width: '1200px',
                height: '630px',
                backgroundColor: '#0A0A0A',
                padding: '80px', // p-20
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'sans-serif',
                ...props.style,
            }}
            {...props}
        >
            {/* Background Decorators (Sage Waves) */}
            {/* Green orb */}
            <div
                style={{
                    position: 'absolute',
                    right: '-10%',
                    top: '10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0) 70%)',
                    filter: 'blur(40px)',
                    opacity: 0.5,
                }}
            />
            {/* Teal orb */}
            <div
                style={{
                    position: 'absolute',
                    right: '-20%',
                    top: '30%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, rgba(20, 184, 166, 0) 70%)',
                    filter: 'blur(40px)',
                    opacity: 0.5,
                }}
            />

            {/* Abstract Geometric Shapes (Glassmorphism simulated with borders and gradients) */}
            <div
                style={{
                    position: 'absolute',
                    right: '150px',
                    top: '150px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    transform: 'rotate(12deg)',
                    display: 'flex',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    right: '100px',
                    top: '220px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    transform: 'rotate(-12deg)',
                    display: 'flex',
                }}
            />

            {/* Glowing Wave Line */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '250px',
                    width: '100%',
                    height: '200px',
                    opacity: 0.4,
                    background: 'linear-gradient(90deg, transparent 0%, #10b981 50%, #14b8a6 100%)',
                    transform: 'skewY(-10deg)',
                    filter: 'blur(60px)',
                    display: 'flex',
                }}
            />

            {/* Content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    zIndex: 10,
                }}
            >
                <h1
                    style={{
                        fontSize: '96px', // text-8xl/9xl
                        fontWeight: 800,
                        color: 'white',
                        margin: 0,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.1,
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    }}
                >
                    {title}
                </h1>
                <p
                    style={{
                        fontSize: '36px', // text-4xl
                        fontWeight: 500,
                        color: 'rgba(209, 250, 229, 0.8)', // emerald-100/80
                        margin: 0,
                        letterSpacing: '-0.02em',
                        maxWidth: '800px',
                    }}
                >
                    {description}
                </p>
            </div>

            {/* Brand Watermark */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '48px',
                    right: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: 0.5,
                }}
            >
                <div
                    style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                    }}
                />
                <span
                    style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.4)',
                    }}
                >
                    Sage Ecosystem
                </span>
            </div>
        </div>
    );
}
