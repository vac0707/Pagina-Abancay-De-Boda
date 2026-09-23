/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TESTIMONIALS } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const mainTestimonial = TESTIMONIALS[0];
  const secondaryTestimonials = TESTIMONIALS.slice(1);

  return (
    <section className="relative py-28 md:py-44 bg-ivory-warm/40 border-t border-border-warm">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Voces & Palabras"
          title="Testimonios &"
          italicWord="Memorias"
          subtitle="La confianza de quienes nos entregan sus recuerdos más íntimos es la mayor gratificación de nuestro trabajo."
        />

        {/* Editorial Layout: Protagonist quote directly on background + thin hairline secondary dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          
          {/* Main Large Protagonist Quote - Directly on background without card boxing */}
          {mainTestimonial && (
            <div className="lg:col-span-7 text-left">
              <span className="font-bodoni text-7xl sm:text-8xl text-gold/40 block leading-none select-none -mb-8">
                “
              </span>
              <p className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light italic leading-tight mb-8">
                {mainTestimonial.quote}
              </p>

              <div className="pt-6 border-t border-border-warm max-w-md flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-espresso font-semibold">
                    {mainTestimonial.author}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-gold-dark mt-1 font-medium">
                    {mainTestimonial.event} · {mainTestimonial.location}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-text-dim">
                  {mainTestimonial.year}
                </span>
              </div>
            </div>
          )}

          {/* Secondary Quotes with Thin Hairline Dividers (No cards) */}
          <div className="lg:col-span-5 space-y-10 lg:pl-6 lg:border-l lg:border-border-warm">
            {secondaryTestimonials.map((test) => (
              <div
                key={test.id}
                className="pb-8 border-b border-border-warm/80 last:border-b-0 text-left"
              >
                <p className="font-bodoni text-lg sm:text-xl text-espresso/90 font-light italic leading-relaxed mb-4">
                  "{test.quote}"
                </p>
                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="font-sans font-medium text-espresso uppercase tracking-wider text-[11px] block">
                      {test.author}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gold-dark font-medium">
                      {test.event} · {test.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-text-dim tracking-widest">
                    {test.year}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
