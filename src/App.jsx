import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Seo from './components/Seo';
import Home from './pages/Home';
import Fees from './pages/Fees';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';

// Scrolls to #hash targets (e.g. /#faculty) or to the top on page change.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <section className="section container-x text-center">
      <Seo title="Page not found" description="This page does not exist." path="/404" noindex />
      <p className="eyebrow">Error 404</p>
      <h1 className="text-4xl font-bold">We couldn’t find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/70">The link may be old or mistyped. Let’s get you back on track.</p>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      <Header />
      <ScrollManager />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
