/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PackageAdvisorModal } from './components/PackageAdvisorModal';
import { SeasonalCampaign } from './components/SeasonalCampaign';

import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Stories } from './sections/Stories';
import { FeaturedFilmSection } from './sections/FeaturedFilmSection';
import { SeasonalCampaign as SeasonalSection } from './components/SeasonalCampaign';
import { Services } from './sections/Services';
import { WeddingsSection } from './sections/WeddingsSection';
import { YearbooksSection } from './sections/YearbooksSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { Experience } from './sections/Experience';
import { About } from './sections/About';
import { Testimonials } from './sections/Testimonials';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  const [activeVideo, setActiveVideo] = useState<{ youtubeId: string; title: string } | null>(null);

  const handlePlayVideo = (youtubeId: string, title: string) => {
    setActiveVideo({ youtubeId, title });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const scrollToStories = () => {
    const el = document.getElementById('historias');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-text-main font-sans selection:bg-gold selection:text-white relative">
      {/* Editorial Navigation with Hero-to-scroll transitions */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 01: Hero 100vh Fullscreen Cinematográfico */}
        <Hero onDiscoverClick={scrollToStories} />

        {/* 02: Manifiesto Editorial */}
        <Manifesto />

        {/* 03: Historias Reales en Formato Revista */}
        <Stories onPlayVideo={handlePlayVideo} />

        {/* 04: Bloque Conceptual Destacado Fotografía & Film 50/50 */}
        <FeaturedFilmSection onPlayVideo={handlePlayVideo} />

        {/* 05: Campaña Automática por Temporada */}
        <SeasonalCampaign onPlayVideo={handlePlayVideo} />

        {/* 06: Servicios Principales en Composición Asimétrica */}
        <Services />

        {/* 07: Sección Específica de Bodas con Portada Cinematográfica y Paquetes */}
        <WeddingsSection onPlayVideo={handlePlayVideo} />

        {/* 08: Sección de Anuarios Escolares con Atmósfera Salvia/Marfil */}
        <YearbooksSection onPlayVideo={handlePlayVideo} />

        {/* 09: Portafolio Editorial (80% fotografía, 20% UI) */}
        <PortfolioSection />

        {/* 10: Nuestra Experiencia & Metodología de Trabajo */}
        <Experience />

        {/* 11: El Studio, Dirección Creativa & Historia */}
        <About />

        {/* 12: Testimonios con Cita Protagonista en Bodoni */}
        <Testimonials />

        {/* 13: Preguntas Frecuentes */}
        <FAQSection />

        {/* 14: Contacto Cinematográfico con Reserva Directa a WhatsApp */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Shared High-Performance Video Modal */}
      <VideoModal
        isOpen={Boolean(activeVideo)}
        onClose={handleCloseVideo}
        youtubeId={activeVideo?.youtubeId || null}
        title={activeVideo?.title}
      />

      {/* Floating WhatsApp Action (Primary Floating CTA on Mobile & Desktop) */}
      <WhatsAppButton />

      {/* Interactive Package Recommendation Advisor (Discreet bottom-left on desktop) */}
      <PackageAdvisorModal />
    </div>
  );
}
