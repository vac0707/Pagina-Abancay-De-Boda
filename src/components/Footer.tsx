/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowUp, MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/studio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-espresso-deep text-ivory pt-24 pb-14 border-t border-gold/25 overflow-hidden">
      {/* Brand logo circular accent on dark background */}
      <div className="brand-circle-accent w-[500px] h-[500px] left-10 -bottom-40 opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Studio Identity & Creative Direction */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5 inline-block">
              {STUDIO_INFO.logo && (
                <img
                  src={STUDIO_INFO.logo}
                  alt={STUDIO_INFO.name}
                  className="h-10 w-auto object-contain rounded-xs drop-shadow-md"
                />
              )}
              <div>
                <span className="font-bodoni text-2xl text-ivory block font-normal leading-tight">
                  {STUDIO_INFO.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold-light block font-semibold">
                  Studio Fotográfico & Film
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-ivory/70 font-light leading-relaxed max-w-sm mb-6">
              {STUDIO_INFO.manifesto.lead} Dirección cinematográfica y fotografía de autor para los instantes más valiosos de tu vida.
            </p>

            <div className="text-xs text-gold-light font-light space-y-1">
              <p>Dirección Creativa: <span className="text-ivory font-normal">{STUDIO_INFO.owner}</span></p>
              <p className="text-ivory/60">{STUDIO_INFO.city}, {STUDIO_INFO.region} · Perú</p>
            </div>
          </div>

          {/* Column 1: ESTUDIO */}
          <div className="lg:col-span-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold block mb-5">
              Estudio
            </span>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-light text-ivory/70">
              <li>
                <Link to="/" className="hover:text-gold-light transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/nosotros" className="hover:text-gold-light transition-colors">Nosotros</Link>
              </li>
              <li>
                <Link to="/portafolio" className="hover:text-gold-light transition-colors">Portafolio</Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-gold-light transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: CELEBRACIONES */}
          <div className="lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold block mb-5">
              Celebraciones
            </span>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-light text-ivory/70">
              <li>
                <Link to="/bodas" className="hover:text-gold-light transition-colors">Bodas & Matrimonios</Link>
              </li>
              <li>
                <Link to="/quinceanos" className="hover:text-gold-light transition-colors">Quinceaños (15 Años)</Link>
              </li>
              <li>
                <Link to="/cumpleanos" className="hover:text-gold-light transition-colors">Cumpleaños</Link>
              </li>
              <li>
                <Link to="/50-anos" className="hover:text-gold-light transition-colors">50 Años & Bodas de Oro</Link>
              </li>
              <li>
                <Link to="/bautizos" className="hover:text-gold-light transition-colors">Bautizos</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: FOTOGRAFÍA & SOCIAL */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold block mb-5">
                Fotografía & Proyectos
              </span>
              <ul className="space-y-3 text-xs tracking-wider uppercase font-light text-ivory/70 mb-8">
                <li>
                  <Link to="/anuarios" className="hover:text-gold-light transition-colors">Anuarios Escolares</Link>
                </li>
                <li>
                  <Link to="/sesiones" className="hover:text-gold-light transition-colors">Sesiones Fotográficas</Link>
                </li>
                <li>
                  <Link to="/eventos" className="hover:text-gold-light transition-colors">Eventos Sociales</Link>
                </li>
                <li>
                  <Link to="/servicios" className="hover:text-gold-light transition-colors text-gold-light font-medium">Todos los Servicios →</Link>
                </li>
              </ul>

              {/* Social Channels & WhatsApp */}
              <div className="flex items-center gap-3">
                <a
                  href={STUDIO_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="Instagram de Abancay De Boda"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href={STUDIO_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="Facebook de Abancay De Boda"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href={STUDIO_INFO.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 h-9 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-bold tracking-wider text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="TikTok de Abancay De Boda"
                >
                  TIKTOK
                </a>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all"
                  aria-label="WhatsApp de Abancay De Boda"
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-ivory/60 font-light">
                Volver arriba
              </span>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold text-ivory hover:text-espresso transition-all flex items-center justify-center"
                aria-label="Subir al inicio de página"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Legal & Localized Studio attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 text-[10px] uppercase tracking-[0.25em] text-ivory/40 font-light">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. Todos los derechos reservados. ·{' '}
            <Link to="/admin" className="hover:text-gold-light transition-colors underline-offset-4 hover:underline">
              Acceso Estudio
            </Link>
          </p>
          <p>Fotografía & Cinematografía Profesional · Dirigido por {STUDIO_INFO.owner} · Abancay, Apurímac</p>
        </div>
      </div>
    </footer>
  );
};
