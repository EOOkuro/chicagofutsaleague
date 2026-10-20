import React from 'react';
import ProRelPyramid from '../components/ProRelPyramid.jsx';

function Youth() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <span className="label-text text-xs font-bold tracking-widest text-[hsl(var(--primary))]">
        YOUTH
      </span>
      <h1 className="text-5xl sm:text-6xl text-[hsl(var(--black))] mt-1 mb-4">YOUTH FUTSAL</h1>
      <p className="text-[hsl(var(--gray))] max-w-xl mb-12">
        Win your league and move up. Finish at the bottom and drop down a level. Tap a league to see its teams and venue.
      </p>

      <h2 className="text-2xl text-[hsl(var(--black))] mb-6">THE PYRAMID</h2>
      <ProRelPyramid />
    </main>
  );
}

export default Youth;
