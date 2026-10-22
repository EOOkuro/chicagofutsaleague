import { AGE_OPTIONS } from './divisions.js';
import { LEAGUES } from './leagues.js';

// ─────────────────────────────────────────────────────────────
// TEAMS. Add a team by adding one entry here.
//   league:  slug of a futsal league, or the id of a rec league
//            below. Leave null if the team has no league yet.
//   groups:  (optional) age groups the team fields
//   counts:  (optional) more than one team in an age group,
//            e.g. { U6: 2 }
//   filled:  (optional) age groups whose rosters are full. Leave
//            it out if you do not know yet.
// ─────────────────────────────────────────────────────────────

// Youth rec leagues played at park and school sites.
export const REC_LEAGUES = [
  { id: 'hirsch-rec', name: 'Hirsch Rec League', area: 'Central South', venue: 'Hirsch' },
  { id: 'harrison-park-rec', name: 'Harrison Park Rec League', area: '', venue: 'Harrison Park' },
];

export const TEAMS = [
  // Southwest Chi Futsal League
  { id: 'beverly-fc', name: 'Beverly FC', league: 'southwest-chi-futsal-league' },
  { id: 'midway-fc', name: 'Midway FC', league: 'southwest-chi-futsal-league' },
  { id: 'englewood-ac', name: 'Englewood AC', league: 'southwest-chi-futsal-league' },

  // OutSouth Futsal League
  { id: 'southshore-sc', name: 'Southshore SC', league: 'outsouth-futsal-league' },
  { id: 'hunnids-ac', name: 'Hunnids AC', league: 'outsouth-futsal-league' },
  { id: 'st-ailbe', name: 'St Ailbe', league: 'outsouth-futsal-league' },
  { id: 'cj-brown-foundation', name: 'CJBrown Foundation', league: 'outsouth-futsal-league' },
  { id: 'st-thomas', name: 'St Thomas', league: 'outsouth-futsal-league' },

  // Southside Futsal League
  { id: 'bronzeville-ac', name: 'Bronzeville AC', league: 'southside-futsal-league' },

  // Northside Futsal League
  { id: '290-club', name: '290 Club', league: 'northside-futsal-league' },
  { id: 'cd-coqui', name: 'CD Coquí', league: 'northside-futsal-league' },

  // OutWest Futsal League
  { id: 'holy-city', name: 'Holy City', league: 'outwest-futsal-league' },

  // Windy City Futsal League: no teams yet

  // Hirsch Rec League (Central South)
  { id: 'asab', name: 'ASAB', league: 'hirsch-rec', groups: ['U6', 'U8', 'U9', 'U10'], counts: { U6: 2 } },
  { id: 'st-ethelreda', name: 'St Ethelreda', league: 'hirsch-rec', groups: ['U6', 'U8', 'U9', 'U10'], counts: { U6: 3 } },
  { id: 'chicago-collegiate', name: 'Chicago Collegiate', league: 'hirsch-rec', groups: ['U14'] },
  { id: 'al-farooq', name: 'Al Farooq', league: 'hirsch-rec', groups: ['U9', 'U10'] },
  { id: 'hpnc', name: 'HPNC', league: 'hirsch-rec', groups: ['U8', 'U9', 'U13'] },

  // Harrison Park Rec League
  { id: 'cf-pilsen', name: 'CF Pilsen', league: 'harrison-park-rec', groups: ['U11'] },

  // Chicago Futsal League (UIC)
  { id: 'hyde-park-rangers', name: 'Hyde Park Rangers', league: 'chicago-futsal-league', groups: AGE_OPTIONS, filled: AGE_OPTIONS },
  { id: 'international-futebol-club', name: 'International Futebol Club', league: 'chicago-futsal-league', groups: ['U12'], filled: [] },
];

export const placeOf = (team) =>
  LEAGUES.find((l) => l.slug === team.league) || REC_LEAGUES.find((r) => r.id === team.league) || null;

export const isFutsalLeague = (team) => LEAGUES.some((l) => l.slug === team.league);

// Futsal leagues take every age group, so a team with no list of its own matches any group.
export const fieldsGroup = (team, group) =>
  team.groups ? team.groups.includes(group) : isFutsalLeague(team);

// 'filled' | 'open' | 'unknown'
export const statusOf = (team) => {
  if (!team.groups || !team.filled) return 'unknown';
  return team.groups.every((g) => team.filled.includes(g)) ? 'filled' : 'open';
};

export const openGroups = (team) => (team.groups || []).filter((g) => !(team.filled || []).includes(g));

export const groupLabel = (team, g) => (team.counts && team.counts[g] > 1 ? `${g} ×${team.counts[g]}` : g);

export const teamsIn = (id) => TEAMS.filter((t) => t.league === id);
