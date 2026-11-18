import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Cutout from '../components/Cutout.jsx';
import Photo from '../components/Photo.jsx';
import { NETWORK, TIERS, LEAGUES, leaguesByTier, tierBlurb, leagueField } from '../data/leagues.js';
import { useT } from '../lib/i18n.jsx';

function AboutPage() {
  const { t } = useT();
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>{`${t('About')} | ${NETWORK.name}`}</title>
        <meta name="description" content={t('How the {name} network of {n} leagues is organized.', { name: NETWORK.name, n: LEAGUES.length })} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('ABOUT')}</span>
        <h1 className="text-[hsl(var(--black))] mb-6">{t('ONE CITY, {n} LEAGUES', { n: LEAGUES.length })}</h1>
        <p className="text-[hsl(var(--gray))] text-xl mb-12">
          {t('{name} is a network of futsal leagues with host venues across Chicago, joined by promotion and relegation. Finish near the top and you move up a level. Finish near the bottom and you drop down.', { name: NETWORK.name })}
        </p>

        <Cutout
          src="/images/girls-team.jpg"
          alt={t('A girls team in yellow jerseys posing with their coach')}
          tint="white" className="aspect-[16/10] mb-14 border border-[hsl(var(--table-border))]"
          width="1295" height="816"
        />

        <h2 className="text-[hsl(var(--black))] mb-6">{t('THE LEVELS')}</h2>
        <div className="space-y-4 mb-14">
          {TIERS.map((tier) => (
            <div key={tier.tier} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
              <h3 className="text-2xl text-[hsl(var(--black))] m-0">{t('LEVEL {tier}', { tier: tier.tier })} · {t(tier.label).toUpperCase()}</h3>
              <p className="text-[hsl(var(--gray))] mt-1 mb-4">{tierBlurb(t, tier)}</p>
              <ul className="p-0 m-0 list-none space-y-1">
                {leaguesByTier(tier.tier).map((l) => (
                  <li key={l.slug}>
                    <Link to={`/leagues/${l.slug}`} className="text-[hsl(var(--black))] font-semibold hover:text-[hsl(var(--primary))] transition-colors">
                      {l.name}
                    </Link>
                    <span className="text-[hsl(var(--gray))]"> — {leagueField(t, l, 'area')}, {l.venue}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Photo src="/images/gym-action.jpg" alt={t('Players in purple and blue closing in on the ball during a game')} className="aspect-[4/3] mb-14" width="1024" height="768" />

        <Link
          to="/contact"
          className="inline-block bg-[hsl(var(--primary))] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
        >
          {t('Get in touch')}
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
