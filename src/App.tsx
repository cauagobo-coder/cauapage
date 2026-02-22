import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { CustomScrollbar } from './components/CustomScrollbar';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GlassNavbar from './components/GlassNavbar';

// Lazy-loaded: below-fold sections (not needed for initial render)
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const DifferentialsSection = lazy(() => import('./components/DifferentialsSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const FooterSection = lazy(() => import('./components/FooterSection'));
const FinalCTASection = lazy(() => import('./components/FinalCTASection'));

// Detect mobile/tablet — Lenis smooth scroll is DISABLED on these devices
const isMobileOrTablet = () => typeof window !== 'undefined' && window.innerWidth < 1024;
const isMobileWidth = () => typeof window !== 'undefined' && window.innerWidth < 768;
const isTabletWidth = () => typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

/**
 * HeroVideoBackground — renderizado FORA do #main-content.
 *
 * MOTIVO: O iOS Safari suspende vídeos dentro de containers com
 * `transform: scale()` aplicado. O #main-content tem transform:scale(1.5 → 4.0)
 * durante o preloader. Ao mover o vídeo para um `fixed` na raiz, ele fica
 * completamente isolado dessa animação e recebe permissão de autoplay normalmente.
 */
const HeroVideoBackground = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sourceRef = useRef<HTMLSourceElement>(null);

    const getBase = () => {
        if (isMobileWidth()) return 'hero-mobile';
        if (isTabletWidth()) return 'hero-tablet';
        return 'hero-desktop';
    };

    const [base, setBase] = useState(getBase);

    const play = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.play().catch(() => {/* silencioso */ });
    }, []);

    // Detecta resize (mobile ↔ desktop)
    useEffect(() => {
        const update = () => setBase(getBase());
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Troca o src sem recriar o elemento — preserva permissão de autoplay no iOS
    useEffect(() => {
        const v = videoRef.current;
        const src = sourceRef.current;
        if (!v || !src) return;
        src.src = `/videos/${base}.mp4`;
        v.load();
        play();
    }, [base, play]);

    // Força play na montagem e em qualquer interação do usuário
    useEffect(() => {
        play();
        const retry = () => play();
        const onVisibility = () => {
            if (document.visibilityState === 'visible') play();
        };
        // Delays para cobrir o período do preloader (4s) + zoom (2.5s)
        const t1 = setTimeout(play, 500);
        const t2 = setTimeout(play, 2000);
        const t3 = setTimeout(play, 4500);
        const t4 = setTimeout(play, 7000);

        document.addEventListener('touchstart', retry, { passive: true });
        document.addEventListener('touchend', retry, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
            document.removeEventListener('touchstart', retry);
            document.removeEventListener('touchend', retry);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [play]);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
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
                className="w-full h-full object-cover object-center lg:object-right"
                style={{ pointerEvents: 'none' }}
            >
                <source ref={sourceRef} src={`/videos/${base}.mp4`} type="video/mp4" />
            </video>
        </div>
    );
};

// Wrapper: on desktop renders ReactLenis, on mobile renders plain children with native scroll
const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
    const [mobile, setMobile] = useState(isMobileOrTablet);

    useEffect(() => {
        const onResize = () => setMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    if (mobile) return <>{children}</>;
    return <ReactLenis root>{children}</ReactLenis>;
};

// Only sync Lenis → ScrollTrigger on desktop (on mobile this hook is a no-op because Lenis isn't mounted)
const LenisScrollSync = () => {
    useLenis(() => {
        ScrollTrigger.update();
    });
    return null;
};

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [animationsDone, setAnimationsDone] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(isMobileOrTablet);

    useEffect(() => {
        const onResize = () => setIsMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        document.body.classList.add('loading-locked');

        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => {
                document.body.classList.remove('loading-locked');
            }, 2600);
        }, 4000);

        const cleanupTimer = setTimeout(() => {
            if (isLoaded) {
                setAnimationsDone(true);
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        }, 5000);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(cleanupTimer);
            document.body.classList.remove('loading-locked');
        };
    }, [isLoaded]);

    return (
        <div className={`app-container ${isLoaded ? 'loaded' : ''} ${animationsDone ? 'effects-cleared' : ''}`}>

            {/*
             * VÍDEO FORA DO #main-content — isolado do transform:scale do zoom de entrada.
             * iOS Safari suspende vídeos dentro de containers com transform aplicado.
             */}
            <HeroVideoBackground />

            <Preloader />
            <div id="canvas-portal-root" className="fixed inset-0 pointer-events-none z-[1]" />

            <ScrollWrapper>
                <LenisScrollSync />
                {!isMobile && (
                    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <CustomScrollbar />
                    </div>
                )}
                <GlassNavbar isLoaded={isLoaded} />
                {/* bg-transparent: o vídeo fixed atrás aparece corretamente */}
                <div id="main-content" className="relative bg-transparent min-h-screen text-white font-sans">
                    <HeroSection />
                    <AboutSection />
                    <ServicesSection enable3D={animationsDone} />
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                        <ProjectsSection />
                        <ProcessSection />
                        <DifferentialsSection />
                        <FAQSection />
                        <FinalCTASection />
                        <FooterSection />
                    </Suspense>
                </div>
            </ScrollWrapper>
        </div>
    );
}

export default App;
