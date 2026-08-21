import React from 'react';
import { GlassPanel } from '../components/GlassPanel';

export const DiscoverPage: React.FC = () => {
  return (
    <div className="px-gutter pt-4 pb-28 min-h-full flex flex-col gap-4">
      <h1 className="font-display font-semibold text-2xl text-ink">Discover</h1>
      <GlassPanel weight="card" className="p-4">
        <p className="font-body text-sm text-ink-2">Discover screen placeholder</p>
      </GlassPanel>
    </div>
  );
};
