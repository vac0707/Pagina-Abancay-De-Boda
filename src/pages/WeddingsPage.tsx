/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useVideo } from '../context/VideoContext';
import { WeddingsSection } from '../sections/WeddingsSection';
import { Stories } from '../sections/Stories';
import { FAQ_ITEMS } from '../data/faq';
import { TESTIMONIALS } from '../data/testimonials';
import { STUDIO_INFO } from '../data/studio';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

export const WeddingsPage: React.FC = () => {
  const { playVideo } = useVideo();

  // Filter wedding-specific FAQs and testimonials
  const weddingFaqs = FAQ_ITEMS.filter(f => f.category.toLowerCase().includes('boda') || f.category.toLowerCase().includes('reserva') || f.category.toLowerCase().includes('entrega'));
  const weddingTestimonials = TESTIMONIALS.filter(t => t.event.toLowerCase().includes('matrimonio') || t.event.toLowerCase().includes('boda'));

  const whatsappWeddingUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad y fechas para la cobertura de mi boda en Abancay.'
  )}`;

  return (
    <div className="w-full">
      {/* 01: Core Weddings Experience with Cinematic Cover, Narrativa, Preboda & Paquetes */}
      <WeddingsSection onPlayVideo={playVideo} />

      {/* 02: Historias Reales de Boda Documentadas */}
      <div className="border-t border-border-warm">
        <Stories onPlayVideo={playVideo} />
      </div>

      {/* 03: Testimonios de Parejas de Boda */}
      <section className="py-24 md:py-36 bg-ivory-warm/30 border-t border-border-warm">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-3">
            Confianza & Memoria
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light mb-14">
            Palabras de <span className="italic font-normal">Nuestras Parejas</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {weddingTestimonials.map((item) => (
              <div key={item.id} className="p-8 sm:p-10 bg-ivory border border-border-warm rounded-xs shadow-xs">
                <span className="font-bodoni text-4xl text-gold/50 block leading-none select-none mb-3">
                  “
                </span>
                <p className="font-bodoni text-lg sm:text-xl text-espresso font-light italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
                <div className="pt-4 border-t border-border-warm flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-espresso font-semibold">
                      {item.author}
                    </h4>
                    <span className="text-[10px] text-gold-dark font-medium uppercase tracking-wider block mt-0.5">
                      {item.event} · {item.location}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-text-dim">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04: Preguntas Frecuentes de Bodas */}
      <section className="py-24 md:py-36 bg-ivory border-t border-border-warm">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-2">
              Claridad para su Gran Día
            </span>
            <h2 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light">
              Preguntas Frecuentes de Bodas
            </h2>
          </div>

          <div className="divide-y divide-border-warm border-y border-border-warm">
            {weddingFaqs.map((faq, idx) => (
              <div key={idx} className="py-6 text-left">
                <h3 className="font-sans text-base sm:text-lg text-espresso font-medium mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05: Wedding Direct Reservation CTA */}
      <section className="py-20 md:py-28 bg-espresso text-ivory text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-light font-bold block mb-3">
            Agenda 2026 / 2027
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl font-light text-ivory mb-6">
            Asegura la fecha de tu boda.
          </h2>
          <p className="text-sm text-ivory/70 font-light max-w-lg mx-auto mb-8">
            Para garantizar la dedicación exclusiva de Gustavo Farfan y el equipo de autor, aceptamos un número limitado de bodas por mes.
          </p>
          <a
            href={whatsappWeddingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>CONSULTAR DISPONIBILIDAD PARA TU BODA</span>
          </a>
        </div>
      </section>
    </div>
  );
};
