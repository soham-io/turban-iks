import { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, UserRound } from 'lucide-react';

export function AboutAuthorPage() {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <div className="min-h-full bg-[#F6F1E7] px-5 pb-20 pt-28 text-[#1B1B1B] sm:px-8 sm:pt-36">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-[#1B1B1B]/12 pb-6 sm:mb-14 sm:pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#641F2B]">
            The person behind the archive
          </p>
          <h1 className="font-editorial text-4xl leading-tight sm:text-5xl lg:text-6xl">
            About Author
          </h1>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              className="arch-frame relative mx-auto flex aspect-[4/5] max-h-[620px] w-full max-w-md items-center justify-center overflow-hidden border border-[#641F2B]/15 bg-gradient-to-br from-[#EBE3D3] via-[#DCC9A6]/45 to-[#EBE3D3]"
              role={imageUnavailable ? 'img' : undefined}
              aria-label={imageUnavailable ? 'Profile image placeholder for Soham Patel' : undefined}
            >
              {!imageUnavailable ? (
                <img
                  src="/images/soham-patel.jpg"
                  alt="Soham Patel"
                  className="h-full w-full object-cover"
                  onError={() => setImageUnavailable(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-5 px-6 text-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#641F2B]/25 bg-[#F6F1E7]/70 text-[#641F2B] shadow-sm sm:h-40 sm:w-40">
                    <UserRound className="h-16 w-16 sm:h-20 sm:w-20" strokeWidth={1.2} />
                  </div>
                  <div>
                    <p className="font-editorial text-2xl text-[#1B1B1B]">Soham Patel</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#641F2B]/75">
                      Photograph coming soon
                    </p>
                  </div>
                </div>
              )}
              <span className="pointer-events-none absolute inset-4 border border-[#F6F1E7]/55" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B75E40]">
              Creator &amp; Developer
            </p>
            <h2 className="font-editorial text-4xl leading-tight sm:text-5xl">
              Soham Patel
            </h2>
            <div className="h-px w-16 bg-[#B49A62]" />
            <p className="max-w-2xl text-base leading-relaxed text-[#1B1B1B]/75 sm:text-lg">
              I created and developed PAGDI — The Turban Museum of India as a digital space to
              explore, document, and celebrate the diverse turban traditions of India. This
              project brings together cultural stories, regional styles, and craft in one place.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-[#1B1B1B]/75">
              Connect with me or explore more of my work:
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/soham-io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soham Patel on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2.5 border border-[#1B1B1B]/20 bg-[#1B1B1B] px-5 py-3 text-sm font-medium text-[#F6F1E7] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#641F2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B75E40]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/soham-patel-0b7014446/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soham Patel on LinkedIn (opens in a new tab)"
                className="inline-flex items-center gap-2.5 border border-[#641F2B]/30 px-5 py-3 text-sm font-medium text-[#641F2B] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#641F2B] hover:text-[#F6F1E7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B75E40]"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
