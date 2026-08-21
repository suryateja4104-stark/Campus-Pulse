import React from 'react';
import { X, Sparkles, Activity, ShieldAlert, RefreshCw, Monitor, CheckCircle2 } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

interface CreativeFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreativeFeaturesModal: React.FC<CreativeFeaturesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: Activity,
      color: 'text-coral bg-peach/60',
      title: 'Concentric Pulse Ring',
      badge: 'Signature Visual',
      description:
        'Concentric animated rings that scale dynamically based on real-time attendee density. Provides immediate visual urgency for happening events without cluttering the UI.',
    },
    {
      icon: ShieldAlert,
      color: 'text-amber-600 bg-amber-100',
      title: 'Schedule Clash Guard',
      badge: 'Smart Utility',
      description:
        'An algorithmic overlap detector checking start/end timestamps against registered sessions. Automatically displays an amber warning banner if a newly selected event conflicts with your schedule.',
    },
    {
      icon: RefreshCw,
      color: 'text-sky-600 bg-sky-100',
      title: 'Pull-to-Refresh Campus Ripple',
      badge: 'Tactile UX',
      description:
        'Physics-inspired gesture interaction emitting a fluid ripple animation when pulling down on the feed, simulating shallow water waves to pull fresh campus announcements.',
    },
    {
      icon: Monitor,
      color: 'text-emerald-600 bg-emerald-100',
      title: 'Instant Dual-Viewport Switcher',
      badge: 'Demonstration Tech',
      description:
        'A single-click view mode switcher allowing judges and evaluators to seamlessly toggle between a locked 390px × 844px mobile device frame and a 3-column desktop dashboard.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <GlassPanel weight="chrome" className="w-full max-w-xl max-h-[85vh] overflow-y-auto no-scrollbar p-6 rounded-[32px] shadow-2xl relative border border-white/90">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 min-w-[40px] min-h-[40px] rounded-full bg-peach/50 hover:bg-peach flex items-center justify-center text-ink transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-coral text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-coral-deep font-semibold uppercase tracking-wider block">
              Innovation & Value-Add
            </span>
            <h2 className="font-display font-semibold text-xl text-ink">
              Creative Features Beyond Statement
            </h2>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex flex-col gap-3.5 mb-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <GlassPanel key={idx} weight="card" className="p-4 flex items-start gap-3.5 border border-white/90">
                <div className={`p-2.5 rounded-2xl ${feat.color} flex-shrink-0 mt-0.5 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-semibold text-sm text-ink truncate">
                      {feat.title}
                    </h3>
                    <span className="font-mono text-[10px] text-coral-deep bg-peach/60 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                      {feat.badge}
                    </span>
                  </div>
                  <p className="font-body text-xs text-ink leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </GlassPanel>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-white/60 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-coral text-white font-display font-semibold text-sm shadow-md hover:bg-coral-deep transition-all active:scale-95 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Explore Prototype
          </button>
        </div>
      </GlassPanel>
    </div>
  );
};
