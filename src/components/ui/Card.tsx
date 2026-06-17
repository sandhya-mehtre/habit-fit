import { type HTMLAttributes } from 'react';
import { clsx } from '@/utils/helpers';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
};

const Card = ({
  hover = false,
  padding = 'md',
  children,
  className,
  ...rest
}: CardProps) => (
  <div
    className={clsx(
      'bg-white dark:bg-surface-800 rounded-2xl border border-surface-200',
      'dark:border-surface-700/60 shadow-card dark:shadow-card-dark',
      hover && 'transition-shadow duration-200 hover:shadow-md dark:hover:shadow-lg cursor-pointer',
      paddingClasses[padding],
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
