import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LeaguesPage from './pages/LeaguesPage.jsx';
import LeaguePage from './pages/LeaguePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
impprt Youth from './pages/Youth.jsx
import SponsorsPage from './pages/SponsorsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { NETWORK, LEAGUES } from './data/leagues.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
        <Helmet>
          <title>{NETWORK.name} | {NETWORK.tagline}</title>
          <meta name="description" content={`${LEAGUES.length} futsal leagues across Chicago, from UIC to neighborhood hubs on every side of the city.`} />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={NETWORK.name} />
          <meta name="twitter:card" content="summary" />
        </Helmet>

        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/leagues/:slug" element={<LeaguePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/youth" element={<Youth />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-20">
                  <h1 className="text-6xl text-[hsl(var(--black))] mb-4">404</h1>
                  <p className="text-xl text-[hsl(var(--gray))] mb-8">The page you are looking for does not exist.</p>
                  <Link to="/" className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors">
                    Back to Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
