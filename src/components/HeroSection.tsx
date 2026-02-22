import { useState, useEffect, useRef, useCallback } from 'react';
import GoldButton, { CyberButton } from './GoldButton';
import Container from './Container';

const useVideoBase = () => {
    const [base, setBase] = useState('hero-desktop');
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 768) setBase('hero-mobile');
            else if (w < 1024) setBase('hero-tablet');
            else setBase('hero-desktop');
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return base;
};

const HeroSection = () => {
    const base = useVideoBase();
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sourceRef = useRef<HTMLSourceElement>(null);

    const play = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.play().catch(() => {/* silencioso */ });
    }, []);

    // Troca a source SEM recriar o elemento <video> — preserva permissão de autoplay no iOS
    useEffect(() => {
        const v = videoRef.current;
        const src = sourceRef.current;
        if (!v || !src) return;
        src.src = `/videos/${base}.mp4`;
        v.load();
        play();
    }, [base, play]);

    // Na montagem e a qualquer toque/scroll: força o play
    useEffect(() => {
        play();
        const retry = () => play();
        const onVisibility = () => {
            if (document.visibilityState === 'visible') play();
        };
        document.addEventListener('touchstart', retry, { passive: true });
        document.addEventListener('touchend', retry, { passive: true });
        document.addEventListener('scroll', retry, { passive: true, once: true });
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            document.removeEventListener('touchstart', retry);
            document.removeEventListener('touchend', retry);
            document.removeEventListener('scroll', retry);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [play]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="h-[100svh] lg:min-h-screen flex flex-col justify-end lg:justify-center lg:items-center relative overflow-hidden pb-6 lg:pt-24 lg:pb-16"
        >
            {/* Video Background — NUNCA recriar este elemento: iOS perde permissão de autoplay */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    className="w-full h-full object-cover object-center lg:object-right scale-[1.25] -translate-y-[25%] lg:scale-100 lg:translate-y-0"
                    style={{ pointerEvents: 'none' }}
                >
                    <source ref={sourceRef} src={`/videos/${base}.mp4`} type="video/mp4" />
                </video>
            </div>

            {/* Fade para legibilidade do texto no mobile */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] z-[1] bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-7 flex flex-col items-center lg:items-start">

                        {/* Badge */}
                        <div className="scan-container mb-6">
                            <span className="scan-content delay-sync-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold text-yellow-400 border border-yellow-400/20 bg-yellow-400/5 uppercase tracking-[0.15em]">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                                Especialista em Websites
                            </span>
                            <div className="scan-line delay-sync-1"></div>
                        </div>

                        {/* H1 */}
                        <div className="scan-container mb-5 block text-center lg:text-left">
                            <h1 className="scan-content delay-sync-1 text-[2rem] md:text-5xl lg:text-6xl font-black leading-[1.1] text-white tracking-tight">
                                Criação de Sites Focados em{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
                                    Conversão e SEO
                                </span>
                            </h1>
                            <div className="scan-line delay-sync-1"></div>
                        </div>

                        {/* H2 Subtitle */}
                        <div className="scan-container mb-6 block text-center lg:text-left">
                            <h2 className="scan-content delay-sync-2 text-base md:text-lg text-zinc-300/90 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Sites estratégicos que transformam visitas em clientes. Desenvolvo páginas rápidas, modernas e estruturadas para ranquear no Google, gerar autoridade e converter tráfego em resultado real.
                            </h2>
                            <div className="scan-line delay-sync-2"></div>
                        </div>

                        {/* Buttons */}
                        <div className="scan-container inline-block w-max">
                            <div className="scan-content delay-sync-3">
                                <div className="flex flex-col sm:flex-row items-center gap-5">
                                    <GoldButton whatsappMessage="Olá! Vim pelo seu site e gostaria de solicitar um orçamento.">
                                        Solicitar Orçamento
                                    </GoldButton>
                                    <CyberButton onClick={() => {
                                        document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                        Ver Serviços
                                    </CyberButton>
                                </div>
                            </div>
                            <div className="scan-line delay-sync-3"></div>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HeroSection;
