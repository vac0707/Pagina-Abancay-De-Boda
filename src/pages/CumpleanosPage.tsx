/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Film, Camera, Users, MessageCircle, ArrowUpRight, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { STUDIO_INFO } from '../data/studio';

export const CumpleanosPage: React.FC = () => {
  const whatsappUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo cotizar la cobertura de fotografía y video para una celebración de cumpleaños en Abancay.'
  )}`;

  const HIGHLIGHTS = [
    {
      icon: Camera,
      title: 'Fotografía Espontánea & Retrato',
      desc: 'Retratos familiares protocolares combinados con fotoperiodismo puro: risas auténticas, miradas sinceras y abrazos sin poses fingidas.'
    },
    {
      icon: Film,
      title: 'Cinematografía & Reels Ágiles',
      desc: 'Film documental con edición musical dinámica y reels verticales de alta definición listos para compartir con todos tus invitados.'
    },
    {
      icon: Sparkles,
      title: 'Decoración & Puesta en Escena',
      desc: 'Registro fotográfico cuidadoso de la torta, mesa dulce, ambientación temática, iluminación y detalles antes del inicio del evento.'
    },
    {
      icon: Users,
      title: 'Todos los Invitados Presentes',
      desc: 'Cobertura balanceada para que cada amigo y familiar quede retratado en alta resolución en tu galería privada descargable.'
    }
  ];

  return (
    <div className="w-full">
      {/* 01: Dynamic & Premium Hero Entrance */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1920"
            alt="Cumpleaños por Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gold-light font-semibold mb-4 px-3 py-1 bg-gold/15 rounded-xs border border-gold/30">
            <span>CELEBRACIONES & CUMPLEAÑOS · ABANCAY</span>
          </span>

          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.15] mb-6">
            La energía viva de <br />
            <span className="italic font-normal text-gold-light">cada nuevo año.</span>
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Cumpleaños juveniles, fiestas adultas y celebraciones familiares documentadas con narrativa cinematográfica, espontaneidad y estética editorial.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>COTIZAR COBERTURA DE CUMPLEAÑOS</span>
          </a>
        </div>
      </section>

      {/* 02: Puntos Clave de la Cobertura */}
      <section className="py-24 md:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <SectionHeading
            eyebrow="Narrativa & Fiesta"
            title="Celebraciones con"
            italicWord="Estilo Propio"
            subtitle="Nos adaptamos al ritmo de tu festejo: desde un brindis íntimo en casa o restaurante hasta una fiesta con pista de baile y cientos de invitados."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 text-left">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-8 bg-ivory-warm/40 border border-border-warm rounded-xs">
                  <div className="w-10 h-10 rounded-xs bg-gold/15 text-gold flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-sans text-base text-espresso font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Visual Showcase - Dynamic Photographic Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-xs bg-espresso shadow-md border border-border-warm">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200"
                alt="Brindis y fiesta de cumpleaños"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
                Entregas Inmediatas
              </span>
              <h3 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light leading-snug">
                Galería digital privada para compartir con todos tus amigos.
              </h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Tus invitados podrán ver y descargar sus fotos en alta definición desde su teléfono en una galería web elegante sin necesidad de instalar ninguna aplicación.
              </p>
              <ul className="space-y-2.5 text-xs text-espresso/90 font-light">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gold" />
                  <span>Entrega de adelanto en 48 horas para redes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gold" />
                  <span>Galería completa editada en alta resolución</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-gold" />
                  <span>Reel musicalizado con los mejores instantes</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Direct CTA Box */}
          <div className="p-10 md:p-14 bg-espresso text-ivory rounded-xs text-center border border-white/10 max-w-4xl mx-auto">
            <h3 className="font-bodoni text-3xl sm:text-4xl text-ivory font-light mb-4">
              ¿Estás planeando un cumpleaños especial?
            </h3>
            <p className="text-sm text-ivory/70 font-light max-w-lg mx-auto mb-8">
              Cuéntanos la fecha, el lugar y la cantidad de invitados para enviarte una cotización directa por WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-gold inline-flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>CONSULTAR POR WHATSAPP</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
