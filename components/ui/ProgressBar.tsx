import React from 'react';

interface ProgressBarProps {
    progress: number; // 0 to 100
    className?: string;
    activeClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className, activeClassName = 'bg-brand-coral' }) => {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
            <div
                className={`h-2.5 rounded-full transition-all duration-300 ease-out ${activeClassName}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
};
