'use client';

import { motion, useInView, Variant } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'zoom-in';

interface AnimateOnScrollProps {
    children: ReactNode;
    animation?: AnimationType;
    duration?: number;
    delay?: number;
    once?: boolean;
    className?: string;
    threshold?: number;
}

const variants: Record<AnimationType, { hidden: any; visible: any }> = {
    'fade-up': {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    'scale-up': {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    'zoom-in': {
        hidden: { opacity: 0, scale: 1.2 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function AnimateOnScroll({
    children,
    animation = 'fade-up',
    duration = 0.6,
    delay = 0,
    once = true,
    className = '',
    threshold = 0.1,
}: AnimateOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });

    return (
        <motion.div
            ref={ref}
            variants={variants[animation]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Premium quint ease
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
