/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, Clock, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PACKAGE_CATEGORIES, PackageItem } from '../data/packages';
import { STUDIO_INFO } from '../data/studio';

export const PackageTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foto' | 'fotovideo' | 'fisica' | 'gold'>('fotovideo');

  const activeCategory = PACKAGE_CATEGORIES.find(c => c.key === activeTab) || PACKAGE_CATEGORIES[1];

  const getWhatsAppLink = (pkg: PackageItem) => {
    const text = encodeURIComponent(
      `Hola Gustavo, me interesa consultar disponibilidad para el ${pkg.title} (${pkg.price}) para mi evento.`
    );
    return `${STUDIO_INFO.whatsappUrl}?text=${text}`;
  };

  return (
    <div className="w-full">
      {/* Category Tabs Bar */}
      <div className="flex justify-center mb-10 overflow-x-auto py-2 px-2 no-scrollbar">
        <div className="inline-flex p-1.5 bg-ivory-warm/80 border border-border-warm rounded-full shadow-xs">
          {PACKAGE_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`relative px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-ivory bg-espresso shadow-md'
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
      <div className="text-center mb-10 max-w-xl mx-auto px-4">
        <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-1">
          {activeCategory.label}
        </p>
        <p className="text-sm text-text-muted font-light">
          {activeCategory.subtitle}
        </p>
      </div>

      {/* Packages Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {activeCategory.items.map((pkg) => {
            const isFeatured = pkg.highlight;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-sm transition-all duration-300 ${
                  isFeatured
                    ? 'bg-ivory-soft border-2 border-gold/60 shadow-xl ring-1 ring-gold/20'
                    : 'bg-ivory-warm/40 border border-border-warm hover:border-gold/40 hover:bg-ivory-soft'
                }`}
              >
                {/* Free Preboda or Highlight Kicker */}
                {pkg.prebodaFree && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                      <Sparkles size={11} /> Preboda Gratis
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-editorial-serif text-2xl md:text-3xl text-espresso font-light">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-text-muted tracking-wider bg-white/70 px-2.5 py-1 rounded-xs border border-border-warm">
                      <Clock size={12} className="text-gold" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {pkg.team && (
                    <p className="text-xs font-medium text-gold-dark mb-3 tracking-wide">
                      {pkg.team}
                    </p>
                  )}

                  {pkg.description && (
                    <p className="text-xs text-text-muted font-light leading-relaxed mb-4">
                      {pkg.description}
                    </p>
                  )}

                  {/* Price Block */}
                  <div className="my-6 pb-6 border-b border-border-warm">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-dim block mb-1">
                      Inversión
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-editorial-serif text-4xl sm:text-5xl text-espresso font-normal tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-text-muted uppercase tracking-wider font-light">
                        / {pkg.format}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-text-main/90 leading-relaxed font-light">
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-sage-light text-sage flex items-center justify-center">
                          <Check size={11} strokeWidth={2.5} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <a
                    href={getWhatsAppLink(pkg)}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3.5 px-5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xs ${
                      isFeatured
                        ? 'bg-espresso text-ivory hover:bg-black'
                        : 'bg-gold text-white hover:bg-gold-dark'
                    }`}
                  >
                    <MessageCircle size={15} />
                    <span>Consultar este paquete</span>
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
