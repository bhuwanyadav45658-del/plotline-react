import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { EnquiryProvider } from "./context/EnquiryContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Plots from "./pages/Plots.jsx";
import Houses from "./pages/Houses.jsx";
import Colonies from "./pages/Colonies.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a tick so the target section has rendered
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <EnquiryProvider>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plots" element={<Plots />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/colonies" element={<Colonies />} />
          <Route path="/colonies/:id" element={<Colonies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </EnquiryProvider>
  );
}

function NotFound() {
  return (
    <div className="wrap page-head">
      <h1>Page not found</h1>
      <p>That page doesn't exist. Use the menu to browse plots, houses or colonies.</p>
    </div>
  );
}
