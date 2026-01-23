import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface BootSequenceProps {
    children: ReactNode;
}

export function BootSequence({ children }: BootSequenceProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.2
                    }
                }
            }}
            className="contents"
        >
            {children}
        </motion.div>
    );
}
