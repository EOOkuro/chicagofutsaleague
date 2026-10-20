import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { NETWORK, TIERS, LEAGUES, leaguesByTier } from '../data/leagues.js';

function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>About | {NETWORK.name}</title>
        <meta name="description" content={`How the ${NETWORK.name} network of ${LEAGUES.length} leagues is organized.`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">ABOUT</span>
        <h1 className="text-[hsl(var(--black))] mb-6">ONE CITY, {LEAGUES.length} LEAGUES</h1>
        <p className="text-[hsl(var(--gray))] text-xl mb-12">
          {NETWORK.name} is a network of futsal leagues with host venues across Chicago. Each league covers
          its own part of the city, and together they give every player a league close to home.
        </p>

        <h2 className="text-[hsl(var(--black))] mb-6">HOW IT IS ORGANIZED</h2>
        <div className="space-y-4 mb-14">
          {TIERS.map((t) => (
            <div key={t.tier} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
              <h3 className="text-2xl text-[hsl(var(--black))] m-0">LEVEL {t.tier} · {t.label.toUpperCase()}</h3>
              <p className="text-[hsl(var(--gray))] mt-1 mb-4">{t.blurb}</p>
              <ul className="p-0 m-0 list-none space-y-1">
                {leaguesByTier(t.tier).map((l) => (
                  <li key={l.slug}>
                    <Link to={`/leagues/${l.slug}`} className="text-[hsl(var(--black))] font-semibold hover:text-[hsl(var(--primary))] transition-colors">
                      {l.name}
                    </Link>
                    <span className="text-[hsl(var(--gray))]"> — {l.area}, {l.venue}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="inline-block bg-[hsl(var(--primary))] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
