import React from 'react';
import { isMobilePhone } from '../context/AppContext';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const isMobile = isMobilePhone();

  // On real mobile devices: 100% Full-bleed filling the device screen completely (NO miniature phone frame)
  if (isMobile) {
    return (
      <div className="w-full min-h-screen bg-bg-base text-ink font-body relative overflow-x-hidden">
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
        <div className="w-full min-h-screen flex flex-col relative z-10 pb-28">
          {children}
        </div>
      </div>
    );
  }

  // On desktop monitors: Render 390px x 844px Preview Shell centered in dark ambient canvas
  return (
    <div className="fixed inset-0 bg-[#0B0F19] text-ink font-body flex justify-center items-center p-6 z-40 overflow-hidden">
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

      {/* 390px x 844px Desktop Simulated Phone Shell */}
      <div className="relative w-[390px] h-[844px] bg-bg-base rounded-[48px] shadow-2xl flex flex-col border-[8px] border-[#1E293B] z-10 overflow-hidden">
        <div className="w-full h-2 flex-shrink-0 bg-transparent relative z-20" />
        <div className="flex-1 w-full z-10 overflow-y-auto no-scrollbar pb-28">
          {children}
        </div>
      </div>
    </div>
  );
};
