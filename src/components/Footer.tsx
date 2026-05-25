import React from "react";
import { Link } from "react-router-dom";
import { Leaf, MapPin, Phone, Mail, Instagram, Globe } from "lucide-react";
import { Settings } from "../types";

interface FooterProps {
  settings: Settings | null;
  cmsPages?: any[];
}

export default function Footer({ settings, cmsPages = [] }: FooterProps) {
  // Find contact block data from CMS
  const contactPage = cmsPages?.find((p: any) => p.slug === "hubungi-kami");
  const contactBlock = Array.isArray(contactPage?.content) 
    ? contactPage.content.find((b: any) => (b.type || "").replace(/-/g, "_") === "contacts")
    : null;
  const contactData = contactBlock?.data || {};

  const phones: string[] = (() => {
    if (Array.isArray(contactData.phone_numbers) && contactData.phone_numbers.length > 0) return contactData.phone_numbers;
    if (contactData.phone) return [contactData.phone];
    return ["+62 812-3456-7890"]; // Fallback
  })();
  
  const emails: string[] = (() => {
    if (Array.isArray(contactData.emails) && contactData.emails.length > 0) return contactData.emails;
    if (contactData.email) return [contactData.email];
    return ["kwtsorgum@gmail.com"]; // Fallback
  })();

  const addresses: string[] = (() => {
    if (Array.isArray(contactData.addresses) && contactData.addresses.length > 0) return contactData.addresses;
    if (contactData.address) return [contactData.address];
    return ["Desa Bojongmanggu, Kec. Pameungpeuk, Kabupaten Bandung, Jawa Barat"]; // Fallback
  })();
  
  const socialLinks: { name: string; url: string }[] = (() => {
    if (!Array.isArray(contactData.social_links)) return [];
    return contactData.social_links
      .filter((sl: any) => sl && (sl.url || sl.link))
      .map((sl: any) => ({
        name: sl.name || sl.platform || sl.label || "Link",
        url: sl.url || sl.link || ""
      }));
  })();

  const getSocialIcon = (name: string) => {
    if (!name) return <Globe className="w-5 h-5 text-brand-cream" />;
    const n = name.toLowerCase();
    if (n.includes("instagram")) return <Instagram className="w-5 h-5 text-brand-cream" />;
    if (n.includes("facebook")) return <Globe className="w-5 h-5 text-brand-cream" />;
    return <Globe className="w-5 h-5 text-brand-cream" />;
  };

  return (
    <footer className="py-20 bg-[#172b10] text-brand-cream/80 border-t border-brand-green/10 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-clay/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Profile */}
          <div className="flex flex-col gap-5 text-left">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="font-serif text-3xl font-bold tracking-tight text-white italic">
                {settings?.site_name || "KWT Melati Sorgum"}
              </span>
            </Link>
            <p className="text-brand-cream/70 text-sm font-light leading-relaxed">
              Kelompok Wanita Tani (KWT) Melati di Desa Bojongmanggu berdedikasi mengolah sorgum melalui kerja sama dan kegiatan edukatif demi kemandirian pangan lokal.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="text-left">
            <h4 className="text-white font-serif text-lg font-bold mb-6 italic underline decoration-brand-clay/30 underline-offset-8">Navigasi Halaman</h4>
            <ul className="space-y-3.5 text-sm font-light text-brand-cream/70">
              <li>
                <Link to="/" className="hover:text-white hover:pl-2 transition-all flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-clay group-hover:bg-white transition-colors"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/#profil" className="hover:text-white hover:pl-2 transition-all flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-clay group-hover:bg-white transition-colors"></span>
                  Profil Kami
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-white hover:pl-2 transition-all flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-clay group-hover:bg-white transition-colors"></span>
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-white hover:pl-2 transition-all flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-clay group-hover:bg-white transition-colors"></span>
                  Kabar Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-left">
            <h4 className="text-white font-serif text-lg font-bold mb-6 italic underline decoration-brand-clay/30 underline-offset-8">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm font-light text-brand-cream/70 mb-6">
              {addresses.map((addr, i) => (
                <li key={`footer-addr-${i}`} className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-brand-clay shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{addr}</span>
                </li>
              ))}
              {phones.map((ph, i) => (
                <li key={`footer-ph-${i}`} className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-brand-clay shrink-0" />
                  <a href={`https://wa.me/${String(ph).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{ph}</a>
                </li>
              ))}
              {emails.map((em, i) => (
                <li key={`footer-em-${i}`} className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-brand-clay shrink-0" />
                  <a href={`mailto:${em}`} className="hover:text-white transition-colors">{em}</a>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((sl, i) => (
                  <a 
                    key={`footer-social-${i}`}
                    href={sl.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={sl.name} 
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-clay hover:text-white hover:border-brand-clay transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    {getSocialIcon(sl.name)}
                  </a>
                ))
              ) : (
                <>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-clay hover:text-white hover:border-brand-clay transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <Instagram className="w-5 h-5 text-brand-cream" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-clay hover:text-white hover:border-brand-clay transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <Globe className="w-5 h-5 text-brand-cream" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Column 4: Collaboration / Synergy */}
          <div className="text-left">
            <h4 className="text-white font-serif text-lg font-bold mb-6 italic underline decoration-brand-clay/30 underline-offset-8">Sinergi Akademik</h4>
            <p className="text-brand-cream/70 text-sm font-light leading-relaxed mb-6">
              Didukung penuh oleh program PKM Abdimas Telkom University guna optimalisasi teknologi pemasaran dan pemberdayaan Kelompok Wanita Tani.
            </p>
            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-cream/50 leading-normal">
                Mitra Kolaborasi:<br />
                <span className="text-white font-serif italic font-bold">Telkom University & Ko+Lab FIT</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="text-[10px] uppercase tracking-[0.4em] text-brand-cream/40 text-center border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} KWT Melati Sorgum. All Rights Reserved.</span>
          <span className="tracking-[0.2em] md:text-right">Sinergi Inovasi Ko+Lab FIT & Telkom University</span>
        </div>
      </div>
    </footer>

  );
}
