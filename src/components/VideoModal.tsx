/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId: string | null;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  youtubeId,
  title
}) => {
  // ESC key handler and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && youtubeId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-4xl bg-espresso-surface border border-gold/30 shadow-2xl overflow-hidden rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-warm bg-espresso text-ivory">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="font-editorial-serif text-lg tracking-wide text-ivory">
                  {title || 'Film Cinematográfico'}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar video"
                className="p-1.5 text-ivory/70 hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <X size={20} />
              </button>
            </div>

            {/* 16:9 Video Container */}
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={title || "Video de Abancay De Boda"}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
