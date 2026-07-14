import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <input
        className={`
          px-3.5 py-2.5 bg-white dark:bg-slate-900 border rounded-xl text-sm
          outline-none transition-all
          focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
          dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500
          ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
