import React from 'react';
import { TRACKING, COED_GROUPS } from '../data/divisions.js';

const range = (groups) => (groups.length === 1 ? groups[0] : `${groups[0]}–${groups[groups.length - 1]}`);

function AgeGroups({ heading = 'AGE GROUPS', showIntro = true }) {
  return (
    <div>
      <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">U6 TO U18, PLUS ADULTS</span>
      <h2 className="text-[hsl(var(--black))] mb-3">{heading}</h2>
      {showIntro && (
        <p className="text-[hsl(var(--gray))] max-w-2xl mb-10">
          Every age group is split into boys and girls. Adults play in men's and women's divisions. How much we track grows with age.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {TRACKING.map((t) => (
          <div key={t.id} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
            <div className="font-['Bebas_Neue'] text-4xl text-[hsl(var(--primary))] leading-none mb-2">{range(t.groups)}</div>
            <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">{t.title.toUpperCase()}</h3>
            <p className="text-[hsl(var(--gray))] text-sm m-0">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
          <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">BOYS · GIRLS · MEN · WOMEN</h3>
          <p className="text-[hsl(var(--gray))] text-sm m-0">
            U6–U18 divisions are boys or girls. Adult divisions are men or women.
          </p>
        </div>
        <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
          <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">COED ENCOURAGED, {range(COED_GROUPS)}</h3>
          <p className="text-[hsl(var(--gray))] text-sm m-0">
            Teams choose whether they want to play coed. Register as coed if your team is comfortable with it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AgeGroups;
