/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

interface ServiceDetail {
  number: string;
  name: string;
  subtitle: string;
  lead: string;
  features: string[];
  path: string;
  image: string;
  imageAlt: string;
}

const ALL_SERVICES: ServiceDetail[] = [
  {
    number: '01',
    name: 'Bodas & Matrimonios',
    subtitle: 'Dirección Cinematográfica & Fotografía de Autor',
    lead: 'Documentamos su unión con la delicadeza de una obra cinematográfica. Desde los preparativos íntimos hasta la euforia en la pista de baile, con sesiones de preboda al atardecer andino.',
    features: ['Cobertura de 8 a 10 horas completas', '2 fotógrafos y 2 videógrafos de cine', 'Galería digital 4K y caja de madera grabada'],
    path: '/bodas',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Fotografía de bodas en Abancay'
  },
  {
    number: '02',
    name: 'Quinceaños',
    subtitle: '15 Años con Estética Editorial & Juvenil',
    lead: 'Una propuesta moderna y distinguida que huye de poses anticuadas. Retrato de moda para la quinceañera, sesión previa en exteriores, vals protocolar, fiesta y reels dinámicos.',
    features: ['Sesión previa con cambios de vestuario', 'Cuadro de firmas de gran formato', 'Film resumen y reels para TikTok / Instagram'],
    path: '/quinceanos',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Quinceañera editorial Abancay'
  },
  {
    number: '03',
    name: 'Cumpleaños',
    subtitle: 'Fiestas Dinámicas & Celebraciones Familiares',
    lead: 'Capturamos la energía, los abrazos sinceros y los momentos irrepetibles de cada cumpleaños adulto o juvenil, asegurando que cada invitado tenga su retrato en alta resolución.',
    features: ['Cobertura de decoración, torta e invitados', 'Fotoperiodismo de la fiesta sin interrupciones', 'Entrega rápida de adelantos digitales'],
    path: '/cumpleanos',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Fiesta de cumpleaños Abancay'
  },
  {
    number: '04',
    name: '50 Años & Bodas de Oro',
    subtitle: 'Homenajes de Vida con Solemnidad & Calidez',
    lead: 'Un tratamiento distinguido para celebraciones que congregan a varias generaciones. Registro de discursos, brindis de honor, retratos de los abuelos, hijos y nietos.',
    features: ['Retrato protocolar de la pareja u homenajeado', 'Grabación de audio directo en los discursos', 'Álbum impreso en tapa dura de colección'],
    path: '/50-anos',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    imageAlt: '50 años y bodas de oro'
  },
  {
    number: '05',
    name: 'Bautizos',
    subtitle: 'Ceremonia Sacramental Luminosa & Pura',
    lead: 'Respeto total por la liturgia bautismal. Fotografías luminosas de la pila bautismal, padres, padrinos y retratos íntimos del bebé con luz suave y natural.',
    features: ['Cobertura dentro del templo sin ruidos', 'Retratos formales en el altar', 'Recepción familiar íntima'],
    path: '/bautizos',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Bautizos en parroquias de Abancay'
  },
  {
    number: '06',
    name: 'Anuarios Escolares & Promociones',
    subtitle: 'Diseño Editorial & Encuadernación de Lujo',
    lead: 'Elevamos los anuarios escolares a libros de arte. Sesión de retratos individuales con iluminación de estudio, fotos de grupos, backstage y encuadernación en tapa dura.',
    features: ['Sesiones individuales por alumno con toga/uniforme', 'Diseño gráfico personalizado sin plantillas genéricas', 'Muestras físicas previas para el comité escolar'],
    path: '/anuarios',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Anuarios de promoción Abancay'
  },
  {
    number: '07',
    name: 'Sesiones Fotográficas',
    subtitle: 'Luz Natural, Parejas, Retrato & Maternidad',
    lead: 'Encuentros fotográficos pausados en las mejores locaciones naturales de la región Apurímac o en nuestro estudio para capturar miradas y complicidad con calma.',
    features: ['Asesoría de estilismo y locación', 'Edición fotográfica de autor cuadro por cuadro', 'Galería digital privada descargable'],
    path: '/sesiones',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Sesiones en exteriores Abancay'
  },
  {
    number: '08',
    name: 'Eventos Sociales & Galas',
    subtitle: 'Cobertura Protocolar & Encuentros Institucionales',
    lead: 'Precisión técnica y puntualidad para aniversarios de instituciones, cenas benéficas, galas corporativas y lanzamientos con material listo para prensa y archivo.',
    features: ['Fotografía protocolar y de ambiente', 'Video resumen de alta definición', 'Entrega exprés de fotografías clave'],
    path: '/eventos',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Galas y eventos sociales Abancay'
  }
];

export const ServiciosPage: React.FC = () => {
  return (
    <div className="w-full pt-20 pb-28 md:pb-44 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Índice General del Studio"
          title="Nuestras"
          italicWord="Especialidades"
          subtitle="Abancay De Boda ofrece dirección fotográfica y cinematográfica integral. Conoce en profundidad cada una de nuestras coberturas de autor."
        />

        {/* Alternating Magazine Editorial Layout (Not 8 identical cards) */}
        <div className="space-y-24 md:space-y-36">
          {ALL_SERVICES.map((srv, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={srv.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Link
                    to={srv.path}
                    className="block relative overflow-hidden aspect-[16/10] bg-espresso rounded-xs shadow-md border border-border-warm/60 group cursor-pointer"
                  >
                    <img
                      src={srv.image}
                      alt={srv.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 filter brightness-[0.95] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  </Link>
                </div>

                {/* Information Column */}
                <div className={`lg:col-span-6 space-y-5 text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-bodoni text-3xl sm:text-4xl text-gold/60 font-light select-none">
                      {srv.number}
                    </span>
                    <div className="h-[1px] w-12 bg-gold/30" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
                      {srv.subtitle}
                    </span>
                  </div>

                  <h3 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light">
                    <Link to={srv.path} className="hover:text-gold transition-colors">
                      {srv.name}
                    </Link>
                  </h3>

                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    {srv.lead}
                  </p>

                  <ul className="space-y-2 text-xs text-espresso/90 font-light pt-2 border-t border-border-warm">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <Link
                      to={srv.path}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors"
                    >
                      <span>EXPLORAR SERVICIO</span>
                      <ArrowUpRight size={13} className="text-gold" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
