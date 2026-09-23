/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Testimonials } from '../sections/Testimonials';
import { STUDIO_INFO } from '../data/studio';
import { Camera, Eye, Heart, Compass, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export const NosotrosPage: React.FC = () => {
  const whatsappUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, he leído sobre la filosofía de Abancay De Boda y deseo coordinar una reunión para conversar sobre mi proyecto.'
  )}`;

  const PRINCIPLES = [
    {
      icon: Eye,
      title: 'Mirada Atemporal',
      desc: 'Rechazamos los filtros de moda efímera. Revelamos nuestras imágenes con balance tonal natural que resistirá con dignidad el paso de las décadas.'
    },
    {
      icon: Heart,
      title: 'Emoción Genuina',
      desc: 'El valor de la fotografía radica en la verdad del momento. Buscamos el gesto inadvertido, la lágrima contenida y la alegría sincera sin poses forzadas.'
    },
    {
      icon: Compass,
      title: 'Dirección Discreta',
      desc: 'Guiamos con suavidad cuando se requiere y nos convertimos en observadores invisibles durante el resto del evento para no interrumpir la magia.'
    },
    {
      icon: ShieldCheck,
      title: 'Rigor Técnico & Respaldo',
      desc: 'Doble ranura de tarjetas de memoria en cada cámara, respaldo inmediato en la nube y equipos de cine de última generación calibrados minuciosamente.'
    }
  ];

  return (
    <div className="w-full">
      {/* 01: Lead Studio Story & Director Profile */}
      <About />

      {/* 02: Principios Visuales & Filosofía del Studio */}
      <section className="py-24 md:py-36 bg-ivory-warm/40 border-t border-border-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-3">
            Nuestros Pilares
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light mb-16">
            Valores Visuales & <span className="italic font-normal">Compromiso</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {PRINCIPLES.map((pr, i) => {
              const Icon = pr.icon;
              return (
                <div key={i} className="p-8 bg-ivory border border-border-warm rounded-xs shadow-xs">
                  <div className="w-10 h-10 rounded-xs bg-gold/15 text-gold flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-sans text-base text-espresso font-semibold mb-2">
                    {pr.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03: Experiencia Narrativa Conectada (Metodología de trabajo del paso 01 al 06) */}
      <div className="border-t border-border-warm">
        <Experience />
      </div>

      {/* 04: Testimonios de Quienes Han Confiado en Nosotros */}
      <Testimonials />

      {/* 05: CTA para Conectar con el Director Creativo */}
      <section className="py-20 md:py-28 bg-espresso text-ivory text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-light font-bold block mb-3">
            Hablemos
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-ivory font-light mb-6">
            ¿Deseas conversar sobre tu fecha?
          </h2>
          <p className="text-sm text-ivory/70 font-light max-w-md mx-auto mb-8">
            Gustavo Farfan Cruz te atenderá directamente para responder tus preguntas y armar una propuesta a medida.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>CONVERSAR CON GUSTAVO</span>
          </a>
        </div>
      </section>
    </div>
  );
};
