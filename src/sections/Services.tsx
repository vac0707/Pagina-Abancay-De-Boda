/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  actionText: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: "serv-bodas",
    number: "01",
    title: "Bodas & Matrimonios",
    subtitle: "Fotografía y film cinematográfico",
    description: "Cobertura artística, emotiva y documental. Registramos desde los instantes íntimos del arreglo nupcial hasta el clímax de la fiesta con enfoque cinematográfico de autor.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000",
    href: "#bodas",
    actionText: "Explorar Bodas & Paquetes"
  },
  {
    id: "serv-anuarios",
    number: "02",
    title: "Anuarios Escolares",
    subtitle: "Sesión de promoción & diseño editorial",
    description: "Una despedida que merece perdurar. Diseñamos libros de promoción escolares con fotografía individual de retrato, retratos grupales, empastados de lujo y film backstage.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
    href: "#anuarios",
    actionText: "Ver Anuarios Escolares"
  },
  {
    id: "serv-sesiones",
    number: "03",
    title: "Sesiones Fotográficas",
    subtitle: "Parejas, preboda & retratos de autor",
    description: "Espacios íntimos y luz natural en locaciones seleccionadas de Abancay y Apurímac. Creamos una atmósfera distendida donde florece la autenticidad de cada persona.",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000",
    href: "#portafolio",
    actionText: "Ver Galería de Sesiones"
  },
  {
    id: "serv-eventos",
    number: "04",
    title: "Eventos Sociales",
    subtitle: "XV años & celebraciones especiales",
    description: "Inmortalizamos grandes celebraciones con narrativa visual dinámica, elegancia y atención al detalle para revivir la energía del evento en su máxima expresión.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
    href: "#contacto",
    actionText: "Consultar Cobertura"
  }
];

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 md:py-36 bg-ivory-warm/40 border-t border-border-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Nuestra Propuesta"
          title="Servicios Principales"
          subtitle="Cada proyecto recibe una mirada estética personalizada y el estándar técnico más riguroso en captura y posproducción."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_LIST.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className="group relative flex flex-col justify-between overflow-hidden bg-ivory border border-border-warm p-8 sm:p-10 rounded-sm hover:border-gold/50 transition-all duration-500 shadow-xs hover:shadow-xl block text-left"
            >
              {/* Header number & image preview */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-editorial-serif text-3xl sm:text-4xl text-gold/70 font-light group-hover:text-gold transition-colors">
                    {service.number}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-border-warm flex items-center justify-center text-text-muted group-hover:border-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-xs bg-espresso">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                </div>

                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-espresso font-light mb-2 group-hover:text-gold-dark transition-colors">
                  {service.title}
                </h3>

                <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold mb-4">
                  {service.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Functional CTA text */}
              <div className="pt-4 border-t border-border-warm flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-espresso group-hover:text-gold transition-colors">
                <span>{service.actionText}</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
