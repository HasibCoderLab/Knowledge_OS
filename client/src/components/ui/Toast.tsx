import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import type { Toast } from '../../store/toastStore';

/* ── Icon & colour maps ─────────────────────────────────────────── */

const iconMap: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const borderColors: Record<string, string> = {
  success: 'border-emerald-400/40 dark:border-emerald-500/30',
  error: 'border-red-400/40 dark:border-red-500/30',
  warning: 'border-amber-400/40 dark:border-amber-500/30',
  info: 'border-blue-400/40 dark:border-blue-500/30',
};

const bgColors: Record<string, string> = {
  success:
    'bg-white dark:bg-slate-900',
  error:
    'bg-white dark:bg-slate-900',
  warning:
    'bg-white dark:bg-slate-900',
  info:
    'bg-white dark:bg-slate-900',
};

const iconColors: Record<string, string> = {
  success: 'text-emerald-500 dark:text-emerald-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-amber-500 dark:text-amber-400',
  info: 'text-blue-500 dark:text-blue-400',
};

const progressColors: Record<string, string> = {
  success: 'bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-500',
  error: 'bg-gradient-to-r from-red-500 to-red-400 dark:from-red-600 dark:to-red-500',
  warning: 'bg-gradient-to-r from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500',
  info: 'bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500',
};

/* ── Animation variants ─────────────────────────────────────────── */

const containerVariants = {
  initial: { opacity: 0, y: 20, scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24, mass: 0.85 },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.94,
    transition: { duration: 0.18, ease: 'easeInOut' as const },
  },
};

/* ── Progress bar CSS (animates in CSS for pause-on-hover via FLAG) ── */

const TOAST_CSS = `
@keyframes toast-shrink {
  from { width: 100%; }
  to   { width: 0%; }
}

@keyframes toast-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.toast-progress-bar {
  animation: toast-shrink var(--toast-dur, 4s) linear forwards;
  will-change: width;
}
.toast-progress-bar.paused {
  animation-play-state: paused;
}

.toast-shimmer {
  background-size: 200% 100%;
  animation: toast-shimmer 1.5s ease-in-out infinite;
}
`;

/* ── Single toast item ──────────────────────────────────────────── */

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const Icon = iconMap[toast.type] ?? Info;
  const durationMs = toast.duration ?? 4000;

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      if (Math.abs(info.offset.x) > 80) {
        onRemove(toast.id);
      }
    },
    [toast.id, onRemove],
  );

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0.7, right: 0.3 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onDrag={(_, info) => setDragX(info.offset.x)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ cursor: isDragging ? 'grabbing' : 'default' }}
      className={`
        relative overflow-hidden rounded-xl border shadow-lg
        pointer-events-auto select-none
        transition-all duration-300 ease-out
        ${bgColors[toast.type]}
        ${borderColors[toast.type]}
        ${isHovered && !isDragging ? 'shadow-xl shadow-black/5 dark:shadow-black/20 -translate-y-0.5' : ''}
        ${Math.abs(dragX) > 0 && isDragging ? 'shadow-2xl rotate-[1.5deg]' : ''}
      `}
      role="alert"
    >
      {/* Drag cue — subtle gradient that intensifies as you drag */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-200"
        style={{
          opacity: Math.min(Math.abs(dragX) / 60, 0.6),
          background: `linear-gradient(90deg, transparent ${50 + dragX * 0.2}%, rgba(255,255,255,0.08) 90%, transparent 100%)`,
        }}
      />

      {/* Shimmer overlay on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="toast-shimmer absolute inset-0 rounded-xl pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          }}
        />
      )}

      <div className="flex items-start gap-3 px-4 pt-3.5 pb-3 relative z-10">
        {/* Icon with spring-loaded entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.08 }}
          className={`shrink-0 mt-0.5 ${iconColors[toast.type]}`}
        >
          <Icon size={18} strokeWidth={2.5} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {toast.title}
          </p>
          {toast.description && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.25 }}
              className="text-xs mt-0.5 text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {toast.description}
            </motion.p>
          )}
        </div>

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(toast.id)}
          className="shrink-0 p-0.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X size={14} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Progress bar — pure CSS for reliable pause-on-hover via animation-play-state */}
      <div className="relative h-1 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`toast-progress-bar h-full rounded-r-full ${progressColors[toast.type]} ${isHovered ? 'paused' : ''}`}
          style={{ '--toast-dur': `${durationMs}ms` } as React.CSSProperties}
        />
        {/* Glint at the leading edge */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-0 bottom-0 w-3 rounded-r-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── Container ──────────────────────────────────────────────────── */

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <>
      {/* Inject shared CSS keyframes once */}
      <style>{TOAST_CSS}</style>

      <div
        className="fixed bottom-4 right-4 z-[60] flex flex-col-reverse gap-2 max-w-sm w-full pointer-events-none"
        style={{ perspective: 800 }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast, i) => {
            /* Stacking depth — earlier (older) toasts sit further back */
            const stackDepth = Math.min(toasts.length - 1 - i, 3);
            const stackScale = 1 - stackDepth * 0.02;
            const stackY = stackDepth * -3;

            return (
              <motion.div
                key={toast.id}
                layout
                style={{
                  zIndex: toasts.length - i,
                  scale: stackScale,
                  y: stackY,
                }}
                className="pointer-events-none"
              >
                <ToastItem toast={toast} onRemove={removeToast} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ToastContainer;
