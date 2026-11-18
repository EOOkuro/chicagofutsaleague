import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LeagueCard from '../components/LeagueCard.jsx';
import ProRelPyramid from '../components/ProRelPyramid.jsx';
import SponsorStrip from '../components/SponsorStrip.jsx';
import AgeGroups from '../components/AgeGroups.jsx';
import { loginUrl } from '../lib/fedos-public.js';
import Cutout from '../components/Cutout.jsx';
import Photo from '../components/Photo.jsx';
import { NETWORK, TIERS, LEAGUES, leaguesByTier, tierBlurb } from '../data/leagues.js';
import { useT } from '../lib/i18n.jsx';

const WHY = [
  { title: 'Five-a-side, indoors', text: 'Small teams on a hard indoor court. Easy to field a team and easy to follow.' },
  { title: 'More touches', text: 'Fewer players and a smaller court mean everyone is involved all game.' },
  { title: 'Every neighborhood', text: 'Host venues across the city, so there is a league close to where you live.' },
];

function HomePage() {
  const { t, lang } = useT();
  return (
    <>
      <Helmet>
        <title>{`${NETWORK.name} | ${t(NETWORK.tagline)}`}</title>
        <meta
          name="description"
          content={t('{n} futsal leagues across Chicago, from UIC to neighborhood hubs on every side of the city.', { n: LEAGUES.length })}
        />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[hsl(var(--black))] pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary))/0.35,transparent_60%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g fill="none" stroke="white" strokeWidth="3">
            <rect x="40" y="40" width="720" height="420" />
            <line x1="400" y1="40" x2="400" y2="460" />
            <circle cx="400" cy="250" r="70" />
            <rect x="40" y="170" width="90" height="160" />
            <rect x="670" y="170" width="90" height="160" />
          </g>
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">
              {t('{n} leagues · {n} host venues', { n: LEAGUES.length })}
            </span>
            <h1 className="text-white m-0 mb-6">
              {t('FUTSAL,')}<br />{t('ALL OVER')}<br />{t('CHICAGO.')}
            </h1>
            <p className="text-[hsl(var(--white))] text-xl max-w-xl mb-10">
              {t('One network of leagues, from the flagship at UIC to neighborhood hubs on every side of the city.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/leagues"
                className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
              >
                {t('Find your league')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                {t('New here? Register')}
              </Link>
            </div>
            <div className="mt-8 max-w-lg rounded-xl border border-white/25 bg-black/30 p-5">
              <p className="text-white font-bold m-0">{t('Already registered? Log in to FedOS')}</p>
              <p className="text-white/80 text-sm mt-1 mb-4">{t('FedOS is our registration and payment system. Log in to pay, update your registration, and see your team and schedule.')}</p>
              <div className="flex flex-wrap gap-3">
                <a href={loginUrl('chicago-futsal-league', 'guardian', lang)} className="inline-flex items-center border-2 border-white/40 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">{t('Guardian / Parent Log In')}</a>
                <a href={loginUrl('chicago-futsal-league', 'player', lang)} className="inline-flex items-center border-2 border-white/40 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">{t('Player Log In')}</a>
              </div>
            </div>
          </motion.div>

          <motion.div className="hidden lg:block relative px-6 pb-8" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <Cutout
              src="/images/dribble-close.jpg"
              alt={t('A player in a white jersey dribbling a ball')}
              className="aspect-[3/4] rotate-2 shadow-2xl ring-4 ring-white/10"
              width="896" height="1195" eager
            />
            <Cutout
              src="/images/dribble-cones.jpg"
              alt={t('A player weaving the ball between cones in training')}
              tint="sand"
              className="absolute -bottom-2 -left-2 w-44 aspect-square -rotate-3 shadow-xl ring-4 ring-[hsl(var(--black))]"
              imgClassName="object-top"
              width="896" height="1195"
            />
          </motion.div>
        </div>
      </section>

      {/* PHOTO (original) */}
      <section className="bg-[hsl(var(--black))] pb-0">
        <img
          src="/images/game-night.jpg"
          alt={t('Players and a referee on an indoor futsal court, a player in an orange jersey standing over the ball')}
          className="w-full max-h-[70vh] object-cover"
          width="828"
          height="475"
          loading="lazy"
        />
      </section>

      {/* ON THE COURT (cutouts) */}
      <section className="py-20 md:py-28 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('ON THE COURT')}</span>
          <h2 className="text-[hsl(var(--black))] mb-10">{t('FUTSAL FOR EVERY KID')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Cutout
              src="/images/kids-group.jpg"
              alt={t('A group of young players in yellow and black shirts, laughing and posing together')}
              tint="white" className="aspect-[4/3] shadow-sm border border-[hsl(var(--table-border))]"
              width="1195" height="896"
            />
            <Cutout
              src="/images/girls-team.jpg"
              alt={t('A girls team in yellow jerseys posing with their coach')}
              tint="white" className="aspect-[4/3] shadow-sm border border-[hsl(var(--table-border))]"
              width="1295" height="816"
            />
          </div>
        </div>
      </section>

      {/* GAME DAY */}
      <section className="py-20 md:py-28 bg-[hsl(var(--true-white))] border-y border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('GAME DAY')}</span>
          <h2 className="text-[hsl(var(--black))] mb-10">{t('REAL GAMES, REAL GYMS')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[14rem] md:auto-rows-[20rem] gap-4 md:gap-6">
            <Photo src="/images/gym-game.jpg" alt={t('Two players battling for the ball in a gym during a match, with a referee watching')} className="col-span-2 md:col-span-1 md:row-span-2" focus="object-[50%62%]" width="896" height="1195" />
            <Photo src="/images/gym-action.jpg" alt={t('Players in purple and blue closing in on the ball during a game')} className="col-span-2" width="1024" height="768" />
            <Photo src="/images/gym-practice.jpg" alt={t('Kids in orange bibs and a coach on a gym floor with a ball')} focus="object-[50%55%]" width="768" height="1024" />
            <Photo src="/images/gym-wide.jpg" alt={t('A full gym with teams in yellow bibs playing a game')} width="1024" height="768" />
          </div>
        </div>
      </section>

      {/* LEAGUES */}
      <section className="py-20 md:py-28 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('THE NETWORK')}</span>
          <h2 className="text-[hsl(var(--black))] mb-10">{t('PICK YOUR LEAGUE')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEAGUES.map((l) => (
              <LeagueCard key={l.slug} league={l} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT FITS TOGETHER */}
      <section className="py-20 md:py-28 bg-[hsl(var(--true-white))] border-y border-[hsl(var(--white))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('HOW IT FITS TOGETHER')}</span>
          <h2 className="text-[hsl(var(--black))] mb-10">{t('THREE LEVELS')}</h2>
          <div className="space-y-4">
            {TIERS.map((tier) => (
              <div key={tier.tier} className="flex gap-5 items-start bg-[hsl(var(--light-bg))] rounded-2xl p-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-['Bebas_Neue'] text-2xl">
                  {tier.tier}
                </div>
                <div>
                  <h3 className="text-2xl text-[hsl(var(--black))] m-0">{t(tier.label).toUpperCase()}</h3>
                  <p className="text-[hsl(var(--gray))] m-0 mt-1">{tierBlurb(t, tier)}</p>
                  <p className="text-[hsl(var(--black))] text-sm font-semibold m-0 mt-2">
                    {leaguesByTier(tier.tier).map((l) => l.name).join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRO / REL PYRAMID */}
          <div className="mt-16">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('PROMOTION AND RELEGATION')}</span>
            <h2 className="text-[hsl(var(--black))] mb-3">{t('THE PYRAMID')}</h2>
            <p className="text-[hsl(var(--gray))] max-w-xl mb-10">
              {t('Win your league and move up a level. Finish at the bottom and drop down. Tap any league to see its page.')}
            </p>
            <ProRelPyramid />
          </div>
        </div>
      </section>

      {/* AGE GROUPS */}
      <section className="py-20 md:py-28 bg-[hsl(var(--true-white))] border-y border-[hsl(var(--white))]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AgeGroups />
        </div>
      </section>

      {/* WHY FUTSAL */}
      <section className="py-20 md:py-28 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[hsl(var(--black))] mb-10">{t('WHY FUTSAL')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-8 items-stretch">
           <div className="grid grid-cols-1 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
                <h3 className="text-2xl text-[hsl(var(--black))] mb-2">{t(w.title).toUpperCase()}</h3>
                <p className="text-[hsl(var(--gray))] m-0">{t(w.text)}</p>
              </div>
            ))}
           </div>
           <Cutout
              src="/images/dribble-cones.jpg"
              alt={t('A player weaving the ball between cones in training')}
              tint="lavender" className="hidden lg:block min-h-[22rem]"
              imgClassName="object-top"
              width="896" height="1195"
           />
          </div>
        </div>
      </section>

      <SponsorStrip />

      {/* CTA */}
      <section className="py-20 bg-[hsl(var(--black))] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-white mb-4">{t('READY TO PLAY?')}</h2>
          <p className="text-[hsl(var(--white))] text-lg mb-8">
            {t('Register your team, or sign up as a free agent and we will find you one.')}
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
          >
            {t('Register')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
