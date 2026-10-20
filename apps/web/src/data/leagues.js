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

// Season format. Every team plays every other team home and away.
export const SEASON = { months: 4, teams: 8, topTeams: 10 };
export const gamesFor = (teams) => (teams - 1) * 2; // 8 teams = 14 games, 10 teams = 18

const games = gamesFor(SEASON.teams);
const topGames = gamesFor(SEASON.topTeams);

export const TIERS = [
  {
    tier: 1,
    label: 'Top flight',
    teams: SEASON.topTeams,
    blurb: `${SEASON.topTeams} teams, ${topGames} games over ${SEASON.months} months. The bottom 2 are relegated to Level 2 and replaced by the top team from each side league.`,
  },
  {
    tier: 2,
    label: 'Side leagues',
    teams: SEASON.teams,
    blurb: `${SEASON.teams} teams per league, ${games} games over ${SEASON.months} months. The top team in each league is promoted to the Chicago Futsal League. The bottom 2 are relegated to Level 3.`,
  },
  {
    tier: 3,
    label: 'Regional leagues',
    teams: SEASON.teams,
    blurb: `${SEASON.teams} teams per league, ${games} games over ${SEASON.months} months. The top team in each league is promoted to Level 2.`,
  },
];

// status: 'Coming soon' | 'Registration open' | 'In season'
export const LEAGUES = [
  {
    slug: 'chicago-futsal-league',
    name: 'Chicago Futsal League',
    tier: 1,
    teams: SEASON.topTeams,
    area: 'Citywide',
    venue: 'UIC',
    status: 'Coming soon',
    blurb: 'The top league, hosted at UIC. Win your way up from Level 2 to play here.',
  },
  {
    slug: 'southside-futsal-league',
    name: 'Southside Futsal League',
    tier: 2,
    teams: SEASON.teams,
    area: 'South of Roosevelt',
    venue: 'Dyett High School',
    status: 'Coming soon',
    blurb: 'South Side futsal, hosted at Dyett High School.',
  },
  {
    slug: 'northside-futsal-league',
    name: 'Northside Futsal League',
    tier: 2,
    teams: SEASON.teams,
    area: 'North of Roosevelt',
    venue: 'DePaul College Prep',
    status: 'Coming soon',
    blurb: 'North Side futsal, hosted at DePaul College Prep.',
  },
  {
    slug: 'outsouth-futsal-league',
    name: 'OutSouth Futsal League',
    tier: 3,
    teams: SEASON.teams,
    area: `East of ${SPLIT_STREET}`,
    venue: 'St. Moses the Black',
    status: 'Coming soon',
    blurb: `Far South Side and lakefront teams east of ${SPLIT_STREET}, hosted at St. Moses the Black.`,
  },
  {
    slug: 'southwest-chi-futsal-league',
    name: 'Southwest Chi Futsal League',
    tier: 3,
    teams: SEASON.teams,
    area: `West of ${SPLIT_STREET}`,
    venue: 'Wintrust Sports Complex',
    status: 'Coming soon',
    blurb: `Southwest side teams west of ${SPLIT_STREET}, hosted at Wintrust Sports Complex.`,
  },
  {
    slug: 'outwest-futsal-league',
    name: 'OutWest Futsal League',
    tier: 3,
    teams: SEASON.teams,
    area: 'West of the 90/94',
    venue: 'Orr High School',
    status: 'Coming soon',
    blurb: 'West Side teams west of the 90/94, hosted at Orr High School.',
  },
  {
    slug: 'windy-city-futsal-league',
    name: 'Windy City Futsal League',
    tier: 3,
    teams: SEASON.teams,
    area: 'East of the 90/94',
    venue: 'North Park University',
    status: 'Coming soon',
    blurb: 'Teams east of the 90/94, hosted at North Park University.',
  },
];

export const leagueBySlug = (slug) => LEAGUES.find((l) => l.slug === slug);
export const leaguesByTier = (tier) => LEAGUES.filter((l) => l.tier === tier);

// ─────────────────────────────────────────────────────────────
// PROMOTION AND RELEGATION. Edit counts here; every page updates.
// Each line: teams moving from one league to another each season.
// Check: every league must send out as many teams as it receives.
// ─────────────────────────────────────────────────────────────
export const PROMOTIONS = [
  { from: 'outsouth-futsal-league', to: 'southside-futsal-league', count: 1 },
  { from: 'southwest-chi-futsal-league', to: 'southside-futsal-league', count: 1 },
  { from: 'outwest-futsal-league', to: 'northside-futsal-league', count: 1 },
  { from: 'windy-city-futsal-league', to: 'northside-futsal-league', count: 1 },
  { from: 'southside-futsal-league', to: 'chicago-futsal-league', count: 1 },
  { from: 'northside-futsal-league', to: 'chicago-futsal-league', count: 1 },
];

export const RELEGATIONS = [
  { from: 'chicago-futsal-league', to: 'southside-futsal-league', count: 1 },
  { from: 'chicago-futsal-league', to: 'northside-futsal-league', count: 1 },
  { from: 'southside-futsal-league', to: 'outsouth-futsal-league', count: 1 },
  { from: 'southside-futsal-league', to: 'southwest-chi-futsal-league', count: 1 },
  { from: 'northside-futsal-league', to: 'outwest-futsal-league', count: 1 },
  { from: 'northside-futsal-league', to: 'windy-city-futsal-league', count: 1 },
];

const nameOf = (slug) => leagueBySlug(slug)?.name ?? slug;
const sum = (list) => list.reduce((n, m) => n + m.count, 0);
const plural = (n, one, many) => (n === 1 ? one : many);

// Plain-English lines describing what happens to a league's teams each season.
export function describeMoves(slug) {
  const promotedOut = PROMOTIONS.filter((m) => m.from === slug);
  const relegatedOut = RELEGATIONS.filter((m) => m.from === slug);
  const promotedIn = PROMOTIONS.filter((m) => m.to === slug);
  const relegatedIn = RELEGATIONS.filter((m) => m.to === slug);
  const lines = [];

  const up = sum(promotedOut);
  if (up > 0) {
    lines.push(
      `${plural(up, 'The top team is', `The top ${up} teams are`)} promoted to ${promotedOut.map((m) => nameOf(m.to)).join(' and ')}.`
    );
  }
  const down = sum(relegatedOut);
  if (down > 0) {
    lines.push(
      `${plural(down, 'The bottom team is', `The bottom ${down} teams are`)} relegated: ${relegatedOut
        .map((m) => `${m.count} to ${nameOf(m.to)}`)
        .join(', ')}.`
    );
  }
  if (promotedIn.length > 0) {
    lines.push(`Receives ${promotedIn.map((m) => `${m.count} promoted from ${nameOf(m.from)}`).join(' and ')}.`);
  }
  if (relegatedIn.length > 0) {
    lines.push(`Receives ${relegatedIn.map((m) => `${m.count} relegated from ${nameOf(m.from)}`).join(' and ')}.`);
  }
  return lines;
}
