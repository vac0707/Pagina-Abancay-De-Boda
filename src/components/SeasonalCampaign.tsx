/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { getActiveCampaign } from '../data/campaigns';

interface SeasonalCampaignProps {
  onPlayVideo?: (youtubeId: string, title: string) => void;
}

export const SeasonalCampaign: React.FC<SeasonalCampaignProps> = ({ onPlayVideo }) => {
  const campaign = getActiveCampaign();

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-espresso text-ivory">
      {/* Background Graphic Ambient Lighting */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] saturate-75 opacity-40 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${campaign.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-espresso/60" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-4 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>{campaign.eyebrow}</span>
            </div>

            <h3 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory tracking-tight leading-[1.2] mb-6">
              {campaign.title}
            </h3>

            <p className="text-sm sm:text-base text-ivory/80 font-light leading-relaxed max-w-2xl mb-8">
              {campaign.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={campaign.ctaUrl}
                className="btn-editorial-gold"
              >
                <span>{campaign.ctaLabel}</span>
                <ArrowUpRight size={15} />
              </a>

              {campaign.videoId && onPlayVideo && (
                <button
                  onClick={() => onPlayVideo(campaign.videoId!, campaign.title)}
                  className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/90 hover:text-white border border-white/20 hover:border-gold transition-all duration-300 rounded-xs flex items-center gap-2"
                >
                  <span>Ver Film de Temporada</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative p-2 bg-white/5 border border-gold/30 rounded-xs shadow-2xl backdrop-blur-xs">
              <div className="relative overflow-hidden aspect-[4/5] rounded-xs">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold block">
                    Temporada Activa
                  </span>
                  <p className="text-xs text-ivory/90 font-light italic">
                    Abancay De Boda · Cupos Limitados
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
