import React from 'react';
import { SPONSORS } from '../data/sponsors.js';
import { useT } from '../lib/i18n.jsx';

function Logo({ sponsor }) {
  const { t } = useT();
  const img = (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className="w-28 h-28 sm:w-36 sm:h-36 object-contain rounded-xl"
      loading="lazy"
    />
  );
  const box =
    'flex items-center justify-center bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-4 transition-shadow';
  return sponsor.url ? (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('{name} (opens their website)', { name: sponsor.name })}
      className={`${box} hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--primary))]`}
    >
      {img}
    </a>
  ) : (
    <div className={box}>{img}</div>
  );
}

function SponsorStrip({ className = '' }) {
  const { t } = useT();
  return (
    <section className={`py-16 md:py-20 bg-[hsl(var(--true-white))] border-y border-[hsl(var(--white))] ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">{t('OUR SPONSORS')}</span>
        <h2 className="text-[hsl(var(--black))] mb-10">{t('THANK YOU TO OUR PARTNERS')}</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {SPONSORS.map((s) => (
            <Logo key={s.id} sponsor={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorStrip;
