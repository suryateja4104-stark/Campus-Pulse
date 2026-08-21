import React from 'react';
import { X, Palette, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

interface DesignJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignJourneyModal: React.FC<DesignJourneyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-coral-deep font-semibold uppercase tracking-wider block">
              Design Architecture
            </span>
            <h2 className="font-display font-semibold text-xl text-ink">
              Design Choices & User Journey
            </h2>
          </div>
        </div>

        {/* Section 1: Design Choices */}
        <div className="flex flex-col gap-4 mb-6">
          <h3 className="font-display font-semibold text-base text-ink flex items-center gap-2">
            <Layers className="w-4 h-4 text-coral" />
            Core Design System & Choices
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <GlassPanel weight="card" className="p-3.5 flex flex-col gap-1">
              <span className="font-mono text-xs text-coral-deep font-semibold">
                PRODLAB Brand Theme
              </span>
              <p className="font-body text-xs text-ink leading-relaxed">
                Utilizes PRODLAB's official Electric Blue (<code className="bg-peach/60 px-1 rounded">#4361EE</code>) paired with Slate Ink (<code className="bg-peach/60 px-1 rounded">#0F172A</code>) for a premium, athletic B-school aesthetic.
              </p>
            </GlassPanel>

            <GlassPanel weight="card" className="p-3.5 flex flex-col gap-1">
              <span className="font-mono text-xs text-coral-deep font-semibold">
                Frosted Glass Architecture
              </span>
              <p className="font-body text-xs text-ink leading-relaxed">
                Two-tier translucent weight model: Card panels at <code className="bg-peach/60 px-1 rounded">0.66</code> opacity / 28px blur; floating chrome at <code className="bg-peach/60 px-1 rounded">0.78</code> opacity / 36px blur.
              </p>
            </GlassPanel>

            <GlassPanel weight="card" className="p-3.5 flex flex-col gap-1">
              <span className="font-mono text-xs text-coral-deep font-semibold">
                Non-Negotiable Readability
              </span>
              <p className="font-body text-xs text-ink leading-relaxed">
                Strict contrast enforcement: 0.55 minimum opacity floor; body copy always sits on glass in high-contrast <code className="bg-peach/60 px-1 rounded">#0F172A</code>.
              </p>
            </GlassPanel>

            <GlassPanel weight="card" className="p-3.5 flex flex-col gap-1">
              <span className="font-mono text-xs text-coral-deep font-semibold">
                3-Font Strategy
              </span>
              <p className="font-body text-xs text-ink leading-relaxed">
                <strong>Bricolage Grotesque</strong> for headings; <strong>Manrope</strong> for descriptions; <strong>JetBrains Mono</strong> exclusively for departure-board times and attendee counts.
              </p>
            </GlassPanel>
          </div>
        </div>

        {/* Section 2: User Journey */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-semibold text-base text-ink flex items-center gap-2">
            <Compass className="w-4 h-4 text-aqua-deep" />
            End-to-End Student User Journey
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-white/90">
              <div className="w-6 h-6 rounded-full bg-coral text-white font-mono text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <span className="font-display font-semibold text-sm text-ink block">
                  Discovery & Live Interest Sensing
                </span>
                <p className="font-body text-xs text-ink-2 leading-relaxed">
                  Students open Campus Pulse and instantly spot trending events via the concentric <strong>Pulse Ring</strong>, filtering by academic, career, or sports interests.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-white/90">
              <div className="w-6 h-6 rounded-full bg-coral text-white font-mono text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <span className="font-display font-semibold text-sm text-ink block">
                  Conflict-Free Registration
                </span>
                <p className="font-body text-xs text-ink-2 leading-relaxed">
                  Tapping an event opens detail controls. The <strong>Schedule Clash Guard</strong> automatically alerts the student if the session overlaps with existing registrations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-white/90">
              <div className="w-6 h-6 rounded-full bg-coral text-white font-mono text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <span className="font-display font-semibold text-sm text-ink block">
                  Schedule Management & Reminders
                </span>
                <p className="font-body text-xs text-ink-2 leading-relaxed">
                  Registered spots appear in "My Schedule" alongside real-time club updates, custom reminder lead times (15 min / 1 hr), and departure-board countdowns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pt-4 border-t border-white/60 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-coral text-white font-display font-semibold text-sm shadow-md hover:bg-coral-deep transition-all active:scale-95 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Got It
          </button>
        </div>
      </GlassPanel>
    </div>
  );
};
