/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TESTIMONIALS } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-ivory-warm/40 border-t border-border-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Voces & Palabras"
          title="Testimonios & Memorias"
          subtitle="La confianza de quienes nos confían sus recuerdos más íntimos es el mayor estímulo de nuestro estudio."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-8 sm:p-10 bg-ivory border border-border-warm rounded-sm flex flex-col justify-between hover:border-gold/40 transition-all duration-300 shadow-xs"
            >
              <div>
                <span className="font-editorial-serif text-5xl text-gold/30 block leading-none select-none mb-3">
                  “
                </span>
                <p className="font-editorial-serif text-lg sm:text-xl text-espresso font-light italic leading-relaxed mb-6">
                  {test.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-border-warm">
                <p className="text-xs uppercase tracking-[0.2em] text-espresso font-semibold">
                  {test.author}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gold mt-1 font-medium">
                  <span>{test.event}</span>
                  <span>·</span>
                  <span>{test.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
