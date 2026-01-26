import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetween?: number;
    className?: string;
}

export function TypewriterText({ 
    texts, 
    typingSpeed = 150, 
    deletingSpeed = 100, 
    delayBetween = 2000,
    className = ""
}: TypewriterTextProps) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const timeout = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout);
    }, []);

    // Typing logic
    useEffect(() => {
        if (subIndex === texts[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => {
                setReverse(true);
            }, delayBetween);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % texts.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? deletingSpeed : typingSpeed, parseInt((Math.random() * 50).toString()))); // Add slight randomness for realism

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, texts, typingSpeed, deletingSpeed, delayBetween]);

    return (
        <span className={className}>
            {texts[index].substring(0, subIndex)}
            <motion.span 
                animate={{ opacity: blink ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="inline-block w-[0.1em] h-[0.8em] ml-1 bg-emerald-400 align-middle"
            />
        </span>
    );
}
