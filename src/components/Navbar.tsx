/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_INFO } from '../data/studio';

const NAV_LINKS = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'BODAS', href: '#bodas' },
  { label: 'ANUARIOS', href: '#anuarios' },
  { label: 'PORTAFOLIO', href: '#portafolio' },
  { label: 'SERVICIOS', href: '#servicios' },
  { label: 'NOSOTROS', href: '#nosotros' },
  { label: 'CONTACTO', href: '#contacto' }
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappReservationUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad para reservar fecha con Abancay De Boda.'
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md py-3 md:py-3.5 border-b border-border-warm shadow-xs'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Abancay De Boda - Inicio"
          >
            {STUDIO_INFO.logo ? (
              <img
                src={STUDIO_INFO.logo}
                alt={STUDIO_INFO.name}
                className={`transition-all duration-300 object-contain rounded-xs ${
                  isScrolled ? 'h-9 md:h-10' : 'h-11 md:h-13'
                }`}
              />
            ) : null}
            <div className="flex flex-col text-left">
              <span className="font-editorial-serif text-lg md:text-xl font-medium tracking-tight text-espresso leading-none">
                {STUDIO_INFO.name}
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-gold font-semibold mt-1">
                Studio Fotográfico
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-espresso/80 hover:text-gold transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappReservationUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-gold text-[10px] py-2.5 px-5"
            >
              <span>RESERVAR FECHA</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-espresso hover:text-gold transition-colors focus-visible:outline-none"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col justify-between p-8 pt-28 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 text-center my-auto">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                Navegación
              </span>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial-serif text-2xl sm:text-3xl text-espresso hover:text-gold transition-colors font-light tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-border-warm flex flex-col items-center gap-5">
              <a
                href={whatsappReservationUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-editorial-gold w-full max-w-xs py-3.5"
              >
                <MessageCircle size={16} />
                <span>RESERVAR FECHA</span>
              </a>

              <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-text-muted">
                <a
                  href={STUDIO_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href={STUDIO_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Facebook
                </a>
                <span>·</span>
                <a
                  href={STUDIO_INFO.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
