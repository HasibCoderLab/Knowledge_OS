import React from 'react';

interface AvatarProps {
  src?: string | undefined;
  alt?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string | undefined;
}

const sizeMap = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-lg',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = '', name, size = 'md', className = '' }) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`${sizeMap[size]} rounded-full object-cover shrink-0 ring-2 ring-white dark:ring-slate-900 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 ring-2 ring-white dark:ring-slate-900 ${className}`}
      aria-label={alt || name || 'Avatar'}
    >
      {initials}
    </div>
  );
};

export default Avatar;
