import { tr } from '../lib/lang.js';

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
    // tpl + vars is the same sentence, used by the site so it can be shown in Spanish. Keep it in step with blurb.
    tpl: '{top} teams, {games} games over {months} months. The bottom 2 are relegated to Level 2 and replaced by the top team from each side league.',
    vars: { top: SEASON.topTeams, games: topGames, months: SEASON.months },
  },
  {
    tier: 2,
    label: 'Side leagues',
    teams: SEASON.teams,
    blurb: `${SEASON.teams} teams per league, ${games} games over ${SEASON.months} months. The top team in each league is promoted to the Chicago Futsal League. The bottom 2 are relegated to Level 3.`,
    tpl: '{teams} teams per league, {games} games over {months} months. The top team in each league is promoted to the Chicago Futsal League. The bottom 2 are relegated to Level 3.',
    vars: { teams: SEASON.teams, games, months: SEASON.months },
  },
  {
    tier: 3,
    label: 'Regional leagues',
    teams: SEASON.teams,
    blurb: `${SEASON.teams} teams per league, ${games} games over ${SEASON.months} months. The top team in each league is promoted to Level 2.`,
    tpl: '{teams} teams per league, {games} games over {months} months. The top team in each league is promoted to Level 2.',
    vars: { teams: SEASON.teams, games, months: SEASON.months },
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
    tpl: { area: 'East of {street}', blurb: 'Far South Side and lakefront teams east of {street}, hosted at St. Moses the Black.' },
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
    tpl: { area: 'West of {street}', blurb: 'Southwest side teams west of {street}, hosted at Wintrust Sports Complex.' },
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

// League text in the visitor's language. field: 'area' | 'blurb' | 'status'. Pass the t() from useT().
export const leagueField = (t, league, field) => {
  const tpl = league.tpl && league.tpl[field];
  return tpl ? t(tpl, { street: SPLIT_STREET }) : t(league[field]);
};
// A level's description in the visitor's language.
export const tierBlurb = (t, tier) => t(tier.tpl, tier.vars);
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

// Plain-English lines describing what happens to a league's teams each season. Pass the t() from useT() for Spanish.
export function describeMoves(slug, t = tr) {
  const promotedOut = PROMOTIONS.filter((m) => m.from === slug);
  const relegatedOut = RELEGATIONS.filter((m) => m.from === slug);
  const promotedIn = PROMOTIONS.filter((m) => m.to === slug);
  const relegatedIn = RELEGATIONS.filter((m) => m.to === slug);
  const lines = [];
  const join = (list) => list.join(` ${t('and')} `);

  const up = sum(promotedOut);
  if (up > 0) {
    const to = join(promotedOut.map((m) => nameOf(m.to)));
    lines.push(up === 1 ? t('The top team is promoted to {to}.', { to }) : t('The top {n} teams are promoted to {to}.', { n: up, to }));
  }
  const down = sum(relegatedOut);
  if (down > 0) {
    const list = relegatedOut.map((m) => t('{count} to {name}', { count: m.count, name: nameOf(m.to) })).join(', ');
    lines.push(down === 1 ? t('The bottom team is relegated: {list}.', { list }) : t('The bottom {n} teams are relegated: {list}.', { n: down, list }));
  }
  if (promotedIn.length > 0) {
    lines.push(t('Receives {list}.', { list: join(promotedIn.map((m) => t('{count} promoted from {name}', { count: m.count, name: nameOf(m.from) }))) }));
  }
  if (relegatedIn.length > 0) {
    lines.push(t('Receives {list}.', { list: join(relegatedIn.map((m) => t('{count} relegated from {name}', { count: m.count, name: nameOf(m.from) }))) }));
  }
  return lines;
}
