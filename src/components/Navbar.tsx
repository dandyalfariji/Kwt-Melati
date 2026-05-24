import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Menu, X } from "lucide-react";
import { Settings } from "../types";

interface NavbarProps {
  settings: Settings | null;
  cmsPages: any[];
}

export default function Navbar({ settings, cmsPages }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Define static, clean navigation items to map correctly
  // This intercepts CMS misconfigurations and ignores PKM Abdimas (merged into home)
  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Profil Kami", path: "/#profil" },
    { name: "Galeri", path: "/galeri" },
    { name: "Berita", path: "/berita" }
  ];

  const isActive = (path: string) => {
    const [pathname, hash] = path.split("#");
    if (hash) {
      return location.pathname === pathname && location.hash === `#${hash}`;
    }
    if (path === "/") {
      return location.pathname === "/" && !location.hash;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-brand-green/5 shadow-[0_2px_20px_rgba(45,79,30,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center"
            >
              <img 
                src="/logo_kwt_baru.jpeg" 
                alt="Logo KWT Melati" 
                className="h-14 w-auto object-contain rounded-md drop-shadow-sm"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-800">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-1.5 transition-colors duration-300 hover:text-brand-green ${
                  isActive(item.path)
                    ? "text-brand-green font-black"
                    : "text-stone-800"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-green rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/hubungi-kami"
              className="px-6 py-3 bg-brand-green text-white rounded-full hover:bg-brand-olive transition-all transform hover:-translate-y-0.5 animate-pulse-soft font-bold uppercase tracking-widest text-[9px] shadow-lg shadow-brand-green/10 hover:shadow-brand-green/25"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-olive hover:text-brand-green transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-white/95 backdrop-blur-md border-b border-brand-green/5 py-8 px-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 text-lg font-serif text-brand-olive">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-brand-green transition-colors py-1.5 border-b border-stone-50 ${
                    isActive(item.path) ? "text-brand-green font-bold pl-2 border-l-2 border-brand-green" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/hubungi-kami"
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-brand-green transition-colors py-1.5 border-b border-stone-50 ${
                  isActive("/hubungi-kami") ? "text-brand-green font-bold pl-2 border-l-2 border-brand-green" : ""
                }`}
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

  );
}
