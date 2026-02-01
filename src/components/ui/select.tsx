'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface GlassAutocompleteProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const GlassAutocomplete = ({
  options,
  placeholder,
  value,
  onChange,
  className,
}: GlassAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || '');
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions =
    query && !options.includes(query)
      ? options.filter(opt => opt.toLowerCase().includes(query.toLowerCase()))
      : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setQuery(option);
    setOpen(false);
    onChange(option);
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={cn(
          'shadow-recess backdrop-blur-3xl mt-2 w-full rounded-xl px-5 py-3 text-sm text-white placeholder-white/60 outline-none'
        )}
      ></input>
      <ChevronDown
        onClick={() => setOpen(true)}
        className="absolute right-3 top-[50%] transform -translate-y-[40%] text-white/60"
      />

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-black/70 rounded-xl backdrop-blur-3xl shadow-recess border border-white/10 overflow-hidden">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-white/60">No results found</div>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 text-sm text-white hover:bg-white/10 cursor-pointer transition"
              >
                {option}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
