import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { museumApi } from '../services/museumApi';
import type { HeritageStory } from '../types/museum';
import { MuseumImage } from '../components/MuseumImage';

export function StoriesPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [stories, setStories] = useState<HeritageStory[]>([]);
  const [activeStory, setActiveStory] = useState<HeritageStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    museumApi
      .getStories()
      .then((res) => {
        if (!active) return;
        setStories(res.stories);
        if (slug) {
          setActiveStory(
            res.stories.find((s) => s.slug === slug) || res.stories[0] || null
          );
        } else {
          setActiveStory(null);
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-96 bg-[#EBE3D3]/60 animate-pulse" />
      </div>
    );
  }

  // Single Essay Documentary Reader View (Pattern D: Asymmetric 70/30 reading canvas)
  if (slug && activeStory) {
    const otherStories = stories.filter((s) => s.slug !== activeStory.slug);
    return (
      <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B]">
        {/* Subtle top reading depth progress bar */}
        <div className="fixed top-16 left-0 right-0 h-0.5 bg-[#1B1B1B]/10 z-40">
          <div
            className="h-full bg-[#641F2B] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <article className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="pt-4">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1B1B1B]/65 hover:text-[#641F2B]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Heritage Stories
            </Link>
          </div>

          <header className="max-w-4xl space-y-4 pb-8 border-b border-[#1B1B1B]/15">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#641F2B] font-medium">
              <span className="uppercase tracking-[0.16em]">{activeStory.chapterNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{activeStory.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1B1B1B]/60">{activeStory.readTime}</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] text-[#1B1B1B] leading-[1.1]">
              {activeStory.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#1B1B1B]/75 leading-relaxed">
              {activeStory.subtitle}
            </p>
          </header>

          <div className="aspect-[16/9] bg-[#EBE3D3] border border-[#1B1B1B]/12 overflow-hidden">
            <MuseumImage
              src={activeStory.heroImage}
              alt={activeStory.title}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 70/30 Asymmetric Reading Layout with Margin Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-10">
              <p className="editorial-dropcap text-lg text-[#1B1B1B]/85 leading-[1.8]">
                {activeStory.excerpt}
              </p>

              {/* Pull Quote */}
              <blockquote className="py-8 my-4 border-y border-[#1B1B1B]/15 text-center">
                <p className="font-editorial italic text-2xl sm:text-3xl text-[#641F2B] leading-snug max-w-2xl mx-auto">
                  “{activeStory.pullQuote}”
                </p>
              </blockquote>

              {activeStory.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="font-editorial text-2xl sm:text-3xl text-[#1B1B1B]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base sm:text-[17px] text-[#1B1B1B]/80 leading-[1.8] max-w-prose"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Margin Curatorial Notes */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="p-6 bg-[#EBE3D3]/55 border border-[#1B1B1B]/12 space-y-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#641F2B] font-semibold">
                  Archival Margin Notes
                </p>
                {activeStory.marginNotes.map((note) => (
                  <div key={note.title} className="pt-4 border-t border-[#1B1B1B]/10 space-y-1.5">
                    <h3 className="font-editorial text-lg text-[#1B1B1B]">{note.title}</h3>
                    <p className="text-sm text-[#1B1B1B]/75 leading-relaxed">{note.body}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Further Reading */}
          {otherStories.length > 0 && (
            <section className="pt-12 border-t border-[#1B1B1B]/12 space-y-6">
              <h2 className="font-editorial text-2xl text-[#1B1B1B]">Continue Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherStories.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/stories/${s.slug}`}
                    className="group p-5 bg-[#EBE3D3]/45 border border-[#1B1B1B]/12 hover:border-[#641F2B] space-y-2 transition-colors"
                  >
                    <p className="text-xs text-[#641F2B] font-medium">
                      {s.chapterNumber} · {s.readTime}
                    </p>
                    <h3 className="font-editorial text-xl text-[#1B1B1B] group-hover:text-[#641F2B]">
                      {s.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    );
  }

  // Editorial Stories Index (Pattern C: Lead Feature + Secondary Essays)
  const leadStory = stories[0];
  const secondaryStories = stories.slice(1);

  return (
    <div className="pt-24 pb-24 bg-[#F6F1E7] text-[#1B1B1B]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
        <header className="pt-6 pb-8 border-b border-[#1B1B1B]/12 max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#641F2B] font-semibold">
            Documentary Essays
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1B1B1B]">
            Heritage Stories
          </h1>
          <p className="text-base text-[#1B1B1B]/75 leading-relaxed">
            Long-form archival essays exploring how climate, faith, natural dyeing, and human
            hands shaped India’s living turban heritage.
          </p>
        </header>

        {leadStory && (
          <Link
            to={`/stories/${leadStory.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#EBE3D3]/50 border border-[#1B1B1B]/12 hover:border-[#641F2B] transition-colors"
          >
            <div className="lg:col-span-7 bg-[#EBE3D3] overflow-hidden">
              <MuseumImage
                src={leadStory.heroImage}
                alt={leadStory.title}
                loading="eager"
                className="w-full h-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#641F2B] font-medium">
                  <span>{leadStory.chapterNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadStory.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1B1B1B]/60">{leadStory.readTime}</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#1B1B1B] group-hover:text-[#641F2B] transition-colors">
                  {leadStory.title}
                </h2>
                <p className="text-sm sm:text-base text-[#1B1B1B]/75 leading-relaxed">
                  {leadStory.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#641F2B]">
                Read Documentary Essay
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {secondaryStories.map((story) => (
            <Link
              key={story.slug}
              to={`/stories/${story.slug}`}
              className="group bg-[#F6F1E7] border border-[#1B1B1B]/12 hover:border-[#641F2B] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-[#EBE3D3] overflow-hidden">
                  <MuseumImage
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#641F2B]">
                    <span>{story.chapterNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1B1B1B]/60">{story.readTime}</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1B1B1B] group-hover:text-[#641F2B]">
                    {story.title}
                  </h3>
                  <p className="text-sm text-[#1B1B1B]/75 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[#1B1B1B]/10 text-xs font-semibold uppercase tracking-[0.12em] text-[#641F2B] flex items-center justify-between">
                <span>Read Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
