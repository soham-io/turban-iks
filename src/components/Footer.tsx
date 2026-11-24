import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-[#F6F1E7] border-t border-[#DCC9A6]/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F6F1E7]/12">
          <div className="md:col-span-5 space-y-4">
            <div className="font-editorial text-2xl tracking-[0.14em] uppercase text-[#F6F1E7]">
              PAGDI
            </div>
            <p className="text-sm text-[#DCC9A6] font-editorial italic">
              An archive of identity. A celebration of heritage.
            </p>
            <p className="text-sm text-[#F6F1E7]/70 max-w-md leading-relaxed">
              The Turban Museum of India is a digital cultural archive dedicated to documenting
              regional turban traditions, preserving handloom and tying craft, and inviting a new
              generation to wear living heritage with pride.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#DCC9A6]">
              Exhibitions
            </h3>
            <ul className="space-y-2 text-sm text-[#F6F1E7]/75">
              <li>
                <Link to="/museum" className="hover:text-[#F6F1E7] transition-colors">
                  The Museum
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#F6F1E7] transition-colors">
                  Turban Explorer
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#F6F1E7] transition-colors">
                  Cultural Map of India
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#F6F1E7] transition-colors">
                  Archival Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#DCC9A6]">
              Experiences
            </h3>
            <ul className="space-y-2 text-sm text-[#F6F1E7]/75">
              <li>
                <Link to="/try-on" className="hover:text-[#F6F1E7] transition-colors">
                  Virtual Try-On Studio
                </Link>
              </li>
              <li>
                <Link to="/occasions" className="hover:text-[#F6F1E7] transition-colors">
                  Turban For Your Occasion
                </Link>
              </li>
              <li>
                <Link to="/craft" className="hover:text-[#F6F1E7] transition-colors">
                  The Art of Tying
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-[#F6F1E7] transition-colors">
                  Heritage Stories
                </Link>
              </li>
              <li>
                <Link to="/film" className="hover:text-[#F6F1E7] transition-colors">
                  Short Film: A Legacy Woven in Cloth
                </Link>
              </li>
              <li>
                <Link to="/about-author" className="hover:text-[#F6F1E7] transition-colors">
                  About Author
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F6F1E7]/55">
          <p>
            PAGDI — The Turban Museum of India · Presented for cultural preservation &amp; education
          </p>
          <p className="font-editorial italic text-[#DCC9A6]/85">
            Tradition isn’t meant to stay in photographs. It’s meant to be worn.
          </p>
        </div>
      </div>
    </footer>
  );
}
