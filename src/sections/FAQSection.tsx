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
    <section id="faq" className="py-24 md:py-36 bg-ivory">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Claridad & Condiciones"
          title="Preguntas Frecuentes"
          subtitle="Respuestas claras y detalladas a las consultas más habituales sobre nuestro servicio y proceso de trabajo."
        />

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-border-warm rounded-xs overflow-hidden bg-ivory-warm/30 transition-colors"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-editorial-serif text-lg sm:text-xl text-espresso font-normal leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-border-warm flex items-center justify-center flex-shrink-0 text-gold transition-transform duration-300">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
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
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-border-warm/60">
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
