import React from 'react';

// The league photos are cut-outs on a white background. "multiply" makes that white take on the panel colour,
// so the players look like they are standing on the page instead of sitting in a white box.
// Only use on light panels (on a dark background the players would disappear).
const TINTS = {
  lavender: 'bg-[hsl(260_100%_95%)]',
  sand: 'bg-[hsl(var(--background))]',
  white: 'bg-white',
};

function Cutout({ src, alt, tint = 'lavender', className = '', imgClassName = '', width, height, eager = false }) {
  return (
    <div className={`isolate overflow-hidden rounded-3xl ${TINTS[tint] ?? TINTS.lavender} ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`block w-full h-full mix-blend-multiply object-cover ${imgClassName}`}
      />
    </div>
  );
}

export default Cutout;
