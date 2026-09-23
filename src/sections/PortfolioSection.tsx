/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { PORTFOLIO_ITEMS } from '../data/portfolio';

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

  // Dynamic asymmetric composition layout mapper to create photographic magazine pacing
  const getItemLayout = (index: number) => {
    const cycle = index % 6;
    switch (cycle) {
      case 0:
        return {
          colSpan: 'lg:col-span-5',
          aspect: 'aspect-[3/4]',
          offset: 'lg:pt-6'
        };
      case 1:
        return {
          colSpan: 'lg:col-span-7',
          aspect: 'aspect-[16/10]',
          offset: ''
        };
      case 2:
        return {
          colSpan: 'lg:col-span-4',
          aspect: 'aspect-[4/5]',
          offset: 'lg:pt-12'
        };
      case 3:
        return {
          colSpan: 'lg:col-span-8',
          aspect: 'aspect-[16/9]',
          offset: ''
        };
      case 4:
        return {
          colSpan: 'lg:col-span-7',
          aspect: 'aspect-[16/10]',
          offset: ''
        };
      case 5:
      default:
        return {
          colSpan: 'lg:col-span-5',
          aspect: 'aspect-[3/4]',
          offset: 'lg:-mt-8'
        };
    }
  };

  return (
    <section id="portafolio" className="py-28 md:py-44 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Galería & Obra"
          title="Portafolio"
          italicWord="Visual"
          subtitle="Una inmersión pura en la luz, los gestos y la atmósfera que definen nuestra mirada."
        />

        {/* Minimalist Filter Tabs */}
        <div className="flex justify-center mb-20 overflow-x-auto py-2 px-2 no-scrollbar">
          <div className="inline-flex items-center gap-5 sm:gap-8 border-b border-border-warm pb-3">
            {FILTER_CATEGORIES.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors relative ${
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

        {/* Magazine-style Asymmetric Photographic Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const layout = getItemLayout(index);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  className={`${layout.colSpan} ${layout.offset} group relative overflow-hidden bg-espresso rounded-xs cursor-pointer shadow-xs`}
                >
                  <div className={`relative w-full ${layout.aspect} overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 filter brightness-[0.95] group-hover:brightness-100"
                    />

                    {/* Gradient Reveal on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Minimalist Hover Content: Categoría, Título, Ubicación, Año, Ver historia → */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light font-semibold mb-1">
                        {item.categoryLabel}
                      </span>
                      
                      <h4 className="font-bodoni text-2xl sm:text-3xl text-ivory font-light mb-1">
                        {item.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-ivory/70 pt-2 border-t border-white/10 mt-3 font-light">
                        <span className="uppercase tracking-wider text-[10px]">
                          {item.location} · {item.year}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-light">
                          Ver historia <ArrowUpRight size={12} />
                        </span>
                      </div>
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
