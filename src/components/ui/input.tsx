import React, { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = ({
  className,
  type = 'text',
  ...props
}: ComponentPropsWithoutRef<'input'>) => {
  return (
    <input
      {...props}
      type={type}
      className={cn(
        'shadow-recess backdrop-blur-3xl! mt-2 w-full rounded-xl px-5 py-3 text-sm text-white placeholder-white/60',
        className
      )}
    />
  );
};
