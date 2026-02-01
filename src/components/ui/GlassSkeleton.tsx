'use client';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type GlassSkeletonProps = {
  className?: string;
};

const GlassSkeleton = ({ className }: GlassSkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        `
        relative overflow-hidden
        rounded-2xl
        bg-white/[0.06]
        backdrop-blur-md
        backdrop-saturate-125
        border border-white/10
        shadow-[0_4px_16px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)_inset]
        before:content-['']
        before:absolute
        before:inset-x-0
        before:top-0
        before:h-[2px]
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white/40
        before:to-transparent
        after:content-['']
        after:absolute
        after:inset-x-0
        after:bottom-0
        after:h-[1px]
        after:bg-gradient-to-r
        after:from-transparent
        after:via-white/20
        after:to-transparent
        after:pointer-events-none
        `,
        className
      )}
    >
      <span
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
          translate-x-[-100%]
          animate-[shimmer_2.5s_ease-in-out_infinite]
          pointer-events-none
        "
      />

      <span
        className="
          absolute left-0 top-0 bottom-0 w-[1px]
          bg-gradient-to-b from-white/30 via-white/10 to-transparent
          pointer-events-none
        "
      />
      <span
        className="
          absolute right-0 top-0 bottom-0 w-[1px]
          bg-gradient-to-b from-white/30 via-white/10 to-transparent
          pointer-events-none
        "
      />
    </Skeleton>
  );
};

export default GlassSkeleton;
