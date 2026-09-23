/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Film, Sparkles, MessageCircle, Heart, Check, Clock, ArrowUpRight } from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { VideoPreview } from '../components/VideoPreview';
import { SectionHeading } from '../components/SectionHeading';
import { STUDIO_INFO } from '../data/studio';
import { VIDEOS } from '../data/videos';

export const QuinceanosPage: React.FC = () => {
  const { playVideo } = useVideo();
  const sampleVideo = VIDEOS.bodas[0]; // Provisional real video link

  const whatsappQuinceUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad y paquetes para la fiesta y sesión de Quince Años en Abancay.'
  )}`;

  const COVERAGE_STAGES = [
    {
      step: '01',
      title: 'Sesión Editorial Previa',
      subtitle: 'Exteriores al atardecer',
      desc: 'Una sesión fotográfica relajada antes del gran día con cambios de vestuario en locaciones naturales de Abancay para crear el cuadro de firmas y reels previos.'
    },
    {
      step: '02',
      title: 'Preparativos & Maquillaje',
      subtitle: 'Getting Ready íntimo',
      desc: 'Detalles del vestido, corona, zapatillas, maquillaje y los abrazos emotivos con padres y hermanos antes de partir.'
    },
    {
      step: '03',
      title: 'Ceremonia & Llegada',
      subtitle: 'Ingreso triunfal',
      desc: 'Misa de acción de gracias o recepción formal con cobertura documental y retratos familiares protocolares.'
    },
    {
      step: '04',
      title: 'Vals, Brindis & Fiesta',
      subtitle: 'El clímax de la noche',
      desc: 'El emotivo vals con el padre, coreografías con chambelanes, el cambio de zapatilla, brindis de honor y la fiesta en pista.'
    }
  ];

  const QUINCE_DELIVERABLES = [
    'Sesión de fotos previa en exteriores con 2 a 3 cambios de vestuario',
    'Cuadro de firmas en bastidor de madera o metacrilato para la recepción',
    'Cobertura fotográfica completa con iluminación de estudio móvil',
    'Film cinematográfico resumen y Reels de alto impacto para redes',
    'Galería online privada en alta definición para compartir con invitados',
    'Álbum fotográfico empastado en lino o acabado tacto seda indeleble'
  ];

  const QUINCE_FAQS = [
    {
      q: '¿Con cuánta anticipación debemos reservar la fecha?',
      a: 'Recomendamos separar la fecha con al menos 3 a 6 meses de anticipación, especialmente para sábados de temporada alta en Abancay.'
    },
    {
      q: '¿La sesión previa incluye asesoría de posado y vestuario?',
      a: 'Sí, Gustavo Farfan orienta en todo momento el posado, iluminación y selección de locaciones para que la quinceañera se sienta cómoda, segura y natural.'
    },
    {
      q: '¿Hacen entregas de reels y videos para TikTok e Instagram?',
      a: 'Totalmente. Editamos reels dinámicos con música en tendencia y corrección de color cinematográfica listos para compartir.'
    }
  ];

  return (
    <div className="w-full">
      {/* 01: Distinctive Editorial Entrance Cover for Quinceaños */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920"
            alt="Quinceaños por Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-105 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-blush-light font-semibold mb-4 px-3 py-1 bg-blush/20 rounded-xs border border-blush/30">
            <Heart size={12} className="text-gold" />
            <span>QUINCEAÑOS DE AUTOR · ABANCAY</span>
          </span>

          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory tracking-tight leading-[1.15] mb-6">
            Una etapa que solo <br />
            <span className="italic font-normal text-gold-light">ocurre una vez.</span>
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Fotografía editorial, retrato de autor y cinematografía contemporánea para celebrar tus quince años con elegancia, frescura y autenticidad.
          </p>

          <a
            href="#cobertura-quince"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <span>DESCUBRIR PROPUESTA DE 15 AÑOS</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* 02: Filosofía & Retrato Editorial */}
      <section id="cobertura-quince" className="py-24 md:py-40 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
                Retrato de Autor
              </span>
              <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-snug">
                Más que poses rígidas: tu verdadera personalidad en cada cuadro.
              </h2>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Dejamos atrás la fotografía de quinceañera acartonada. Nuestra mirada es fresca, moderna y editorial. Guiamos a la quinceañera para que se sienta como en una sesión de revista de moda, capturando su juventud, su estilo y la complicidad de su familia.
              </p>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Utilizamos cámaras de cine con ópticas prime, estabilizadores de movimiento y revelado digital en tonos cálidos y naturales.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-border-warm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xs bg-ivory-warm text-gold">
                    <Camera size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Fotografía Editorial</h4>
                    <p className="text-[11px] text-text-muted font-light mt-0.5">Retoque natural sin excesos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xs bg-ivory-warm text-gold">
                    <Film size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Film & Reels</h4>
                    <p className="text-[11px] text-text-muted font-light mt-0.5">Video cinematográfico y formato vertical.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asymmetric Photographic Duo */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-xs bg-espresso shadow-md border border-border-warm">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                  alt="Sesión de 15 años editorial"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-xs bg-espresso shadow-md border border-border-warm mt-8">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
                  alt="Fiesta de quinceañera y vals"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* 03: Fases de la Cobertura */}
          <div className="mb-28">
            <SectionHeading
              eyebrow="Cronología & Cobertura"
              title="Momentos de tus"
              italicWord="Quince Años"
              subtitle="Acompañamos cada hito de tu celebración con discreción, calidez y el estándar técnico más riguroso."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {COVERAGE_STAGES.map((stage) => (
                <div key={stage.step} className="p-8 bg-ivory-warm/30 border border-border-warm rounded-xs">
                  <span className="font-bodoni text-3xl text-gold/60 font-light block mb-2">
                    {stage.step}
                  </span>
                  <h3 className="font-sans text-lg text-espresso font-medium tracking-tight mb-1">
                    {stage.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium block mb-3">
                    {stage.subtitle}
                  </span>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 04: Lo que Incluye Nuestra Propuesta */}
          <div className="p-8 sm:p-12 lg:p-14 bg-espresso text-ivory rounded-xs shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-bold">
                  Entregas de Archivo
                </span>
                <h3 className="font-bodoni text-3xl sm:text-4xl text-ivory font-light leading-tight">
                  Diseñado para conservar este recuerdo toda la vida
                </h3>
                <p className="text-sm text-ivory/80 font-light leading-relaxed">
                  Adaptamos la cobertura a la magnitud de tu fiesta: desde coberturas esenciales de 4 a 6 horas hasta el plan de gala completo con 2 fotógrafos, dron y videógrafo.
                </p>

                <ul className="space-y-3 pt-2">
                  {QUINCE_DELIVERABLES.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-ivory/90 font-light">
                      <div className="w-4 h-4 rounded-full bg-gold/30 flex items-center justify-center text-gold-light flex-shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={2.5} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <a
                    href={whatsappQuinceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-editorial-gold"
                  >
                    <MessageCircle size={15} />
                    <span>CONSULTAR DISPONIBILIDAD PARA QUINCEAÑOS</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <VideoPreview
                  video={sampleVideo}
                  onPlay={playVideo}
                  aspect="16:9"
                  className="border-white/10"
                />
              </div>
            </div>
          </div>

          {/* 05: Testimonio de Quinceañera */}
          <div className="mt-28 max-w-4xl mx-auto text-center">
            <span className="font-bodoni text-6xl text-gold/40 block leading-none select-none mb-3">
              “
            </span>
            <p className="font-bodoni text-2xl sm:text-3xl text-espresso font-light italic leading-relaxed mb-6">
              "Gustavo me hizo sentir súper tranquila en la sesión de fotos, no me sentí nerviosa ni fingida. Mi cuadro de firmas y el video de mi fiesta quedaron increíbles, a todos mis amigos les encantó."
            </p>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-espresso font-semibold block">
              Luciana & Familia Mendoza
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold-dark mt-1 block">
              Quince Años · Abancay
            </span>
          </div>

          {/* 06: Preguntas Frecuentes */}
          <div className="mt-28 max-w-4xl mx-auto text-left">
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block mb-2">
                Dudas Comunes
              </span>
              <h3 className="font-bodoni text-2xl sm:text-3xl text-espresso font-light">
                Preguntas sobre Quinceaños
              </h3>
            </div>

            <div className="divide-y divide-border-warm border-y border-border-warm">
              {QUINCE_FAQS.map((faq, i) => (
                <div key={i} className="py-6">
                  <h4 className="font-sans text-base text-espresso font-medium mb-1">
                    {faq.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
