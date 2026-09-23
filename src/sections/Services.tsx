/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

interface ServiceEntry {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAspect: string;
  href: string;
  actionText: string;
  reverseLayout: boolean;
}

const SERVICES_DATA: ServiceEntry[] = [
  {
    number: "01",
    title: "Bodas & Matrimonios",
    subtitle: "Fotografía y film cinematográfico",
    description: "Cobertura artística, emotiva y documental. Registramos desde los instantes íntimos del arreglo nupcial hasta el clímax de la fiesta con enfoque cinematográfico de autor.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    imageAspect: "aspect-[16/10]",
    href: "#bodas",
    actionText: "Explorar Bodas & Paquetes",
    reverseLayout: false
  },
  {
    number: "02",
    title: "Anuarios Escolares",
    subtitle: "Sesión de promoción & diseño editorial",
    description: "Una despedida que merece perdurar. Diseñamos libros de promoción escolares con fotografía individual de retrato, retratos grupales, empastados de lujo y film backstage.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
    imageAspect: "aspect-[4/5]",
    href: "#anuarios",
    actionText: "Ver Anuarios Escolares",
    reverseLayout: true
  },
  {
    number: "03",
    title: "Sesiones Fotográficas",
    subtitle: "Parejas, preboda & retratos de autor",
    description: "Espacios íntimos y luz natural en locaciones seleccionadas de Abancay y Apurímac. Creamos una atmósfera distendida donde florece la autenticidad de cada persona.",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
    imageAspect: "aspect-[16/10]",
    href: "#portafolio",
    actionText: "Ver Galería de Sesiones",
    reverseLayout: false
  },
  {
    number: "04",
    title: "Eventos Sociales & XV",
    subtitle: "Celebraciones de alta gama",
    description: "Inmortalizamos grandes celebraciones con narrativa visual dinámica, elegancia y atención al detalle para revivir la energía del evento en su máxima expresión.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
    imageAspect: "aspect-[4/5]",
    href: "#contacto",
    actionText: "Consultar Cobertura",
    reverseLayout: true
  }
];

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="relative py-28 md:py-40 bg-ivory-warm/40 border-t border-border-warm overflow-hidden">
      {/* Brand accent circle */}
      <div className="brand-circle-accent w-[600px] h-[600px] -left-64 top-1/3 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Nuestra Propuesta"
          title="Servicios"
          italicWord="Principales"
          subtitle="Cada proyecto recibe una mirada estética personalizada y el estándar técnico más riguroso en captura y posproducción."
        />

        <div className="space-y-24 md:space-y-36">
          {SERVICES_DATA.map((service, index) => {
            return (
              <div
                key={service.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  service.reverseLayout ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Large Visual Entry */}
                <div className={`lg:col-span-7 ${service.reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
                  <a
                    href={service.href}
                    className="group block relative overflow-hidden bg-espresso rounded-xs shadow-xl border border-border-warm"
                  >
                    <div className={`relative w-full ${service.imageAspect} overflow-hidden`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                      {/* Floating Category Tag */}
                      <div className="absolute top-5 left-5">
                        <span className="text-[10px] uppercase tracking-[0.25em] bg-black/60 backdrop-blur-md text-ivory px-3 py-1.5 rounded-xs border border-white/10 font-medium">
                          {service.subtitle}
                        </span>
                      </div>

                      {/* Hover Pill reveal */}
                      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ivory text-espresso text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs shadow-lg">
                          DESCUBRIR <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Editorial Description Column */}
                <div className={`lg:col-span-5 ${service.reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-bodoni text-4xl sm:text-5xl text-gold/80 font-light">
                        {service.number}
                      </span>
                      <div className="h-[1px] flex-1 bg-border-warm" />
                    </div>

                    <h3 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light mb-3">
                      {service.title}
                    </h3>

                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-semibold mb-4">
                      {service.subtitle}
                    </p>

                    <p className="text-sm text-text-muted font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <a
                      href={service.href}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors group"
                    >
                      <span>{service.actionText}</span>
                      <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
