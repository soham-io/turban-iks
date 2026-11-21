import { Router } from 'express';
import {
  GALLERY_ITEMS,
  HERITAGE_STORIES,
  OCCASIONS_LIST,
  REGIONS_DATA,
  TURBANS_DATA,
  getRecommendationsForOccasion,
} from '../data/museumDataset.js';

export const museumRouter = Router();

/**
 * GET /api/turbans
 * Supports filtering by: region, occasion, color, style, fabric, difficulty, q (search)
 */
museumRouter.get('/turbans', (req, res) => {
  const { region, occasion, color, style, fabric, difficulty, q } = req.query;

  let results = [...TURBANS_DATA];

  if (typeof region === 'string' && region.trim() && region !== 'All') {
    const r = region.trim().toLowerCase();
    results = results.filter(
      (t) =>
        t.region.toLowerCase() === r ||
        t.subRegion.toLowerCase().includes(r)
    );
  }

  if (typeof occasion === 'string' && occasion.trim() && occasion !== 'All') {
    const occ = occasion.trim().toLowerCase();
    results = results.filter((t) =>
      t.occasions.some((o) => o.toLowerCase() === occ || o.toLowerCase().includes(occ))
    );
  }

  if (typeof color === 'string' && color.trim() && color !== 'All') {
    const c = color.trim().toLowerCase();
    results = results.filter((t) =>
      t.colors.some((col) => col.toLowerCase() === c)
    );
  }

  if (typeof style === 'string' && style.trim() && style !== 'All') {
    const s = style.trim().toLowerCase();
    results = results.filter((t) => t.style.toLowerCase() === s);
  }

  if (typeof fabric === 'string' && fabric.trim() && fabric !== 'All') {
    const f = fabric.trim().toLowerCase();
    results = results.filter(
      (t) =>
        t.fabricCategory.toLowerCase() === f ||
        t.fabric.toLowerCase().includes(f)
    );
  }

  if (typeof difficulty === 'string' && difficulty.trim() && difficulty !== 'All') {
    const d = difficulty.trim().toLowerCase();
    results = results.filter((t) => t.difficulty.toLowerCase() === d);
  }

  if (typeof q === 'string' && q.trim()) {
    const query = q.trim().toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.localName.toLowerCase().includes(query) ||
        t.region.toLowerCase().includes(query) ||
        t.subRegion.toLowerCase().includes(query) ||
        t.classification.toLowerCase().includes(query) ||
        t.summary.toLowerCase().includes(query) ||
        t.culturalMeaning.toLowerCase().includes(query) ||
        t.fabric.toLowerCase().includes(query)
    );
  }

  res.json({
    count: results.length,
    turbans: results,
  });
});

/**
 * GET /api/turbans/:id
 */
museumRouter.get('/turbans/:id', (req, res) => {
  const turban = TURBANS_DATA.find((t) => t.id === req.params.id);
  if (!turban) {
    res.status(404).json({ error: 'Turban artifact not found in the archive.' });
    return;
  }
  const related = TURBANS_DATA.filter(
    (t) => t.id !== turban.id && (t.region === turban.region || t.style === turban.style)
  ).slice(0, 3);
  res.json({ turban, related });
});

/**
 * GET /api/regions
 */
museumRouter.get('/regions', (_req, res) => {
  res.json({ regions: REGIONS_DATA });
});

/**
 * GET /api/occasions
 */
museumRouter.get('/occasions', (_req, res) => {
  res.json({ occasions: OCCASIONS_LIST });
});

/**
 * GET /api/stories
 */
museumRouter.get('/stories', (_req, res) => {
  res.json({ stories: HERITAGE_STORIES });
});

/**
 * GET /api/stories/:slug
 */
museumRouter.get('/stories/:slug', (req, res) => {
  const story = HERITAGE_STORIES.find((s) => s.slug === req.params.slug);
  if (!story) {
    res.status(404).json({ error: 'Story not found.' });
    return;
  }
  res.json({ story });
});

/**
 * GET /api/recommendations
 */
museumRouter.get('/recommendations', (req, res) => {
  const occasion = typeof req.query.occasion === 'string' ? req.query.occasion : 'Wedding';
  const region = typeof req.query.region === 'string' ? req.query.region : undefined;
  const recommendations = getRecommendationsForOccasion(occasion, region);
  res.json({ occasion, recommendations });
});

/**
 * GET /api/featured
 * Deterministic daily Turban of the Day rotation with optional offset
 */
museumRouter.get('/featured', (req, res) => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const offset = Number(req.query.offset || 0);
  const index = Math.abs(dayOfYear + offset) % TURBANS_DATA.length;
  res.json({
    turban: TURBANS_DATA[index],
    dateLabel: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  });
});

/**
 * GET /api/gallery
 */
museumRouter.get('/gallery', (req, res) => {
  const category = typeof req.query.category === 'string' ? req.query.category : 'All';
  const items =
    category === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === category);
  res.json({ items });
});
