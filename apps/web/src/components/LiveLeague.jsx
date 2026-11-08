import React, { useEffect, useState } from 'react';
import { Calendar, Trophy } from 'lucide-react';
import { fedosReady, getFixtures, getStandings, niceWhen } from '../lib/fedos-public.js';

const card = 'bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6';

// Fixtures, results and standings for one league, read live from FedOS. Until FedOS has games, shows the same "coming soon" cards as before.
function LiveLeague({ slug }) {
  const [next, setNext] = useState(null);
  const [done, setDone] = useState([]);
  const [table, setTable] = useState(null);

  useEffect(() => {
    if (!fedosReady()) return;
    getFixtures(slug, { kind: 'upcoming', limit: 6 }).then(setNext).catch(() => setNext([]));
    getFixtures(slug, { kind: 'results', limit: 5 }).then(setDone).catch(() => {});
    getStandings(slug).then(setTable).catch(() => setTable([]));
  }, [slug]);

  const divisions = [...new Set((table || []).map((r) => r.division_name))];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div className={card}>
        <Calendar className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
        <h4 className="text-2xl text-[hsl(var(--black))] m-0">SCHEDULE</h4>
        {next && next.length > 0 ? (
          <ul className="list-none p-0 m-0 mt-3 space-y-3">
            {next.map((g) => (
              <li key={g.event_id} className="text-sm">
                <span className="block text-[hsl(var(--gray))]">{niceWhen(g.starts_at)}{g.venue ? ` · ${g.venue}` : ''}</span>
                <span className="font-bold text-[hsl(var(--black))]">{g.home_team ?? 'TBC'} vs {g.away_team ?? 'TBC'}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[hsl(var(--gray))] m-0 mt-1">Fixtures will be posted here once the season is set.</p>
        )}
        {done.length > 0 && (
          <>
            <h5 className="text-sm font-bold tracking-widest text-[hsl(var(--primary))] mt-5 mb-2">LATEST RESULTS</h5>
            <ul className="list-none p-0 m-0 space-y-1">
              {done.map((g) => (
                <li key={g.event_id} className="text-sm flex justify-between gap-3">
                  <span>{g.home_team} vs {g.away_team}</span>
                  <span className="font-bold">{g.home_score}–{g.away_score}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className={card}>
        <Trophy className="w-6 h-6 text-[hsl(var(--primary))] mb-3" />
        <h4 className="text-2xl text-[hsl(var(--black))] m-0">STANDINGS</h4>
        {table && table.length > 0 ? (
          divisions.map((d) => (
            <div key={d} className="mt-3">
              <span className="block text-xs font-bold tracking-widest text-[hsl(var(--primary))] mb-1">{d.toUpperCase()}</span>
              <table className="w-full text-sm">
                <thead><tr className="text-left text-[hsl(var(--gray))]"><th className="w-6">#</th><th>Team</th><th className="text-right">P</th><th className="text-right">GD</th><th className="text-right">Pts</th></tr></thead>
                <tbody>
                  {table.filter((r) => r.division_name === d).map((r) => (
                    <tr key={d + r.team_name}><td>{r.position}</td><td>{r.team_name}</td><td className="text-right">{r.played}</td><td className="text-right">{r.goal_difference}</td><td className="text-right font-bold">{r.points}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-[hsl(var(--gray))] m-0 mt-1">The table appears after the first match day.</p>
        )}
      </div>
    </div>
  );
}

export default LiveLeague;
