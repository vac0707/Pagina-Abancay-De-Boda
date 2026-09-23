/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, User, Users, Palette, Film, Sparkles, MessageCircle, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
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
    description: "Iluminación de estudio editorial para cada alumno, resaltando su personalidad, metas y estilo propio."
  },
  {
    icon: Users,
    title: "Fotografía Grupal",
    description: "Tomas panorámicas de salón, fotografías con docentes y recuerdos de amistad con estética pulcra."
  },
  {
    icon: Palette,
    title: "Diseño Editorial Exclusivo",
    description: "Maquetación personalizada según la identidad de la promoción, sin plantillas repetitivas."
  },
  {
    icon: BookOpen,
    title: "Impresión & Acabados de Lujo",
    description: "Tapa dura acolchada, laminado mate/brillo, papel fotográfico de alto gramaje y encuadernación cosida."
  },
  {
    icon: Film,
    title: "Video & Backstage",
    description: "Film resumen de la jornada de fotos, entrevistas a los alumnos y material para redes sociales."
  },
  {
    icon: Sparkles,
    title: "Entrega Digital & Física",
    description: "Cada alumno recibe su anuario impreso y acceso a galería digital privada con todas sus tomas en alta calidad."
  }
];

export const YearbooksSection: React.FC<YearbooksSectionProps> = ({ onPlayVideo }) => {
  const anuarioVideo = VIDEOS.anuarios[0];

  const whatsappAnuarioUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo solicitar una cotización personalizada para el anuario de nuestra promoción escolar en Abancay.'
  )}`;

  return (
    <section id="anuarios" className="py-24 md:py-36 bg-ivory-warm/40 border-y border-border-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Conceptual Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-3">
            Promociones Escolares · Abancay De Boda
          </span>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso font-light leading-tight">
            Tu promoción merece quedarse para siempre.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted font-light leading-relaxed max-w-xl mx-auto">
            Anuarios y sesiones fotográficas para recordar una etapa que solo se vive una vez. Calidad editorial, diseño a medida y acabados de archivo.
          </p>
          <div className="mt-6 h-[1px] w-12 bg-gold/50 mx-auto" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {YEARBOOK_FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-8 bg-ivory border border-border-warm rounded-sm hover:border-gold/40 transition-all duration-300 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xs bg-ivory-warm flex items-center justify-center text-gold mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-editorial-serif text-xl sm:text-2xl text-espresso font-normal mb-2">
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
        <div className="p-8 sm:p-12 lg:p-14 bg-espresso text-ivory rounded-sm shadow-xl border border-gold/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
                Propuestas a Medida
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-4xl text-ivory font-light leading-tight">
                Planes adaptados a la cantidad de alumnos de tu salón
              </h3>
              <p className="text-sm text-ivory/80 font-light leading-relaxed">
                Cada colegio y salón tiene necesidades particulares. Diseñamos paquetes escalables según el número de estudiantes, garantizando la misma excelencia fotográfica, estuches de lujo y facilidades de pago para los comités de padres de familia.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-ivory/90 font-light">
                  <Check size={14} className="text-gold" />
                  <span>Presentación presencial de muestras físicas de anuarios a la junta directiva</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ivory/90 font-light">
                  <Check size={14} className="text-gold" />
                  <span>Sesión fotográfica en exteriores o en locación institucional</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ivory/90 font-light">
                  <Check size={14} className="text-gold" />
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
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold/90 font-semibold block mb-2">
                    Backstage & Film de Promoción
                  </span>
                  <VideoPreview
                    video={anuarioVideo}
                    onPlay={onPlayVideo}
                    aspect="16:9"
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
