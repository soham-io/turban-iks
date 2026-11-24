import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 360);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to Top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      className={`fixed right-5 bottom-5 sm:right-8 sm:bottom-8 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#DCC9A6]/70 bg-[#641F2B] text-[#F6F1E7] shadow-lg transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:bg-[#4E1620] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B75E40] ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
