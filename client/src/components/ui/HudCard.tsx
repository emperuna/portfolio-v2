import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface HudCardProps {
  label: string;
  value: string | number;
  className?: string;
  delay?: number;
}

export function HudCard({ label, value, className, delay = 0 }: HudCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "flex flex-col rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md",
        "shadow-[0_0_15px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <span className="mt-1 font-mono text-sm font-bold text-text-primary">
        {value}
      </span>
    </motion.div>
  );
}
