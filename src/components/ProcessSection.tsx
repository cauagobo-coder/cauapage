import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import {
    Search,
    Target,
    Code,
    CheckCircle2,
    Zap,
    ArrowDown,
    Sparkles
} from 'lucide-react';
import { GoldButton } from './GoldButton';

// --- Interfaces ---
interface StepProps {
    id: number;
    year: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

interface ProgressNodeProps {
    nodeX: number;
    scrollYProgress: MotionValue<number>;
    index: number;
    threshold: number;
}

interface SpotlightCardProps {
    step: StepProps;
    scrollYProgress: MotionValue<number>;
    threshold: number;
    dynamicWidth?: number;
}

// --- Dados ---
const steps: StepProps[] = [
    { id: 1, year: "Fase 01", title: "Briefing Inicial", description: "Entendimento profundo do seu negócio e objetivos.", icon: Search },
    { id: 2, year: "Fase 02", title: "Estratégia Visual", description: "Definição de identidade, layout e referências.", icon: Target },
    { id: 3, year: "Fase 03", title: "Desenvolvimento", description: "Construção com código limpo e tecnologias modernas.", icon: Code },
    { id: 4, year: "Fase 04", title: "Refinamento", description: "Ajustes finos, animações e otimização total.", icon: Sparkles },
    { id: 5, year: "Fase 05", title: "Entrega Final", description: "Seu site no ar, rápido e pronto para vender.", icon: CheckCircle2 },
];

// --- Constantes de Dimensão ---
const CARD_WIDTH = 450;
const GAP_WIDTH = 300;
const FINAL_CTA_WIDTH = 600;

import Container from './Container';

// --- Componente: Header (Container Separado) ---
const Header = () => {
    return (
        <section className="relative h-[90vh] flex flex-col justify-center bg-[#050505] z-10 border-b border-white/5">
            <Container>
                <div className="max-w-4xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                        Meu<br /><span className="text-yellow-400">Método</span>
                    </h1>

                    <p className="text-neutral-300 font-semibold text-lg md:text-2xl max-w-2xl leading-snug mb-6">
                        Estratégia que pensa. Execução que impacta.
                    </p>

                    <div className="space-y-4 max-w-2xl border-l-0 lg:border-l-4 border-yellow-500 pl-0 lg:pl-8">
                        <p className="text-neutral-400 font-medium text-base md:text-lg leading-relaxed">
                            Nada aqui é por acaso.<br />
                            Cada projeto nasce de uma arquitetura clara, construída para transformar visão criativa em presença digital que entrega estética, performance e posicionamento.
                        </p>
                        <p className="text-neutral-500 text-sm md:text-base italic">
                            Criar página não é sobre design. É sobre direção.
                        </p>
                    </div>
                </div>
            </Container>

            <Container className="absolute bottom-12 left-0 right-0">
                <div className="flex items-center gap-4 text-neutral-500 animate-bounce justify-center lg:justify-start">
                    <ArrowDown className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm uppercase tracking-widest font-bold">Conheça a lógica por trás da estética</span>
                </div>
            </Container>
        </section>
    );
};

// --- Componente: Nó (Bolinha) ---
const ProgressNode: React.FC<ProgressNodeProps> = ({
    nodeX,
    scrollYProgress,
    threshold,
    index
}) => {
    // O nó 0 começa ativo. Os outros ativam com o threshold.
    const activeState = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0] : [threshold - 0.005, threshold],
        index === 0 ? [1, 1] : [0, 1],
        { clamp: true }
    );

    const ringColor = useTransform(activeState, [0, 1], ["#262626", "#facc15"]);
    const coreColor = useTransform(activeState, [0, 1], ["#171717", "#facc15"]);
    const shadow = useTransform(activeState, [0, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 30px rgba(250,204,21,1)"]);
    const scale = useTransform(activeState, [0, 1], [0.8, 1.2]);

    return (
        <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
            style={{ left: `${nodeX}px` }}
        >
            <motion.div
                style={{ scale, borderColor: ringColor, boxShadow: shadow }}
                className="w-8 h-8 rounded-full border-[3px] bg-[#050505] flex items-center justify-center"
            >
                <motion.div
                    style={{ backgroundColor: coreColor }}
                    className="w-2.5 h-2.5 rounded-full"
                />
            </motion.div>
        </div>
    );
};

// --- Componente: Card ---
const SpotlightCard: React.FC<SpotlightCardProps> = ({ step, scrollYProgress, threshold, dynamicWidth }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const isPassed = useTransform(
        scrollYProgress,
        [threshold - 0.005, threshold],
        [0, 1],
        { clamp: true }
    );

    const borderColor = useTransform(isPassed, [0, 1], ["rgba(255, 255, 255, 0.05)", "rgba(250, 204, 21, 1)"]);
    const glowShadow = useTransform(isPassed, [0, 1], ["0 0 0 rgba(0,0,0,0)", "0 0 60px rgba(250, 204, 21, 0.3)"]);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
        if (ref.current) {
            ref.current.style.setProperty("--x", `${clientX - left}px`);
            ref.current.style.setProperty("--y", `${clientY - top}px`);
        }
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                width: dynamicWidth || CARD_WIDTH,
                borderColor,
                boxShadow: glowShadow
            }}
            className="group relative h-[350px] md:h-[400px] lg:h-[450px] shrink-0 rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900/60 border p-5 md:p-7 lg:p-10 transition-colors"
        >
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                style={{ background: `radial-gradient(400px circle at var(--x) var(--y), rgba(250, 204, 21, 0.08), transparent 80%)` }} />

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6 md:mb-10">
                    <div className="px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full">
                        <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">{step.year}</span>
                    </div>
                    <step.icon className="w-8 h-8 text-white/10 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all duration-500" />
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter leading-none">{step.title}</h3>
                <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors leading-relaxed text-xs md:text-sm">{step.description}</p>

                <div className="mt-auto pt-8">
                    <div className="h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            style={{
                                width: useTransform(scrollYProgress, [threshold, threshold + 0.1], ["0%", "100%"]),
                            }}
                            className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                        />
                    </div>
                </div>
            </div>

            <span className="absolute -bottom-8 -right-4 text-[160px] font-black text-white/[0.015] select-none pointer-events-none">0{step.id}</span>
        </motion.div>
    );
};

// --- Componente Principal: Timeline Horizontal ---
const ProcessSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    // --- MANUAL SCROLL TRACKING ---
    const { scrollY } = useScroll();
    const [elementTop, setElementTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);

    // Dimensões Dinâmicas
    const [paddingStart, setPaddingStart] = useState(200);
    const [cardWidth, setCardWidth] = useState(CARD_WIDTH);
    const [gapWidth, setGapWidth] = useState(GAP_WIDTH);
    const [ctaWidth, setCtaWidth] = useState(FINAL_CTA_WIDTH);

    /*
     * Mapeamento manual do progresso:
     * Start: Quando o topo da seção atinge o topo da tela (scrollY == elementTop)
     * End: Quando o fundo da seção atinge o fundo da tela (scrollY == elementTop + clientHeight - windowHeight)
     * (Equivalente a offset: ["start start", "end end"])
     */

    // Atualiza posições do elemento (Top/Height)
    const updatePosition = () => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const absoluteTop = rect.top + scrollTop;

            setElementTop(absoluteTop);
            setClientHeight(targetRef.current.offsetHeight);
        }
    };

    // Atualiza dimensões da viewport e padding
    const updateDimensions = () => {
        const width = window.innerWidth;
        setViewportWidth(width);

        if (width >= 1024) {
            setPaddingStart(260); // Desktop Large
            setCardWidth(450);
            setGapWidth(300);
            setCtaWidth(600);
        } else if (width >= 768) {
            setPaddingStart(80);  // Tablet
            setCardWidth(400);
            setGapWidth(150);
            setCtaWidth(450);
        } else {
            setPaddingStart(16);  // Mobile
            setCardWidth(window.innerWidth - 40); // Full width minus padding (20*2)
            setGapWidth(60);
            setCtaWidth(Math.min(300, window.innerWidth - 40));
        }
        updatePosition();
    };

    useEffect(() => {
        updateDimensions();
        // Pequeno delay para garantir que layout final esteja pronto (especialmente imagens/fontes)
        setTimeout(updateDimensions, 100);
        setTimeout(updateDimensions, 500);

        // Debounced resize — batches rapid resize events (e.g. orientation change)
        let resizeTimer: ReturnType<typeof setTimeout>;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateDimensions, 200);
        };
        window.addEventListener('resize', debouncedResize);

        // Scroll listener: re-measures position because lazy content above
        // can shift elementTop as it loads and expands
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    updatePosition();
                    ticking = false;
                });
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', debouncedResize);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(resizeTimer);
        };
    }, []); // Dependências vazias, pois usamos apenas window e refs

    const scrollYProgress = useTransform(
        scrollY,
        [elementTop, elementTop + clientHeight - (typeof window !== 'undefined' ? window.innerHeight : 0)],
        [0, 1]
    );

    // BLOCK WIDTH is now dynamic based on state
    const currentBlockWidth = cardWidth + gapWidth;

    const { totalContentWidth, nodePositions, lineStartX, lineTotalLength } = useMemo(() => {
        // Calculamos posições a partir do padding (centro da tela)
        const positions = [
            paddingStart,
            ...steps.map((_, i) => paddingStart + (i + 1) * currentBlockWidth)
        ];

        // Padding final reduzido para aproximar o conteúdo do canto direito
        const endPadding = paddingStart / 4;

        // Largura total REAL do conteúdo (incluindo o spacer final)
        const totalWidth = paddingStart + (steps.length * currentBlockWidth) + ctaWidth + endPadding;

        const lStart = positions[0];
        const lEnd = positions[positions.length - 1];

        return {
            totalContentWidth: totalWidth,
            nodePositions: positions,
            lineStartX: lStart,
            lineTotalLength: lEnd - lStart
        };
    }, [paddingStart, viewportWidth, cardWidth, gapWidth, ctaWidth]); // Dependências atualizadas

    // Mobile: scroll stops when CTA is centered on screen.
    // Desktop: scroll stops when right edge of content hits right edge of screen.
    const ctaCenterX = paddingStart + (steps.length * currentBlockWidth) + ctaWidth / 2;
    const maxScroll = viewportWidth < 1024
        ? Math.max(0, ctaCenterX - viewportWidth / 2)
        : Math.max(0, totalContentWidth - viewportWidth);
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${maxScroll}px`]);
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="processo" className="relative bg-[#050505]">
            <Header />
            <section ref={targetRef} className="relative h-[600vh] bg-[#050505] overflow-visible">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    {/* Container Horizontal Móvel */}
                    <motion.div style={{ x }} className="flex items-center relative h-full">

                        {/* Container Fantasma para garantir a largura */}
                        <div style={{ width: totalContentWidth, height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

                        {/* --- LINHA MESTRA (Track + Laser) --- */}
                        <div className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                            style={{ left: `${lineStartX}px`, width: `${lineTotalLength}px`, height: '2px' }}>

                            <div className="absolute inset-0 bg-white/5" />

                            <motion.div
                                style={{ width: lineWidth }}
                                className="h-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.9),0_0_5px_rgba(250,204,21,1)] origin-left"
                            />
                        </div>

                        {/* Nós (Bolinhas) */}
                        {nodePositions.map((pos, idx) => {
                            // Threshold relativo ao comprimento da linha (0 a 1 dentro da linha)
                            const relativeThreshold = (pos - lineStartX) / lineTotalLength;
                            return (
                                <ProgressNode
                                    key={idx}
                                    index={idx}
                                    nodeX={pos}
                                    scrollYProgress={scrollYProgress}
                                    threshold={relativeThreshold}
                                />
                            );
                        })}

                        {/* Espaçador Inicial (Empurra o primeiro item para o meio da tela) */}
                        <div style={{ width: paddingStart }} className="shrink-0 transition-all duration-300" />

                        {/* Cards */}
                        <div className="flex items-center relative z-20">
                            {steps.map((step, index) => {
                                const cardStartX = paddingStart + (index * currentBlockWidth) + (gapWidth / 2);
                                const relativeThreshold = (cardStartX - lineStartX) / lineTotalLength;

                                return (
                                    <div
                                        key={step.id}
                                        className="relative flex items-center justify-center shrink-0"
                                        style={{ width: currentBlockWidth }}
                                    >
                                        <div style={{ width: cardWidth }}>
                                            <SpotlightCard
                                                step={step}
                                                scrollYProgress={scrollYProgress}
                                                threshold={relativeThreshold}
                                                dynamicWidth={cardWidth}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Final */}
                        <div style={{ width: ctaWidth }} className="shrink-0 flex flex-col items-center justify-center text-center relative z-20">
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
                                <div className="relative w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.4)] mb-12">
                                    <Zap className="w-12 h-12 text-black fill-black" />
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6 md:mb-8">Vamos<br />Começar?</h3>
                            <GoldButton whatsappMessage="Olá! Vi sua Metodologia e quero iniciar um projeto.">
                                Solicitar Projeto
                            </GoldButton>
                        </div>

                        {/* Espaçador Final Reduzido */}
                        <div style={{ width: paddingStart / 4 }} className="shrink-0" />

                    </motion.div>
                </div>
            </section>
        </section>
    );
};

export default ProcessSection;
