import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { NETWORK, SEASON, gamesFor } from '../data/leagues.js';

const PRICE = 75;
const DATES = 'Dec 5 – Mar 28';

const INCLUDED = [
  { title: '100% referee fees', text: 'No cash collected on the sideline. Ref fees for every game are paid by the league.' },
  { title: 'Court and facility', text: 'A guaranteed match slot at your host venue for the whole season.' },
  { title: 'Free parent admission', text: 'Parents, family and friends watch regular-season games for free.' },
  { title: 'Stats and standings', text: 'Results, standings and schedules online. Tracking grows with age group.' },
  { title: 'Trophies and medals', text: 'Awards for 1st, 2nd and 3rd place teams in each division.' },
  { title: 'Your own jerseys', text: 'No league kit fee. Teams bring matching numbered shirts in their own colors.' },
];

const FAQ = [
  { q: 'When does the season run?', a: `${DATES}. Schedules and divisions are posted before opening weekend.` },
  { q: 'Are uniforms provided?', a: 'No. The league does not sell or require a kit. Bring matching shirts with visible numbers. Goalkeepers wear a color that does not clash with either team.' },
  { q: 'Do parents pay at the door?', a: 'Not during the regular season. Special playoff finals or separate tournament events may charge admission.' },
  { q: 'What gear does a player need?', a: 'A numbered team shirt, shin guards covered by socks, and flat-soled indoor futsal shoes or sneakers. Outdoor cleats are not allowed on gym floors.' },
  { q: 'Do I pay refs on game day?', a: 'No. Referee costs are covered by the player fee.' },
  { q: 'Can a single player sign up?', a: `Yes. Register as an individual for $${PRICE} and we will place your player on a team.` },
];

function PricingPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Pricing | {NETWORK.name}</title>
        <meta name="description" content={`$${PRICE} per player for the full ${DATES} season. Referees, venue and awards included.`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">PRICING</span>
        <h1 className="text-[hsl(var(--black))] mb-4">${PRICE} PER PLAYER</h1>
        <p className="text-[hsl(var(--gray))] text-xl mb-4">
          One flat fee for the full {DATES} season. No hidden fees, no surprise add-ons.
        </p>
        <p className="text-[hsl(var(--gray))] mb-12">
          {SEASON.teams} teams play {gamesFor(SEASON.teams)} games. The top flight, with {SEASON.topTeams} teams, plays {gamesFor(SEASON.topTeams)}.
        </p>

        <h2 className="text-[hsl(var(--black))] mb-6">WHAT'S INCLUDED</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {INCLUDED.map((i) => (
            <div key={i.title} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
              <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">{i.title.toUpperCase()}</h3>
              <p className="text-[hsl(var(--gray))] text-sm m-0">{i.text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-[hsl(var(--black))] mb-4">WHERE WE PLAY</h2>
        <p className="text-[hsl(var(--gray))] mb-14">
          Games are played in Park District, high school and college gyms, depending on the age group. Every
          league page lists its host venue. <Link to="/leagues" className="text-[hsl(var(--primary))] font-semibold">See the leagues</Link>.
        </p>

        <h2 className="text-[hsl(var(--black))] mb-6">QUESTIONS</h2>
        <div className="space-y-4 mb-14">
          {FAQ.map((f) => (
            <div key={f.q} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
              <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">{f.q.toUpperCase()}</h3>
              <p className="text-[hsl(var(--gray))] text-sm m-0">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/register" className="inline-block bg-[hsl(var(--primary))] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors">
            Register
          </Link>
          <Link to="/rules" className="inline-block border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary))] hover:text-white transition-colors">
            Format and rules
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
