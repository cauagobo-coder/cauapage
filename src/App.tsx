import { useState, useEffect, lazy, Suspense } from 'react';
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
// because native scroll runs off the main thread (compositor) and is hardware-accelerated.
// Lenis forces scroll back onto the main thread, causing jank on mobile.
const isMobileOrTablet = () => typeof window !== 'undefined' && window.innerWidth < 1024;

// Wrapper: on desktop renders ReactLenis, on mobile renders plain children with native scroll
const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
    const [mobile, setMobile] = useState(isMobileOrTablet);

    useEffect(() => {
        const onResize = () => setMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    if (mobile) {
        // Native scroll — no Lenis overhead
        return <>{children}</>;
    }

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
        // Travar scroll durante o loading
        document.body.classList.add('loading-locked');

        // Tempo de carregamento (Preloader na tela)
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
            // Liberar scroll apenas depois que o ZOOM acabar (2.5s + small buffer)
            setTimeout(() => {
                document.body.classList.remove('loading-locked');
            }, 2600);
        }, 4000);

        // Tempo para limpar efeitos ou transições se necessário
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
            <Preloader />
            <div id="canvas-portal-root" className="fixed inset-0 pointer-events-none z-[1]" />

            <ScrollWrapper>
                <LenisScrollSync />
                {/* Custom scrollbar only on desktop — mobile uses native */}
                {!isMobile && (
                    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <CustomScrollbar />
                    </div>
                )}
                <GlassNavbar isLoaded={isLoaded} />
                <div id="main-content" className="relative bg-black min-h-screen text-white font-sans">
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
