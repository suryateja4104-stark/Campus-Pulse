import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-bg-base sm:bg-[#0B0F19] flex justify-center items-center p-0 sm:p-6 relative font-body text-ink">
      {/* Outer ambient canvas for desktop view */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(67, 97, 238, 0.18)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.14)' }}
        />
      </div>

      {/* Mobile Viewport Container: Full-width/height on real phones (<768px), 390x844 Frame on Desktop */}
      <div className="relative w-full min-h-screen sm:min-h-0 sm:max-w-[390px] sm:h-[844px] bg-bg-base sm:rounded-[48px] shadow-none sm:shadow-2xl flex flex-col border-0 sm:border-[8px] sm:border-[#1E293B] z-10 overflow-hidden">
        {/* Inner background orbs */}
        <div className="fixed sm:absolute inset-0 pointer-events-none z-0 overflow-hidden">
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
