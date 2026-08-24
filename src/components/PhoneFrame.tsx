import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-bg-base text-ink relative font-body overflow-x-hidden">
      {/* 1. REAL MOBILE DEVICES (< 1024px): 100% Fits Exactly to Phone Screen (NO Black Canvas, NO Padding, NO Border) */}
      <div className="lg:hidden w-full min-h-screen flex flex-col relative z-10 bg-bg-base">
        {/* Soft subtle background glowing orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full blur-[60px]"
            style={{ backgroundColor: 'rgba(67, 97, 238, 0.18)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full blur-[60px]"
            style={{ backgroundColor: 'rgba(14, 165, 233, 0.14)' }}
          />
        </div>

        {/* 100% Full-bleed content container */}
        <div className="flex-1 w-full relative z-10 pb-28">
          {children}
        </div>
      </div>

      {/* 2. DESKTOP MONITORS ONLY (>= 1024px): 390px x 844px Phone Frame Shell in Dark Ambient Canvas */}
      <div className="hidden lg:flex fixed inset-0 bg-[#0B0F19] justify-center items-center p-6 z-0 overflow-hidden">
        {/* Desktop ambient background orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{ backgroundColor: 'rgba(67, 97, 238, 0.18)' }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{ backgroundColor: 'rgba(14, 165, 233, 0.14)' }}
          />
        </div>

        {/* 390px x 844px Phone Frame Shell */}
        <div className="relative w-[390px] h-[844px] bg-bg-base rounded-[48px] shadow-2xl flex flex-col border-[8px] border-[#1E293B] z-10 overflow-hidden">
          <div className="w-full h-2 flex-shrink-0 bg-transparent relative z-20" />
          <div className="flex-1 w-full z-10 overflow-y-auto no-scrollbar pb-28">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
