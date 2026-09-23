/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Camera, Film, Users, MessageCircle, ArrowUpRight, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { STUDIO_INFO } from '../data/studio';

export const EventosPage: React.FC = () => {
  const whatsappUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo cotizar la cobertura de fotografía y video para un evento social / institucional en Abancay.'
  )}`;

  const EVENT_TYPES = [
    {
      title: 'Galas & Aniversarios Institucionales',
      desc: 'Cobertura protocolar para empresas, colegios profesionales, universidades e instituciones con entrega expedita para notas de prensa y memorias anuales.'
    },
    {
      title: 'Aniversarios de Boda & Bodas de Plata / Oro',
      desc: 'Homenajes íntimos o recepciones formales para conmemorar décadas de unión matrimonial con el mismo rigor cinematográfico de nuestras bodas.'
    },
    {
      title: 'Celebraciones Privadas & Recepciones',
      desc: 'Fiestas de fin de año, cócteles de bienvenida, inauguraciones y banquetes documentados con discreción y ópticas de alta definición.'
    },
    {
      title: 'Conferencias & Encuentros Especiales',
      desc: 'Fotografía de ponentes, auditorio, networking y video resumen editado con gráficos limpios para difusión en canales corporativos.'
    }
  ];

  return (
    <div className="w-full">
      {/* 01: Hero Entrance Documental & Gala */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1920"
            alt="Eventos Sociales por Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gold-light font-semibold mb-4 px-3 py-1 bg-gold/15 rounded-xs border border-gold/30">
            <Award size={13} className="text-gold" />
            <span>EVENTOS SOCIALES & CORPORATIVOS · ABANCAY</span>
          </span>

          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-[1.15] mb-6">
            Rigor documental para <br />
            <span className="italic font-normal text-gold-light">encuentros que marcan época.</span>
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Aniversarios, galas institucionales y celebraciones privadas registradas con precisión técnica, puntualidad y entrega digital de alta fidelidad.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>SOLICITAR COTIZACIÓN PARA EVENTO</span>
          </a>
        </div>
      </section>

      {/* 02: Tipos de Cobertura */}
      <section className="py-24 md:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <SectionHeading
            eyebrow="Gala & Protocolo"
            title="Cobertura de"
            italicWord="Eventos"
            subtitle="Documentamos la presencia de cada invitado, los discursos oficiales y la atmósfera general de su celebración."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 text-left">
            {EVENT_TYPES.map((ev, idx) => (
              <div key={idx} className="p-8 sm:p-10 bg-ivory-warm/40 border border-border-warm rounded-xs">
                <span className="text-xs font-serif text-gold-dark font-bold block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-sans text-lg text-espresso font-semibold mb-3">
                  {ev.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {ev.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="p-10 md:p-14 bg-espresso text-ivory rounded-xs text-center border border-white/10 max-w-4xl mx-auto">
            <h3 className="font-bodoni text-3xl sm:text-4xl text-ivory font-light mb-4">
              ¿Organizas un evento en Abancay o la región?
            </h3>
            <p className="text-sm text-ivory/70 font-light max-w-lg mx-auto mb-8">
              Consúltanos detallando fecha, horario y tipo de evento para enviarte una propuesta personalizada de fotografía y film.
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
