/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SectionHeading } from '../components/SectionHeading';

const STEPS = [
  {
    step: "01",
    title: "Consulta Inicial",
    description: "Conversamos para conocer su historia, fecha, locación y el estilo de recuerdo que sueñan tener."
  },
  {
    step: "02",
    title: "Reserva de Fecha",
    description: "Separamos su día de forma exclusiva en la agenda formalizando el contrato con el 20% de adelanto."
  },
  {
    step: "03",
    title: "Planificación & Preboda",
    description: "Trazamos el cronograma fotográfico, sugerimos locaciones de luz dorada y realizamos la sesión previa."
  },
  {
    step: "04",
    title: "Cobertura del Gran Día",
    description: "Llegamos 30 minutos antes para alistar óptica y audio. Acompañamos el evento con discreción y calidez."
  },
  {
    step: "05",
    title: "Curaduría & Edición",
    description: "Selección minuciosa cuadro por cuadro, graduación de color editorial y montaje cinematográfico del film."
  },
  {
    step: "06",
    title: "Entrega Inolvidable",
    description: "En hasta 30 días liberamos su Galería Online privada en alta resolución y coordinamos la entrega física."
  }
];

export const Experience: React.FC = () => {
  return (
    <section className="relative py-28 md:py-40 bg-ivory border-y border-border-warm">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Metodología & Confianza"
          title="Nuestra"
          italicWord="Experiencia"
          subtitle="Un proceso fluido, transparente y libre de estrés para que ustedes se enfoquen únicamente en disfrutar."
        />

        {/* Desktop: Connected Editorial Narrative (No cards, no boxes, no shadows) */}
        <div className="hidden lg:grid grid-cols-3 gap-x-14 gap-y-20 pt-8">
          {STEPS.map((item, idx) => (
            <div key={item.step} className="relative group text-left">
              {/* Fine hairline connector above each column */}
              <div className="relative flex items-center mb-6">
                <span className="w-2 h-2 rounded-full bg-gold/70 group-hover:scale-125 transition-transform" />
                <div className="h-[1px] flex-1 bg-border-warm ml-3 group-hover:bg-gold/40 transition-colors" />
              </div>

              {/* Large subtle Bodoni number */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-bodoni text-4xl xl:text-5xl text-gold/40 group-hover:text-gold font-light transition-colors select-none">
                  {item.step}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-dim font-medium">
                  Etapa 0{idx + 1}
                </span>
              </div>

              {/* Title in Manrope */}
              <h3 className="font-sans text-xl text-espresso font-normal tracking-tight mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-muted font-light leading-relaxed max-w-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet: Connected Vertical Narrative with elegant left hairline */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-12 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-warm">
          {STEPS.map((item, idx) => (
            <div key={item.step} className="relative text-left">
              {/* Timeline marker */}
              <span className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-3 h-3 rounded-full bg-ivory border-2 border-gold" />

              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-bodoni text-3xl text-gold font-light">
                  {item.step}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-text-dim">
                  · Paso {idx + 1}
                </span>
              </div>

              <h3 className="font-sans text-lg sm:text-xl text-espresso font-normal tracking-tight mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
