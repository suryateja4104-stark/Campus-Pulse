import React from 'react';

interface PulseRingProps {
  count: number;
}

export const PulseRing: React.FC<PulseRingProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/90 shadow-sm">
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Animated concentric rings */}
        <div className="absolute inset-0 rounded-full bg-coral opacity-50 animate-ping pulse-ring-anim" />
        <div className="absolute -inset-1 rounded-full border border-coral/60 opacity-60 animate-pulse pulse-ring-anim" />
        <div className="w-2 h-2 rounded-full bg-coral z-10" />
      </div>
      <span className="font-mono text-[13px] font-medium tracking-tight text-ink">
        {count} going
      </span>
    </div>
  );
};
