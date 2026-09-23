/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
    <section id="portafolio" className="py-28 md:py-40 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Galería & Obra"
          title="Portafolio"
          italicWord="Visual"
          subtitle="Una inmersión pura en la luz, los gestos y la atmósfera que definen nuestra mirada."
        />

        {/* Minimalist Filter Tabs */}
        <div className="flex justify-center mb-16 overflow-x-auto py-2 px-2 no-scrollbar">
          <div className="inline-flex items-center gap-4 sm:gap-6 border-b border-border-warm pb-3">
            {FILTER_CATEGORIES.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 relative ${
                    isActive
                      ? 'text-espresso font-bold'
                      : 'text-text-muted hover:text-espresso'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className="absolute -bottom-3 left-0 right-0 h-[2px] bg-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 80% Photography Editorial Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-7 items-start"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              // Asymmetric span assignments for rich editorial rhythm
              const isTwoCols = index % 5 === 0 || index % 5 === 3;
              const colSpan = isTwoCols ? 'lg:col-span-7' : 'lg:col-span-5';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={`${colSpan} group relative overflow-hidden bg-espresso rounded-xs shadow-md border border-border-warm cursor-pointer`}
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
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.93] group-hover:brightness-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top right discover pill */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-ivory font-semibold rounded-xs border border-white/10">
                        DESCUBRIR <ArrowUpRight size={11} />
                      </span>
                    </div>

                    {/* Meta info revealed on hover / readable on mobile */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-1">
                        <span>{item.categoryLabel}</span>
                        <span>{item.year}</span>
                      </div>
                      <h4 className="font-bodoni text-xl sm:text-2xl text-ivory font-light">
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
