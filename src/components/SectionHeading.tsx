/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  darkTheme?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicWord,
  subtitle,
  align = 'center',
  darkTheme = false,
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`relative mb-14 md:mb-20 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {eyebrow && (
        <span 
          className={`block text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.35em] mb-3 ${
            darkTheme ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2 
        className={`font-bodoni text-section-fluid font-light tracking-tight leading-[1.12] ${
          darkTheme ? 'text-ivory' : 'text-espresso'
        }`}
      >
        {title}{' '}
        {italicWord && (
          <span className="italic font-normal text-gold-light">{italicWord}</span>
        )}
      </h2>

      {subtitle && (
        <p 
          className={`mt-4 text-sm md:text-base font-light leading-relaxed ${
            darkTheme ? 'text-ivory/70' : 'text-text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}

      <div 
        className={`mt-6 h-[1px] w-12 bg-gold/50 ${isCenter ? 'mx-auto' : ''}`} 
      />
    </div>
  );
};
