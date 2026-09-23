/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { REAL_STORIES, RealStory } from '../data/stories';

interface StoriesProps {
  onPlayVideo: (youtubeId: string, title: string) => void;
}

export const Stories: React.FC<StoriesProps> = ({ onPlayVideo }) => {
  return (
    <section id="historias" className="relative py-28 md:py-40 bg-ivory overflow-hidden">
      {/* Delicate background ambient circle from logo aesthetic */}
      <div className="brand-circle-accent w-[700px] h-[700px] -right-72 top-40 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Editorial & Archivo"
          title="Historias"
          italicWord="Reales"
          subtitle="Cada unión posee una atmósfera irrepetible. Conoce algunas de las bodas y proyectos que hemos tenido el privilegio de documentar."
        />

        <div className="space-y-32 md:space-y-48">
          {REAL_STORIES.map((story, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual side: Asymmetric photographic duo */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group">
                    {/* Primary Image Container with subtle scale on hover */}
                    <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-espresso rounded-xs shadow-2xl border border-border-warm">
                      <img
                        src={story.coverImage}
                        alt={story.coupleOrProject}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-104 filter brightness-[0.93] group-hover:brightness-100"
                      />
                      
                      {/* Subtle hover overlay with "VER HISTORIA" reveal */}
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-ivory font-semibold rounded-xs border border-white/10">
                          VER HISTORIA <ArrowUpRight size={12} />
                        </span>
                      </div>

                      {/* Video Button */}
                      {story.videoId && (
                        <button
                          onClick={() => onPlayVideo(story.videoId!, `Film: ${story.coupleOrProject}`)}
                          className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-ivory/95 hover:bg-gold hover:text-white text-espresso rounded-xs text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl"
                        >
                          <Play size={12} className="fill-current text-gold group-hover:text-white" />
                          <span>Ver Film</span>
                        </button>
                      )}
                    </div>

                    {/* Secondary overlapping portrait for rich magazine composition */}
                    {story.secondaryImage && (
                      <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-10 w-48 md:w-56 aspect-[3/4] overflow-hidden rounded-xs border-4 border-ivory shadow-2xl bg-espresso z-10">
                        <img
                          src={story.secondaryImage}
                          alt={`${story.coupleOrProject} detalle`}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.95]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Editorial text side */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="max-w-md">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-3">
                      <span>{story.year}</span>
                      <span>·</span>
                      <span>{story.location}</span>
                    </div>

                    <h3 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight mb-3">
                      {story.coupleOrProject}
                    </h3>

                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark mb-5 font-semibold">
                      {story.subtitle}
                    </p>

                    <p className="text-sm text-text-muted font-light leading-relaxed mb-6">
                      {story.description}
                    </p>

                    {story.quote && (
                      <blockquote className="p-4 border-l-2 border-gold bg-ivory-warm/60 font-bodoni italic text-base md:text-lg text-espresso/90 mb-6 leading-relaxed">
                        "{story.quote}"
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-2 mb-8">
                      {story.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] tracking-wider uppercase text-text-muted bg-ivory-warm px-2.5 py-1 rounded-xs border border-border-warm"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>

                    {story.videoId ? (
                      <button
                        onClick={() => onPlayVideo(story.videoId!, `Film: ${story.coupleOrProject}`)}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors group"
                      >
                        <span>Ver historia completa en video</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ) : null}
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
