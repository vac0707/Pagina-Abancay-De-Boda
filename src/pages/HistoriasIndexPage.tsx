/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Film, MapPin } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { REAL_STORIES } from '../data/stories';
import { useVideo } from '../context/VideoContext';

export const HistoriasIndexPage: React.FC = () => {
  const { playVideo } = useVideo();

  return (
    <div className="w-full pt-20 pb-28 md:pb-44 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Narrativa & Publicación"
          title="Historias"
          italicWord="Documentadas"
          subtitle="Crónicas visuales completas. La historia detrás de cada matrimonio, sesión y anuario registrado por Abancay De Boda."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {REAL_STORIES.map((story) => (
            <div
              key={story.id}
              className="group flex flex-col justify-between bg-ivory-warm/30 border border-border-warm rounded-xs overflow-hidden shadow-xs hover:border-gold/40 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-espresso">
                <img
                  src={story.coverImage}
                  alt={story.coupleOrProject}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                {story.videoId && (
                  <button
                    onClick={() => playVideo(story.videoId!, story.coupleOrProject)}
                    className="absolute bottom-4 right-4 px-3 py-1.5 bg-espresso/80 hover:bg-gold text-ivory text-[10px] uppercase tracking-wider font-semibold rounded-xs backdrop-blur-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Film size={12} />
                    <span>Ver Film</span>
                  </button>
                )}
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gold-dark mb-2 font-medium">
                    <MapPin size={11} />
                    <span>{story.location} · {story.year}</span>
                  </div>

                  <h3 className="font-bodoni text-2xl text-espresso font-normal mb-2 group-hover:text-gold transition-colors">
                    <Link to={`/historias/${story.id}`}>
                      {story.coupleOrProject}
                    </Link>
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-text-muted font-medium mb-3">
                    {story.subtitle}
                  </p>

                  <p className="text-xs text-text-muted font-light leading-relaxed mb-6">
                    {story.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-warm flex items-center justify-between">
                  <Link
                    to={`/historias/${story.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-espresso hover:text-gold transition-colors"
                  >
                    <span>Leer Historia</span>
                    <ArrowUpRight size={13} className="text-gold" />
                  </Link>
                  <span className="text-[10px] text-text-dim uppercase tracking-widest">
                    Abancay De Boda
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
