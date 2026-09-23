/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, Instagram, Facebook, Calendar, Mail, MapPin, Send } from 'lucide-react';
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
    <section id="contacto" className="py-24 md:py-36 bg-ivory border-t border-border-warm">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold font-bold block mb-3">
                Contacto & Reserva
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
                Hablemos de tu historia.
              </h2>
              <p className="mt-4 text-sm text-text-muted font-light leading-relaxed">
                Cada evento es un capítulo irrepetible. Cuéntanos tu fecha tentativa, locación y detalles para verificar disponibilidad y diseñar una cobertura a tu medida.
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="space-y-4 pt-4 border-t border-border-warm">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-main font-light">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-espresso block">Ubicación del Studio</span>
                  <span className="text-text-muted">{STUDIO_INFO.city}, {STUDIO_INFO.region}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-main font-light">
                <Calendar size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-espresso block">Disponibilidad de Agenda</span>
                  <span className="text-text-muted">Temporada 2026 / 2027 activa</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-main font-light">
                <MessageCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-espresso block">WhatsApp Directo</span>
                  <a
                    href={STUDIO_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold-dark hover:underline font-normal"
                  >
                    {STUDIO_INFO.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-border-warm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-text-dim block mb-3 font-semibold">
                Canales Oficiales
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={STUDIO_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-ivory-warm hover:bg-gold hover:text-white text-espresso border border-border-warm rounded-xs text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
                <a
                  href={STUDIO_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-ivory-warm hover:bg-gold hover:text-white text-espresso border border-border-warm rounded-xs text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                >
                  <Facebook size={14} />
                  <span>Facebook</span>
                </a>
                <a
                  href={STUDIO_INFO.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-ivory-warm hover:bg-gold hover:text-white text-espresso border border-border-warm rounded-xs text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                >
                  <span className="font-bold text-[10px]">TIKTOK</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Preloaded WhatsApp Inquiry Form */}
          <div className="lg:col-span-7 bg-ivory-warm/70 p-8 sm:p-10 md:p-12 border border-border-warm rounded-sm shadow-sm">
            <h3 className="font-editorial-serif text-2xl sm:text-3xl text-espresso font-light mb-2">
              Iniciar Consulta Directa
            </h3>
            <p className="text-xs text-text-muted font-light mb-6">
              El mensaje se enviará directamente a nuestro WhatsApp para coordinar sin intermediarios.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-text-dim font-semibold mb-2">
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
                          ? 'bg-espresso text-ivory border-espresso'
                          : 'bg-white text-text-muted border-border-warm hover:border-gold/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-text-dim font-semibold mb-2">
                    Tu Nombre o Nombres de la Pareja
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Camila & Álvaro"
                    className="w-full bg-white border border-border-warm focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-espresso rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-text-dim font-semibold mb-2">
                    Fecha Estimada
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Ej. Noviembre 2026"
                    className="w-full bg-white border border-border-warm focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-espresso rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-text-dim font-semibold mb-2">
                  Detalles o Preguntas (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos sobre tu locación, número de invitados o dudas particulares..."
                  className="w-full bg-white border border-border-warm focus:border-gold focus:outline-none px-4 py-3 text-xs sm:text-sm text-espresso rounded-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-editorial-gold py-4"
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
