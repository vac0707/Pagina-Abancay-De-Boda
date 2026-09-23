/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STUDIO_INFO } from '../data/studio';

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="py-24 md:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Image column */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative overflow-hidden aspect-[4/5] bg-espresso rounded-xs shadow-2xl border border-border-warm">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000"
                  alt={`Director ${STUDIO_INFO.owner} - Abancay De Boda`}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-115 hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Editorial Quote Box */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 md:-right-8 p-6 bg-ivory-warm border border-gold/40 shadow-xl max-w-xs rounded-xs">
                <p className="font-editorial-serif italic text-base text-espresso leading-snug">
                  "El valor de una fotografía no está solo en cómo se ve, sino en lo que te hace sentir con el paso del tiempo."
                </p>
                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-gold font-bold">
                  — {STUDIO_INFO.owner}
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Biography / Studio Story */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold font-bold">
              El Studio · Nuestra Historia
            </span>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
              Una búsqueda constante de belleza genuina y verdad emocional.
            </h2>

            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
              Fundado y dirigido por <strong className="font-medium text-espresso">{STUDIO_INFO.owner}</strong>, <strong className="font-medium text-espresso">{STUDIO_INFO.name}</strong> nació con la vocación de elevar la fotografía de bodas y eventos en Abancay y la región Apurímac a un nivel visual de estándar internacional.
            </p>

            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
              Creemos en una fotografía sin artificios forzados, donde la luz natural, la armonía compositiva y la espontaneidad humana dialogan con naturalidad. Nuestro equipo multidisciplinario de fotógrafos y videógrafos combina precisión técnica y sensibilidad para acompañar a las parejas en cada momento crucial de su celebración.
            </p>

            <div className="pt-6 border-t border-border-warm grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="font-editorial-serif text-3xl sm:text-4xl text-gold font-light block">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-dim mt-1 block">
                  Compromiso de Autor
                </span>
              </div>
              <div>
                <span className="font-editorial-serif text-3xl sm:text-4xl text-gold font-light block">
                  30 Días
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-dim mt-1 block">
                  Entrega Garantizada
                </span>
              </div>
              <div>
                <span className="font-editorial-serif text-3xl sm:text-4xl text-gold font-light block">
                  4K
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-dim mt-1 block">
                  Cine Nupcial
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
