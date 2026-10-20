import React from 'react';
import { Link } from 'react-router-dom';
import { NETWORK, LEAGUES } from '../data/leagues.js';

function Footer() {
  return (
    <footer className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-t-4 border-[hsl(var(--primary))] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white font-['Bebas_Neue'] text-xl">
                {NETWORK.short}
              </div>
              <span className="text-2xl font-['Bebas_Neue'] tracking-wide">{NETWORK.name.toUpperCase()}</span>
            </div>
            <p className="text-[hsl(var(--gray))] text-sm leading-relaxed">
              {LEAGUES.length} leagues and {LEAGUES.length} host venues bringing futsal to every part of Chicago.
            </p>
          </div>

          <div>
            <h4 className="label-text text-[hsl(var(--primary))] mb-4 text-lg">Leagues</h4>
            <ul className="space-y-2 p-0 list-none">
              {LEAGUES.map((l) => (
                <li key={l.slug}>
                  <Link to={`/leagues/${l.slug}`} className="text-[hsl(var(--gray))] hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-text text-[hsl(var(--primary))] mb-4 text-lg">Information</h4>
            <ul className="space-y-2 p-0 list-none">
              <li><Link to="/about" className="text-[hsl(var(--gray))] hover:text-white transition-colors">About</Link></li>
              <li><Link to="/sponsors" className="text-[hsl(var(--gray))] hover:text-white transition-colors">Sponsors</Link></li>
              <li><Link to="/contact" className="text-[hsl(var(--gray))] hover:text-white transition-colors">Join or contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-sm text-[hsl(var(--gray))]">
          © {new Date().getFullYear()} {NETWORK.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
