import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';
import { CyberButton } from './GoldButton';

const projects = [
    {
        title: 'E-commerce de Luxo',
        category: 'Loja Virtual',
        description: 'Design minimalista focado em produtos high-ticket.',
        tags: ['UX/UI', 'Conversão', 'Performance'],
        image: 'bg-gradient-to-br from-amber-900/40 to-black',
    },
    {
        title: 'Consultoria Financeira',
        category: 'Institucional',
        description: 'Plataforma corporativa com área de membros.',
        tags: ['React', 'Dashboard', 'Segurança'],
        image: 'bg-gradient-to-br from-blue-900/40 to-black',
    },
    {
        title: 'Landing Page SaaS',
        category: 'Software',
        description: 'Página de alta conversão para startup de tecnologia.',
        tags: ['Copywriting', 'SEO', 'Analytics'],
        image: 'bg-gradient-to-br from-emerald-900/40 to-black',
    },
    {
        title: 'Portfólio Criativo',
        category: 'Pessoal',
        description: 'Showcase interativo para agência de design.',
        tags: ['WebGL', 'Animação', '3D'],
        image: 'bg-gradient-to-br from-purple-900/40 to-black',
    },
];

import Container from './Container';

const ProjectsSection = () => {
    return (
        <section id="projetos" className="py-24 relative bg-black/95">
            <Container className="relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-4 block">
                        Portfólio Selecionado
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Projetos que <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">geram impacto</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Uma seleção de trabalhos recentes onde design, performance e estratégia se encontram.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {projects.map((project, index) => (
                        <div key={index} className="col-span-1 lg:col-span-6">
                            <GlassCard
                                delay={index * 0.1}
                                className="group cursor-pointer overflow-hidden p-0 border-white/5 hover:border-yellow-500/20 h-full"
                            >
                                {/* Image Area */}
                                <div className={`h-64 ${project.image} relative overflow-hidden`}>
                                    {/* Grid pattern overlay removed - placeholder-grid.svg not found */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-black/80 p-4 rounded-full border border-yellow-500/30 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                            <ExternalLink className="w-6 h-6 text-yellow-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 relative flex flex-col items-center lg:items-start text-center lg:text-left">
                                    <div className="flex justify-center lg:justify-between items-center lg:items-start w-full mb-4">
                                        <div>
                                            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-2 block">
                                                {project.category}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 mb-6 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-xs font-medium text-white/60 bg-white/5 rounded-full border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center"
                >
                    <CyberButton
                        onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mx-auto"
                    >
                        Iniciar Projeto
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </CyberButton>
                </motion.div>

            </Container>
        </section>
    );
};

export default ProjectsSection;
