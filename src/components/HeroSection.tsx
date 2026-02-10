import { useState, useEffect, useRef, useCallback } from 'react';
import GoldButton, { CyberButton } from './GoldButton';
import Container from './Container';

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
        mp4: `/videos/${base}.mp4`,
        webm: `/videos/${base}.webm`,
        key: base,
    };
};

const HeroSection = () => {
    const videoSource = useVideoSource();
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const hasPlayedRef = useRef(false);

    // Robust play function — tries play and marks success
    const forcePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        // Always ensure muted (required by all mobile browsers for autoplay)
        video.muted = true;
        const promise = video.play();
        if (promise !== undefined) {
            promise.then(() => {
                hasPlayedRef.current = true;
            }).catch(() => { /* silently fail, will retry */ });
        }
    }, []);

    // Main effect: mount + visibility observer + user interaction fallback
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Ensure attributes are set (some browsers ignore JSX attributes)
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-playsinline', '');
        video.setAttribute('x5-video-player-type', 'h5');
        video.setAttribute('x5-video-player-fullscreen', 'false');

        // Attempt 1: Immediate
        forcePlay();

        // Attempt 2: After short delay (DOM settling)
        const t1 = setTimeout(forcePlay, 300);

        // Attempt 3: After preloader likely finishes (~4.5s)
        const t2 = setTimeout(forcePlay, 4600);

        // Attempt 4: After preloader + zoom animation (~7s)
        const t3 = setTimeout(forcePlay, 7000);

        // Attempt 5: On any user interaction (iOS Safari REQUIRES this in some cases)
        const onUserInteract = () => {
            forcePlay();
            if (hasPlayedRef.current) {
                // Once playing, remove listeners to avoid overhead
                document.removeEventListener('touchstart', onUserInteract);
                document.removeEventListener('click', onUserInteract);
                document.removeEventListener('scroll', onUserInteract);
            }
        };
        document.addEventListener('touchstart', onUserInteract, { passive: true, once: false });
        document.addEventListener('click', onUserInteract, { once: true });
        document.addEventListener('scroll', onUserInteract, { passive: true, once: true });

        // Visibility observer: pause when off-screen, play when visible
        const section = sectionRef.current;
        let observer: IntersectionObserver | null = null;
        if (section) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (!videoRef.current) return;
                    if (entry.isIntersecting) {
                        forcePlay();
                    } else {
                        videoRef.current.pause();
                    }
                },
                { rootMargin: '200px', threshold: 0 }
            );
            observer.observe(section);
        }

        // Also retry when video data is loaded (canplay event)
        const onCanPlay = () => forcePlay();
        video.addEventListener('canplay', onCanPlay);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.removeEventListener('touchstart', onUserInteract);
            document.removeEventListener('click', onUserInteract);
            document.removeEventListener('scroll', onUserInteract);
            video.removeEventListener('canplay', onCanPlay);
            observer?.disconnect();
        };
    }, [videoSource.key, forcePlay]);

    return (
        <section ref={sectionRef} id="hero" className="h-[100svh] lg:min-h-screen flex flex-col justify-end lg:justify-center lg:items-center relative overflow-hidden pb-6 lg:pt-24 lg:pb-16">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    ref={videoRef}
                    key={videoSource.key}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    preload="auto"
                    className="w-full h-full object-cover object-center lg:object-right scale-[1.4] -translate-y-[15%] lg:scale-100 lg:translate-y-0"
                    style={{ pointerEvents: 'none' }}
                >
                    {/* MP4 first — iOS Safari does NOT support WebM */}
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
