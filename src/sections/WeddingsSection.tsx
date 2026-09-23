/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Film, MessageCircle, MapPin, ArrowDown } from 'lucide-react';
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
    <section id="bodas" className="relative bg-ivory">
      
      {/* Cinematic Full-Width Entrance Cover for Weddings (Preserved as requested) */}
      <div className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920"
            alt="Weddings by Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-105 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-black/35" />
        </div>

        {/* Ambient Ring Accent retained on Wedding Entrance Cover */}
        <div className="brand-circle-accent w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-gold-light font-semibold block mb-4">
            WEDDINGS · ABANCAY · APURÍMAC
          </span>
          <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-tight leading-[1.1] mb-6">
            Una historia merece más <br />
            <span className="italic font-normal text-gold-light">que simplemente ser documentada.</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
            El testimonio visual de su unión concebido como un film atemporal: sincero, emotivo y cinematográfico.
          </p>
          <a
            href="#paquetes-boda"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-ivory hover:text-gold transition-colors"
          >
            <span>Explorar Colecciones & Cobertura</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>

      {/* Main Wedding Content Container */}
      <div className="py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Narrative & Film Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
              Narrativa & Autor
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-snug">
              Lo único que perdura tras el banquete son las fotografías, el film y las alianzas.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              No nos limitamos a documentar la cronología de un evento. Buscamos capturar la tensión emocional en los ojos de tus padres, el temblor sutil de las manos en los votos y la euforia desatada en la pista de baile.
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              Trabajamos con óptica de cine de alta gama, estabilización profesional y un revelado digital con paleta de color atemporal que no pasará de moda con los años.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-border-warm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xs bg-ivory-warm text-gold">
                  <Camera size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Fotografía de Autor</h4>
                  <p className="text-[11px] text-text-muted font-light mt-0.5">Retoque minucioso y alta definición.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xs bg-ivory-warm text-gold">
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

        {/* Preboda Spotlight - Clean layout without excess watermark */}
        <div className="my-24 p-8 sm:p-12 lg:p-14 bg-ivory-warm/60 border border-border-warm rounded-xs relative">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block mb-2">
                Experiencia Previa
              </span>
              <h3 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light mb-4">
                Sesión Preboda: El inicio de su recuerdo
              </h3>
              <p className="text-sm text-text-muted font-light leading-relaxed mb-6">
                Una tarde distendida antes del matrimonio para conectar con el lente, soltar cualquier tensión y atesorar retratos espontáneos en los paisajes más bellos de nuestra región. Incluida de cortesía en nuestros paquetes principales.
              </p>

              <div className="space-y-3 mb-6">
                {STUDIO_INFO.preWeddingLocations.map((loc, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-text-main font-light">
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
        <div id="paquetes-boda" className="pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-2">
              Colecciones & Coberturas
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light">
              Paquetes de Boda
            </h3>
            <p className="mt-3 text-sm text-text-muted font-light">
              Diseñados para adaptarse a la escala de su día: desde coberturas digitales esenciales hasta archivos físicos de colección con equipo doble.
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
