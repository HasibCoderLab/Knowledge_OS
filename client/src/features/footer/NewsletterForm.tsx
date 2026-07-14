import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5">
          Stay Updated
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Get the latest news and product updates.
        </p>
      </div>

      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium"
        >
          <Check size={16} strokeWidth={2.5} />
          You're subscribed!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="flex-1 min-w-0 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            aria-label="Email address for newsletter"
          />
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-500/25 hover:shadow-md hover:shadow-indigo-500/30 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 shrink-0"
            aria-label="Subscribe to newsletter"
          >
            <ArrowRight size={16} />
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default NewsletterForm;
