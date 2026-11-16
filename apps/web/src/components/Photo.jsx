import React from 'react';

// A regular photo (not a cut-out): rounded, cropped to fit, lazy-loaded.
// "focus" moves the crop, e.g. object-[50%_65%] keeps the players in frame when the box is wider than the picture.
function Photo({ src, alt, className = '', focus = 'object-center', width, height, eager = false }) {
  return (
    <div className={`overflow-hidden rounded-3xl bg-[hsl(var(--muted))] ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`block w-full h-full object-cover ${focus}`}
      />
    </div>
  );
}

export default Photo;
