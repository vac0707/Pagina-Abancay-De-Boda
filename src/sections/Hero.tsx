/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_INFO } from '../data/studio';

interface HeroProps {
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  const whatsappReservationUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad para mi boda/evento con Abancay De Boda.'
  )}`;

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen w-full flex items-end md:items-center pb-20 pt-32 md:py-0 overflow-hidden bg-espresso"
    >
      {/* 100vh Full-screen Photographic Immersion (65-70% photographic visibility) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=2000"
          alt="Fotografía de Bodas Abancay De Boda"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-102 scale-[1.01] transform transition-transform duration-1000 ease-out"
          priority-hint="high"
        />
        
        {/* Subtle, localized cinematic gradients behind text - no blanket dark wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-black/25" />
      </div>

      {/* Single clean organic watermark inspired by the studio logo on the right */}
      <div 
        className="brand-circle-accent w-[500px] h-[500px] md:w-[750px] md:h-[750px] -right-20 md:-right-32 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none" 
        style={{ borderWidth: '1px' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        <div className="max-w-3xl text-left">
          
          {/* Eyebrow / Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 mb-5 md:mb-6"
          >
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold-light font-semibold drop-shadow-sm">
              FOTOGRAFÍA & FILM · ABANCAY · APURÍMAC
            </span>
          </motion.div>

          {/* Main Bodoni Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bodoni text-hero-fluid font-light text-ivory tracking-tight drop-shadow-md"
          >
            Historias que <br />
            <span className="italic font-normal text-gold-light">merecen permanecer.</span>
          </motion.h1>

          {/* Subtext in Manrope */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 text-base md:text-lg text-ivory/90 font-light leading-relaxed max-w-xl drop-shadow-sm"
          >
            Fotografía y cinematografía para recuerdos que solo ocurren una vez.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
          >
            <button
              onClick={onDiscoverClick}
              className="bg-ivory text-espresso hover:bg-gold hover:text-white px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-xs flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
            >
              <span>DESCUBRIR HISTORIAS</span>
              <ArrowDown size={14} />
            </button>

            <a
              href={whatsappReservationUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-gold px-8 py-4 text-[11px] shadow-xl"
            >
              <MessageCircle size={15} />
              <span>RESERVAR FECHA</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* Magazine Footer Details on bottom right */}
      <div className="hidden lg:flex absolute bottom-10 right-14 z-10 items-center gap-8 text-[10px] uppercase tracking-[0.25em] text-ivory/60">
        <span>Dirección Creativa · Gustavo Farfan Cruz</span>
        <span>·</span>
        <span>Temporada 2026 / 2027</span>
      </div>

      {/* Calm Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/50 font-medium mb-2">
          Explorar
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold/70 to-transparent" />
      </div>

    </section>
  );
};
