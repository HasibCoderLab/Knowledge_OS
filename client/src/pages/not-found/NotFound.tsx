import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, LayoutDashboard, Home, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const floatAnimation = (delay: number, duration: number) => ({
  y: [0, -12, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
});

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-violet-500/10 dark:bg-violet-500/15 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[25%] w-[20vw] h-[20vw] max-w-[280px] max-h-[280px] bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Floating background elements */}
      <motion.div
        animate={floatAnimation(0, 6)}
        className="absolute top-[18%] left-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-indigo-200/30 dark:border-indigo-400/10 bg-indigo-50/20 dark:bg-indigo-500/5 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        animate={floatAnimation(1.5, 7)}
        className="absolute bottom-[22%] right-[12%] w-12 h-12 md:w-20 md:h-20 rounded-full border border-violet-200/30 dark:border-violet-400/10 bg-violet-50/20 dark:bg-violet-500/5 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        animate={floatAnimation(3, 8)}
        className="absolute top-[55%] left-[8%] w-10 h-10 md:w-16 md:h-16 rounded-full border border-amber-200/30 dark:border-amber-400/10 bg-amber-50/20 dark:bg-amber-500/5 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Main card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg mx-auto px-5"
      >
        {/* Glass card */}
        <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl shadow-xl shadow-indigo-500/5 dark:shadow-indigo-500/10 overflow-hidden">
          {/* Decorative top bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" aria-hidden="true" />

          <div className="px-8 py-12 md:px-12 md:py-16 flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div
              variants={itemVariants}
              className="relative mb-8"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/20">
                <BookOpen size={36} className="text-white" strokeWidth={1.5} />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
                }}
                className="absolute -inset-3 rounded-3xl bg-indigo-500/10 dark:bg-indigo-400/10 -z-10"
                aria-hidden="true"
              />
            </motion.div>

            {/* Error code */}
            <motion.div
              variants={itemVariants}
              className="mb-4"
            >
              <span
                className="text-[100px] md:text-[140px] font-bold leading-none tracking-tighter select-none"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                }}
              >
                404
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3"
            >
              Page Not Found
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm"
            >
              The page you're looking for doesn't exist, has been moved, or the link may be outdated.
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent my-8"
            />

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3 w-full"
            >
              <Button
                size="md"
                className="gap-2 w-full sm:w-auto"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard size={16} />
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                size="md"
                className="gap-2 w-full sm:w-auto"
                onClick={() => navigate('/')}
              >
                <Home size={16} />
                Go Home
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 flex items-center justify-center gap-1.5"
        >
          <BrainCircuit size={12} />
          KnowledgeOS
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
