import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    // Maintaining compatibility with previous usage if needed, but primarily relying on standard button props
    variant?: 'primary' | 'secondary';
    whatsappMessage?: string;
}



export const GoldButton: React.FC<ButtonProps> = ({ children, className = '', whatsappMessage, onClick, ...props }) => {
    const isWhatsApp = !!whatsappMessage;
    const link = whatsappMessage
        ? `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`
        : undefined;

    if (isWhatsApp) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-primary-gold relative px-10 py-4 text-base font-extrabold tracking-widest text-[#1a0f00] overflow-hidden border-none cursor-pointer backface-hidden inline-flex items-center justify-center decoration-0 whitespace-nowrap ${className}`}
            >
                <span className="relative z-10">{children}</span>
                <div className="inner-glow absolute inset-0 z-[2] pointer-events-none" />
            </a>
        )
    }

    return (
        <button
            className={`btn-primary-gold relative px-10 py-4 text-base font-extrabold tracking-widest text-[#1a0f00] overflow-hidden border-none cursor-pointer backface-hidden whitespace-nowrap ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <div className="inner-glow absolute inset-0 z-[2] pointer-events-none" />
        </button>
    );
};

export const CyberButton: React.FC<ButtonProps> = ({ children, className = '', onClick, ...props }) => {
    return (
        <button
            className={`btn-secondary-cyber relative px-10 py-[14px] text-base font-bold tracking-[3px] border-none cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

// Default export for backward compatibility if needed, or just export GoldButton as default
export default GoldButton;
