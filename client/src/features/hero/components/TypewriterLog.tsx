import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface TypewriterLogProps {
    text: string;
    onComplete?: () => void;
    className?: string;
}

export function TypewriterLog({ text, onComplete, className }: TypewriterLogProps) {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                onComplete?.();
            }
        }, 15 + Math.random() * 20); // Random variance for "human" feel

        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayedText}</span>;
}
