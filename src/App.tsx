import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { DesktopLayout } from './components/DesktopLayout';
import { BottomNav } from './components/BottomNav';
import { FeedPage } from './pages/FeedPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ClubPage } from './pages/ClubPage';
import { MyEventsPage } from './pages/MyEventsPage';
import { OnboardingPage } from './pages/OnboardingPage';

const AppRoutes: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <DesktopLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/club/:id" element={<ClubPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      {viewMode === 'mobile-frame' && <BottomNav />}
    </DesktopLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
