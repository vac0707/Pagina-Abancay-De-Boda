/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, MessageCircle, ArrowUpRight } from 'lucide-react';
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
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-ivory">
      {/* Editorial Background Composition */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920"
          alt="Abancay De Boda Hero Background"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/80 to-ivory" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* Subtle Brand Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="h-[1px] w-8 bg-gold" />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">
            {STUDIO_INFO.brandEyebrow} · {STUDIO_INFO.city}
          </span>
          <span className="h-[1px] w-8 bg-gold" />
        </motion.div>

        {/* Main Emotional Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-espresso tracking-tight leading-[1.08] max-w-4xl mx-auto"
        >
          Historias que merecen permanecer.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 md:mt-8 text-base md:text-lg text-text-muted font-light max-w-2xl mx-auto leading-relaxed"
        >
          {STUDIO_INFO.subtagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={onDiscoverClick}
            className="btn-editorial-dark w-full sm:w-auto"
          >
            <span>DESCUBRIR NUESTRO TRABAJO</span>
            <ArrowDown size={14} />
          </button>

          <a
            href={whatsappReservationUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold w-full sm:w-auto"
          >
            <MessageCircle size={15} />
            <span>RESERVAR FECHA</span>
          </a>
        </motion.div>

        {/* Subtle scroll cue */}
        <div className="mt-16 sm:mt-24 flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-text-dim font-medium mb-2">
            Desliza para explorar
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold/70 to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
};
