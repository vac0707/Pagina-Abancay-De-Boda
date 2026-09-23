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
    <section className="py-24 md:py-36 bg-ivory-warm/40 border-y border-border-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Metodología & Confianza"
          title="Nuestra Experiencia"
          subtitle="Un proceso fluido, transparente y libre de estrés para que ustedes se enfoquen únicamente en disfrutar."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="relative p-8 bg-ivory border border-border-warm rounded-sm flex flex-col justify-between hover:border-gold/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-warm">
                  <span className="font-editorial-serif text-3xl sm:text-4xl text-gold group-hover:text-gold-dark transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-text-dim">
                    Paso {idx + 1}
                  </span>
                </div>

                <h3 className="font-editorial-serif text-2xl text-espresso font-light mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4">
                <div className="h-[1px] w-8 bg-gold/40 group-hover:w-16 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
