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
    <section id="historias" className="py-24 md:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Editorial & Archivo"
          title="Historias Reales"
          subtitle="Cada boda es un universo irrepetible. Conoce algunas de las uniones y proyectos que hemos tenido el honor de inmortalizar."
        />

        <div className="space-y-24 md:space-y-36">
          {REAL_STORIES.map((story, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual side: Asymmetric photographic duo */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative">
                    {/* Primary Image */}
                    <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-espresso rounded-xs shadow-xl group">
                      <img
                        src={story.coverImage}
                        alt={story.coupleOrProject}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                      {story.videoId && (
                        <button
                          onClick={() => onPlayVideo(story.videoId!, `Film: ${story.coupleOrProject}`)}
                          className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 px-4 py-2 bg-ivory/95 hover:bg-gold hover:text-white text-espresso rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md group/btn"
                        >
                          <Play size={13} className="fill-current" />
                          <span>Ver Film</span>
                        </button>
                      )}
                    </div>

                    {/* Secondary overlapping portrait */}
                    {story.secondaryImage && (
                      <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-10 w-44 md:w-56 aspect-[3/4] overflow-hidden rounded-xs border-4 border-ivory shadow-2xl bg-espresso z-10">
                        <img
                          src={story.secondaryImage}
                          alt={`${story.coupleOrProject} detalle`}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Editorial text side */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="max-w-md">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-3">
                      <span>{story.year}</span>
                      <span>·</span>
                      <span>{story.location}</span>
                    </div>

                    <h3 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight mb-4">
                      {story.coupleOrProject}
                    </h3>

                    <p className="text-xs uppercase tracking-[0.18em] text-text-dim mb-5 font-medium">
                      {story.subtitle}
                    </p>

                    <p className="text-sm text-text-muted font-light leading-relaxed mb-6">
                      {story.description}
                    </p>

                    {story.quote && (
                      <blockquote className="p-4 border-l border-gold bg-ivory-warm/70 font-editorial-serif italic text-base text-espresso/90 mb-6 leading-snug">
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
                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ) : null}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
