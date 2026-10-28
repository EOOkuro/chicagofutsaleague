import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { NETWORK } from '../data/leagues.js';
import { TRACKING } from '../data/divisions.js';

const range = (g) => (g.length === 1 ? g[0] : `${g[0]}–${g[g.length - 1]}`);

const FORMAT = {
  play: '4v4, no goalkeeper',
  standings: '5v5',
  team: '5v5',
  full: '5v5',
};

const CLOCK = [
  { label: 'Match length', value: 'Two 20-minute halves, all age groups.' },
  { label: 'Halftime', value: '45-second break.' },
  { label: 'Clock', value: 'Running clock. It stops only inside the last 2 minutes of a half.' },
  { label: 'Timeouts', value: 'One 1-minute timeout per team, per half.' },
  { label: 'Balls', value: 'Size 2 for younger divisions, size 3 for older divisions. Futsal balls only.' },
];

const GAME_RULES = [
  { title: 'Goalkeepers', items: [
    'Games follow the FIFA Futsal Laws of the Game.',
    'Keepers may punt in transition, but not on goal clearances.',
    'Goal clearances must stay in the keeper\'s own half. Keepers cannot throw past halfway in the younger divisions. Violation is an indirect free kick at halfway.',
    'Only one pass back to the keeper per possession, unless the opponent touches the ball, it goes out, or the keeper crosses halfway.',
    'A keeper may stand on the green line. Stepping past it is a handball and a direct free kick.',
  ]},
  { title: 'Restarts and tackling', items: [
    'Goal clearances, corners, kick-ins, free kicks and substitutions: 4 seconds to restart.',
    'Defensive sliding is allowed. Slide tackling is not. The referee decides.',
    'A slide that makes contact with a player is usually a direct foul.',
  ]},
  { title: 'Accumulated fouls', items: [
    'Every foul that earns a direct free kick counts, handballs included.',
    'The 5th team foul in a half is announced to both benches.',
    'The 6th foul, and every one after it, is a penalty kick for the other team.',
    'Fouls reset each half.',
  ]},
];

const RULES = [
  { title: 'Rosters', items: [
    'Up to 12 players per match day.',
    'Rosters are due before your first game, can be adjusted until the end of week 2, then are locked.',
    'Make sure every jersey number on the roster is correct. Referees track stats every game.',
  ]},
  { title: 'Players and age', items: [
    'Every player must be registered, or submit a guest player form with a birth certificate and waiver.',
    'U.S. Club and Youth Soccer ID is accepted.',
    'No overage players. A team caught using one risks forfeits, a $50 fine per forfeited game, season-long suspension for the player, and disqualification with no refund.',
    'To challenge a player\'s age, go to the scorer\'s table right after the game. Never approach the coach, player or family. Doing so is a forfeit.',
  ]},
  { title: 'Bench and uniforms', items: [
    'Only rostered staff may sit on the bench.',
    'Only the head coach stands and gives instructions. If the head coach is expelled, only the assistant coach takes over.',
    'Substitutes stay seated, wear bibs, and warm up only in the warm-up area.',
    'The first-listed (home) team wears home colors. The other team wears colors that do not clash, and the referee can order a change.',
    'Shin guards at all times, covered by socks. Goalkeeper colors must not clash with either team.',
    'Bring home and away shirts and bibs.',
  ]},
  { title: 'Discipline', items: [
    'A direct red card, or two yellows in one game, is an automatic suspension of at least one match.',
    'Zero tolerance for insults, screaming or disrespect toward referees, players, staff or spectators. Offenders are removed from the facility.',
    'Minor: private or written warning, late arrival, forgotten bibs. Three minors count as one serious.',
    'Serious: no-show, walking off a match, playing a suspended player, violent behavior. Result is suspension.',
    'The tournament committee settles disputes and discipline.',
  ]},
];

function Block({ title, items }) {
  return (
    <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
      <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-3">{title.toUpperCase()}</h3>
      <ul className="m-0 pl-5 space-y-2 text-[hsl(var(--gray))] text-sm">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function RulesPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Format and rules | {NETWORK.name}</title>
        <meta name="description" content="Match format, game rules, rosters and conduct for every age group." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">FORMAT AND RULES</span>
        <h1 className="text-[hsl(var(--black))] mb-4">HOW WE PLAY</h1>
        <p className="text-[hsl(var(--gray))] text-xl mb-12">
          Games follow FIFA Futsal Laws with a few league rules on top. Venues are Park District, high school
          and college gyms, depending on the age group.
        </p>

        <h2 className="text-[hsl(var(--black))] mb-6">FORMAT BY AGE GROUP</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {TRACKING.map((t) => (
            <div key={t.id} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
              <div className="font-['Bebas_Neue'] text-4xl text-[hsl(var(--primary))] leading-none mb-2">{range(t.groups)}</div>
              <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-1">{FORMAT[t.id].toUpperCase()}</h3>
              <p className="text-[hsl(var(--gray))] text-sm m-0">{t.title}. {t.text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-[hsl(var(--black))] mb-6">CLOCK AND BALLS</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[hsl(var(--table-border))] border border-[hsl(var(--table-border))] mb-14">
          {CLOCK.map((c) => (
            <div key={c.label} className="bg-[hsl(var(--true-white))] p-4">
              <dt className="label-text text-xs font-bold tracking-widest text-[hsl(var(--gray))]">{c.label.toUpperCase()}</dt>
              <dd className="m-0 mt-1 text-sm text-[hsl(var(--black))]">{c.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="text-[hsl(var(--black))] mb-6">GAME RULES</h2>
        <div className="space-y-4 mb-14">
          {GAME_RULES.map((g) => <Block key={g.title} {...g} />)}
        </div>

        <h2 className="text-[hsl(var(--black))] mb-6">STANDINGS AND KNOCKOUTS</h2>
        <div className="space-y-4 mb-14">
          <Block title="Tiebreakers" items={[
            'Points, then head-to-head, then goal difference, then goals scored, then goals against, then a 5-shot penalty tiebreaker.',
            'Knockout ties go to a penalty shootout: best of 3 from the penalty mark, then sudden death.',
            'Knockout events: check in at least 30 minutes before kickoff. Late teams risk a forfeit.',
          ]} />
        </div>

        <h2 className="text-[hsl(var(--black))] mb-6">ROSTERS, BENCH AND CONDUCT</h2>
        <div className="space-y-4 mb-14">
          {RULES.map((g) => <Block key={g.title} {...g} />)}
        </div>

        <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6 mb-8">
          <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">QUESTIONS</h3>
          <p className="text-[hsl(var(--gray))] text-sm m-0">
            ekuro@tekkerz.co · 312-767-7432. Fees are on the <Link to="/pricing" className="text-[hsl(var(--primary))] font-semibold">pricing page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RulesPage;
