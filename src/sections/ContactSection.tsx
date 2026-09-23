/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, Instagram, Facebook, Calendar, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/studio';

export const ContactSection: React.FC = () => {
  const [eventType, setEventType] = useState('boda');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventName = eventType === 'boda' 
      ? 'boda o matrimonio' 
      : eventType === 'anuario' 
      ? 'anuario escolar' 
      : 'sesión fotográfica / evento';

    const text = encodeURIComponent(
      `Hola Gustavo, soy ${name || 'un cliente'}. Deseo consultar disponibilidad para mi ${eventName}${
        date ? ` en la fecha ${date}` : ''
      }.${message ? ` Detalle: ${message}` : ''}`
    );

    window.open(`${STUDIO_INFO.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" className="relative py-28 md:py-40 bg-espresso text-ivory overflow-hidden border-t border-gold/30">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1920"
          alt="Cierre cinematográfico Abancay De Boda"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.25] saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/90 to-espresso/80" />
      </div>

      {/* Brand logo-inspired circular watermark */}
      <div className="brand-circle-accent w-[750px] h-[750px] -right-48 top-1/2 -translate-y-1/2 opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold-light font-bold block mb-3">
                Contacto & Reserva
              </span>
              <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-ivory font-light leading-tight">
                Hablemos de tu <br />
                <span className="italic font-normal text-gold-light">historia.</span>
              </h2>
              <p className="mt-4 text-sm text-ivory/70 font-light leading-relaxed">
                Cada celebración es irrepetible. Cuéntanos tu fecha tentativa, locación y detalles para verificar disponibilidad en la agenda y diseñar una cobertura a tu medida.
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory font-light">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-ivory block">Ubicación del Studio</span>
                  <span className="text-ivory/60">{STUDIO_INFO.city}, {STUDIO_INFO.region}</span>
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

            {/* Social Channels */}
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

          {/* Right Column: Preloaded WhatsApp Inquiry Form */}
          <div className="lg:col-span-7 bg-espresso-surface/90 backdrop-blur-md p-8 sm:p-10 md:p-12 border border-white/10 rounded-xs shadow-2xl">
            <h3 className="font-bodoni text-2xl sm:text-3xl text-ivory font-light mb-2">
              Iniciar Consulta Directa
            </h3>
            <p className="text-xs text-ivory/60 font-light mb-6">
              El mensaje se enviará directamente a nuestro WhatsApp para coordinar sin intermediarios.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                  Tipo de Consulta
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'boda', label: 'Boda' },
                    { id: 'anuario', label: 'Anuario' },
                    { id: 'sesion', label: 'Sesión / XV' }
                  ].map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setEventType(tab.id)}
                      className={`py-2 px-3 text-xs font-medium tracking-wider uppercase rounded-xs transition-all border ${
                        eventType === tab.id
                          ? 'bg-gold text-white border-gold'
                          : 'bg-white/5 text-ivory/70 border-white/10 hover:border-gold/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                    Tu Nombre o Nombres de la Pareja
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
                    placeholder="Ej. Noviembre 2026"
                    className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-ivory rounded-xs placeholder-ivory/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-semibold mb-2">
                  Detalles o Preguntas (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos sobre tu locación, número de invitados o dudas particulares..."
                  className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-ivory rounded-xs resize-none placeholder-ivory/30"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-editorial-gold py-4 shadow-xl"
              >
                <MessageCircle size={16} />
                <span>ENVIAR MENSAJE POR WHATSAPP</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
