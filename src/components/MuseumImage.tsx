import { useState } from 'react';

interface MuseumImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export function MuseumImage({
  src,
  alt,
  className = '',
  aspectClassName = '',
  loading = 'lazy',
  fallbackTitle,
}: MuseumImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#EBE3D3] via-[#DCC9A6]/50 to-[#EBE3D3] text-[#1B1B1B]/65 p-6 text-center ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="mb-3 text-[#641F2B]/60"
          aria-hidden="true"
        >
          <path
            d="M6 26C6 16.5 12.5 10 20 10C27.5 10 34 16.5 34 26"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9 24C14 19 26 19 31 24"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 29H32"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <span className="font-editorial text-sm text-[#1B1B1B]/80">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
