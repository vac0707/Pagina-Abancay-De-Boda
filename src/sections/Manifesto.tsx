/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STUDIO_INFO } from '../data/studio';

export const Manifesto: React.FC = () => {
  return (
    <section className="relative py-24 md:py-36 bg-ivory-warm/30 border-y border-border-warm">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.35em] text-gold block mb-6">
          Manifiesto Editorial
        </span>

        <p className="font-bodoni text-2xl sm:text-3xl md:text-4xl text-espresso font-light italic leading-snug mb-8">
          "{STUDIO_INFO.manifesto.lead}"
        </p>

        <div className="w-16 h-[1px] bg-gold/50 mx-auto mb-8" />

        <p className="text-sm md:text-base text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
          {STUDIO_INFO.manifesto.body}
        </p>

        <div className="mt-12 pt-8 border-t border-border-warm inline-flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-espresso font-semibold">
            {STUDIO_INFO.name}
          </span>
          <span className="text-gold">·</span>
          <span className="text-xs text-text-muted font-light">
            Dirigido por {STUDIO_INFO.owner}
          </span>
        </div>

      </div>
    </section>
  );
};
