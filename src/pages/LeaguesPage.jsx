import React from 'react';
import { Helmet } from 'react-helmet';
import LeagueCard from '../components/LeagueCard.jsx';
import { NETWORK, TIERS, leaguesByTier } from '../data/leagues.js';

function LeaguesPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Leagues | {NETWORK.name}</title>
        <meta name="description" content="Every futsal league in the network, with its area and host venue." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">THE NETWORK</span>
        <h1 className="text-[hsl(var(--black))] mb-12">ALL LEAGUES</h1>

        {TIERS.map((t) => (
          <section key={t.tier} className="mb-14">
            <h3 className="text-[hsl(var(--black))] m-0">{t.label.toUpperCase()}</h3>
            <p className="text-[hsl(var(--gray))] mb-6">{t.blurb}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaguesByTier(t.tier).map((l) => (
                <LeagueCard key={l.slug} league={l} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default LeaguesPage;
