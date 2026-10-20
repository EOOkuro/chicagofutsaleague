import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { LEAGUES, PROMOTIONS, RELEGATIONS } from '../data/leagues.js';

// Pro/rel pyramid. Reads from leagues.js by default, so editing leagues,
// PROMOTIONS or RELEGATIONS there updates this automatically.
// Pass your own leagues / promotions / relegations props to show a different pyramid.

const sumMoves = (moves, tierOf, fromTier, toTier) =>
  moves
    .filter((m) => tierOf[m.from] === fromTier && tierOf[m.to] === toTier)
    .reduce((n, m) => n + m.count, 0);

function ProRelPyramid({ leagues = LEAGUES, promotions = PROMOTIONS, relegations = RELEGATIONS }) {
  const tierOf = Object.fromEntries(leagues.map((l) => [l.slug, l.tier]));
  const tiers = [...new Set(leagues.map((l) => l.tier))].sort((a, b) => a - b);

  return (
    <div className="flex flex-col items-center w-full">
      {tiers.map((tier, i) => {
        const inTier = leagues.filter((l) => l.tier === tier);
        const isTop = i === 0;
        // Top row is narrowest, bottom row is full width.
        const width = tiers.length === 1 ? 100 : 46 + (54 * i) / (tiers.length - 1);
        const nextTier = tiers[i + 1];
        const promoted = nextTier ? sumMoves(promotions, tierOf, nextTier, tier) : 0;
        const relegated = nextTier ? sumMoves(relegations, tierOf, tier, nextTier) : 0;

        return (
          <React.Fragment key={tier}>
            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                isTop
                  ? 'bg-[hsl(var(--primary))] border-transparent'
                  : 'bg-[hsl(var(--true-white))] border-[hsl(var(--table-border))]'
              }`}
              style={{ width: `${width}%`, minWidth: 'min(100%, 280px)' }}
            >
              <p
                className={`label-text text-xs font-bold tracking-widest mb-3 text-center ${
                  isTop ? 'text-[hsl(var(--true-white))]' : 'text-[hsl(var(--primary))]'
                }`}
              >
                LEVEL {tier}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {inTier.map((l) => (
                  <Link
                    key={l.slug}
                    to={`/leagues/${l.slug}`}
                    className="flex-1 basis-[140px] max-w-[260px] rounded-xl border border-[hsl(var(--table-border))] bg-[hsl(var(--true-white))] px-3 py-3 text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    <span className="block font-bold text-sm text-[hsl(var(--black))] leading-tight">
                      {l.name}
                    </span>
                    <span className="block text-xs text-[hsl(var(--gray))] mt-1">
                      {l.teams} teams
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {nextTier && (
              <div className="flex items-center justify-center gap-5 py-3 text-xs label-text font-bold text-[hsl(var(--gray))]">
                <span className="inline-flex items-center gap-1">
                  <ArrowUp className="w-4 h-4 text-[hsl(var(--primary))]" /> {promoted} promoted
                </span>
                <span className="inline-flex items-center gap-1">
                  <ArrowDown className="w-4 h-4 text-[hsl(var(--primary))]" /> {relegated} relegated
                </span>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ProRelPyramid;
