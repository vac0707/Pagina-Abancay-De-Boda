/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Film, MapPin, Calendar, Check, MessageCircle } from 'lucide-react';
import { REAL_STORIES } from '../data/stories';
import { useVideo } from '../context/VideoContext';
import { STUDIO_INFO } from '../data/studio';

export const HistoriaDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { playVideo } = useVideo();

  const story = REAL_STORIES.find(s => s.id === slug);

  if (!story) {
    return (
      <div className="py-40 max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-bodoni text-3xl text-espresso mb-4">Historia no encontrada</h2>
        <p className="text-sm text-text-muted mb-8 font-light">
          La crónica editorial que buscas no está disponible o ha cambiado de enlace.
        </p>
        <Link to="/historias" className="btn-editorial-dark inline-flex items-center gap-2">
          <ArrowLeft size={14} />
          <span>VOLVER A HISTORIAS</span>
        </Link>
      </div>
    );
  }

  const whatsappInquiryUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hola Gustavo, leí la historia de (${story.coupleOrProject}) en Abancay De Boda y me encantó su cobertura. Quisiera consultar disponibilidad.`
  )}`;

  return (
    <article className="w-full pt-20 pb-28 md:pb-44 bg-ivory text-left">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <div className="mb-10">
          <Link
            to="/historias"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-text-muted hover:text-espresso transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Volver a Historias</span>
          </Link>
        </div>

        {/* Title & Metadata */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gold font-semibold mb-3">
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              {story.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {story.year}
            </span>
          </div>

          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-espresso font-light leading-tight mb-4">
            {story.coupleOrProject}
          </h1>
          <p className="text-sm sm:text-base text-gold-dark font-medium tracking-wide">
            {story.subtitle}
          </p>
        </div>

        {/* Protagonist Cover Photo */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xs bg-espresso shadow-lg border border-border-warm mb-12">
          <img
            src={story.coverImage}
            alt={story.coupleOrProject}
            className="w-full h-full object-cover"
          />
          {story.videoId && (
            <button
              onClick={() => playVideo(story.videoId!, story.coupleOrProject)}
              className="absolute bottom-6 right-6 btn-editorial-gold flex items-center gap-2 shadow-2xl"
            >
              <Film size={15} />
              <span>REPRODUCIR FILM COMPLETO</span>
            </button>
          )}
        </div>

        {/* Narrative & Quote */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          <div className="md:col-span-8 space-y-6">
            <h3 className="font-bodoni text-2xl text-espresso font-light">
              La Memoria de la Jornada
            </h3>
            <p className="text-sm sm:text-base text-text-muted font-light leading-relaxed">
              {story.description}
            </p>
            {story.secondaryImage && (
              <div className="aspect-[4/3] overflow-hidden rounded-xs bg-espresso shadow-md mt-8 border border-border-warm">
                <img
                  src={story.secondaryImage}
                  alt={`Detalle de ${story.coupleOrProject}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Details & Quote Column */}
          <div className="md:col-span-4 space-y-8">
            {story.quote && (
              <div className="p-6 bg-ivory-warm border-l-2 border-gold rounded-xs">
                <p className="font-bodoni italic text-base text-espresso leading-relaxed mb-3">
                  "{story.quote}"
                </p>
                <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold block">
                  — {story.coupleOrProject}
                </span>
              </div>
            )}

            <div className="p-6 bg-ivory-warm/40 border border-border-warm rounded-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-text-dim block mb-3 font-semibold">
                Detalles Técnicos
              </span>
              <ul className="space-y-2.5 text-xs text-text-muted font-light">
                {story.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-editorial-gold flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle size={15} />
                <span>CONSULTAR DISPONIBILIDAD</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
};
