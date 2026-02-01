import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'dk';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', size = 'default', children, className, asChild = false, ...props },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const Comp = asChild ? Slot : 'button';

    const variantClass =
      variant === 'default'
        ? 'shadow-recess !backdrop-blur-3xl !text-white !rounded-3xl'
        : '!border !border-white !bg-grey-dark !text-white !rounded-2xl';

    const sizeClass = {
      default: '!px-5 !py-2.5 !text-[16px] !leading-[25px]',
      sm: '!px-3 !py-2 !text-sm',
      lg: '!px-6 !py-3 !text-lg',
      icon: '!p-3',
    }[size];

    const dynamicStyle: React.CSSProperties = {
      transition: 'all var(--anim--hover-time) var(--anim--hover-ease)',
      transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.05)' : 'scale(1)',
      filter: isPressed ? 'brightness(0.9)' : isHovered ? 'brightness(1.1)' : 'brightness(1)',
    };

    return (
      <Comp
        ref={ref}
        className={`${variantClass} ${sizeClass} transition-transform! cursor-pointer ${className || ''}`}
        style={{ ...dynamicStyle, ...props.style }}
        onMouseEnter={e => {
          setIsHovered(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={e => {
          setIsHovered(false);
          setIsPressed(false);
          props.onMouseLeave?.(e);
        }}
        onMouseDown={e => {
          setIsPressed(true);
          props.onMouseDown?.(e);
        }}
        onMouseUp={e => {
          setIsPressed(false);
          props.onMouseUp?.(e);
        }}
        onClick={props.onClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
