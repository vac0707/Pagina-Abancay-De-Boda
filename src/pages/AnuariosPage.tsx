/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useVideo } from '../context/VideoContext';
import { YearbooksSection } from '../sections/YearbooksSection';
import { BookOpen, Award, Film, Users, MessageCircle, Check, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studio';

export const AnuariosPage: React.FC = () => {
  const { playVideo } = useVideo();

  const whatsappAnuarioUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, represento a un comité de promoción escolar en Abancay. Deseo solicitar una cotización para el Anuario Escolar y sesión fotográfica.'
  )}`;

  const FEATURES = [
    {
      title: 'Retrato Individual de Estudio',
      desc: 'Iluminación profesional de estudio móvil trasladada al colegio o en nuestra sede para que cada alumno luzca impecable con toga o uniforme.'
    },
    {
      title: 'Fotografía Grupal & Promocional',
      desc: 'Tomas creativas de toda la promoción, grupos de amigos, docentes y directivos en exteriores o áreas emblemáticas del plantel.'
    },
    {
      title: 'Maquetación Editorial Exclusiva',
      desc: 'Sin plantillas genéricas. Cada página se diseña a medida con la tipografía, colores y mensaje de la promoción escolar.'
    },
    {
      title: 'Encuadernación de Lujo',
      desc: 'Tapa dura termotratada con estampado en relieve, barniz sectorizado o lino textil de alta resistencia.'
    }
  ];

  return (
    <div className="w-full">
      {/* 01: Split Editorial Entrance (Marfil + Salvia + Dorado) */}
      <YearbooksSection onPlayVideo={playVideo} />

      {/* 02: Especificaciones Editoriales y Acabados de Archivo */}
      <section className="py-24 md:py-36 bg-ivory border-t border-border-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.35em] text-sage font-bold block mb-3">
              Estándar de Archivo
            </span>
            <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light">
              Un anuario con calidad de <br />
              <span className="italic font-normal text-gold-dark">libro de colección.</span>
            </h2>
            <p className="text-sm text-text-muted font-light mt-4">
              Cada promoción es única. Nos encargamos de todo el proceso: desde la sesión de fotos hasta la diagramación, corrección de textos y la entrega de los libros impresos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 text-left">
            {FEATURES.map((item, i) => (
              <div key={i} className="p-8 bg-ivory-warm/40 border border-border-warm rounded-xs">
                <span className="text-xs font-serif text-sage font-bold block mb-3">
                  0{i + 1}
                </span>
                <h3 className="font-sans text-base text-espresso font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quotation CTA for Prom Committees */}
          <div className="p-10 md:p-14 bg-espresso text-ivory rounded-xs text-center border border-white/10 max-w-4xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold-light font-bold block mb-3">
              Comités de Promoción 2026 / 2027
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-ivory font-light mb-4">
              Solicita una muestra física o cotización para tu colegio
            </h3>
            <p className="text-sm text-ivory/70 font-light max-w-lg mx-auto mb-8">
              Podemos coordinar una visita al colegio o una reunión con la directiva de padres para presentar muestras reales de anuarios impresos.
            </p>
            <a
              href={whatsappAnuarioUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-gold inline-flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>COORDINAR CON GUSTAVO POR WHATSAPP</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
