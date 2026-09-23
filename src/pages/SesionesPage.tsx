/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Sun, MessageCircle, ArrowUpRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { STUDIO_INFO } from '../data/studio';

interface SessionSample {
  id: string;
  title: string;
  category: 'parejas' | 'retrato' | 'familia' | 'especial';
  categoryLabel: string;
  location: string;
  image: string;
  aspect: string;
}

const SAMPLES: SessionSample[] = [
  {
    id: 's-1',
    title: 'Caminata de Promesa',
    category: 'parejas',
    categoryLabel: 'Parejas & Preboda',
    location: 'Valle de Abancay',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 's-2',
    title: 'Luz Natural Íntima',
    category: 'retrato',
    categoryLabel: 'Retrato Individual',
    location: 'Studio Abancay',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 's-3',
    title: 'Vínculo Materno',
    category: 'familia',
    categoryLabel: 'Familia & Maternidad',
    location: 'Apurímac',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 's-4',
    title: 'Horizonte Andino',
    category: 'parejas',
    categoryLabel: 'Parejas & Preboda',
    location: 'Locación Alta',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[16/10]'
  },
  {
    id: 's-5',
    title: 'Sesión de Retrato en Blanco y Negro',
    category: 'retrato',
    categoryLabel: 'Retrato Individual',
    location: 'Studio',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 's-6',
    title: 'Celebración Íntima al Aire Libre',
    category: 'especial',
    categoryLabel: 'Sesiones Especiales',
    location: 'Abancay',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[16/10]'
  }
];

export const SesionesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'parejas' | 'retrato' | 'familia' | 'especial'>('all');

  const filteredSamples = activeFilter === 'all'
    ? SAMPLES
    : SAMPLES.filter(s => s.category === activeFilter);

  const whatsappUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad y locaciones para agendar una sesión fotográfica en Abancay.'
  )}`;

  return (
    <div className="w-full">
      {/* 01: Minimalist & Pure Photographic Hero */}
      <section className="relative min-h-[65vh] md:min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-ivory text-espresso border-b border-border-warm">
        <div className="max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-4">
            Fotografía de Retrato & Paisaje
          </span>
          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl font-light text-espresso leading-tight mb-6">
            Sesiones Fotográficas <br />
            <span className="italic font-normal text-gold-dark">a Luz Natural.</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-light max-w-xl mx-auto leading-relaxed mb-8">
            Parejas, retratos individuales, familia y maternidad en locaciones seleccionadas de Abancay o en la serenidad de nuestro estudio.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>AGENDAR UNA SESIÓN</span>
          </a>
        </div>
      </section>

      {/* 02: Interactive Filter Tabs */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex justify-center mb-16 overflow-x-auto py-2 px-2 no-scrollbar">
            <div className="inline-flex items-center gap-4 sm:gap-8 border-b border-border-warm pb-3">
              {[
                { id: 'all', label: 'TODAS' },
                { id: 'parejas', label: 'PAREJAS & PREBODA' },
                { id: 'retrato', label: 'RETRATO INDIVIDUAL' },
                { id: 'familia', label: 'FAMILIA & MATERNIDAD' },
                { id: 'especial', label: 'SESIONES ESPECIALES' }
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id as any)}
                    className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors relative cursor-pointer ${
                      isActive ? 'text-espresso font-bold' : 'text-text-muted hover:text-espresso'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sessionFilter"
                        className="absolute -bottom-3 left-0 right-0 h-[2px] bg-gold"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Photographic Gallery */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <AnimatePresence>
              {filteredSamples.map((sample) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  key={sample.id}
                  className="group relative overflow-hidden bg-espresso rounded-xs shadow-xs border border-border-warm/60"
                >
                  <div className={`relative w-full ${sample.aspect} overflow-hidden`}>
                    <img
                      src={sample.image}
                      alt={sample.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 filter brightness-[0.96]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light font-semibold block mb-1">
                        {sample.categoryLabel}
                      </span>
                      <h4 className="font-bodoni text-xl text-ivory font-light mb-1">
                        {sample.title}
                      </h4>
                      <p className="text-[10px] uppercase tracking-wider text-ivory/70">
                        {sample.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Sesiones FAQ / Details Box */}
          <div className="p-10 md:p-14 bg-ivory-warm/40 border border-border-warm rounded-xs max-w-4xl mx-auto text-left">
            <h3 className="font-bodoni text-2xl sm:text-3xl text-espresso font-light mb-6">
              ¿Cómo funciona una sesión con Gustavo Farfan?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-text-muted font-light leading-relaxed">
              <div>
                <span className="text-gold font-serif font-bold text-base block mb-1">01. Locación</span>
                <p>Coordinamos la mejor hora (atardecer o primera luz) y el lugar ideal según el estilo de fotos que buscas.</p>
              </div>
              <div>
                <span className="text-gold font-serif font-bold text-base block mb-1">02. Experiencia</span>
                <p>Sin poses rígidas. Guiamos los movimientos de manera natural para que disfrutes la tarde.</p>
              </div>
              <div>
                <span className="text-gold font-serif font-bold text-base block mb-1">03. Entrega</span>
                <p>Galería privada con todas las fotos en alta resolución editadas una por una con color de autor.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
