'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Direction = 'fw' | 'bk' | 'up' | 'dn';

const rotationClasses: Record<Direction, string> = {
  fw: 'rotate-0',
  bk: 'rotate-180',
  up: '-rotate-90',
  dn: 'rotate-90',
};

interface NavButtonProps {
  direction: Direction;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const NavButton = ({ direction, disabled, onClick, className }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'shadow-recess backdrop-blur-3xl! rounded-3xl w-12 h-12 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform',
        className
      )}
    >
      <div className={`w-1/2 h-1/2 relative ${rotationClasses[direction]}`}>
        <Image src="/ikons/next.svg" alt="Navigation Icon" fill className="object-contain" />
      </div>
    </button>
  );
};
