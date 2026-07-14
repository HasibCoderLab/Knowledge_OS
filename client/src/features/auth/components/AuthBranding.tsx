import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

interface AuthBrandingProps {
  mode: 'login' | 'register';
}

const features = [
  'Capture ideas at the speed of thought',
  'Track habits and build lasting routines',
  'Organize your reading with smart notes',
  'Visualize growth with beautiful analytics',
];

const AuthBranding: React.FC<AuthBrandingProps> = ({ mode }) => {
  return (
    <div className="relative flex flex-col justify-between h-full p-8 lg:p-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-violet-400/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">KnowledgeOS</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
          {mode === 'login'
            ? 'Welcome back to your knowledge workspace.'
            : 'Start building your second brain today.'}
        </h2>
        <p className="text-indigo-100 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
          {mode === 'login'
            ? 'Sign in to pick up where you left off.'
            : 'Create an account to organize your thoughts, track habits, and grow.'}
        </p>

        <div className="space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0" />
              <span className="text-sm text-indigo-100">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="relative z-10">
        <p className="text-xs text-indigo-200/60">
          &copy; {new Date().getFullYear()} KnowledgeOS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthBranding;
