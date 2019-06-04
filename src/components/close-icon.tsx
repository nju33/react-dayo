import React from 'react';

const Component: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
): JSX.Element => (
  <svg width="1em" height="1em" viewBox="0 0 500 500" fill="none" {...props}>
    <rect
      x={27}
      y={53.1765}
      width={37.0191}
      height={592.306}
      rx={18.5096}
      transform="rotate(-45 27 53.1765)"
      fill="black"
    />
    <rect
      width={37.0191}
      height={592.306}
      rx={18.5096}
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 472 53.1765)"
      fill="black"
    />
  </svg>
);

export default Component;
