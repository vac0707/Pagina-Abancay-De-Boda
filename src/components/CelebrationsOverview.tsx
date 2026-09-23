/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface CelebrationCategory {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  path: string;
  image: string;
  aspect: string;
  colSpan: string;
  tag: string;
}

const CELEBRATIONS: CelebrationCategory[] = [
  {
    id: 'bodas',
    number: '01',
    name: 'Bodas & Matrimonios',
    subtitle: 'Fotografía & Film Cinematográfico',
    description: 'El testimonio visual de su unión concebido como una obra artística atemporal. Cobertura documental desde los preparativos hasta la fiesta.',
    path: '/bodas',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[16/10]',
    colSpan: 'lg:col-span-8',
    tag: 'Especialidad Principal'
  },
  {
    id: 'quinceanos',
    number: '02',
    name: 'Quinceaños',
    subtitle: '15 Años de Autor',
    description: 'Una etapa que solo ocurre una vez. Retrato editorial, sesión previa al atardecer, recepción y film contemporáneo con estilo fresco y sofisticado.',
    path: '/quinceanos',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[3/4]',
    colSpan: 'lg:col-span-4',
    tag: 'Juventud & Elegancia'
  },
  {
    id: 'anuarios',
    number: '03',
    name: 'Anuarios & Promociones',
    subtitle: 'Diseño Editorial & Encuadernación de Lujo',
    description: 'Tu promoción merece quedarse para siempre. Retratos individuales con luz de estudio, fotos de grupo y libros de recuerdos de alta gama.',
    path: '/anuarios',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[4/5]',
    colSpan: 'lg:col-span-5',
    tag: 'Colección de Archivo'
  },
  {
    id: 'cumpleanos',
    number: '04',
    name: 'Cumpleaños',
    subtitle: 'Celebraciones Familiares & Fiestas',
    description: 'La energía viva del festejo. Capturamos los abrazos genuinos, el decorado, los momentos emotivos y el baile con narrativa ágil.',
    path: '/cumpleanos',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[16/10]',
    colSpan: 'lg:col-span-7',
    tag: 'Momentos Espontáneos'
  },
  {
    id: '50-anos',
    number: '05',
    name: '50 Años & Bodas de Oro',
    subtitle: 'Homenajes de Vida & Trayectoria',
    description: 'Un homenaje sobrio, cálido y entrañable. Retrato del homenajeado, reunión multigeneracional, brindis y discursos familiares.',
    path: '/50-anos',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[16/10]',
    colSpan: 'lg:col-span-7',
    tag: 'Emoción & Familia'
  },
  {
    id: 'bautizos',
    number: '06',
    name: 'Bautizos',
    subtitle: 'Ceremonia Sacramental & Bendición',
    description: 'Luz pura, serenidad y afecto. Documentamos la sagrada liturgia bautismal, padrinos, familia y recepción íntima con estética luminosa.',
    path: '/bautizos',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=900',
    aspect: 'aspect-[4/5]',
    colSpan: 'lg:col-span-5',
    tag: 'Luminoso & Delicado'
  },
  {
    id: 'sesiones',
    number: '07',
    name: 'Sesiones Fotográficas',
    subtitle: 'Parejas, Retratos & Maternidad',
    description: 'Experiencias a luz natural en las locaciones más poéticas de Abancay y Apurímac, o en estudio con iluminación cuidada.',
    path: '/sesiones',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[3/4]',
    colSpan: 'lg:col-span-4',
    tag: 'Luz Natural & Retrato'
  },
  {
    id: 'eventos',
    number: '08',
    name: 'Eventos Sociales & Galas',
    subtitle: 'Aniversarios & Celebraciones Privadas',
    description: 'Cobertura integral para eventos corporativos, galas institucionales y encuentros privados con entrega digital de alta fidelidad.',
    path: '/eventos',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-[16/10]',
    colSpan: 'lg:col-span-8',
    tag: 'Documental & Gala'
  }
];

export const CelebrationsOverview: React.FC = () => {
  return (
    <section id="celebraciones" className="py-28 md:py-44 bg-ivory border-t border-border-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Especialidades del Studio"
          title="Celebraciones que"
          italicWord="Fotografiamos"
          subtitle="Abancay De Boda es un estudio fotográfico integral. Cada ocasión posee una atmósfera única que documentamos con dirección de autor y técnica de vanguardia."
        />

        {/* Varied Editorial Photographic Composition (Not 8 identical corporate cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {CELEBRATIONS.map((item) => (
            <div
              key={item.id}
              className={`${item.colSpan} group flex flex-col justify-between`}
            >
              {/* Photo Showcase */}
              <Link
                to={item.path}
                className="relative block overflow-hidden bg-espresso rounded-xs shadow-xs mb-5 cursor-pointer border border-border-warm/60"
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 filter brightness-[0.94] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Subtle editorial tag */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-ivory/90 bg-espresso/70 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/10 font-medium">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Editorial Info */}
              <div className="pt-2 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bodoni text-2xl sm:text-3xl text-gold/60 font-light select-none">
                    {item.number}
                  </span>
                  <div className="h-[1px] flex-1 bg-border-warm" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="font-sans text-xl sm:text-2xl text-espresso font-normal tracking-tight group-hover:text-gold transition-colors">
                    <Link to={item.path}>
                      {item.name}
                    </Link>
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium">
                    {item.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed mb-4 max-w-xl">
                  {item.description}
                </p>

                <div>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors group/link"
                  >
                    <span>{item.name.split('&')[0].trim()}</span>
                    <span className="text-gold group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
