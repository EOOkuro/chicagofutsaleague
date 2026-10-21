import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LeagueCard from '../components/LeagueCard.jsx';
import ProRelPyramid from '../components/ProRelPyramid.jsx';
import SponsorStrip from '../components/SponsorStrip.jsx';
import AgeGroups from '../components/AgeGroups.jsx';
import { NETWORK, TIERS, LEAGUES, leaguesByTier } from '../data/leagues.js';

const WHY = [
  { title: 'Five-a-side, indoors', text: 'Small teams on a hard indoor court. Easy to field a team and easy to follow.' },
  { title: 'More touches', text: 'Fewer players and a smaller court mean everyone is involved all game.' },
  { title: 'Every neighborhood', text: 'Host venues across the city, so there is a league close to where you live.' },
];

function HomePage() {
  return (
    <>
      <Helmet>
        <title>{NETWORK.name} | {NETWORK.tagline}</title>
        <meta
          name="description"
          content={`${LEAGUES.length} futsal leagues across Chicago, from UIC to neighborhood hubs on every side of the city.`}
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">
              {LEAGUES.length} leagues · {LEAGUES.length} host venues
            </span>
            <h1 className="text-white m-0 mb-6">
              FUTSAL,<br />ALL OVER<br />CHICAGO.
            </h1>
            <p className="text-[hsl(var(--white))] text-xl max-w-xl mb-10">
              One network of leagues, from the flagship at UIC to neighborhood hubs on every side of the city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/leagues"
                className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
              >
                Find your league <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Register
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHOTO */}
      <section className="bg-[hsl(var(--black))] pb-0">
        <img
          src="/images/game-night.jpg"
          alt="Players and a referee on an indoor futsal court, a player in an orange jersey standing over the ball"
          className="w-full max-h-[70vh] object-cover"
          width="828"
          height="475"
          loading="lazy"
        />
      </section>

      {/* LEAGUES */}
      <section className="py-20 md:py-28 bg-[hsl(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">THE NETWORK</span>
          <h2 className="text-[hsl(var(--black))] mb-10">PICK YOUR LEAGUE</h2>
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
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">HOW IT FITS TOGETHER</span>
          <h2 className="text-[hsl(var(--black))] mb-10">THREE LEVELS</h2>
          <div className="space-y-4">
            {TIERS.map((t) => (
              <div key={t.tier} className="flex gap-5 items-start bg-[hsl(var(--light-bg))] rounded-2xl p-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-['Bebas_Neue'] text-2xl">
                  {t.tier}
                </div>
                <div>
                  <h3 className="text-2xl text-[hsl(var(--black))] m-0">{t.label.toUpperCase()}</h3>
                  <p className="text-[hsl(var(--gray))] m-0 mt-1">{t.blurb}</p>
                  <p className="text-[hsl(var(--black))] text-sm font-semibold m-0 mt-2">
                    {leaguesByTier(t.tier).map((l) => l.name).join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRO / REL PYRAMID */}
          <div className="mt-16">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">PROMOTION AND RELEGATION</span>
            <h2 className="text-[hsl(var(--black))] mb-3">THE PYRAMID</h2>
            <p className="text-[hsl(var(--gray))] max-w-xl mb-10">
              Win your league and move up a level. Finish at the bottom and drop down. Tap any league to see its page.
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
          <h2 className="text-[hsl(var(--black))] mb-10">WHY FUTSAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
                <h3 className="text-2xl text-[hsl(var(--black))] mb-2">{w.title.toUpperCase()}</h3>
                <p className="text-[hsl(var(--gray))] m-0">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SponsorStrip />

      {/* CTA */}
      <section className="py-20 bg-[hsl(var(--black))] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-white mb-4">READY TO PLAY?</h2>
          <p className="text-[hsl(var(--white))] text-lg mb-8">
            Register your team, or sign up as a free agent and we will find you one.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
          >
            Register <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
