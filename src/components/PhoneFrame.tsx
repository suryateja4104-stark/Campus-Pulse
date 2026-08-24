import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-bg-base text-ink font-body overflow-x-hidden md:fixed md:inset-0 md:flex md:justify-center md:items-center md:p-6 relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[60px] md:blur-[100px]"
          style={{ backgroundColor: 'rgba(67, 97, 238, 0.18)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[60px] md:blur-[100px]"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.14)' }}
        />
      </div>

      {/* Frame Container: 100% Full-bleed on Mobile (< 768px), 390px x 844px Box on Desktop (>= 768px) */}
      <div className="w-full min-h-screen md:w-[390px] md:h-[844px] md:min-h-0 bg-bg-base md:rounded-[48px] md:shadow-2xl flex flex-col md:border-[8px] md:border-[#1E293B] relative z-10 overflow-hidden">
        <div className="hidden md:block w-full h-2 flex-shrink-0 bg-transparent relative z-20" />
        <div className="flex-1 w-full z-10 overflow-y-auto no-scrollbar pb-28">
          {children}
        </div>
      </div>
    </div>
  );
};
