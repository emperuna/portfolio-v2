import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I'm <span className="text-blue-600 dark:text-blue-400">Alex</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-zinc-500 md:text-xl dark:text-zinc-400">
          A Full Stack Developer passionate about building accessible and performant web applications.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" asChild>
            <a href="#projects">View Work</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
