/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STUDIO_INFO } from '../data/studio';

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="relative py-28 md:py-44 bg-ivory">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Portrait Image Column */}
          <div className="lg:col-span-6">
            <div className="relative group">
              <div className="relative overflow-hidden aspect-[4/5] bg-espresso rounded-xs shadow-md border border-border-warm/60">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1200"
                  alt={`Director ${STUDIO_INFO.owner} - Abancay De Boda`}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-1000 ease-out"
                />
              </div>

              {/* Editorial Quote - Fine hairline container */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 md:-right-8 p-6 bg-ivory border border-border-warm shadow-md max-w-xs rounded-xs">
                <p className="font-bodoni italic text-base md:text-lg text-espresso leading-snug">
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
            <div>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold font-bold block mb-2">
                EL STUDIO
              </span>
              <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
                {STUDIO_INFO.owner}
              </h2>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold mt-1">
                Director Creativo & Fotógrafo
              </p>
            </div>

            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
              Fundado y dirigido por <strong className="font-medium text-espresso">{STUDIO_INFO.owner}</strong>, <strong className="font-medium text-espresso">{STUDIO_INFO.name}</strong> nació con la vocación de elevar la fotografía de bodas y eventos en Abancay y la región Apurímac a un estándar visual de nivel editorial internacional.
            </p>

            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
              Creemos en una fotografía sin artificios forzados, donde la luz natural, la armonía compositiva y la verdad de las emociones dialogan con naturalidad. Nuestro equipo multidisciplinario combina precisión técnica en cámara de cine y discreción absoluta para que vivan su día plenamente.
            </p>

            {/* Studio Highlights */}
            <div className="pt-8 border-t border-border-warm grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="font-bodoni text-3xl sm:text-4xl text-gold font-light block">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-dim mt-1 block">
                  Compromiso de Autor
                </span>
              </div>
              <div>
                <span className="font-bodoni text-3xl sm:text-4xl text-gold font-light block">
                  30 Días
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-dim mt-1 block">
                  Entrega Garantizada
                </span>
              </div>
              <div>
                <span className="font-bodoni text-3xl sm:text-4xl text-gold font-light block">
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
