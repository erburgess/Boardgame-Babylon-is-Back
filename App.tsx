import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { PodcastPage } from './pages/PodcastPage';

// ScrollToTop helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans text-gray-900">
        <ScrollToTop />
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<ArticlePage />} />
            <Route path="/podcast" element={<PodcastPage />} />
            {/* Fallback routes reuse home or simple placeholders for this demo */}
            <Route path="/blog" element={<HomePage />} />
            <Route path="/gamification" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;