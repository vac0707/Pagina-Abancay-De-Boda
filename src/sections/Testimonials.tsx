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
    <section className="relative py-28 md:py-40 bg-ivory-warm/40 border-t border-border-warm overflow-hidden">
      {/* Brand accent watermark */}
      <div className="brand-circle-accent w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Voces & Palabras"
          title="Testimonios &"
          italicWord="Memorias"
          subtitle="La confianza de quienes nos entregan sus recuerdos más íntimos es la mayor gratificación de nuestro trabajo."
        />

        {/* Editorial Protagonist Quote Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Large Protagonist Quote */}
          {mainTestimonial && (
            <div className="lg:col-span-7 bg-ivory p-9 sm:p-14 rounded-xs border border-border-warm shadow-md relative">
              <span className="font-bodoni text-7xl text-gold/30 block leading-none select-none -mb-6">
                “
              </span>
              <p className="font-bodoni text-2xl sm:text-3xl md:text-4xl text-espresso font-light italic leading-relaxed mb-8">
                {mainTestimonial.quote}
              </p>

              <div className="pt-6 border-t border-border-warm flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-espresso font-semibold">
                    {mainTestimonial.author}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-gold-dark mt-0.5">
                    {mainTestimonial.event} · {mainTestimonial.location}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-text-dim">
                  {mainTestimonial.year}
                </span>
              </div>
            </div>
          )}

          {/* Secondary Stacked Quotes */}
          <div className="lg:col-span-5 space-y-6">
            {secondaryTestimonials.map((test) => (
              <div
                key={test.id}
                className="p-7 sm:p-8 bg-ivory/80 border border-border-warm rounded-xs hover:border-gold/40 transition-colors shadow-xs"
              >
                <p className="font-bodoni text-base sm:text-lg text-espresso/90 font-light italic leading-relaxed mb-4">
                  "{test.quote}"
                </p>
                <div className="pt-4 border-t border-border-warm flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-espresso uppercase tracking-wider text-[11px] block">
                      {test.author}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gold-dark">
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
