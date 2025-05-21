import React from 'react';

// A modern, minimal SVG inspired by the provided ServicesIllustration.jpg
// Colors: #18181b (dark), #d4ff1f (lime/neon), #a78bfa (purple), #fff (white), #71717a (gray)
// This SVG is simplified for performance and clarity

const ServicesIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="services-illustration-title"
    role="img"
    {...props}
  >
    <title id="services-illustration-title">Professional with floating service screens and gears</title>
    {/* Main gear */}
    <g filter="url(#glow)">
      <circle cx="200" cy="320" r="60" fill="#a78bfa" fillOpacity="0.18" />
      <circle cx="200" cy="320" r="48" fill="#18181b" stroke="#a78bfa" strokeWidth="4" />
    </g>
    {/* Side gears */}
    <g filter="url(#glow)">
      <circle cx="90" cy="340" r="28" fill="#18181b" stroke="#71717a" strokeWidth="4" />
      <circle cx="310" cy="340" r="28" fill="#18181b" stroke="#71717a" strokeWidth="4" />
    </g>
    {/* Professional figure (simplified) */}
    <g>
      <ellipse cx="200" cy="250" rx="32" ry="16" fill="#000" opacity="0.08" />
      <rect x="180" y="180" width="40" height="80" rx="16" fill="#23272e" />
      <rect x="185" y="200" width="30" height="40" rx="10" fill="#fff" />
      {/* Head */}
      <circle cx="200" cy="170" r="20" fill="#fff" stroke="#71717a" strokeWidth="2" />
      {/* Hair */}
      <ellipse cx="200" cy="165" rx="14" ry="8" fill="#23272e" />
      {/* Laptop */}
      <rect x="210" y="210" width="32" height="18" rx="4" fill="#a78bfa" stroke="#fff" strokeWidth="1.5" />
      <rect x="212" y="212" width="28" height="6" rx="2" fill="#fff" opacity="0.3" />
      {/* Arm */}
      <rect x="170" y="210" width="12" height="32" rx="6" fill="#fff" />
      {/* Shoes */}
      <ellipse cx="190" cy="260" rx="7" ry="4" fill="#23272e" />
      <ellipse cx="210" cy="260" rx="7" ry="4" fill="#23272e" />
    </g>
    {/* Floating screens */}
    <g>
      {/* Left screen: flowchart */}
      <rect x="30" y="60" width="80" height="60" rx="10" fill="#23272e" stroke="#a78bfa" strokeWidth="2" />
      <rect x="40" y="70" width="60" height="8" rx="2" fill="#fff" opacity="0.12" />
      <rect x="40" y="85" width="40" height="6" rx="2" fill="#d4ff1f" opacity="0.18" />
      {/* Right screen: graph */}
      <rect x="290" y="60" width="80" height="60" rx="10" fill="#23272e" stroke="#a78bfa" strokeWidth="2" />
      <polyline points="305,110 320,90 340,100 355,80 365,105" fill="none" stroke="#d4ff1f" strokeWidth="3" />
      {/* Top right: profile */}
      <rect x="270" y="20" width="60" height="36" rx="8" fill="#23272e" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="285" cy="38" r="7" fill="#fff" />
      <rect x="295" y="32" width="25" height="6" rx="2" fill="#fff" opacity="0.18" />
      {/* Top left: pie chart */}
      <rect x="70" y="20" width="48" height="36" rx="8" fill="#23272e" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="90" cy="38" r="8" fill="#fff" opacity="0.18" />
      <path d="M90 38 L98 38 A8 8 0 0 0 90 30 Z" fill="#d4ff1f" />
      {/* Floating checkmark */}
      <circle cx="260" cy="90" r="16" fill="#23272e" stroke="#d4ff1f" strokeWidth="2" />
      <polyline points="254,90 259,95 266,85" fill="none" stroke="#d4ff1f" strokeWidth="3" />
    </g>
    {/* Neon glow filter */}
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

export default ServicesIllustration; 