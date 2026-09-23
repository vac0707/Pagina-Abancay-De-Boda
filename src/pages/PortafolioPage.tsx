/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolio';

const FILTER_CATEGORIES = [
  { key: 'ALL', label: 'TODOS' },
  { key: 'BODAS', label: 'BODAS' },
  { key: 'QUINCEAÑOS', label: 'QUINCEAÑOS' },
  { key: 'CUMPLEAÑOS', label: 'CUMPLEAÑOS' },
  { key: '50-ANOS', label: '50 AÑOS' },
  { key: 'BAUTIZOS', label: 'BAUTIZOS' },
  { key: 'ANUARIOS', label: 'ANUARIOS' },
  { key: 'SESIONES', label: 'SESIONES' },
  { key: 'EVENTOS', label: 'EVENTOS' }
];

export const PortafolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredItems = activeFilter === 'ALL'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  const getItemLayout = (index: number) => {
    const cycle = index % 6;
    switch (cycle) {
      case 0:
        return { colSpan: 'lg:col-span-5', aspect: 'aspect-[3/4]', offset: 'lg:pt-6' };
      case 1:
        return { colSpan: 'lg:col-span-7', aspect: 'aspect-[16/10]', offset: '' };
      case 2:
        return { colSpan: 'lg:col-span-4', aspect: 'aspect-[4/5]', offset: 'lg:pt-10' };
      case 3:
        return { colSpan: 'lg:col-span-8', aspect: 'aspect-[16/9]', offset: '' };
      case 4:
        return { colSpan: 'lg:col-span-7', aspect: 'aspect-[16/10]', offset: '' };
      case 5:
      default:
        return { colSpan: 'lg:col-span-5', aspect: 'aspect-[3/4]', offset: 'lg:-mt-6' };
    }
  };

  return (
    <div className="w-full pt-20 pb-28 md:pb-44 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading
          eyebrow="Galería & Obra Completa"
          title="Portafolio"
          italicWord="Editorial"
          subtitle="Una mirada integral a las bodas, quinceaños, celebraciones familiares y proyectos de archivo documentados por Abancay De Boda."
        />

        {/* Dynamic Category Filter Tabs */}
        <div className="flex justify-center mb-20 overflow-x-auto py-2 px-2 no-scrollbar">
          <div className="inline-flex items-center gap-3 sm:gap-6 border-b border-border-warm pb-3">
            {FILTER_CATEGORIES.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors relative cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-espresso font-bold' : 'text-text-muted hover:text-espresso'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="portfolioFilterUnderline"
                      className="absolute -bottom-3 left-0 right-0 h-[2px] bg-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Photographic Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const layout = getItemLayout(index);
              const targetUrl = item.storySlug ? `/historias/${item.storySlug}` : '#';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={`${layout.colSpan} ${layout.offset} group relative overflow-hidden bg-espresso rounded-xs shadow-xs border border-border-warm/50`}
                >
                  <div className={`relative w-full ${layout.aspect} overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 filter brightness-[0.95] group-hover:brightness-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
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

                        {item.storySlug ? (
                          <Link
                            to={targetUrl}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-light hover:underline"
                          >
                            <span>Ver historia</span> <ArrowUpRight size={12} />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-light">
                            <span>Abancay De Boda</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};
