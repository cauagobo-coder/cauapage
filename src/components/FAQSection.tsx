import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import GlassCard from './GlassCard';

const faqs = [
    {
        question: 'Você faz apenas sites?',
        answer: 'Sim. Meu foco é 100% em desenvolvimento web: landing pages, sites institucionais e portfólios. Isso me permite entregar qualidade máxima em cada projeto.',
    },
    {
        question: 'Quanto tempo leva para ficar pronto?',
        answer: 'Depende do escopo e complexidade do projeto. Uma Landing Page geralmente leva de 5 a 10 dias úteis. Sites institucionais podem levar de 15 a 30 dias.',
    },
    {
        question: 'O site é responsivo?',
        answer: 'Com certeza. Todos os projetos são desenvolvidos com a metodologia "Mobile First", garantindo que funcionem perfeitamente em celulares, tablets e computadores.',
    },
    {
        question: 'Como funciona o pagamento?',
        answer: 'Trabalho com 50% de entrada para iniciar o projeto e 50% na entrega. Aceito PIX e Cartão de Crédito (parcelado).',
    },
    {
        question: 'Vou ter acesso para editar o site depois?',
        answer: 'Sim! Se o projeto for em WordPress ou plataforma similar, você terá acesso total ao painel administrativo para fazer alterações de texto e imagem.',
    }
];

import Container from './Container';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 relative bg-black">
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '200px' }}
                            transition={{ duration: 0.4 }}
                            className="text-center mb-16"
                        >
                            <span className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-4 block">
                                Dúvidas Comuns
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">Frequentes</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <GlassCard
                                    key={index}
                                    className={`transition-all duration-300 ${openIndex === index ? 'border-yellow-500/30 bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between text-left p-2 focus:outline-none"
                                    >
                                        <span className={`text-lg font-bold pr-8 transition-colors ${openIndex === index ? 'text-yellow-500' : 'text-white'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`shrink-0 p-1 rounded-full border transition-all ${openIndex === index ? 'bg-yellow-500 border-yellow-500 rotate-180' : 'border-white/20 text-white'}`}>
                                            {openIndex === index ? <Minus className="w-5 h-5 text-black" /> : <Plus className="w-5 h-5" />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 pr-12 text-zinc-400 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>
                            ))}
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQSection;
