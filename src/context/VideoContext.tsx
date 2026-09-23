/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { VideoModal } from '../components/VideoModal';

interface VideoContextType {
  playVideo: (youtubeId: string, title: string) => void;
  closeVideo: () => void;
  activeVideo: { youtubeId: string; title: string } | null;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState<{ youtubeId: string; title: string } | null>(null);

  const playVideo = (youtubeId: string, title: string) => {
    setActiveVideo({ youtubeId, title });
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <VideoContext.Provider value={{ playVideo, closeVideo, activeVideo }}>
      {children}
      <VideoModal
        isOpen={Boolean(activeVideo)}
        onClose={closeVideo}
        youtubeId={activeVideo?.youtubeId || null}
        title={activeVideo?.title}
      />
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
