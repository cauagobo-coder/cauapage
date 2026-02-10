import { motion } from 'framer-motion';
import { Clock, Award, Target, Star } from 'lucide-react';
import GlassCard from './GlassCard';
import Container from './Container';

const highlights = [
    { icon: Clock, label: '19 anos', description: 'Jovem e atualizado com as tendências' },
    { icon: Award, label: '3 anos na área', description: 'Experiência sólida em projetos reais' },
    { icon: Target, label: 'Foco 100% em sites', description: 'Especialista, não generalista' },
];

const AboutSection = () => {
    return (
        <section id="sobre" className="py-32 relative bg-black overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 w-full">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '200px' }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-6 text-center lg:text-left mx-auto lg:mx-0 w-full max-w-2xl lg:self-center"
                    >
                        <span className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-4 block">
                            <Star className="w-4 h-4 inline-block mr-2 -mt-1 text-yellow-500 fill-yellow-500" />
                            Sobre mim
                        </span>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                            Não faço tudo.{' '}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
                                Faço sites muito bem.
                            </span>
                        </h2>

                        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                            <p>
                                Meu nome é Cauã. Aos 19 anos, já acumulei 3 anos de experiência criando
                                websites que realmente funcionam. Meu foco é exclusivo: landing pages,
                                sites institucionais e portfólios que convertem visitantes em clientes.
                            </p>
                            <p>
                                Enquanto outros tentam fazer de tudo, eu escolhi dominar uma única coisa.
                                Cada projeto recebe atenção total, desde o design até a performance final.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Cards */}
                    <div className="lg:col-span-5 lg:col-start-8 space-y-4 flex flex-col items-center w-full lg:block lg:self-center">
                        {highlights.map((item, index) => (
                            <GlassCard key={item.label} delay={index * 0.15} className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-5 md:p-6 text-center md:text-left w-full max-w-[260px] md:max-w-none lg:mx-0">
                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.label}</h3>
                                    <p className="text-xs md:text-sm text-zinc-400">{item.description}</p>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default AboutSection;
