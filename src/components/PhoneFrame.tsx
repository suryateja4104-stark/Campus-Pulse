import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-bg-base text-ink font-body overflow-x-hidden lg:fixed lg:inset-0 lg:bg-[#0B0F19] lg:flex lg:justify-center lg:items-center lg:p-6">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[60px] lg:blur-[100px]"
          style={{ backgroundColor: 'rgba(67, 97, 238, 0.18)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[60px] lg:blur-[100px]"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.14)' }}
        />
      </div>

      {/* Frame Container: 100% Full-bleed on Mobile (< 1024px), 390px x 844px Box on Desktop (>= 1024px) */}
      <div className="w-full min-h-screen lg:w-[390px] lg:h-[844px] lg:min-h-0 bg-bg-base lg:rounded-[48px] lg:shadow-2xl flex flex-col lg:border-[8px] lg:border-[#1E293B] relative z-10 overflow-hidden">
        <div className="hidden lg:block w-full h-2 flex-shrink-0 bg-transparent relative z-20" />
        <div className="flex-1 w-full z-10 overflow-y-auto no-scrollbar pb-28">
          {children}
        </div>
      </div>
    </div>
  );
};
