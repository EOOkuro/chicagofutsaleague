import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { NETWORK, LEAGUES } from '../data/leagues.js';
import { AGE_OPTIONS } from '../data/divisions.js';
import { TEAMS, REC_LEAGUES, fieldsGroup, statusOf, openGroups, groupLabel } from '../data/teams.js';

const selectClass =
  'h-10 rounded-md border border-input bg-[hsl(var(--true-white))] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]';

function TeamCard({ team }) {
  const status = statusOf(team);
  const open = openGroups(team);
  return (
    <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] shadow-sm p-5 flex flex-col">
      {status !== 'unknown' && (
        <span
          className={`label-text text-xs font-bold tracking-widest ${
            status === 'filled' ? 'text-[hsl(var(--gray))]' : 'text-[hsl(var(--primary))]'
          }`}
        >
          {status === 'filled' ? 'FILLED' : `SPOTS OPEN · ${open.length} AGE GROUP${open.length === 1 ? '' : 'S'}`}
        </span>
      )}
      <h4 className="text-2xl text-[hsl(var(--black))] m-0">{team.name.toUpperCase()}</h4>

      {team.groups && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {team.groups.map((g) => {
            const full = (team.filled || []).includes(g);
            return (
              <span
                key={g}
                className={`px-2 py-0.5 rounded-md text-xs font-bold tracking-wide ${
                  full
                    ? 'bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))]'
                    : 'bg-[hsl(var(--primary))] text-white'
                }`}
              >
                {groupLabel(team, g)}
              </span>
            );
          })}
        </div>
      )}

      {status === 'open' && (
        <Link
          to="/register?type=free-agent"
          className="mt-4 inline-block self-start text-sm font-bold uppercase tracking-wider text-[hsl(var(--primary))]"
        >
          Join as a free agent →
        </Link>
      )}
    </div>
  );
}

function Section({ title, sub, teams, empty }) {
  return (
    <section className="mb-12">
      <h3 className="text-[hsl(var(--black))] m-0">{title.toUpperCase()}</h3>
      {sub && <p className="text-[hsl(var(--gray))] mt-1 mb-4">{sub}</p>}
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      ) : (
        <p className="text-[hsl(var(--gray))] mt-3">{empty}</p>
      )}
    </section>
  );
}

function TeamsPage() {
  const [group, setGroup] = useState('');
  const [openOnly, setOpenOnly] = useState(false);
  const filtering = Boolean(group) || openOnly;

  const keep = (t) => {
    if (group && !fieldsGroup(t, group)) return false;
    if (openOnly) {
      if (statusOf(t) !== 'open') return false;
      if (group && (t.filled || []).includes(group)) return false;
    }
    return true;
  };

  const shown = TEAMS.filter(keep);
  const inLeague = (id) => shown.filter((t) => t.league === id);
  const unplaced = shown.filter((t) => !t.league);

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Teams | {NETWORK.name}</title>
        <meta name="description" content="Every team signed up for Chicago Futsal League and the rec leagues, by league and age group." />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">THE TEAMS</span>
        <h1 className="text-[hsl(var(--black))] mb-4">TEAMS</h1>
        <p className="text-[hsl(var(--gray))] text-xl max-w-2xl mb-10">
          Teams signed up for the season, listed by league, with their age groups.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectClass} aria-label="Age group">
            <option value="">All age groups</option>
            {AGE_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-[hsl(var(--black))] cursor-pointer">
            <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} />
            Open spots only
          </label>
          <span className="text-sm text-[hsl(var(--gray))] ml-auto">
            {shown.length} {shown.length === 1 ? 'team' : 'teams'}
          </span>
        </div>

        {LEAGUES.map((l) => {
          const teams = inLeague(l.slug);
          if (filtering && teams.length === 0) return null;
          return (
            <Section
              key={l.slug}
              title={l.name}
              sub={`${l.area} · ${l.venue} · every age group`}
              teams={teams}
              empty="No teams yet."
            />
          );
        })}

        {REC_LEAGUES.map((r) => {
          const teams = inLeague(r.id);
          if (teams.length === 0) return null;
          return (
            <Section
              key={r.id}
              title={r.name}
              sub={[r.area, r.venue].filter(Boolean).join(' · ')}
              teams={teams}
              empty=""
            />
          );
        })}

        {unplaced.length > 0 && (
          <Section title="Waiting for a league" sub="Signed up, league not set yet." teams={unplaced} empty="" />
        )}

        {filtering && shown.length === 0 && <p className="text-[hsl(var(--gray))] mb-12">No teams match that yet.</p>}

        <div className="bg-[hsl(var(--black))] rounded-2xl p-8 text-center">
          <h3 className="text-white m-0 mb-2">DON'T SEE YOUR TEAM?</h3>
          <p className="text-[hsl(var(--white))] mb-6">Register it and it will show up here.</p>
          <Link
            to="/register?type=team"
            className="inline-block bg-[hsl(var(--primary))] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors"
          >
            Register a team
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
