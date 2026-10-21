// ─────────────────────────────────────────────────────────────
// AGE GROUPS AND DIVISIONS. Edit here; the home page and the
// registration page both read from this file.
// ─────────────────────────────────────────────────────────────

// How much each age group is tracked on the site.
export const TRACKING = [
  {
    id: 'play',
    groups: ['U6'],
    title: 'Non-competitive',
    text: '4v4, no goalkeeper. No standings. Just play.',
  },
  {
    id: 'standings',
    groups: ['U7', 'U8', 'U9', 'U10', 'U11', 'U12'],
    title: 'Standings only',
    text: 'Points table for every division.',
  },
  {
    id: 'team',
    groups: ['U13', 'U14'],
    title: 'Standings + team stats',
    text: 'Points table plus full team stats.',
  },
  {
    id: 'full',
    groups: ['U15', 'U16', 'U17', 'U18'],
    title: 'Full stats',
    text: 'Player stats, team stats and match stats.',
  },
];

export const YOUTH_GROUPS = TRACKING.flatMap((t) => t.groups);

// Coed teams are encouraged in these groups. Teams choose it themselves.
export const COED_GROUPS = ['U6', 'U7', 'U8', 'U9', 'U10'];

export const ADULT_GROUP = 'Adult (18+)';
export const AGE_OPTIONS = [...YOUTH_GROUPS, ADULT_GROUP];

export const isYouth = (group) => YOUTH_GROUPS.includes(group);

// Boys / Girls for youth, Men / Women for adults. Coed only where allowed.
export const genderOptions = (group) => {
  if (!group) return [];
  if (group === ADULT_GROUP) return ['Men', 'Women'];
  const base = ['Boys', 'Girls'];
  return COED_GROUPS.includes(group) ? [...base, 'Coed'] : base;
};

export const trackingFor = (group) => TRACKING.find((t) => t.groups.includes(group));

export const TEAM_TYPES = ['School', 'Club', 'Nonprofit / community group', 'Church / faith group', 'Company / friends', 'Other'];
export const POSITIONS = ['Field player', 'Goalkeeper', 'Either'];
