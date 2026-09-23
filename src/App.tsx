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
      {/* Editorial Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 01: Hero Cinematográfico */}
        <Hero onDiscoverClick={scrollToStories} />

        {/* 02: Manifiesto Editorial */}
        <Manifesto />

        {/* 03: Historias Reales */}
        <Stories onPlayVideo={handlePlayVideo} />

        {/* 04: Campaña Automática por Temporada (e.g. Promociones Escolares) */}
        <SeasonalCampaign onPlayVideo={handlePlayVideo} />

        {/* 05: Servicios Principales */}
        <Services />

        {/* 06: Sección Específica de Bodas & Colección de Paquetes */}
        <WeddingsSection onPlayVideo={handlePlayVideo} />

        {/* 07: Sección de Anuarios Escolares */}
        <YearbooksSection onPlayVideo={handlePlayVideo} />

        {/* 08: Portafolio Editorial con Filtros */}
        <PortfolioSection />

        {/* 09: Nuestra Experiencia & Metodología */}
        <Experience />

        {/* 10: El Studio & Nuestra Historia */}
        <About />

        {/* 11: Testimonios Reales */}
        <Testimonials />

        {/* 12: Preguntas Frecuentes (FAQ Accordion) */}
        <FAQSection />

        {/* 13: Contacto & Reserva Directa */}
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

      {/* Floating WhatsApp Action */}
      <WhatsAppButton />

      {/* Interactive Package Recommendation Advisor */}
      <PackageAdvisorModal />
    </div>
  );
}
