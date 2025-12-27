import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

    const variants = {
        primary: 'bg-brand-orange text-white hover:bg-orange-500 shadow-sm',
        secondary: 'bg-brand-pink text-brand-text hover:bg-pink-300',
        outline: 'border border-brand-orange text-brand-orange hover:bg-orange-50',
        ghost: 'hover:bg-brand-gray text-brand-text',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-8 text-base',
        lg: 'h-14 px-10 text-lg',
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        />
    );
};
