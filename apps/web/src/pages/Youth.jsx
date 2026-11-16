import React from 'react';
import ProRelPyramid from '../components/ProRelPyramid.jsx';
import Cutout from '../components/Cutout.jsx';
import Photo from '../components/Photo.jsx';

function Youth() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
        <div>
          <span className="label-text text-xs font-bold tracking-widest text-[hsl(var(--primary))]">
            YOUTH
          </span>
          <h1 className="text-5xl sm:text-6xl text-[hsl(var(--black))] mt-1 mb-4">YOUTH FUTSAL</h1>
          <p className="text-[hsl(var(--gray))] max-w-xl m-0">
            Win your league and move up. Finish at the bottom and drop down a level. Tap a league to see its teams and venue.
          </p>
        </div>
        <Cutout
          src="/images/kids-group.jpg"
          alt="A group of young players in yellow and black shirts, laughing and posing together"
          tint="sand" className="aspect-[4/3]" width="1195" height="896" eager
        />
      </div>

      <h2 className="text-2xl text-[hsl(var(--black))] mb-6">THE PYRAMID</h2>
      <ProRelPyramid />

      <h2 className="text-2xl text-[hsl(var(--black))] mt-16 mb-6">IN THE GYM</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <Photo src="/images/gym-practice.jpg" alt="Kids in orange bibs and a coach on a gym floor with a ball" className="aspect-[3/4]" focus="object-[50%55%]" width="768" height="1024" />
        <Cutout src="/images/dribble-cones.jpg" alt="A player weaving the ball between cones in training" tint="lavender" className="aspect-[3/4]" imgClassName="object-top" width="896" height="1195" />
      </div>
    </main>
  );
}

export default Youth;
