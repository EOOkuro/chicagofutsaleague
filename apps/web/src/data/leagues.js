// ─────────────────────────────────────────────────────────────
// ONE place to edit league info. Every page reads from here.
// ─────────────────────────────────────────────────────────────

// Street that splits OutSouth (east) from Southwest Chi (west).
// Change "Halsted" to "Western" and both league descriptions update.
export const SPLIT_STREET = 'Halsted';

export const NETWORK = {
  name: 'Chicago Futsal League',
  short: 'CFL',
  tagline: 'Futsal, all over Chicago.',
  // Contact form posts here. Replace with a new Formspree URL to get a separate inbox.
  formEndpoint: 'https://formspree.io/f/xkoazolb',
};

export const TIERS = [
  { tier: 1, label: 'Flagship', blurb: 'The citywide league where the best teams meet.' },
  { tier: 2, label: 'Side leagues', blurb: 'North and South of Roosevelt Road.' },
  { tier: 3, label: 'Regional leagues', blurb: 'Neighborhood hubs that feed the side leagues.' },
];

// status: 'Coming soon' | 'Registration open' | 'In season'
export const LEAGUES = [
  {
    slug: 'chicago-futsal-league',
    name: 'Chicago Futsal League',
    tier: 1,
    area: 'Citywide',
    venue: 'UIC',
    status: 'Coming soon',
    blurb: 'The flagship league, hosted at UIC.',
  },
  {
    slug: 'southside-futsal-league',
    name: 'Southside Futsal League',
    tier: 2,
    area: 'South of Roosevelt',
    venue: 'Dyett High School',
    status: 'Coming soon',
    blurb: 'South Side futsal, hosted at Dyett High School.',
  },
  {
    slug: 'northside-futsal-league',
    name: 'Northside Futsal League',
    tier: 2,
    area: 'North of Roosevelt',
    venue: 'DePaul College Prep',
    status: 'Coming soon',
    blurb: 'North Side futsal, hosted at DePaul College Prep.',
  },
  {
    slug: 'outsouth-futsal-league',
    name: 'OutSouth Futsal League',
    tier: 3,
    area: `East of ${SPLIT_STREET}`,
    venue: 'St. Moses the Black',
    status: 'Coming soon',
    blurb: `Far South Side and lakefront teams east of ${SPLIT_STREET}, hosted at St. Moses the Black.`,
  },
  {
    slug: 'southwest-chi-futsal-league',
    name: 'Southwest Chi Futsal League',
    tier: 3,
    area: `West of ${SPLIT_STREET}`,
    venue: 'Wintrust Sports Complex',
    status: 'Coming soon',
    blurb: `Southwest side teams west of ${SPLIT_STREET}, hosted at Wintrust Sports Complex.`,
  },
  {
    slug: 'outwest-futsal-league',
    name: 'OutWest Futsal League',
    tier: 3,
    area: 'West of the 90/94',
    venue: 'Orr High School',
    status: 'Coming soon',
    blurb: 'West Side teams west of the 90/94, hosted at Orr High School.',
  },
  {
    slug: 'windy-city-futsal-league',
    name: 'Windy City Futsal League',
    tier: 3,
    area: 'East of the 90/94',
    venue: 'North Park University',
    status: 'Coming soon',
    blurb: 'Teams east of the 90/94, hosted at North Park University.',
  },
];

export const leagueBySlug = (slug) => LEAGUES.find((l) => l.slug === slug);
export const leaguesByTier = (tier) => LEAGUES.filter((l) => l.tier === tier);
