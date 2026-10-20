import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, ArrowRight } from 'lucide-react';

function LeagueCard({ league }) {
  return (
    <Link
      to={`/leagues/${league.slug}`}
      className="group block bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
    >
      <span className="label-text text-xs font-bold tracking-widest text-[hsl(var(--primary))]">
        {league.status}
      </span>
      <h3 className="text-3xl text-[hsl(var(--black))] mt-1 mb-4">{league.name.toUpperCase()}</h3>
      <div className="space-y-2 text-[hsl(var(--gray))] mb-5">
        <p className="flex items-center gap-2 m-0">
          <MapPin className="w-4 h-4 shrink-0 text-[hsl(var(--primary))]" /> {league.area}
        </p>
        <p className="flex items-center gap-2 m-0">
          <Building2 className="w-4 h-4 shrink-0 text-[hsl(var(--primary))]" /> {league.venue}
        </p>
      </div>
      <span className="label-text font-bold text-sm text-[hsl(var(--black))] inline-flex items-center gap-2 group-hover:text-[hsl(var(--primary))] transition-colors">
        View league <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

export default LeagueCard;
