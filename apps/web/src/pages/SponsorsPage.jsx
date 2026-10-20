import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { NETWORK, LEAGUES } from '../data/leagues.js';

const FORMATS = [
  { title: 'Network sponsor', text: `Your brand across all ${LEAGUES.length} leagues, on the site and at every host venue.` },
  { title: 'League sponsor', text: 'Own one league and its neighborhood. Good for local businesses and community brands.' },
  { title: 'Court and kit', text: 'Logo on team kits, court signage and match-day materials.' },
];

function SponsorsPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Sponsors | {NETWORK.name}</title>
        <meta name="description" content="Put your brand in front of players and families at futsal courts across Chicago." />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">PARTNERS</span>
        <h1 className="text-[hsl(var(--black))] mb-6">PARTNER WITH THE LEAGUE</h1>
        <p className="text-[hsl(var(--gray))] text-xl max-w-3xl mb-12">
          Reach players, families and neighborhoods through {LEAGUES.length} host venues around Chicago.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FORMATS.map((f) => (
            <div key={f.title} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
              <h3 className="text-2xl text-[hsl(var(--black))] mb-2">{f.title.toUpperCase()}</h3>
              <p className="text-[hsl(var(--gray))] m-0">{f.text}</p>
            </div>
          ))}
        </div>

        <Link
          to="/contact?type=Sponsor"
          className="inline-block bg-[hsl(var(--primary))] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
        >
          Become a sponsor
        </Link>
      </div>
    </div>
  );
}

export default SponsorsPage;
