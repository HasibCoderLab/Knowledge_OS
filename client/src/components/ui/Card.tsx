import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, hoverable = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-2xl shadow-sm
        transition-all duration-200
        ${hoverable ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer' : ''}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="px-5 md:px-7 py-4 md:py-5 border-b border-slate-100 dark:border-slate-800/80">
          {title && <h3 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="p-5 md:p-7">
        {children}
      </div>
    </div>
  );
};

export default Card;
