import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Turban } from '../types/museum';
import { MuseumImage } from './MuseumImage';

interface TurbanCardProps {
  turban: Turban;
}

export function TurbanCard({ turban }: TurbanCardProps) {
  return (
    <article className="group flex flex-col bg-[#F6F1E7] border border-[#1B1B1B]/12 hover:border-[#641F2B]/45 transition-colors duration-200">
      <Link to={`/turbans/${turban.id}`} className="block overflow-hidden bg-[#EBE3D3]">
        <div className="aspect-[4/3] overflow-hidden">
          <MuseumImage
            src={turban.image}
            alt={`${turban.name} from ${turban.region}`}
            fallbackTitle={turban.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-2.5">
          {/* Clean unboxed metadata with typographic separators (zero-pill discipline) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#1B1B1B]/60">
            <span className="font-mono tabular-nums tracking-wider uppercase text-[11px]">
              {turban.accessionNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span>{turban.region}</span>
            <span aria-hidden="true">·</span>
            <span>{turban.classification}</span>
          </div>

          <Link to={`/turbans/${turban.id}`} className="block">
            <h3 className="font-editorial text-2xl text-[#1B1B1B] group-hover:text-[#641F2B] transition-colors">
              {turban.name}
            </h3>
          </Link>

          <p className="text-sm text-[#1B1B1B]/75 leading-relaxed line-clamp-2">
            {turban.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-[#1B1B1B]/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#1B1B1B]/65">
            <div className="flex items-center gap-1" aria-label={`Colours: ${turban.colors.join(', ')}`}>
              {turban.colorHexes.slice(0, 3).map((hex) => (
                <span
                  key={hex}
                  className="w-2.5 h-2.5 rounded-full border border-[#1B1B1B]/20"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <span>{turban.difficulty}</span>
          </div>

          <Link
            to={`/turbans/${turban.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#641F2B] hover:text-[#B75E40] whitespace-nowrap shrink-0 transition-colors"
          >
            Inspect Artifact
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
