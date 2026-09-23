/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Facebook, ArrowUp } from 'lucide-react';
import { STUDIO_INFO } from '../data/studio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso text-ivory pt-20 pb-12 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Manifesto snippet */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              {STUDIO_INFO.logo && (
                <img
                  src={STUDIO_INFO.logo}
                  alt={STUDIO_INFO.name}
                  className="h-10 w-auto object-contain rounded-xs"
                />
              )}
              <div>
                <span className="font-editorial-serif text-2xl text-ivory block font-normal">
                  {STUDIO_INFO.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold block">
                  Studio Fotográfico
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ivory/70 font-light leading-relaxed max-w-sm mb-6">
              {STUDIO_INFO.manifesto.lead} Fotografía y cinematografía de bodas, celebraciones y momentos que solo ocurren una vez.
            </p>

            <div className="text-xs text-gold/80 font-light">
              <p>Dirección Creativa: <span className="text-ivory font-normal">{STUDIO_INFO.owner}</span></p>
              <p className="mt-1">{STUDIO_INFO.city}, {STUDIO_INFO.region}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block mb-5">
              Explorar
            </span>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-light text-ivory/80">
              <li>
                <a href="#bodas" className="hover:text-gold transition-colors">Bodas & Prebodas</a>
              </li>
              <li>
                <a href="#anuarios" className="hover:text-gold transition-colors">Anuarios Escolares</a>
              </li>
              <li>
                <a href="#portafolio" className="hover:text-gold transition-colors">Portafolio Visual</a>
              </li>
              <li>
                <a href="#paquetes" className="hover:text-gold transition-colors">Paquetes & Precios</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold transition-colors">Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>

          {/* Social and Contact */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block mb-5">
                Redes & Comunidad
              </span>
              <p className="text-xs text-ivory/70 font-light leading-relaxed mb-6">
                Síguenos para descubrir publicaciones diarias, estrenos de reels y detrás de cámara de cada boda en Abancay.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={STUDIO_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={STUDIO_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={STUDIO_INFO.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 h-10 rounded-full border border-white/20 flex items-center justify-center text-[11px] font-bold tracking-wider text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="TikTok"
                >
                  TIKTOK
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-ivory/60 font-light">
                Volver arriba
              </span>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold text-ivory hover:text-espresso transition-all flex items-center justify-center"
                aria-label="Subir al inicio"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 text-[10px] uppercase tracking-[0.25em] text-ivory/40 font-light">
          <p>© {new Date().getFullYear()} {STUDIO_INFO.name}. Todos los derechos reservados.</p>
          <p>Fotografía & Cinematografía Profesional · Abancay, Apurímac</p>
        </div>
      </div>
    </footer>
  );
};
