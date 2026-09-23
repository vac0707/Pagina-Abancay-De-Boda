/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolio';

const FILTER_CATEGORIES = [
  { key: 'ALL', label: 'TODOS' },
  { key: 'BODAS', label: 'BODAS' },
  { key: 'PREBODAS', label: 'PREBODAS' },
  { key: 'ANUARIOS', label: 'ANUARIOS' },
  { key: 'SESIONES', label: 'SESIONES' },
  { key: 'EVENTOS', label: 'EVENTOS' }
];

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredItems = activeFilter === 'ALL'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="portafolio" className="py-24 md:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Galería & Estilo"
          title="Portafolio Editorial"
          subtitle="Una mirada visual a la luz, emoción y texturas que componen nuestra obra."
        />

        {/* Minimalist Filter Tabs */}
        <div className="flex justify-center mb-14 overflow-x-auto py-2 px-2 no-scrollbar">
          <div className="inline-flex items-center gap-2 sm:gap-4 p-1 border-b border-border-warm">
            {FILTER_CATEGORIES.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`pb-2 px-2 sm:px-3 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 relative ${
                    isActive
                      ? 'text-espresso font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gold'
                      : 'text-text-muted hover:text-espresso'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Asymmetric Masonry-style Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              // Asymmetric span assignments for magazine layout rhythm
              const isLarge = index % 5 === 0 || index % 5 === 3;
              const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={`${colSpan} group relative overflow-hidden bg-espresso rounded-xs shadow-md`}
                >
                  <div className={`relative w-full ${
                    item.aspect === 'vertical' 
                      ? 'aspect-[3/4]' 
                      : item.aspect === 'horizontal' 
                      ? 'aspect-[16/10]' 
                      : 'aspect-square'
                  }`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Meta info revealed on hover / subtle on mobile */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-1">
                        <span>{item.categoryLabel}</span>
                        <span>{item.year}</span>
                      </div>
                      <h4 className="font-editorial-serif text-xl sm:text-2xl text-ivory font-light">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ivory/70 font-light mt-0.5">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
