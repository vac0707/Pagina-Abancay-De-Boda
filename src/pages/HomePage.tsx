/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { Hero } from '../sections/Hero';
import { Manifesto } from '../sections/Manifesto';
import { Stories } from '../sections/Stories';
import { CelebrationsOverview } from '../components/CelebrationsOverview';
import { FeaturedFilmSection } from '../sections/FeaturedFilmSection';
import { ContactSection } from '../sections/ContactSection';
import { TESTIMONIALS } from '../data/testimonials';
import { PORTFOLIO_ITEMS } from '../data/portfolio';
import { STUDIO_INFO } from '../data/studio';

export const HomePage: React.FC = () => {
  const { playVideo } = useVideo();
  const protagonistTestimonial = TESTIMONIALS[0];
  const featuredPortfolio = PORTFOLIO_ITEMS.slice(0, 5);

  const scrollToCelebrations = () => {
    const el = document.getElementById('celebraciones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 01: Hero 100vh Fullscreen Cinematográfico */}
      <Hero onDiscoverClick={scrollToCelebrations} />

      {/* 02: Manifiesto Editorial */}
      <Manifesto />

      {/* 03: Historias Destacadas (Selección de proyectos de autor) */}
      <Stories onPlayVideo={playVideo} />

      {/* 04: Celebraciones que Fotografiamos (Las 8 especialidades editoriales) */}
      <CelebrationsOverview />

      {/* 05: Bloque Conceptual Destacado Fotografía & Film 50/50 */}
      <FeaturedFilmSection onPlayVideo={playVideo} />

      {/* 06: Portafolio Destacado (Curaduría con acceso a galería completa) */}
      <section className="py-28 md:py-40 bg-ivory border-t border-border-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-semibold block mb-3">
            Galería & Obra
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light mb-4">
            Portafolio <span className="italic font-normal">Destacado</span>
          </h2>
          <p className="text-sm text-text-muted font-light max-w-xl mx-auto mb-16">
            Una selección de instantes, gestos y atmósfera que definen nuestra mirada fotográfica en Abancay y Apurímac.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-14 text-left">
            {featuredPortfolio.map((item, index) => {
              const colSpan = index === 0 ? 'lg:col-span-7' : index === 1 ? 'lg:col-span-5' : index === 2 ? 'lg:col-span-4' : index === 3 ? 'lg:col-span-4' : 'lg:col-span-4';
              const aspect = index === 0 ? 'aspect-[16/10]' : index === 1 ? 'aspect-[3/4]' : 'aspect-square';
              return (
                <div key={item.id} className={`${colSpan} group relative overflow-hidden bg-espresso rounded-xs shadow-xs`}>
                  <div className={`relative w-full ${aspect} overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 filter brightness-[0.95] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light font-semibold block mb-1">
                        {item.categoryLabel}
                      </span>
                      <h4 className="font-bodoni text-xl text-ivory font-light">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <Link
              to="/portafolio"
              className="btn-editorial-dark inline-flex items-center gap-2"
            >
              <span>VER PORTAFOLIO COMPLETO</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 07: Resumen Breve de Nosotros / El Studio */}
      <section className="py-24 md:py-36 bg-ivory-warm/40 border-t border-border-warm">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-4">
            Dirección Creativa
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light mb-6">
            Detrás de cada imagen, <br />
            <span className="italic font-normal">una búsqueda genuina de lo atemporal.</span>
          </h2>
          <p className="text-sm md:text-base text-text-muted font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Fundado y dirigido por {STUDIO_INFO.owner}, {STUDIO_INFO.name} combina tecnología cinematográfica de alta definición y una mirada sensible para registrar uniones, promociones y celebraciones en Abancay con estándar editorial internacional.
          </p>
          <Link
            to="/nosotros"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors"
          >
            <span>CONOCER EL ESTUDIO</span>
            <span className="text-gold">→</span>
          </Link>
        </div>
      </section>

      {/* 08: Testimonio Protagonista */}
      {protagonistTestimonial && (
        <section className="py-28 md:py-36 bg-ivory border-t border-border-warm text-center">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <span className="font-bodoni text-7xl text-gold/40 block leading-none select-none mb-2">
              “
            </span>
            <p className="font-bodoni text-2xl sm:text-3xl md:text-4xl text-espresso font-light italic leading-snug mb-8">
              "{protagonistTestimonial.quote}"
            </p>
            <div className="h-[1px] w-16 bg-gold/40 mx-auto mb-6" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-espresso font-semibold block">
              {protagonistTestimonial.author}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gold-dark mt-1 block">
              {protagonistTestimonial.event} · {protagonistTestimonial.location} ({protagonistTestimonial.year})
            </span>
          </div>
        </section>
      )}

      {/* 09: Contacto / CTA Final */}
      <ContactSection />
    </div>
  );
};
