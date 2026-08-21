import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneFrame } from './PhoneFrame';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopDrawer } from './DesktopDrawer';
import { DesktopHeader } from './DesktopHeader';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  const { viewMode } = useApp();

  if (viewMode === 'mobile-frame') {
    return <PhoneFrame>{children}</PhoneFrame>;
  }

  return (
    <div className="min-h-screen w-full bg-bg-base text-ink flex relative overflow-x-hidden font-body">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(67, 97, 238, 0.16)' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.12)' }}
        />
      </div>

      {/* Left Glass Sidebar */}
      <DesktopSidebar />

      {/* Center Content Stage */}
      <main className="flex-1 min-w-0 flex flex-col relative z-10">
        <DesktopHeader />
        <div className="flex-1 p-2 md:p-4 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Right Activity Drawer */}
      <DesktopDrawer />
    </div>
  );
};
