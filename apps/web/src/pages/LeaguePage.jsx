import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MapPin, Building2, Calendar, Trophy, Users } from 'lucide-react';
import LeagueCard from '../components/LeagueCard.jsx';
import { teamsIn } from '../data/teams.js';
import { NETWORK, TIERS, LEAGUES, SEASON, gamesFor, leagueBySlug, describeMoves } from '../data/leagues.js';

function LeaguePage() {
  const { slug } = useParams();
  const league = leagueBySlug(slug);

  if (!league) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl text-[hsl(var(--black))] mb-4">League not found</h1>
        <Link to="/leagues" className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider">
          See all leagues
        </Link>
      </div>
    );
  }

  const tier = TIERS.find((t) => t.tier === league.tier);
  const leagueTeams = teamsIn(league.slug);
  const others = LEAGUES.filter((l) => l.slug !== league.slug && l.tier === league.tier);

  return (
    <div className="pt-28 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>{league.name} | {NETWORK.name}</title>
        <meta name="description" content={league.blurb} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/leagues" className="inline-flex items-center gap-2 text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] mb-8">
          <ArrowLeft className="w-4 h-4" /> All leagues
        </Link>

        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">
          LEVEL {league.tier} · {tier.label.toUpperCase()} · {league.status.toUpperCase()}
        </span>
        <h1 className="text-[hsl(var(--black))] mb-4">{league.name.toUpperCase()}</h1>
        <p className="text-[hsl(var(--gray))] text-xl max-w-2xl mb-10">{league.blurb}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
            <MapPin className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
            <h4 className="text-2xl text-[hsl(var(--black))] m-0">WHO IT IS FOR</h4>
            <p className="text-[hsl(var(--gray))] m-0 mt-1">{league.area}</p>
          </div>
          <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
            <Building2 className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
            <h4 className="text-2xl text-[hsl(var(--black))] m-0">WHERE WE PLAY</h4>
            <p className="text-[hsl(var(--gray))] m-0 mt-1">{league.venue}</p>
          </div>
        </div>

        <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6 mb-6">
          <Users className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
          <h4 className="text-2xl text-[hsl(var(--black))] m-0">HOW THE SEASON WORKS</h4>
          <p className="text-[hsl(var(--gray))] m-0 mt-1">
            {league.teams} teams play each other home and away: {gamesFor(league.teams)} games over {SEASON.months} months.
          </p>
          <ul className="list-none p-0 m-0 mt-3 space-y-1">
            {describeMoves(league.slug).map((line) => (
              <li key={line} className="text-[hsl(var(--black))] font-semibold">{line}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6 mb-6">
          <Users className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
          <h4 className="text-2xl text-[hsl(var(--black))] m-0">TEAMS</h4>
          {leagueTeams.length > 0 ? (
            <ul className="list-none p-0 m-0 mt-2 flex flex-wrap gap-2">
              {leagueTeams.map((t) => (
                <li key={t.id} className="px-3 py-1 rounded-md bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] font-semibold text-sm">
                  {t.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[hsl(var(--gray))] m-0 mt-1">No teams yet. Be the first to register.</p>
          )}
          <Link to="/teams" className="inline-block mt-4 text-sm font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
            See all teams →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
            <Calendar className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
            <h4 className="text-2xl text-[hsl(var(--black))] m-0">SCHEDULE</h4>
            <p className="text-[hsl(var(--gray))] m-0 mt-1">Fixtures will be posted here once the season is set.</p>
          </div>
          <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
            <Trophy className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
            <h4 className="text-2xl text-[hsl(var(--black))] m-0">STANDINGS</h4>
            <p className="text-[hsl(var(--gray))] m-0 mt-1">The table appears after the first match day.</p>
          </div>
        </div>

        <div className="bg-[hsl(var(--black))] rounded-2xl p-8 text-center mb-14">
          <h3 className="text-white m-0 mb-2">PLAY IN THIS LEAGUE</h3>
          <p className="text-[hsl(var(--white))] mb-6">Register a team or sign up as a free agent.</p>
          <Link
            to={`/register?league=${league.slug}`}
            className="inline-block bg-[hsl(var(--primary))] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
          >
            Register
          </Link>
        </div>

        {others.length > 0 && (
          <>
            <h3 className="text-[hsl(var(--black))] mb-6">MORE {tier.label.toUpperCase()}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((l) => (
                <LeagueCard key={l.slug} league={l} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LeaguePage;
