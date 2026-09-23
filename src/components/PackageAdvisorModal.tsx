/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, X, Check, MessageCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PACKAGE_CATEGORIES, PackageItem } from '../data/packages';
import { STUDIO_INFO } from '../data/studio';

export const PackageAdvisorModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // User selections
  const [eventType, setEventType] = useState<'boda' | 'civil' | 'anuario' | 'sesion'>('boda');
  const [formatPreference, setFormatPreference] = useState<'digital' | 'fisico' | 'gold'>('digital');
  const [hours, setHours] = useState<'short' | 'medium' | 'full'>('full');

  const handleReset = () => {
    setStep(1);
  };

  // Logic to determine recommended package
  const getRecommendation = (): { pkg: PackageItem; reason: string } => {
    if (eventType === 'anuario') {
      return {
        pkg: {
          id: "anuario-custom",
          title: "Anuario Escolar Editorial",
          price: "Cotización a Medida",
          duration: "Sesión + Entrega Editorial",
          includes: [
            "Sesión individual de retrato por alumno",
            "Fotografía grupal de promoción y docentes",
            "Diseño de anuario personalizado con acabados de lujo",
            "Impresión de alta gama y empastado formal",
            "Video documental / reel de backstage"
          ],
          categoryKey: "fisica",
          format: "Digital & Físico"
        },
        reason: "Para promociones escolares diseñamos una propuesta personalizada según el número de alumnos y tipo de encuadernación."
      };
    }

    if (eventType === 'civil' || eventType === 'sesion') {
      const pkg = PACKAGE_CATEGORIES[0].items[1] || PACKAGE_CATEGORIES[0].items[0];
      return {
        pkg,
        reason: "Ideal para matrimonios civiles o sesiones especiales que requieren entre 1 y 2 horas con entrega de galería digital en alta definición."
      };
    }

    // Wedding recommendations based on format & hours
    if (formatPreference === 'gold') {
      const goldGroup = PACKAGE_CATEGORIES.find(c => c.key === 'gold');
      const item = hours === 'full' ? goldGroup?.items[3] || goldGroup?.items[1] : goldGroup?.items[0];
      return {
        pkg: item || PACKAGE_CATEGORIES[3].items[0],
        reason: "Recomendado para una cobertura cinematográfica suprema con 2 fotógrafos y 2 videógrafos, garantizando no perder ningún ángulo de su gran día."
      };
    }

    if (formatPreference === 'fisico') {
      const fisicaGroup = PACKAGE_CATEGORIES.find(c => c.key === 'fisica');
      const item = hours === 'full' ? fisicaGroup?.items[1] : fisicaGroup?.items[0];
      return {
        pkg: item || PACKAGE_CATEGORIES[2].items[0],
        reason: "La mejor opción para parejas que valoran tener sus fotos impresas, cuadro de firmas y cajita de madera grabada, además de la sesión preboda gratis."
      };
    }

    // Digital
    const digitalGroup = PACKAGE_CATEGORIES.find(c => c.key === 'fotovideo');
    if (hours === 'full') {
      return {
        pkg: digitalGroup?.items[5] || digitalGroup?.items[6] || digitalGroup?.items[0]!,
        reason: "Nuestro paquete digital más solicitado: 8 horas de cobertura completa desde los preparativos, video extendido, reel y sesión preboda gratis."
      };
    } else if (hours === 'medium') {
      return {
        pkg: digitalGroup?.items[3] || digitalGroup?.items[2] || digitalGroup?.items[0]!,
        reason: "Equilibrio perfecto para ceremonias y recepción con foto y video cinematográfico en galería online."
      };
    } else {
      return {
        pkg: digitalGroup?.items[0] || digitalGroup?.items[1]!,
        reason: "Cobertura ágil y económica de momentos clave con fotografía y video cinematográfico."
      };
    }
  };

  const recommendation = getRecommendation();

  const getWhatsAppAdvisorUrl = () => {
    const text = encodeURIComponent(
      `Hola Gustavo, utilicé el asesor web de Abancay De Boda. Mi evento es (${eventType}) para aprox (${hours === 'full' ? 'día completo' : hours === 'medium' ? '4 a 6 horas' : '1 a 3 horas'}) con preferencia (${formatPreference}). Me recomendó el ${recommendation.pkg.title} (${recommendation.pkg.price}). ¿Tienen disponibilidad?`
    );
    return `${STUDIO_INFO.whatsappUrl}?text=${text}`;
  };

  return (
    <>
      {/* Discreet Trigger Button on bottom-left - Hidden on mobile so WhatsApp is the sole floating CTA */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-8 left-8 z-40 items-center gap-2.5 px-4 py-3 bg-ivory/95 backdrop-blur-md text-espresso border border-border-gold shadow-xl rounded-full hover:border-gold hover:shadow-2xl transition-all duration-300 group"
        aria-label="Abrir asesor interactivo de paquetes"
      >
        <span className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
          <Sparkles size={13} />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Asesor de Paquetes
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-ivory border border-gold/40 shadow-2xl rounded-xs overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-warm bg-ivory-warm">
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-gold" />
                  <div>
                    <h3 className="font-bodoni text-lg text-espresso font-medium leading-none">
                      Asesor de Paquetes
                    </h3>
                    <p className="text-[9px] text-text-muted tracking-wider uppercase mt-1">
                      Abancay De Boda
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-muted hover:text-espresso p-1 transition-colors"
                  aria-label="Cerrar asesor"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {step === 1 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-2">
                      Paso 1 de 3
                    </span>
                    <h4 className="font-bodoni text-2xl text-espresso mb-4">
                      ¿Qué tipo de evento estás celebrando?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'boda', label: 'Boda Religiosa / Fiesta', desc: 'Día completo de celebración' },
                        { id: 'civil', label: 'Boda Civil / Íntima', desc: 'Ceremonia o pocos invitados' },
                        { id: 'anuario', label: 'Anuario Escolar', desc: 'Promoción de colegio' },
                        { id: 'sesion', label: 'Sesión Fotográfica', desc: 'Pareja, retratos o XV años' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setEventType(item.id as any);
                            if (item.id === 'anuario') {
                              setStep(4);
                            } else {
                              setStep(2);
                            }
                          }}
                          className={`p-4 text-left border rounded-xs transition-all ${
                            eventType === item.id
                              ? 'border-gold bg-gold/5 text-espresso'
                              : 'border-border-warm bg-white hover:border-gold/50'
                          }`}
                        >
                          <p className="font-bodoni text-base text-espresso font-medium">{item.label}</p>
                          <p className="text-xs text-text-muted font-light mt-1">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-2">
                      Paso 2 de 3
                    </span>
                    <h4 className="font-bodoni text-2xl text-espresso mb-4">
                      ¿Qué formato de entrega prefieres?
                    </h4>
                    <div className="space-y-3">
                      {[
                        { id: 'digital', label: 'Digital Completo (Galería Online)', desc: 'Fotos en máxima resolución + Video cinematográfico con link de descarga.' },
                        { id: 'fisico', label: 'Entrega Física + Digital', desc: 'Fotos impresas, cuadros para firmas/pared, cajita de madera con USB y Preboda GRATIS.' },
                        { id: 'gold', label: 'Experiencia GOLD (2 Fotógrafos + 2 Videógrafos)', desc: 'Equipo cinematográfico doble para eventos de gran escala.' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setFormatPreference(item.id as any);
                            setStep(3);
                          }}
                          className={`w-full p-4 text-left border rounded-xs transition-all ${
                            formatPreference === item.id
                              ? 'border-gold bg-gold/5 text-espresso'
                              : 'border-border-warm bg-white hover:border-gold/50'
                          }`}
                        >
                          <p className="font-bodoni text-base text-espresso font-medium">{item.label}</p>
                          <p className="text-xs text-text-muted font-light mt-1">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-2">
                      Paso 3 de 3
                    </span>
                    <h4 className="font-bodoni text-2xl text-espresso mb-4">
                      ¿Cuántas horas aproximadas de cobertura calculas?
                    </h4>
                    <div className="space-y-3">
                      {[
                        { id: 'short', label: '1 a 3 Horas', desc: 'Ideal para momentos puntuales o sesiones rápidas.' },
                        { id: 'medium', label: '4 a 6 Horas', desc: 'Ceremonia religiosa, sesión artística y momentos clave de recepción.' },
                        { id: 'full', label: '8 a 10 Horas (Cobertura Completa)', desc: 'Desde los preparativos de novia hasta la fiesta.' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setHours(item.id as any);
                            setStep(4);
                          }}
                          className={`w-full p-4 text-left border rounded-xs transition-all ${
                            hours === item.id
                              ? 'border-gold bg-gold/5 text-espresso'
                              : 'border-border-warm bg-white hover:border-gold/50'
                          }`}
                        >
                          <p className="font-bodoni text-base text-espresso font-medium">{item.label}</p>
                          <p className="text-xs text-text-muted font-light mt-1">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-left">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 px-3 py-1 rounded-full mb-3">
                      <Sparkles size={12} /> Paquete Recomendado
                    </div>

                    <h4 className="font-bodoni text-3xl text-espresso mb-1">
                      {recommendation.pkg.title}
                    </h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bodoni text-2xl text-gold-dark font-medium">
                        {recommendation.pkg.price}
                      </span>
                      <span className="text-xs text-text-muted font-light">
                        · {recommendation.pkg.duration}
                      </span>
                    </div>

                    <p className="text-xs text-text-muted font-light leading-relaxed mb-4 bg-ivory-warm/60 p-3 rounded-xs border border-border-warm">
                      {recommendation.reason}
                    </p>

                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-text-dim block mb-2 font-medium">
                        Lo que incluye:
                      </span>
                      <ul className="space-y-1.5 text-xs text-text-main font-light">
                        {recommendation.pkg.includes.slice(0, 4).map((inc, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check size={13} className="text-gold flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={getWhatsAppAdvisorUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-editorial-gold flex-1 py-3 text-center"
                      >
                        <MessageCircle size={15} />
                        <span>Consultar por WhatsApp</span>
                      </a>
                      <button
                        onClick={handleReset}
                        className="px-4 py-3 border border-border-warm text-text-muted hover:text-espresso text-[11px] uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw size={13} />
                        <span>Reiniciar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
