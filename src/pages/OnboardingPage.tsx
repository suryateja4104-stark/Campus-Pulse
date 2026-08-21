import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { GlassPanel } from '../components/GlassPanel';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Case Competitions', 'Product Management', 'Finance']);

  const interests = [
    'Case Competitions',
    'Product Management',
    'Finance & Valuation',
    'Consulting Frameworks',
    'D2C Growth',
    'Inter-Hostel Sports',
    'Acoustic Jam Sessions',
    'Angel Pitching',
    'Hackathons',
  ];

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const isContinueEnabled = selectedInterests.length >= 3;

  return (
    <div className="px-gutter pt-6 pb-28 min-h-full flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-4">
        <span className="font-mono text-xs text-coral-deep uppercase tracking-wider font-semibold">
          Step 1 of 3
        </span>
        <h1 className="font-display font-semibold text-2xl text-ink leading-tight">
          What are you excited about this term?
        </h1>
        <p className="font-body text-xs text-ink-2">
          Select at least 3 topics to customize your personalized campus feed.
        </p>

        {/* Interest Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {interests.map((item) => {
            const isSelected = selectedInterests.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleInterest(item)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full font-mono text-xs font-medium flex items-center gap-2 transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-peach/50 text-ink hover:bg-peach border border-white/80'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <GlassPanel weight="chrome" className="p-3 rounded-full">
        <button
          disabled={!isContinueEnabled}
          onClick={() => navigate('/feed')}
          className={`w-full min-h-[48px] rounded-full font-display font-semibold text-base transition-all ${
            isContinueEnabled
              ? 'bg-coral text-white shadow-md active:scale-95'
              : 'bg-peach/60 text-ink-3 cursor-not-allowed'
          }`}
        >
          {isContinueEnabled ? 'Continue to Feed' : `Select ${3 - selectedInterests.length} more`}
        </button>
      </GlassPanel>
    </div>
  );
};
