import React from 'react';
import GoldButton from './GoldButton';
import { motion } from 'framer-motion';

const FinalCTASection: React.FC = () => {
    const handleContactClick = () => {
        const link = "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20queria%20levar%20meu%20site%20para%20o%20pr%C3%B3ximo%20n%C3%ADvel!";
        window.open(link, '_blank');
    };

    return (
        <section className="py-32 relative bg-black overflow-hidden flex items-center justify-center">
            {/* Background Glow */}
            {/* Background Glow - Optimized: Radial Gradient instead of Box Shadow/Blur for 0 GPU cost */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0.05) 40%, transparent 70%)'
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Quer um site <span className="text-yellow-500">nesse nível?</span>
                    </h2>

                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Vamos resolver isso hoje. Uma conversa rápida e começamos.
                    </p>

                    <GoldButton
                        onClick={handleContactClick}
                        className="mx-auto"
                    >
                        Iniciar Conversa
                    </GoldButton>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTASection;
