/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_INFO } from '../data/studio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const whatsappReservationUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad para reservar fecha en Abancay De Boda.'
  )}`;

  // Navigation items per requirement
  const MAIN_LINKS = [
    { label: 'INICIO', path: '/' },
    { label: 'BODAS', path: '/bodas' },
    { label: 'QUINCEAÑOS', path: '/quinceanos' },
    { label: 'ANUARIOS', path: '/anuarios' },
    { label: 'PORTAFOLIO', path: '/portafolio' }
  ];

  const SERVICE_SUBMENU = [
    { label: 'Cumpleaños', path: '/cumpleanos', desc: 'Juveniles, adultos & familiares' },
    { label: '50 Años', path: '/50-anos', desc: 'Bodas de oro & medio siglo' },
    { label: 'Bautizos', path: '/bautizos', desc: 'Ceremonia sacramental & familia' },
    { label: 'Sesiones Fotográficas', path: '/sesiones', desc: 'Parejas, retratos & maternidad' },
    { label: 'Eventos Sociales', path: '/eventos', desc: 'Galas, aniversarios & corporativo' },
    { label: 'Ver todos los servicios', path: '/servicios', desc: 'Índice completo del studio', isFeatured: true }
  ];

  // Dynamic header styling: On homepage when not scrolled, dark transparent overlay; when scrolled or on interior pages, warm ivory
  const useDarkThemeOnNav = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          useDarkThemeOnNav
            ? 'bg-gradient-to-b from-black/80 via-black/35 to-transparent py-4 md:py-5 text-ivory'
            : 'bg-ivory/95 backdrop-blur-md py-3 md:py-3.5 border-b border-border-warm shadow-xs text-espresso'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Studio Brand Logo */}
          <Link
            to="/"
            className="flex items-center group focus-visible:outline-none"
            aria-label="Abancay De Boda - Inicio"
          >
            {STUDIO_INFO.logo ? (
              <img
                src={STUDIO_INFO.logo}
                alt={STUDIO_INFO.name}
                className={`transition-all duration-300 object-contain rounded-full border border-gold/30 ${
                  useDarkThemeOnNav ? 'h-11 w-11 md:h-13 md:w-13 drop-shadow-lg' : 'h-10 w-10 md:h-11 md:w-11'
                }`}
              />
            ) : (
              <span className="font-bodoni text-xl tracking-wide">
                {STUDIO_INFO.name}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Navegación principal">
            {MAIN_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300 ${
                    isActive ? 'after:w-full text-gold' : 'after:w-0 hover:after:w-full'
                  } ${
                    useDarkThemeOnNav
                      ? 'text-ivory/90 hover:text-white drop-shadow-sm'
                      : 'text-espresso/80 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* SERVICES Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 inline-flex items-center gap-1.5 py-1 ${
                  location.pathname.startsWith('/servicios') ||
                  location.pathname === '/cumpleanos' ||
                  location.pathname === '/50-anos' ||
                  location.pathname === '/bautizos' ||
                  location.pathname === '/sesiones' ||
                  location.pathname === '/eventos'
                    ? 'text-gold'
                    : useDarkThemeOnNav
                    ? 'text-ivory/90 hover:text-white drop-shadow-sm'
                    : 'text-espresso/80 hover:text-gold'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>SERVICIOS</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-gold' : ''}`}
                />
              </button>

              {/* Submenu popover */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50"
                  >
                    <div className="bg-ivory border border-border-warm rounded-xs shadow-2xl p-2.5 text-left text-espresso">
                      <div className="px-3 py-1.5 border-b border-border-warm/60 mb-1">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold">
                          Especialidades del Studio
                        </span>
                      </div>
                      
                      <div className="space-y-0.5">
                        {SERVICE_SUBMENU.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setServicesDropdownOpen(false)}
                            className={`block px-3 py-2 rounded-xs transition-colors group ${
                              item.isFeatured
                                ? 'mt-1 pt-2.5 border-t border-border-warm/80 bg-ivory-warm/70 hover:bg-gold/10'
                                : 'hover:bg-ivory-warm/80'
                            }`}
                          >
                            <span className={`text-xs block font-medium tracking-wide ${
                              item.isFeatured ? 'text-gold-dark font-semibold' : 'text-espresso group-hover:text-gold'
                            }`}>
                              {item.label}
                            </span>
                            <span className="text-[10px] text-text-muted font-light block">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NOSOTROS & CONTACTO */}
            <Link
              to="/nosotros"
              className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300 ${
                location.pathname === '/nosotros' ? 'after:w-full text-gold' : 'after:w-0 hover:after:w-full'
              } ${
                useDarkThemeOnNav
                  ? 'text-ivory/90 hover:text-white drop-shadow-sm'
                  : 'text-espresso/80 hover:text-gold'
              }`}
            >
              NOSOTROS
            </Link>

            <Link
              to="/contacto"
              className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300 ${
                location.pathname === '/contacto' ? 'after:w-full text-gold' : 'after:w-0 hover:after:w-full'
              } ${
                useDarkThemeOnNav
                  ? 'text-ivory/90 hover:text-white drop-shadow-sm'
                  : 'text-espresso/80 hover:text-gold'
              }`}
            >
              CONTACTO
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappReservationUrl}
              target="_blank"
              rel="noreferrer"
              className={`text-[10px] py-2.5 px-6 font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-300 flex items-center gap-2 ${
                useDarkThemeOnNav
                  ? 'bg-ivory hover:bg-gold hover:text-white text-espresso shadow-xl hover:shadow-2xl'
                  : 'btn-editorial-gold'
              }`}
            >
              <span>RESERVAR FECHA</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors focus-visible:outline-none ${
              useDarkThemeOnNav ? 'text-ivory hover:text-gold-light' : 'text-espresso hover:text-gold'
            }`}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-espresso flex flex-col justify-between p-6 pt-24 pb-8 lg:hidden overflow-y-auto"
          >
            <div className="space-y-8 my-auto">
              
              {/* Primary Pages */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-4">
                  Navegación Principal
                </span>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    { label: 'Inicio', path: '/' },
                    { label: 'Bodas', path: '/bodas' },
                    { label: 'Quinceaños', path: '/quinceanos' },
                    { label: 'Anuarios', path: '/anuarios' },
                    { label: 'Portafolio', path: '/portafolio' },
                    { label: 'Nosotros', path: '/nosotros' },
                    { label: 'Contacto', path: '/contacto' },
                    { label: 'Todos los Servicios', path: '/servicios' }
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm py-1.5 font-medium tracking-wide uppercase transition-colors ${
                        location.pathname === item.path ? 'text-gold' : 'text-ivory hover:text-gold'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Specific Celebrations & Sessions */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-4">
                  Celebraciones & Especialidades
                </span>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    { label: 'Cumpleaños', path: '/cumpleanos' },
                    { label: '50 Años', path: '/50-anos' },
                    { label: 'Bautizos', path: '/bautizos' },
                    { label: 'Sesiones', path: '/sesiones' },
                    { label: 'Eventos Sociales', path: '/eventos' }
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs py-1 text-ivory/80 hover:text-gold tracking-wide uppercase ${
                        location.pathname === item.path ? 'text-gold font-semibold' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-4">
              <a
                href={whatsappReservationUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-editorial-gold w-full max-w-sm py-3.5 text-center flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>RESERVAR FECHA</span>
              </a>

              <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-ivory/60 pt-1">
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
