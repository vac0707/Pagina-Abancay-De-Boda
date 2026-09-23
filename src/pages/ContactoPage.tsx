/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, Instagram, Facebook, Calendar, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { FAQ_ITEMS } from '../data/faq';
import { STUDIO_INFO } from '../data/studio';

const CELEBRATION_OPTIONS = [
  'Boda',
  'Quinceaños',
  'Cumpleaños',
  '50 Años',
  'Bautizo',
  'Anuario',
  'Sesión Fotográfica',
  'Evento Social'
];

export const ContactoPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Boda');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [locationName, setLocationName] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola Gustavo, soy ${name || 'un cliente'}. Deseo consultar disponibilidad para (${selectedService})${
        date ? ` en la fecha ${date}` : ''
      }${locationName ? ` en ${locationName}` : ''}.${message ? ` Detalle: ${message}` : ''}`
    );

    window.open(`${STUDIO_INFO.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* 01: Complete Contact Form & Studio Coordinates */}
      <section className="relative pt-32 pb-28 md:pb-36 bg-espresso text-ivory overflow-hidden">
        {/* Background Cinematic Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1920"
            alt="Cierre cinematográfico Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.22] saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/90 to-espresso/80" />
        </div>

        {/* Brand logo circular accent */}
        <div className="brand-circle-accent w-[750px] h-[750px] -right-48 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Info, Coordinates & Socials */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold-light font-bold block mb-3">
                  Contacto Directo & Agenda
                </span>
                <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-ivory font-light leading-tight">
                  Hablemos de tu <br />
                  <span className="italic font-normal text-gold-light">celebración.</span>
                </h1>
                <p className="mt-4 text-sm text-ivory/70 font-light leading-relaxed">
                  Cada evento tiene su propia magia. Cuéntanos tu fecha tentativa, locación y detalles para verificar disponibilidad en la agenda y diseñar una cobertura a tu medida.
                </p>
              </div>

              {/* Studio Coordinates */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory font-light">
                  <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-ivory block">Sede & Cobertura</span>
                    <span className="text-ivory/60">{STUDIO_INFO.city}, {STUDIO_INFO.region} y toda la región sur</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory font-light">
                  <Calendar size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-ivory block">Disponibilidad de Agenda</span>
                    <span className="text-ivory/60">Temporada 2026 / 2027 activa</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory font-light">
                  <MessageCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-ivory block">WhatsApp Directo</span>
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold-light hover:underline font-normal"
                    >
                      {STUDIO_INFO.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Official Socials */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/50 block mb-3 font-semibold">
                  Canales Oficiales
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={STUDIO_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white/5 hover:bg-gold hover:text-white text-ivory border border-white/10 rounded-xs text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                  >
                    <Instagram size={14} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={STUDIO_INFO.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white/5 hover:bg-gold hover:text-white text-ivory border border-white/10 rounded-xs text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                  >
                    <Facebook size={14} />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={STUDIO_INFO.socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white/5 hover:bg-gold hover:text-white text-ivory border border-white/10 rounded-xs text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                  >
                    <span className="font-bold text-[10px]">TIKTOK</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Form with all 8 Celebration Types */}
            <div className="lg:col-span-7 bg-espresso-surface/90 backdrop-blur-md p-8 sm:p-10 md:p-12 border border-white/10 rounded-xs shadow-2xl">
              <h2 className="font-bodoni text-2xl sm:text-3xl text-ivory font-light mb-2">
                Consulta Directa al Studio
              </h2>
              <p className="text-xs text-ivory/60 font-light mb-6">
                Selecciona tu tipo de evento para abrir la consulta directamente con Gustavo Farfan en WhatsApp.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-5 text-left">
                {/* 8-Option Event Selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                    Tipo de Celebración o Sesión
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CELEBRATION_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSelectedService(opt)}
                        className={`py-2 px-2.5 text-xs font-medium tracking-wider uppercase rounded-xs transition-all border text-center ${
                          selectedService === opt
                            ? 'bg-gold text-white border-gold shadow-sm'
                            : 'bg-white/5 text-ivory/70 border-white/10 hover:border-gold/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                      Tu Nombre / Pareja / Institución
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Camila & Álvaro"
                      className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-ivory rounded-xs placeholder-ivory/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                      Fecha Estimada
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Ej. Octubre 2026"
                      className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-ivory rounded-xs placeholder-ivory/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                    Locación / Iglesia / Local (Opcional)
                  </label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Ej. Catedral de Abancay / Valle / Club"
                    className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-ivory rounded-xs placeholder-ivory/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                    Detalles o Consultas Particulares
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos número aproximado de invitados, horas deseadas o dudas..."
                    className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-ivory rounded-xs resize-none placeholder-ivory/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-editorial-gold py-4 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>ENVIAR CONSULTA POR WHATSAPP</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 02: Relevant FAQ on Contact Page */}
      <section className="py-24 md:py-36 bg-ivory text-espresso">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-left">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-2">
              Información de Contratación
            </span>
            <h2 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light">
              Preguntas Frecuentes sobre Reservas
            </h2>
          </div>

          <div className="divide-y divide-border-warm border-y border-border-warm">
            {FAQ_ITEMS.slice(0, 5).map((faq, idx) => (
              <div key={idx} className="py-6">
                <h3 className="font-sans text-base text-espresso font-medium mb-1">
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
    </div>
  );
};
