import React from 'react';
import { Helmet } from 'react-helmet';
import LeagueCard from '../components/LeagueCard.jsx';
import Photo from '../components/Photo.jsx';
import { NETWORK, TIERS, leaguesByTier, tierBlurb } from '../data/leagues.js';
import { useT } from '../lib/i18n.jsx';

function LeaguesPage() {
  const { t } = useT();
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>{`${t('Leagues')} | ${NETWORK.name}`}</title>
        <meta name="description" content={t('Every futsal league in the network, with its area and host venue.')} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('THE NETWORK')}</span>
        <h1 className="text-[hsl(var(--black))] mb-8">{t('ALL LEAGUES')}</h1>
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-14">
          <Photo src="/images/gym-wide.jpg" alt={t('A full gym with teams in yellow bibs playing a game')} className="aspect-[4/5] sm:aspect-[4/3]" width="1024" height="768" />
          <Photo src="/images/gym-practice.jpg" alt={t('Kids in orange bibs and a coach on a gym floor with a ball')} className="aspect-[4/5] sm:aspect-[4/3]" focus="object-[50%55%]" width="768" height="1024" />
          <Photo src="/images/gym-action.jpg" alt={t('Players in purple and blue closing in on the ball during a game')} className="aspect-[4/5] sm:aspect-[4/3]" width="1024" height="768" />
        </div>

        {TIERS.map((tier) => (
          <section key={tier.tier} className="mb-14">
            <h3 className="text-[hsl(var(--black))] m-0">{t(tier.label).toUpperCase()}</h3>
            <p className="text-[hsl(var(--gray))] mb-6">{tierBlurb(t, tier)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaguesByTier(tier.tier).map((l) => (
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
