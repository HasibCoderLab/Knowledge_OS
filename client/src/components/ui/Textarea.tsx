import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <textarea
        className={`
          px-3 py-2.5 bg-white dark:bg-slate-900 border rounded-lg outline-none text-sm
          transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
          resize-y min-h-[100px]
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

export default Textarea;
