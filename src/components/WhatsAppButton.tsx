/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/studio';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultUrl = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    'Hola Gustavo, deseo consultar disponibilidad y paquetes con Abancay De Boda.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip on desktop */}
      <div
        className={`hidden md:block transition-all duration-300 pointer-events-none bg-espresso text-ivory text-xs px-3.5 py-2 rounded-xs border border-gold/30 shadow-lg tracking-wide ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="font-editorial-serif italic text-gold">¿Tienes preguntas?</span> Escríbenos directamente
      </div>

      <a
        href={defaultUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-white/20 focus-visible:outline-none"
      >
        <MessageCircle size={28} className="fill-current" />
      </a>
    </div>
  );
};
