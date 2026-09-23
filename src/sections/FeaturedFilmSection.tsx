/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { VideoPreview } from '../components/VideoPreview';
import { VIDEOS } from '../data/videos';

interface FeaturedFilmSectionProps {
  onPlayVideo: (youtubeId: string, title: string) => void;
}

export const FeaturedFilmSection: React.FC<FeaturedFilmSectionProps> = ({ onPlayVideo }) => {
  const featuredVideo = VIDEOS.bodas[1] || VIDEOS.bodas[0];

  return (
    <section className="relative py-24 md:py-36 bg-espresso text-ivory">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gold-light font-semibold block mb-3">
            Cinematografía & Imagen Fija
          </span>
          <h2 className="font-bodoni text-section-fluid font-light text-ivory leading-tight">
            Fotografía & Film.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ivory/70 font-light leading-relaxed">
            Dos maneras de volver a sentir una misma historia. La quietud poética de una imagen que detiene el tiempo y el movimiento rítmico del cine que revive las voces y los abrazos.
          </p>
          <div className="mt-6 h-[1px] w-12 bg-gold/50" />
        </div>

        {/* 50/50 Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Side: Photographic Art piece */}
          <div className="lg:col-span-6">
            <div className="group relative overflow-hidden bg-espresso-surface border border-white/10 rounded-xs shadow-2xl">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200"
                  alt="Fotografía de boda de autor"
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-102 group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                
                {/* Editorial Caption Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block mb-1">
                    La Quietud del Momento
                  </span>
                  <p className="font-bodoni text-xl sm:text-2xl text-ivory font-light italic">
                    "Un instante detenido se vuelve eterno."
                  </p>
                  <p className="text-[11px] text-ivory/60 font-medium mt-1 uppercase tracking-[0.2em]">
                    FOTOGRAFÍA DE AUTOR
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Cinematographic Video Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold">
                Film Cinematográfico
              </span>
              <h3 className="font-bodoni text-2xl sm:text-3xl text-ivory font-light">
                {featuredVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-ivory/70 font-light leading-relaxed">
                Color grading de autor en tonos cálidos y atemporales, audio directo de votos y montaje rítmico que narra con fidelidad el pulso emocional del evento.
              </p>
            </div>

            {/* Video Component */}
            <VideoPreview
              video={featuredVideo}
              onPlay={onPlayVideo}
              aspect="16:9"
              className="border-white/10 shadow-2xl"
            />

            <div className="pt-2 flex items-center justify-between text-xs text-ivory/60">
              <span className="uppercase tracking-widest text-[10px]">
                {featuredVideo.location} · {featuredVideo.duration}
              </span>
              <button
                onClick={() => onPlayVideo(featuredVideo.youtubeId, featuredVideo.title)}
                className="text-gold-light hover:text-white uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Reproducir en Pantalla Completa</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
