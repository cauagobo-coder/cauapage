import { useState, useEffect, useRef } from 'react';
import GoldButton, { CyberButton } from './GoldButton';
import Container from './Container';

/** Detecta iOS/iPadOS via user agent */
const isIOS = () => {
    if (typeof navigator === 'undefined') return false;
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

const useVideoSource = () => {
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

    return {
        webm: `/videos/${base}.webm`,
        mp4: `/videos/${base}.mp4`,
        poster: `/videos/${base}-poster.jpg`,
        key: base,
    };
};

const HeroSection = () => {
    const videoSource = useVideoSource();
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ios, setIos] = useState(false);

    useEffect(() => {
        setIos(isIOS());
    }, []);

    // Em iOS e não tem mp4 disponível, apenas força o play quando o usuário toca
    useEffect(() => {
        if (!ios) return;
        const video = videoRef.current;
        if (!video) return;

        const tryPlay = () => {
            video.muted = true;
            video.play().catch(() => {/* silencioso */ });
        };

        // Tenta imediatamente e ao primeiro toque
        tryPlay();
        document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
        document.addEventListener('touchend', tryPlay, { once: true, passive: true });

        return () => {
            document.removeEventListener('touchstart', tryPlay);
            document.removeEventListener('touchend', tryPlay);
        };
    }, [ios, videoSource.key]);

    return (
        <section ref={sectionRef} id="hero" className="h-[100svh] lg:min-h-screen flex flex-col justify-end lg:justify-center lg:items-center relative overflow-hidden pb-6 lg:pt-24 lg:pb-16">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <video
                    ref={videoRef}
                    key={videoSource.key}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    preload={ios ? 'auto' : 'auto'}
                    className="w-full h-full object-cover object-center lg:object-right scale-[1.25] -translate-y-[25%] lg:scale-100 lg:translate-y-0"
                    style={{ pointerEvents: 'none' }}
                >
                    {/* MP4 sempre primeiro — único formato que iOS Safari garante autoplay */}
                    <source src={videoSource.mp4} type="video/mp4" />
                    <source src={videoSource.webm} type="video/webm" />
                    Seu navegador não suporta vídeo.
                </video>
            </div>

            {/* Subtle bottom fade only — for text readability over video */}
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
                                    <GoldButton
                                        whatsappMessage="Olá! Vim pelo seu site e gostaria de solicitar um orçamento."
                                    >
                                        Solicitar Orçamento
                                    </GoldButton>

                                    <CyberButton
                                        onClick={() => {
                                            document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
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
