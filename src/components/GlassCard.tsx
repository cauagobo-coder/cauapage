'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const GlassCard = ({ children, className = '', delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            className={`
                relative z-10 overflow-hidden group
                bg-white/[0.03] backdrop-blur-xl 
                border border-white/[0.05]
                rounded-2xl
                hover:bg-white/[0.05] hover:border-yellow-500/20 
                transition-all duration-500
                shadow-2xl shadow-black/50
                p-6
                ${className}
            `}
        >
            {/* Efeito de brilho suave no topo (Spotlight) */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Borda gradient no hover */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-500/10 transition-colors duration-500 pointer-events-none" />

            {/* Conteúdo */}
            {children}
        </motion.div>
    );
};

export default GlassCard;
