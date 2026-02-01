'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type MascotState = 'happy' | 'sad' | 'dead';

interface DialogProps {
  open: boolean;
  title: string;
  description: string;
  mascot: MascotState;
  onClose: () => void;
  className?: string;
}

const mascotMap: Record<MascotState, string> = {
  happy: '/mascot/happy.png',
  sad: '/mascot/sad.png',
  dead: '/mascot/dead.png',
};

export const Dialog = ({ open, title, description, mascot, onClose, className }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-[clamp(1rem,4vw,2rem)]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div
        className={cn(
          'relative w-full max-w-[clamp(22rem,90vw,34rem)] rounded-2xl p-[clamp(1.5rem,4vw,2.5rem)] backdrop-blur-xl shadow',
          className
        )}
      >
        <button onClick={onClose} className="absolute right-5 top-5 text-white/70 ">
          <X className="h-8 w-8" />
        </button>

        <div className="mx-auto mb-[clamp(1rem,3vw,1.5rem)] flex justify-center">
          <div className="relative w-[clamp(4.5rem,20vw,6rem)] aspect-square">
            <Image src={mascotMap[mascot]} alt={mascot} fill className="object-contain" />
          </div>
        </div>

        <h2 className="mb-[clamp(0.75rem,2vw,1rem)] text-center text-2xl font-semibold">{title}</h2>

        <p className="text-center text-md leading-relaxed text-white-muted">{description}</p>
      </div>
    </div>
  );
};
