/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, User, Users, Palette, Film, Sparkles, MessageCircle, Check } from 'lucide-react';
import { VideoPreview } from '../components/VideoPreview';
import { VIDEOS } from '../data/videos';
import { STUDIO_INFO } from '../data/studio';

interface YearbooksSectionProps {
  onPlayVideo: (youtubeId: string, title: string) => void;
}

const YEARBOOK_FEATURES = [
  {
    icon: User,
    title: "Retratos Individuales",
    description: "Iluminación de estudio editorial para cada alumno, resaltando su personalidad, metas y estilo propio con posado natural."
  },
  {
    icon: Users,
    title: "Fotografía Grupal",
    description: "Tomas panorámicas de salón, fotografías con docentes y recuerdos de amistad con estética pulcra y composiciones armónicas."
  },
  {
    icon: Palette,
    title: "Diseño Editorial Exclusivo",
    description: "Maquetación personalizada según la identidad de la promoción, sin plantillas repetitivas y con tipografía moderna."
  },
  {
    icon: BookOpen,
    title: "Impresión & Acabados de Lujo",
    description: "Tapa dura acolchada, laminado mate o tacto seda, papel fotográfico de alto gramaje y encuadernación cosida indeleble."
  },
  {
    icon: Film,
    title: "Video & Backstage",
    description: "Film resumen de la jornada de fotos, entrevistas a los alumnos y reels dinámicos para compartir en redes sociales."
  },
  {
    icon: Sparkles,
    title: "Entrega Digital & Física",
    description: "Cada alumno recibe su anuario impreso y acceso a galería digital privada para descargar todas sus fotografías en alta calidad."
  }
];

export const YearbooksSection: React.FC<YearbooksSectionProps> = ({ onPlayVideo }) => {
  const anuarioVideo = VIDEOS.anuarios[0];

  const whatsappAnuarioUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo solicitar una cotización personalizada para el anuario de nuestra promoción escolar en Abancay.'
  )}`;

  return (
    <section id="anuarios" className="relative bg-ivory border-t border-border-warm">
      
      {/* 9. Editorial Split Entrance Cover for Anuarios (55-60% Photo / 40-45% Editorial Block) */}
      <div className="relative w-full bg-ivory-warm/40 border-b border-border-warm overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[70vh] lg:min-h-[80vh] items-stretch">
          
          {/* Photographic Block: 55-60% on Desktop, Top on Mobile */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] lg:min-h-full overflow-hidden bg-espresso">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600"
              alt="Anuarios Escolares Abancay De Boda"
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-102 scale-[1.01] hover:scale-103 transition-transform duration-1000 ease-out"
            />
            {/* Subtle photographic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Editorial Block: 40-45% on Desktop with Marfil + Sage + Minimal Gold */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-ivory">
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-sage font-semibold mb-4 px-3 py-1 bg-sage/10 rounded-xs border border-sage/20">
                ANUARIOS & PROMOCIONES · EDICIÓN EDITORIAL
              </span>

              <h2 className="font-bodoni text-3xl sm:text-4xl lg:text-5xl text-espresso font-light tracking-tight leading-[1.15] mb-6">
                Tu promoción merece <br />
                <span className="italic font-normal text-gold-dark">quedarse para siempre.</span>
              </h2>

              <p className="text-sm md:text-base text-text-muted font-light leading-relaxed mb-8">
                Anuarios escolares y sesiones fotográficas para recordar una etapa irrepetible. Dirección de posado, diseño a medida, empastados de alta gama y registro en film documental.
              </p>

              <div className="pt-2">
                <a
                  href="#contenido-anuarios"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors"
                >
                  <span>Explorar acabados & propuesta</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Yearbooks Content */}
      <div id="contenido-anuarios" className="py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Feature Grid with Sage Accents - Clean Editorial presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {YEARBOOK_FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-8 bg-ivory border border-border-warm rounded-xs hover:border-sage/50 transition-colors shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xs bg-sage/10 text-sage flex items-center justify-center mb-6 group-hover:bg-sage group-hover:text-white transition-colors duration-300">
                  <Icon size={18} />
                </div>
                <h3 className="font-sans text-lg text-espresso font-medium tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Video & Quote Request Card */}
        <div className="p-8 sm:p-12 lg:p-14 bg-espresso text-ivory rounded-xs shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold">
                Propuestas a Medida
              </span>
              <h3 className="font-bodoni text-3xl sm:text-4xl text-ivory font-light leading-tight">
                Planes adaptados a la cantidad de alumnos de tu salón
              </h3>
              <p className="text-sm text-ivory/80 font-light leading-relaxed">
                Cada colegio y salón tiene necesidades particulares. Diseñamos paquetes escalables según el número de estudiantes, garantizando la misma excelencia fotográfica, estuches de lujo y facilidades de pago para los comités de padres de familia.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-ivory/90 font-light">
                  <div className="w-4 h-4 rounded-full bg-sage/40 flex items-center justify-center text-gold-light flex-shrink-0">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span>Presentación presencial de muestras físicas de anuarios a la junta directiva</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-ivory/90 font-light">
                  <div className="w-4 h-4 rounded-full bg-sage/40 flex items-center justify-center text-gold-light flex-shrink-0">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span>Sesión fotográfica en exteriores o en locación institucional</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-ivory/90 font-light">
                  <div className="w-4 h-4 rounded-full bg-sage/40 flex items-center justify-center text-gold-light flex-shrink-0">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span>Asesoría de posado y vestuario para cada integrante</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={whatsappAnuarioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial-gold"
                >
                  <MessageCircle size={15} />
                  <span>SOLICITAR COTIZACIÓN DE ANUARIO</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              {anuarioVideo && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light font-semibold block mb-3">
                    Backstage & Film de Promoción
                  </span>
                  <VideoPreview
                    video={anuarioVideo}
                    onPlay={onPlayVideo}
                    aspect="16:9"
                    className="border-white/10"
                  />
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
