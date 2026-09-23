/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play } from 'lucide-react';
import { VideoItem } from '../data/videos';

interface VideoPreviewProps {
  video: VideoItem;
  onPlay: (youtubeId: string, title: string) => void;
  aspect?: '16:9' | '4:3' | 'custom';
  className?: string;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  video,
  onPlay,
  aspect = '16:9',
  className = ''
}) => {
  return (
    <div 
      className={`group relative overflow-hidden bg-espresso cursor-pointer rounded-sm border border-border-warm transition-all duration-500 hover:border-gold/50 ${className}`}
      onClick={() => onPlay(video.youtubeId, video.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlay(video.youtubeId, video.title);
        }
      }}
      aria-label={`Reproducir video ${video.title}`}
    >
      <div className={`relative w-full ${aspect === '16:9' ? 'pb-[56.25%]' : 'pb-[75%]'}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-95"
        />
        
        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Center Play Button with Aged-Gold Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-ivory/95 text-espresso shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-white">
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-30 pointer-events-none" />
            <Play size={22} className="ml-1 fill-current" />
          </div>
        </div>

        {/* Top Tag */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-[10px] font-medium tracking-widest uppercase bg-black/60 backdrop-blur-sm text-ivory px-2.5 py-1 rounded-xs border border-white/10">
            {video.duration}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-4 left-4 right-4 text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-1">
            {video.coupleOrSubject} · {video.location}
          </span>
          <h4 className="font-editorial-serif text-lg md:text-xl text-ivory tracking-wide leading-tight">
            {video.title}
          </h4>
        </div>
      </div>
    </div>
  );
};
