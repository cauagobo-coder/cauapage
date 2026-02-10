import { useState, useEffect } from 'react';
import GoldButton, { CyberButton } from './GoldButton';
import Container from './Container';

const useVideoSource = () => {
    const [source, setSource] = useState('/videos/hero-desktop.mp4');

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 768) setSource('/videos/hero-mobile.mp4');
            else if (w < 1024) setSource('/videos/hero-tablet.mp4');
            else setSource('/videos/hero-desktop.mp4');
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return source;
};

const HeroSection = () => {
    const videoSrc = useVideoSource();

    return (
        <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    key={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Seu navegador não suporta vídeo.
                </video>
            </div>

            {/* Dark overlay - stronger on mobile/tablet for text readability */}
            <div className="absolute inset-0 z-[1] bg-black/60 lg:bg-transparent" />

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
