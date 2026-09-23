/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { FAQ_ITEMS } from '../data/faq';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 md:py-44 bg-ivory">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Claridad & Condiciones"
          title="Preguntas"
          italicWord="Frecuentes"
          subtitle="Respuestas claras y detalladas a las consultas más habituales sobre nuestro servicio y proceso de trabajo."
        />

        <div className="divide-y divide-border-warm border-y border-border-warm">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="py-6 sm:py-7 transition-colors"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left flex items-center justify-between gap-4 focus-visible:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-semibold block mb-1">
                      {item.category}
                    </span>
                    {/* FAQ questions in Manrope font per typography guidelines */}
                    <h3 className="font-sans text-base sm:text-lg text-espresso font-normal group-hover:text-gold transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-border-warm flex items-center justify-center flex-shrink-0 text-gold group-hover:border-gold transition-colors duration-300">
                    {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pr-10">
                        <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
