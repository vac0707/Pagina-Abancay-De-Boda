/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PACKAGE_CATEGORIES, PackageItem } from '../data/packages';
import { STUDIO_INFO } from '../data/studio';

export const PackageTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foto' | 'fotovideo' | 'fisica' | 'gold'>('fotovideo');

  const activeCategory = PACKAGE_CATEGORIES.find(c => c.key === activeTab) || PACKAGE_CATEGORIES[1];

  const getWhatsAppLink = (pkg: PackageItem) => {
    const text = encodeURIComponent(
      `Hola Gustavo, me interesa consultar disponibilidad para el ${pkg.title} (${pkg.price}) para mi evento con Abancay De Boda.`
    );
    return `${STUDIO_INFO.whatsappUrl}?text=${text}`;
  };

  return (
    <div className="w-full">
      {/* Category Tabs Bar - Minimalist Editorial Filter */}
      <div className="flex justify-center mb-10 overflow-x-auto py-2 px-2 no-scrollbar">
        <div className="inline-flex gap-2 sm:gap-4 p-1 border-b border-border-warm">
          {PACKAGE_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`relative pb-3 px-3 sm:px-5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors ${
                  isActive
                    ? 'text-espresso after:content-[\'\'] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-gold'
                    : 'text-text-muted hover:text-espresso'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Subtitle */}
      <div className="text-center mb-14 max-w-xl mx-auto px-4">
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold font-semibold mb-1">
          {activeCategory.label}
        </p>
        <p className="text-sm text-text-muted font-light leading-relaxed">
          {activeCategory.subtitle}
        </p>
      </div>

      {/* Packages Grid - Editorial Spec Sheets (Fichas Editoriales) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {activeCategory.items.map((pkg) => {
            const isFeatured = pkg.highlight;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-xs transition-all duration-300 border ${
                  isFeatured
                    ? 'bg-ivory-warm/60 border-gold/40 shadow-xs'
                    : 'bg-ivory border-border-warm hover:border-gold/30'
                }`}
              >
                {/* Preboda Gratis / Highlight Kicker */}
                {pkg.prebodaFree && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.25em] uppercase text-gold">
                      <Sparkles size={11} /> Preboda de Cortesía Incluida
                    </span>
                  </div>
                )}

                {/* Header: Title + Duration */}
                <div>
                  <div className="flex items-baseline justify-between gap-4 pb-4">
                    <h4 className="font-sans text-xs sm:text-sm font-semibold text-espresso uppercase tracking-[0.2em]">
                      {pkg.title}
                    </h4>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-dim flex-shrink-0 font-medium">
                      {pkg.duration}
                    </span>
                  </div>

                  {pkg.team && (
                    <p className="text-[10px] font-medium text-gold-dark tracking-widest uppercase mb-4">
                      {pkg.team}
                    </p>
                  )}

                  {/* Prominent Price in Bodoni */}
                  <div className="my-4">
                    <span className="font-bodoni text-4xl sm:text-5xl text-espresso font-light tracking-tight block">
                      {pkg.price}
                    </span>
                    <span className="text-[10px] text-text-dim uppercase tracking-[0.2em] font-light mt-1 block">
                      {pkg.format}
                    </span>
                  </div>

                  {/* Thin Hairline Divider */}
                  <div className="h-[1px] w-full bg-border-warm my-6" />

                  {/* Features / Includes List */}
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-text-main font-light leading-relaxed">
                        <span className="text-gold mt-0.5 select-none font-sans text-xs">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Minimalist Editorial Action */}
                <div className="pt-4 border-t border-border-warm/60 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-dim font-medium">
                    {pkg.categoryKey === 'gold' ? 'Colección Gold' : 'Disponibilidad Limitada'}
                  </span>
                  <a
                    href={getWhatsAppLink(pkg)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-espresso hover:text-gold transition-colors group"
                  >
                    <span>Consultar</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
