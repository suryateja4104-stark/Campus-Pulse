import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex justify-center items-center p-2 sm:p-6 overflow-hidden relative font-body text-ink select-none">
      {/* Dark Ambient Background Canvas with Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(67, 97, 238, 0.22)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.18)' }}
        />
      </div>

      {/* Sleek 3D Phone Frame Container */}
      <div className="relative w-full max-w-[420px] h-[92vh] sm:h-[844px] bg-bg-base rounded-[36px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col border-[4px] sm:border-[8px] border-[#1E293B] z-10">
        {/* Inner background orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full blur-[60px]"
            style={{ backgroundColor: 'rgba(67, 97, 238, 0.18)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full blur-[60px]"
            style={{ backgroundColor: 'rgba(14, 165, 233, 0.14)' }}
          />
        </div>

        {/* Dynamic status bar clear space */}
        <div className="w-full h-2 flex-shrink-0 bg-transparent relative z-20" />

        {/* Scrollable Viewport Content */}
        <div className="flex-1 w-full relative z-10 overflow-y-auto no-scrollbar pb-24">
          {children}
        </div>
      </div>
    </div>
  );
};
