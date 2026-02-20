"use client";

import React from 'react';

interface VideoProps {
  src: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: 'auto' | 'metadata' | 'none';
}

const Video: React.FC<VideoProps> = ({
  src,
  title = "Video",
  className = "",
  autoplay = true,
  controls = true,
  loop = false,
  muted = true,
  poster = "./media/media.png",
  preload = "metadata",
}) => {
  // Detectar el tipo de video basado en la extensión
  const getVideoType = (url: string): string => {
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg') || url.endsWith('.ogv')) return 'video/ogg';
    return 'video/mp4'; // Por defecto mp4
  };

  return (
    <div className={`w-full max-w-5xl px-4 md:px-0 my-0 ${className}`}>
      <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          className="w-full h-auto"
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          title={title}
          poster={poster}
          preload={preload}
          playsInline
        >
          <source src={src} type={getVideoType(src)} />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

export default Video;
