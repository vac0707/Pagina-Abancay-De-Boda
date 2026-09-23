/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Film, Heart, Sparkles, MessageCircle, MapPin } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { VideoPreview } from '../components/VideoPreview';
import { PackageTabs } from '../components/PackageTabs';
import { VIDEOS } from '../data/videos';
import { STUDIO_INFO } from '../data/studio';

interface WeddingsSectionProps {
  onPlayVideo: (youtubeId: string, title: string) => void;
}

export const WeddingsSection: React.FC<WeddingsSectionProps> = ({ onPlayVideo }) => {
  const weddingVideos = VIDEOS.bodas;
  const prebodaVideo = VIDEOS.preboda[0];

  const whatsappWeddingUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad y fechas para la cobertura de mi boda.'
  )}`;

  return (
    <section id="bodas" className="py-24 md:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Intro */}
        <SectionHeading
          eyebrow="El Arte de Celebrar"
          title="Bodas & Matrimonios"
          subtitle="Una mirada cinematográfica y sensible para el día más trascendente de sus vidas. Honramos el valor irrepetible de cada momento."
        />

        {/* Experience Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
              Narrativa Cinematográfica
            </span>
            <h3 className="font-editorial-serif text-3xl sm:text-4xl text-espresso font-light leading-snug">
              Lo único que perdura tras el banquete son las fotografías, el film y las alianzas.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              No nos limitamos a documentar la cronología de un evento. Buscamos capturar la tensión emocional en los ojos de tus padres, el temblor sutil de las manos en los votos y la euforia desatada en la pista de baile.
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              Trabajamos con óptica de cine de alta gama, estabilización profesional y un revelado digital con paleta de color atemporal que no pasará de moda con los años.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-border-warm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-ivory-warm text-gold">
                  <Camera size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Fotografía de Autor</h4>
                  <p className="text-[11px] text-text-muted font-light mt-0.5">Retoque minucioso y alta definición.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-ivory-warm text-gold">
                  <Film size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Films Nupciales</h4>
                  <p className="text-[11px] text-text-muted font-light mt-0.5">Video extendido & Reels cinematográficos.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {weddingVideos[0] && (
              <VideoPreview
                video={weddingVideos[0]}
                onPlay={onPlayVideo}
                aspect="16:9"
              />
            )}
          </div>
        </div>

        {/* Preboda Spotlight */}
        <div className="my-24 p-8 sm:p-12 bg-ivory-warm/60 border border-border-warm rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block mb-2">
                Experiencia Previa
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-4xl text-espresso font-light mb-4">
                Sesión Preboda: El inicio de su recuerdo
              </h3>
              <p className="text-sm text-text-muted font-light leading-relaxed mb-6">
                Una tarde distendida antes del matrimonio para conectar con el lente, soltar cualquier tensión y atesorar retratos espontáneos en los paisajes más bellos. Incluida de cortesía en nuestros paquetes principales.
              </p>

              <div className="space-y-3 mb-6">
                {STUDIO_INFO.preWeddingLocations.map((loc, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-text-main/90 font-light">
                    <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-espresso">{loc.title}:</span>{' '}
                      <span className="text-text-muted">{loc.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              {prebodaVideo ? (
                <VideoPreview
                  video={prebodaVideo}
                  onPlay={onPlayVideo}
                  aspect="16:9"
                />
              ) : null}
            </div>

          </div>
        </div>

        {/* Packages Presentation */}
        <div id="paquetes" className="pt-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-2">
              Colecciones & Coberturas
            </span>
            <h3 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light">
              Paquetes de Boda
            </h3>
            <p className="mt-3 text-sm text-text-muted font-light">
              Diseñados para adaptarse a la magnitud de su celebración: desde coberturas digitales esenciales hasta archivos físicos de colección con equipo doble.
            </p>
          </div>

          <PackageTabs />

          <div className="mt-16 text-center">
            <a
              href={whatsappWeddingUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-dark"
            >
              <MessageCircle size={15} />
              <span>CONSULTAR DISPONIBILIDAD DE FECHA</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
