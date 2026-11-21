import type {
  GalleryExhibitItem,
  HeritageStory,
  OccasionRecommendation,
  RegionProfile,
  Turban,
} from '../types/museum';

export interface TurbanFilterParams {
  region?: string;
  occasion?: string;
  color?: string;
  style?: string;
  fabric?: string;
  difficulty?: string;
  q?: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${url}`);
  }
  return res.json() as Promise<T>;
}

export const museumApi = {
  getTurbans(params: TurbanFilterParams = {}): Promise<{ count: number; turbans: Turban[] }> {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val && val !== 'All') {
        sp.set(key, val);
      }
    });
    const qs = sp.toString();
    return fetchJson(`/api/turbans${qs ? `?${qs}` : ''}`);
  },

  getTurbanById(id: string): Promise<{ turban: Turban; related: Turban[] }> {
    return fetchJson(`/api/turbans/${encodeURIComponent(id)}`);
  },

  getRegions(): Promise<{ regions: RegionProfile[] }> {
    return fetchJson('/api/regions');
  },

  getOccasions(): Promise<{ occasions: string[] }> {
    return fetchJson('/api/occasions');
  },

  getStories(): Promise<{ stories: HeritageStory[] }> {
    return fetchJson('/api/stories');
  },

  getStoryBySlug(slug: string): Promise<{ story: HeritageStory }> {
    return fetchJson(`/api/stories/${encodeURIComponent(slug)}`);
  },

  getRecommendations(
    occasion: string,
    region?: string
  ): Promise<{ occasion: string; recommendations: OccasionRecommendation[] }> {
    const sp = new URLSearchParams({ occasion });
    if (region && region !== 'All') {
      sp.set('region', region);
    }
    return fetchJson(`/api/recommendations?${sp.toString()}`);
  },

  getFeatured(offset = 0): Promise<{ turban: Turban; dateLabel: string }> {
    return fetchJson(`/api/featured?offset=${offset}`);
  },

  getGallery(category = 'All'): Promise<{ items: GalleryExhibitItem[] }> {
    const sp = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return fetchJson(`/api/gallery${sp}`);
  },
};
