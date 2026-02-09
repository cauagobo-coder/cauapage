import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { CustomScrollbar } from './components/CustomScrollbar';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import DifferentialsSection from './components/DifferentialsSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import FinalCTASection from './components/FinalCTASection';
import GlassNavbar from './components/GlassNavbar';

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [animationsDone, setAnimationsDone] = useState<boolean>(false);

    // Sincronização Lenis -> GSAP ScrollTrigger
    useLenis(() => {
        ScrollTrigger.update();
    });

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
                // Refresh ScrollTrigger after removing transform to ensure sticky positioning is recalculated
                // Aumentei um pouco o delay para garantir que o layout esteja estável (pós-transição de opacidade)
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        }, 5000); // 2.5s (Zoom) + 1.9s (Delay) + 0.9s (Buffer)

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(cleanupTimer);
            document.body.classList.remove('loading-locked');
        };
    }, [isLoaded]);

    console.log("App render. isLoaded:", isLoaded);

    return (
        <div className={`app-container ${isLoaded ? 'loaded' : ''} ${animationsDone ? 'effects-cleared' : ''}`}>
            <Preloader />
            <div id="canvas-portal-root" className="fixed inset-0 pointer-events-none z-[1]" />

            <ReactLenis root>
                <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <CustomScrollbar />
                </div>
                <GlassNavbar isLoaded={isLoaded} />
                <div id="main-content" className="relative bg-black min-h-screen text-white font-sans">
                    <HeroSection />
                    <AboutSection />
                    <ServicesSection enable3D={animationsDone} />
                    <ProjectsSection />
                    <ProcessSection />
                    <DifferentialsSection />
                    <FAQSection />
                    <FinalCTASection />
                    <FooterSection />
                </div>
            </ReactLenis>
        </div>
    );
}

export default App;
