/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Heart, MessageCircle, BookOpen, Film, Camera, ArrowUpRight, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { STUDIO_INFO } from '../data/studio';

export const FiftyYearsPage: React.FC = () => {
  const whatsappUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad y presupuesto para la celebración de 50 Años / Bodas de Oro en Abancay.'
  )}`;

  const CHAPTERS = [
    {
      number: 'I',
      title: 'Retrato de Autor del Homenajeado',
      desc: 'Una sesión fotográfica pausada y solemne con luz de retrato para inmortalizar la madurez, la mirada serena y la dignidad de medio siglo de vida.'
    },
    {
      number: 'II',
      title: 'Reunión Multigeneracional',
      desc: 'El valor incalculable de reunir a padres, hijos, nietos y hermanos en retratos formales y fotografías espontáneas de afecto.'
    },
    {
      number: 'III',
      title: 'Discursos, Brindis & Baile de Honor',
      desc: 'Capturamos la emoción palpable de las palabras compartidas, las lágrimas contenidas y el baile familiar en una cobertura cinematográfica completa.'
    },
    {
      number: 'IV',
      title: 'El Libro de Recuerdos & Archivo',
      desc: 'Un álbum encuadernado a mano con papel fotográfico de archivo mineral para que esta fecha quede custodiada en el patrimonio familiar.'
    }
  ];

  return (
    <div className="w-full">
      {/* 01: Hero Entrada Sobria, Cálida & Exclusiva */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920"
            alt="Celebración 50 Años por Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gold-light font-semibold mb-4 px-3 py-1 bg-gold/15 rounded-xs border border-gold/30">
            <Award size={13} className="text-gold" />
            <span>50 AÑOS DE VIDA & BODAS DE ORO</span>
          </span>

          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-tight leading-[1.15] mb-6">
            Medio siglo de vida, <br />
            <span className="italic font-normal text-gold-light">un legado que permanece.</span>
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Una celebración irrepetible tratada con la solemnidad, calidez y elegancia que merece quien ha reunido a generaciones en torno a su historia.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>CONSULTAR COBERTURA DE 50 AÑOS</span>
          </a>
        </div>
      </section>

      {/* 02: Filosofía & Respeto por la Familia */}
      <section className="py-24 md:py-40 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
                Elegancia & Sobriedad
              </span>
              <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
                El homenaje más noble para honrar una vida entera.
              </h2>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Cumplir 50 años o conmemorar medio siglo de matrimonio (Bodas de Oro) no es una fiesta cualquiera: es la reunión de hijos, nietos, amistades de toda una vida y recuerdos que trascienden el tiempo.
              </p>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Nuestra presencia durante la celebración es discreta, distinguida y atenta. Sabemos cuándo capturar el gesto íntimo del brindis y cómo ordenar con amabilidad los retratos de las grandes familias abanquinas.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-6 border-t border-border-warm">
                <div className="flex items-start gap-3">
                  <Camera size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Retrato Formal & Espontáneo</h4>
                    <p className="text-[11px] text-text-muted font-light mt-0.5">El equilibrio perfecto de protocolo y verdad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Film size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Documental Cinematográfico</h4>
                    <p className="text-[11px] text-text-muted font-light mt-0.5">Audio nítido de los discursos y brindis.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 aspect-[4/5] overflow-hidden rounded-xs bg-espresso shadow-lg border border-border-warm">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200"
                alt="Retrato sobrio de 50 años"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>

          {/* 03: Capítulos de la Celebración */}
          <div className="mb-28">
            <SectionHeading
              eyebrow="Estructura de Cobertura"
              title="Momentos de la"
              italicWord="Celebración"
              subtitle="Cada instante protocolar y emotivo queda registrado con rigor estético y devoción por los detalles."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {CHAPTERS.map((ch) => (
                <div key={ch.number} className="p-8 bg-ivory-warm/40 border border-border-warm rounded-xs">
                  <span className="font-bodoni text-3xl text-gold/60 font-light block mb-3">
                    {ch.number}
                  </span>
                  <h3 className="font-sans text-lg text-espresso font-medium tracking-tight mb-2">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {ch.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 04: Caja de Entregas & Álbum de Lujo */}
          <div className="p-8 sm:p-12 lg:p-14 bg-espresso text-ivory rounded-xs shadow-2xl border border-white/10 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center text-left">
              <div className="md:col-span-8 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold">
                  Custodia de la Memoria
                </span>
                <h3 className="font-bodoni text-2xl sm:text-3xl md:text-4xl text-ivory font-light">
                  Un testimonio para las futuras generaciones
                </h3>
                <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
                  Ofrecemos la opción de encuadernación formal en tapa dura con grabado en pan de oro, acompañado de un pendrive de madera y galería digital perpetua.
                </p>
                <ul className="space-y-2 text-xs text-ivory/90 font-light pt-2">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Álbum de lino o piel ecológica con papel de archivo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Video documental completo con palabras de familiares</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Galería online para todos los invitados</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-4 text-center md:text-right">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial-gold w-full text-center"
                >
                  <MessageCircle size={15} />
                  <span>RESERVAR FECHA</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
