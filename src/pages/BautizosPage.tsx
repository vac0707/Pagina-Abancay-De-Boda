/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Heart, MessageCircle, Check, Camera, Film, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { STUDIO_INFO } from '../data/studio';

export const BautizosPage: React.FC = () => {
  const whatsappUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad para la cobertura fotográfica de un Bautizo en Abancay.'
  )}`;

  const RITUAL_MOMENTS = [
    {
      title: 'La Sagrada Pila Bautismal',
      desc: 'El agua bendita sobre la frente del niño, la unción con el santo óleo y el cirio encendido. Cada detalle sacramental registrado con solemnidad y sin perturbar el rito litúrgico.'
    },
    {
      title: 'Padres & Padrinos',
      desc: 'La mirada protectora de los padres y el compromiso de fe de los padrinos en retratos formales llenos de luz suave frente al altar de la iglesia.'
    },
    {
      title: 'Retrato de Autor del Bebé',
      desc: 'Fotografías íntimas de su ropón, sus manitas, sus gestos espontáneos y su sonrisa con iluminación natural cuidada.'
    },
    {
      title: 'Recepción & Compartir Familiar',
      desc: 'La fiesta o almuerzo íntimo con la familia: mesa decorada, recuerdos, brindis de bendición y abrazos de los abuelos.'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* 01: Luminous, Delicate & Soft Hero */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-ivory text-espresso border-b border-border-warm">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1920"
            alt="Bautizo por Abancay De Boda"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/70 to-ivory/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gold-dark font-semibold mb-4 px-3 py-1 bg-white/80 rounded-xs border border-border-warm shadow-xs">
            <Sun size={13} className="text-gold" />
            <span>SACRAMENTO & FAMILIA · ABANCAY</span>
          </span>

          <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-espresso tracking-tight leading-[1.15] mb-6">
            La luz de un inicio, <br />
            <span className="italic font-normal text-gold-dark">bendecido en familia.</span>
          </h1>

          <p className="text-sm sm:text-base text-text-muted font-light max-w-xl mx-auto leading-relaxed mb-8">
            Fotografía delicada, luminosa y atenta para acompañar el primer gran sacramento de tu hijo en las iglesias y capillas de Abancay.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>CONSULTAR FECHA DE BAUTIZO</span>
          </a>
        </div>
      </section>

      {/* 02: Enfoque Luminoso & Respetuoso */}
      <section className="py-24 md:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
                Cuidado Sacramental
              </span>
              <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
                Discreción absoluta dentro del templo.
              </h2>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Entendemos que el bautismo es un sacramento sagrado. Trabajamos con ópticas de largo alcance y sin ruidos molestos para no alterar la devoción del sacerdote ni la tranquilidad del bebé.
              </p>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Priorizamos la luz pura, los tonos blancos, marfil y la calidez natural de la piedra del templo, logrando un recuerdo de paz inmutable.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-6 border-t border-border-warm">
                <div className="flex items-start gap-3">
                  <Camera size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Luz Natural & Suave</h4>
                    <p className="text-[11px] text-text-muted font-light mt-0.5">Sin destellos invasivos sobre el bebé.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Film size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-espresso tracking-wider">Video de la Ceremonia</h4>
                    <p className="text-[11px] text-text-muted font-light mt-0.5">Captura sonora de la bendición y cánticos.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 aspect-[4/5] overflow-hidden rounded-xs bg-white shadow-md border border-border-warm">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900"
                alt="Detalle de bautizo en familia"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>

          {/* 03: Momentos del Rito */}
          <div className="mb-24">
            <SectionHeading
              eyebrow="Ceremonia & Familia"
              title="Momentos que"
              italicWord="Registramos"
              subtitle="Una cobertura pausada y dedicada a documentar cada detalle de esta jornada tan especial."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {RITUAL_MOMENTS.map((item, i) => (
                <div key={i} className="p-8 bg-white border border-border-warm rounded-xs shadow-2xs">
                  <span className="text-xs font-serif text-gold-dark block mb-2 font-bold">
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
          </div>

          {/* 04: Caja de Consulta Bautizo */}
          <div className="p-10 md:p-14 bg-white border border-border-warm rounded-xs shadow-md text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-3">
              Reserva de Bautizo
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-espresso font-light mb-4">
              Consúltanos por la fecha de tu bautizo
            </h3>
            <p className="text-xs sm:text-sm text-text-muted font-light max-w-md mx-auto mb-8">
              Indícanos la parroquia o iglesia en Abancay y la fecha estimada de la ceremonia para reservar la agenda.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-gold inline-flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>CONSULTAR POR WHATSAPP</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
