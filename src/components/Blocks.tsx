import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  ShoppingBag,
  Users,
  MapPin,
  Phone,
  ArrowRight,
  ChevronRight,
  Sun,
  ShieldCheck,
  Newspaper,
  Eye,
  Mail,
  Clock,
  Instagram,
  Globe,
  ExternalLink
} from "lucide-react";
import { Post, GalleryItem, Stat } from "../types";

export const optimizeGoogleDriveUrl = (url: string): string => {
  if (!url || typeof url !== "string") return url;
  const decodedUrl = url.replace(/&amp;/g, "&");
  
  // Convert Google Drive sharing URLs to direct thumbnail URLs
  // These work without CORS issues and without a proxy server
  const driveFileMatch = decodedUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}=w1200`;
  }
  
  const driveOpenMatch = decodedUrl.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (driveOpenMatch && driveOpenMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveOpenMatch[1]}=w1200`;
  }
  
  const driveUcMatch = decodedUrl.match(/drive\.google\.com\/uc\?.*id=([^&]+)/);
  if (driveUcMatch && driveUcMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveUcMatch[1]}=w1200`;
  }

  // Already a googleusercontent URL, return as-is
  if (decodedUrl.includes("googleusercontent.com")) {
    return decodedUrl;
  }

  return decodedUrl;
};

export const getIcon = (name: string, className = "w-5 h-5") => {
  const iconName = name?.toLowerCase() || "";
  if (iconName.includes("user") || iconName.includes("member") || iconName.includes("orang")) return <Users className={className} />;
  if (iconName.includes("map") || iconName.includes("pin") || iconName.includes("lokasi") || iconName.includes("alamat")) return <MapPin className={className} />;
  if (iconName.includes("bag") || iconName.includes("shop") || iconName.includes("produk") || iconName.includes("toko")) return <ShoppingBag className={className} />;
  if (iconName.includes("leaf") || iconName.includes("sorgum") || iconName.includes("organik") || iconName.includes("daun")) return <Leaf className={className} />;
  if (iconName.includes("sun") || iconName.includes("gluten") || iconName.includes("cerah") || iconName.includes("matahari")) return <Sun className={className} />;
  if (iconName.includes("shield") || iconName.includes("check") || iconName.includes("gizi") || iconName.includes("aman")) return <ShieldCheck className={className} />;
  if (iconName.includes("eye") || iconName.includes("lihat") || iconName.includes("digital") || iconName.includes("mata")) return <Eye className={className} />;
  if (iconName.includes("phone") || iconName.includes("tel") || iconName.includes("wa") || iconName.includes("hubungi")) return <Phone className={className} />;
  if (iconName.includes("news") || iconName.includes("koran") || iconName.includes("berita") || iconName.includes("kegiatan")) return <Newspaper className={className} />;
  return <Leaf className={className} />;
};

export const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
};

export const LeafBG = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    <div className="absolute top-10 left-10 w-24 h-24 text-brand-green/[0.03] animate-float rotate-12">
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M50,10 C35,25 30,45 40,65 C45,75 55,85 50,90 C45,85 40,75 35,65 C25,45 30,25 50,10 Z M50,10 C65,25 70,45 60,65 C55,75 45,85 50,90 C55,85 60,75 65,65 C75,45 70,25 50,10 Z" />
      </svg>
    </div>
    <div className="absolute bottom-20 right-10 w-32 h-32 text-brand-clay/[0.03] animate-float rotate-[45deg]" style={{ animationDelay: "1s" }}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M50,10 C35,25 30,45 40,65 C45,75 55,85 50,90 C45,85 40,75 35,65 C25,45 30,25 50,10 Z M50,10 C65,25 70,45 60,65 C55,75 45,85 50,90 C55,85 60,75 65,65 C75,45 70,25 50,10 Z" />
      </svg>
    </div>
    <div className="absolute top-1/3 right-1/4 w-16 h-16 text-brand-green/[0.03] animate-float -rotate-45" style={{ animationDelay: "2s" }}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M50,10 C35,25 30,45 40,65 C45,75 55,85 50,90 C45,85 40,75 35,65 C25,45 30,25 50,10 Z M50,10 C65,25 70,45 60,65 C55,75 45,85 50,90 C55,85 60,75 65,65 C75,45 70,25 50,10 Z" />
      </svg>
    </div>
  </div>
);

export const SmartLink = ({
  to,
  className,
  children,
  ...props
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const location = useLocation();

  if (!to) return <span className={className} {...props}>{children}</span>;

  const isHash = to.startsWith("#");
  const isExternal = to.startsWith("http://") || to.startsWith("https://") || to.startsWith("mailto:") || to.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isHash) {
    const targetHref = location.pathname === "/" ? to : `/${to}`;
    return (
      <a href={targetHref} className={className} {...props}>
        {children}
      </a>
    );
  }

  const routePath = to.startsWith("/") ? to : `/${to}`;

  return (
    <Link to={routePath} className={className} {...props}>
      {children}
    </Link>
  );
};

// --- Page Builder Block Components ---

export const HeroBlock = ({ data }: { data: any }) => {
  const title = data.title || data.headline || "Keajaiban <br /> <span class=\"italic font-light\">Sorgum</span> Lokal";
  const subtitle = data.subtitle || data.sub_headline || "Inovasi Pangan Sehat & Berkelanjutan";
  const description = data.description || data.text || "KWT Melati Sorgum Bojongmanggu menghadirkan dedikasi dalam setiap butir sorgum. Sinergi inovasi melalui Program PKM Abdimas Telkom University.";
  const primaryCtaText = data.primary_cta_text || data.button_text || "Lihat Profil Kami";
  const primaryCtaLink = data.primary_cta_link || data.button_link || "/#profil";
  const secondaryCtaText = data.secondary_cta_text || "Hubungi Kami";
  const secondaryCtaLink = data.secondary_cta_link || "/hubungi-kami";

  const bgImage = optimizeGoogleDriveUrl(data.background_image || data.backgroundImage || data.background_image_url || "");

  if (bgImage) {
    return (
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden text-center bg-stone-900">
        {/* Background Image with Scale Animation */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={bgImage}
            alt="Hero background"
            className="w-full h-full object-cover select-none"
          />
          {/* Overlays for premium text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
          <div className="absolute inset-0 bg-brand-green/10 mix-blend-color" />
        </div>

        <LeafBG />

        <div className="max-w-5xl mx-auto relative z-10 px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Soft border glowing badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-cream text-[10px] uppercase font-bold tracking-[0.25em] mb-8 shadow-xl animate-pulse-soft">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              {subtitle}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.15] mb-8 drop-shadow-2xl italic tracking-tight"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
            <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light drop-shadow">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <SmartLink to={primaryCtaLink} className="w-full sm:w-auto px-10 py-5 bg-brand-green text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-brand-green transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg shadow-brand-green/20 hover:shadow-white/20 hover:scale-105">
                {primaryCtaText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </SmartLink>
              <SmartLink to={secondaryCtaLink} className="w-full sm:w-auto px-10 py-5 border border-white/30 text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all duration-300 text-center hover:scale-105">
                {secondaryCtaText}
              </SmartLink>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 overflow-hidden text-center bg-[#fafaf6]">
      <LeafBG />

      <div className="max-w-4xl mx-auto relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-green text-[10px] uppercase font-bold tracking-[0.25em] mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-clay animate-pulse"></span>
            {subtitle}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-brand-green leading-[1.15] mb-10 tracking-tight"
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
          <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <SmartLink to={primaryCtaLink} className="w-full sm:w-auto px-10 py-5 bg-brand-green text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-olive transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg shadow-brand-green/20 hover:scale-105">
              {primaryCtaText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </SmartLink>
            <SmartLink to={secondaryCtaLink} className="w-full sm:w-auto px-10 py-5 border border-brand-green/20 text-brand-green rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-cream transition-all duration-300 text-center hover:border-brand-green hover:scale-105">
              {secondaryCtaText}
            </SmartLink>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-clay/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export const ProfileTabsBlock = ({ data }: { data: any }) => {
  const title = data.title || "Melati Sorgum: Dedikasi Sang Ibu Tani";
  const subtitle = data.subtitle || "Profil Kelompok";
  const badgeTitle = data.badge_title || data.badgeTitle || "100%";
  const badgeSubtitle = data.badge_subtitle || data.badgeSubtitle || "Organik & Alami Tanpa Bahan Pengawet";

  const rawTabs = data.tabs || data.items || [];
  const tabsWithFallback = rawTabs.length > 0 ? rawTabs : [
    {
      title: "Bebas Gluten",
      content: "Olahan sorgum kami 100% bebas gluten, sangat aman untuk pelaku hidup sehat."
    },
    {
      title: "Gizi Tinggi",
      content: "Kaya akan serat, protein, dan antioksidan alami dibanding beras biasa."
    }
  ];

  // Extract first image from tabs if data.image or data.image_url is not provided
  let extractedImage: string | null = null;
  const processedTabs = tabsWithFallback.map((tab: any) => {
    let tabContent = tab.content || tab.description || "";
    if (typeof tabContent !== "string") return tab;

    if (!data.image && !data.image_url && !extractedImage) {
      // 1. Check for standard <img> tags
      const imgMatch = tabContent.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        extractedImage = imgMatch[1];
        tabContent = tabContent.replace(/<img[^>]+>/i, "");
      } else {
        // 2. Check for any raw image or drive URL pasted in the text
        const urlRegex = /(https?:\/\/[^\s<"']*(?:\.jpg|\.jpeg|\.png|\.webp|\.gif|\.svg|drive\.google\.com|unsplash\.com|pexels\.com|pixabay\.com|istockphoto\.com|googleusercontent\.com)[^\s<"']*)/i;
        const urlMatch = tabContent.match(urlRegex);
        if (urlMatch && urlMatch[1]) {
          extractedImage = urlMatch[1];
          // Remove the URL and any wrapping tag if it was the only content of the tag
          const escapedUrl = urlMatch[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const tagRegex = new RegExp(`<[^>]+>\\s*${escapedUrl}\\s*<\\/[^>]+>`, 'i');
          if (tagRegex.test(tabContent)) {
            tabContent = tabContent.replace(tagRegex, "");
          } else {
            tabContent = tabContent.replace(urlMatch[0], "");
          }
        }
      }
    }

    return {
      ...tab,
      content: tabContent.trim()
    };
  });

  const [activeTab, setActiveTab] = useState(0);

  const rawImage = data.image || data.image_url || extractedImage;
  const image = rawImage ? optimizeGoogleDriveUrl(rawImage) : null;

  if (!image) {
    return (
      <section id="profil" className="py-16 md:py-20 bg-white relative text-center overflow-hidden">
        <LeafBG />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-3 bg-brand-clay/10 px-3 py-1 rounded-full italic">
            {subtitle}
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-6 leading-tight">
            {title}
          </h3>
          {data.description && <p className="text-sm md:text-base text-stone-600 mb-8">{data.description}</p>}
          
          <div className="inline-flex max-w-full bg-[#f2f2eb] p-1 rounded-xl mb-6 overflow-x-auto gap-1 border border-brand-olive/10 scrollbar-none">
            {processedTabs.map((tab: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative py-2.5 px-4 font-serif text-sm italic font-bold transition-all whitespace-nowrap rounded-lg z-10 flex items-center gap-1.5 ${
                  activeTab === idx
                    ? 'text-white'
                    : 'text-brand-olive/75 hover:text-brand-green hover:bg-brand-olive/5'
                }`}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeProfileTabNoImg"
                    className="absolute inset-0 bg-brand-green rounded-lg -z-10 shadow-md shadow-brand-green/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                {tab.title || tab.label || `Tab ${idx + 1}`}
              </button>
            ))}
          </div>

          <div className="p-6 bg-brand-cream/20 rounded-[1.5rem] border border-brand-olive/10 min-h-[140px] relative overflow-hidden shadow-inner text-left max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="text-stone-700 font-light prose prose-stone max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0 text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: processedTabs[activeTab]?.content || processedTabs[activeTab]?.description || "Konten tidak tersedia." }}
              />
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="profil" className="py-16 md:py-20 bg-white relative text-left overflow-hidden">
      <LeafBG />
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Image / Card */}
        <div className="relative group max-w-sm mx-auto lg:max-w-md w-full">
          {/* Clay Offset Frames */}
          <div className="absolute -inset-3 bg-brand-clay/10 rounded-[2rem] -rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02]" />
          <div className="absolute -inset-1.5 bg-brand-olive/10 rounded-[2rem] rotate-2 transition-transform duration-500 group-hover:rotate-0" />
          
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-brand-cream/50 z-10">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={image}
              alt={title}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="w-full h-full object-cover grayscale-[0.05] hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-4 -right-4 bg-brand-green text-brand-cream rounded-[1.5rem] p-4 border-2 border-white shadow-xl flex flex-col justify-center max-w-[150px] z-20 hover:scale-105 transition-transform duration-300">
            <span className="w-6 h-6 rounded-full bg-brand-cream/15 flex items-center justify-center mb-1.5 animate-float">
              <Leaf className="w-3 h-3 text-brand-cream" />
            </span>
            <h4 className="text-white font-serif text-2xl font-bold italic mb-1 leading-none">
              {badgeTitle}
            </h4>
            <p className="text-[8px] uppercase font-bold tracking-[0.1em] text-brand-cream/80 leading-normal">
              {badgeSubtitle}
            </p>
          </div>
        </div>

        {/* Text / Content */}
        <div>
          <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-3 bg-brand-clay/10 px-3 py-1 rounded-full italic">
            {subtitle}
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-6 leading-tight">
            {title}
          </h3>
          <div className="space-y-6 text-stone-600 leading-relaxed font-light">
            {data.description && <p className="text-sm md:text-base text-stone-600">{data.description}</p>}

            {/* Custom Styled Spring Tab Bar */}
            <div className="inline-flex max-w-full bg-[#f2f2eb] p-1 rounded-xl mb-6 overflow-x-auto gap-1 border border-brand-olive/10 scrollbar-none">
              {processedTabs.map((tab: any, idx: number) => (
                <button
                   key={idx}
                   onClick={() => setActiveTab(idx)}
                   className={`relative py-2.5 px-4 font-serif text-sm italic font-bold transition-all whitespace-nowrap rounded-lg z-10 flex items-center gap-1.5 ${
                    activeTab === idx
                      ? 'text-white'
                      : 'text-brand-olive/75 hover:text-brand-green hover:bg-brand-olive/5'
                  }`}
                >
                  {activeTab === idx && (
                    <motion.div
                      layoutId="activeProfileTab"
                      className="absolute inset-0 bg-brand-green rounded-lg -z-10 shadow-md shadow-brand-green/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  {tab.title || tab.label || `Tab ${idx + 1}`}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="p-6 bg-brand-cream/20 rounded-[1.5rem] border border-brand-olive/10 min-h-[140px] relative overflow-hidden shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="text-stone-700 font-light prose prose-stone max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0 text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: processedTabs[activeTab]?.content || processedTabs[activeTab]?.description || "Konten tidak tersedia." }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesBlock = ({ data }: { data: any }) => {
  const title = data.title || "PKM Abdimas Telkom University";
  const subtitle = data.subtitle || "Kolaborasi Akademik";

  const rawItems = data.features || data.items || [];
  const items = rawItems.length > 0 ? rawItems : [
    {
      title: "Digitalisasi Profil",
      description: "Pengembangan media informasi digital untuk memperluas jangkauan edukasi dan kerja sama KWT Melati.",
      icon: "Eye"
    },
    {
      title: "Optimasi Pemasaran",
      description: "Penyusunan strategi kemitraan agar lebih berdaya guna di lingkungan masyarakat modern.",
      icon: "Users"
    },
    {
      title: "Pemberdayaan SDM",
      description: "Pelatihan teknis bagi anggota kelompok tani dalam pengelolaan platform digital secara mandiri.",
      icon: "Users"
    }
  ];

  return (
    <section id="keunggulan" className="py-28 bg-[#fafaf5] text-center relative overflow-hidden">
      <LeafBG />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic">
          {subtitle}
        </span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-12 max-w-3xl mx-auto leading-tight">
          {title}
        </h3>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {items.map((item: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative bg-white p-10 rounded-[2.5rem] border border-brand-olive/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Decorative background accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/[0.02] rounded-bl-[5rem] group-hover:bg-brand-green/[0.05] transition-colors" />
              
              <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-green mx-auto mb-8 border border-brand-olive/10 group-hover:bg-brand-green group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                {getIcon(item.icon || item.iconName || "Leaf", "w-7 h-7")}
              </div>
              <h4 className="font-serif font-bold text-2xl mb-4 italic text-stone-800 group-hover:text-brand-green transition-colors">
                {item.title || item.name}
              </h4>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                {item.description || item.content}
              </p>

              {/* Step indicator */}
              <div className="mt-auto pt-6 border-t border-stone-100 flex justify-between items-center text-brand-clay font-bold uppercase text-[9px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                <span>Sinergi</span>
                <span>0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ActivitySliderBlock = ({ data }: { data: any }) => {
  const title = data.title || "Momen Kegiatan KWT Melati";
  const subtitle = data.subtitle || "Aktivitas Kelompok";

  const rawSlides = data.slides || data.items || data.activities || [];
  const slides = rawSlides.length > 0 ? rawSlides : [
    {
      title: "Pemanenan Sorgum",
      description: "Anggota kelompok tani melakukan pemanenan sorgum organik secara berkala.",
      image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Pengolahan Tepung",
      description: "Proses penggilingan biji sorgum menjadi tepung berkualitas tinggi.",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee20f60?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <section className="py-28 bg-white text-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic text-center">
            {subtitle}
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green max-w-3xl mx-auto leading-tight">
            {title}
          </h3>
        </div>

        <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[3rem] overflow-hidden group shadow-2xl border-4 border-white bg-brand-cream/30">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              src={optimizeGoogleDriveUrl(slides[currentSlide].image || slides[currentSlide].image_url)}
              alt={slides[currentSlide].title}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="w-full h-full object-cover select-none"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/35 to-transparent flex flex-col justify-end p-8 md:p-16 text-white text-left">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-cream text-[9px] uppercase font-bold tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Momen {currentSlide + 1} dari {slides.length}
              </div>
              <h4 className="font-serif text-3xl md:text-5xl font-bold mb-4 italic text-brand-cream">
                {slides[currentSlide].title}
              </h4>
              <p className="text-stone-300 text-sm md:text-base font-light max-w-2xl leading-relaxed">
                {slides[currentSlide].description || slides[currentSlide].content}
              </p>
            </motion.div>
          </div>

          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white text-white hover:text-brand-green rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 hover:scale-110 active:scale-95 shadow-lg group-hover:opacity-100 opacity-90"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white text-white hover:text-brand-green rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 hover:scale-110 active:scale-95 shadow-lg group-hover:opacity-100 opacity-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-6 right-6 md:right-16 flex gap-2.5 z-20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'bg-brand-clay w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export const DynamicPostFeedBlock = ({ data, allPosts }: { data: any; allPosts: Post[] }) => {
  const rawCategory = data.category || data.category_filter || "";
  const categoryFilter = typeof rawCategory === 'string' ? rawCategory.toLowerCase() : "";
  const limit = data.limit || 4;

  const isOriginallySplit = !categoryFilter || categoryFilter === 'semua' || categoryFilter === 'semua kategori' || categoryFilter === 'all';
  const title = data.title || (isOriginallySplit ? "Berita & Kegiatan Kelompok" : "Hasil Olahan Terbaik");
  const subtitle = data.subtitle || (isOriginallySplit ? "Kabar Terbaru" : "Etalase Sorgum");

  const products = allPosts.filter(p => p.category?.toLowerCase() === 'produk');
  const news = allPosts.filter(p => p.category?.toLowerCase() !== 'produk');

  // Disable split feed and product catalog
  const isSplitFeed = false;
  const isProductStyle = categoryFilter === 'produk';

  if (isProductStyle) {
    return null;
  }

  if (isSplitFeed) {
    const displayProducts = products.slice(0, 2);
    const displayNews = news.slice(0, 2);

    return (
      <section id="produk-berita-semua" className="py-28 bg-[#fafaf6] relative overflow-hidden">
        <LeafBG />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Products */}
            <div id="produk" className="flex flex-col justify-between h-full bg-gradient-to-br from-[#F4F8F5] to-white p-8 md:p-12 rounded-[3.5rem] border border-[#E8F0EB] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3.5 mb-8 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-brand-olive/10 flex items-center justify-center text-brand-olive border border-brand-olive/5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-clay">Jejaring Sinergi</span>
                    <h4 className="text-2xl font-serif font-bold text-brand-green italic leading-tight">Kerja Sama</h4>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-6 mb-10">
                  {displayProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/produk/${product.slug}`}
                      className="group flex gap-6 md:gap-10 items-center p-5 rounded-3xl hover:bg-brand-cream/35 border border-transparent hover:border-brand-olive/10 transition-all duration-300"
                    >
                      <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] overflow-hidden shrink-0 shadow-sm bg-brand-cream/50 border border-brand-olive/5">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1621939514649-280e2ee20f60?auto=format&fit=crop&q=80&w=400"}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-white px-2.5 py-1 bg-brand-clay rounded-full mb-3 shadow-sm">
                          {product.category}
                        </span>
                        <h5 className="font-serif font-bold text-xl text-stone-800 leading-snug group-hover:text-brand-green transition-colors truncate">
                          {product.title}
                        </h5>
                        <p className="text-stone-500 text-xs font-light line-clamp-2 mt-1 leading-relaxed">
                          {product.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/produk"
                className="w-full py-4 text-center bg-brand-green text-white hover:bg-brand-olive rounded-full font-bold uppercase text-[10px] tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-brand-green/10"
              >
                Lihat Semua Kerja Sama <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column: News */}
            <div id="berita" className="flex flex-col justify-between h-full bg-gradient-to-br from-[#FFFDF8] to-white p-8 md:p-12 rounded-[3.5rem] border border-[#F5EEDC] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3.5 mb-8 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-brand-olive/10 flex items-center justify-center text-brand-olive border border-brand-olive/5">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-clay">Kabar Kelompok</span>
                    <h4 className="text-2xl font-serif font-bold text-brand-green italic leading-tight">Berita & Kegiatan</h4>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-6 mb-10">
                  {displayNews.map((item) => (
                    <Link
                      key={item.id}
                      to={`/berita/${item.slug}`}
                      className="group flex gap-6 md:gap-10 items-center p-5 rounded-3xl hover:bg-brand-cream/35 border border-transparent hover:border-brand-olive/10 transition-all duration-300"
                    >
                      <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] overflow-hidden shrink-0 shadow-sm bg-brand-cream/50 border border-brand-olive/5">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400"}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-white px-2.5 py-1 bg-brand-olive rounded-full mb-3 shadow-sm">
                          {item.category}
                        </span>
                        <h5 className="font-serif font-bold text-xl text-stone-800 leading-snug group-hover:text-brand-green transition-colors truncate">
                          {item.title}
                        </h5>
                        <p className="text-stone-500 text-xs font-light line-clamp-2 mt-1 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/berita"
                className="w-full py-4 text-center bg-brand-green text-white hover:bg-brand-olive rounded-full font-bold uppercase text-[10px] tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-brand-green/10"
              >
                Lihat Semua Berita <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback styling for a single-category block
  const filteredPosts = (isProductStyle ? products : news).slice(0, limit);

  if (isProductStyle) {
    return (
      <section id="produk" className="py-28 container mx-auto px-4 text-left">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-3 bg-brand-clay/10 px-3 py-1 rounded-full italic">
              {subtitle}
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green leading-tight">{title}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <Link to={`/produk/${product.slug}`} className="block">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-0 shadow-md border-4 border-white bg-brand-cream/35">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1621939514649-280e2ee20f60?auto=format&fit=crop&q=80&w=400"}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* Floating Add to Cart Button */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-white text-brand-green rounded-2xl shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-green hover:text-white">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Caption Card */}
                  <div className="bg-white rounded-b-[2rem] rounded-t-none border-4 border-t-0 border-white shadow-md px-5 pt-4 pb-5 group-hover:bg-brand-cream/40 transition-colors duration-300">
                    <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-brand-clay px-3 py-1 bg-brand-clay/10 rounded-full mb-3">
                      {product.category || "Kerja Sama"}
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-brand-green transition-colors leading-snug line-clamp-2">
                      {product.title}
                    </h4>
                    <p className="text-stone-500 font-light text-sm line-clamp-2 leading-relaxed">
                      {product.excerpt || "Menjelajahi sinergi dan kolaborasi KWT Melati."}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-stone-500 font-light italic text-lg">Belum ada data kerja sama di kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section id="berita" className="py-28 bg-[#fafaf6] overflow-hidden text-left relative">
        <LeafBG />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-3 bg-brand-clay/10 px-3 py-1 rounded-full italic">
              {subtitle}
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green leading-tight">{title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group bg-white rounded-[2.5rem] p-6 border border-brand-olive/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[2rem] mb-8 shadow-sm border-2 border-brand-cream bg-stone-100">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400"}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-brand-clay font-bold uppercase text-[9px] tracking-widest mb-3">
                    <Newspaper className="w-3.5 h-3.5" />
                    {item.category}
                  </div>
                  <h4 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-brand-green transition-colors leading-snug line-clamp-2 min-h-[56px]">
                    {item.title}
                  </h4>
                  <p className="text-stone-500 text-sm font-light mb-8 line-clamp-2 leading-relaxed min-h-[44px]">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-stone-100">
                    <Link to={`/berita/${item.slug}`} className="text-brand-green font-bold uppercase text-[9px] tracking-[0.2em] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-stone-400 font-serif italic text-lg">
                Belum ada berita atau kegiatan.
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
};;

export const RichTextBlock = ({ data }: { data: any }) => {
  const title = data.title || "";
  const subtitle = data.subtitle || "";
  let content = data.content || data.text || "";

  // Check for image in data or extract from content
  let extractedImage: string | null = null;
  if (!data.image && !data.image_url) {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      extractedImage = imgMatch[1];
      content = content.replace(/<img[^>]+>/i, "");
    } else {
      const urlRegex = /(https?:\/\/[^\s<"']*(?:\.jpg|\.jpeg|\.png|\.webp|\.gif|\.svg|drive\.google\.com|unsplash\.com|pexels\.com|pixabay\.com|istockphoto\.com|googleusercontent\.com)[^\s<"']*)/i;
      const urlMatch = content.match(urlRegex);
      if (urlMatch && urlMatch[1]) {
        extractedImage = urlMatch[1];
        const escapedUrl = urlMatch[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const tagRegex = new RegExp(`<[^>]+>\\s*${escapedUrl}\\s*<\\/[^>]+>`, 'i');
        if (tagRegex.test(content)) {
          content = content.replace(tagRegex, "");
        } else {
          content = content.replace(urlMatch[0], "");
        }
      }
    }
  } else {
    // If image is provided in data, still strip raw image URLs from text just in case
    content = content.replace(/<img[^>]+>/gi, "");
    content = content.replace(/<p[^>]*>\s*(https?:\/\/[^\s<"']*(?:drive\.google\.com|unsplash\.com|\.jpg|\.jpeg|\.png|\.webp|\.gif)[^\s<"']*)\s*<\/p>/gi, "");
    content = content.replace(/(https?:\/\/[^\s<"']*(?:drive\.google\.com|unsplash\.com|\.jpg|\.jpeg|\.png|\.webp|\.gif)[^\s<"']*)/gi, "");
  }

  const rawImage = data.image || data.image_url || extractedImage;
  const image = rawImage ? optimizeGoogleDriveUrl(rawImage) : null;

  if (image) {
    return (
      <section className="py-16 md:py-24 bg-[#fafaf5] relative text-left overflow-hidden">
        <LeafBG />
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left: Image */}
          <div className="relative group w-full mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-3 bg-brand-clay/10 rounded-[2rem] -rotate-2 transition-transform duration-500 group-hover:rotate-0" />
            <div className="absolute -inset-1.5 bg-brand-olive/10 rounded-[2rem] rotate-2 transition-transform duration-500 group-hover:rotate-0" />
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-brand-cream/50 z-10">
              <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                src={image}
                alt={title || "Image"}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="relative">
            {subtitle && (
              <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-3 bg-brand-clay/10 px-3 py-1 rounded-full italic">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-6 leading-tight">
                {title}
              </h3>
            )}
            <div className="p-6 md:p-8 bg-white rounded-[2rem] shadow-sm border border-brand-olive/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-green via-brand-olive to-brand-clay" />
              <div
                className="prose prose-stone prose-lg max-w-none text-stone-600 font-light leading-relaxed [&>p:last-child]:mb-0 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to normal centered text layout if no image
  return (
    <section className="py-20 bg-white text-center relative overflow-hidden">
      <LeafBG />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {subtitle && <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic">{subtitle}</span>}
        {title && <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-8 leading-tight">{title}</h3>}
        <div className="p-8 md:p-12 bg-[#fafaf5] rounded-[3rem] shadow-sm border border-brand-olive/10">
          <div
            className="prose prose-lg max-w-none text-stone-600 font-light leading-relaxed mx-auto text-left md:text-center space-y-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
};



export const ContactsBlock = ({ data }: {
  data: any;
}) => {
  const title = data?.title || "Mari Berkolaborasi";
  const subtitle = data?.subtitle || "Sinergi Bersama";
  const description = data?.description || "Punya ide kegiatan bersama atau ingin berkunjung ke kebun kami? Jangan ragu untuk menyapa kami.";
  
  // Safely extract arrays from CMS data
  const phones: string[] = (() => {
    if (Array.isArray(data?.phone_numbers) && data.phone_numbers.length > 0) return data.phone_numbers;
    if (data?.phone) return [data.phone];
    return ["+62 812-3456-7890"];
  })();
  
  const addresses: string[] = (() => {
    if (Array.isArray(data?.addresses) && data.addresses.length > 0) return data.addresses;
    if (data?.address) return [data.address];
    return [];
  })();
  
  const emails: string[] = (() => {
    if (Array.isArray(data?.emails) && data.emails.length > 0) return data.emails;
    if (data?.email) return [data.email];
    return [];
  })();
  
  const mapLocationUrl: string = data?.map_location_url || data?.mapLocationUrl || "";
  const workingHours: string = data?.working_hours || data?.workingHours || "";
  
  // social_links can be array of { name: string, url: string } or { platform: string, url: string }
  const socialLinks: { name: string; url: string }[] = (() => {
    if (!Array.isArray(data?.social_links)) return [];
    return data.social_links
      .filter((sl: any) => sl && (sl.url || sl.link))
      .map((sl: any) => ({
        name: sl.name || sl.platform || sl.label || "Link",
        url: sl.url || sl.link || ""
      }));
  })();

  const getSocialIcon = (name: string) => {
    if (!name) return <Globe className="w-5 h-5" />;
    const n = name.toLowerCase();
    if (n.includes("instagram")) return <Instagram className="w-5 h-5" />;
    if (n.includes("facebook")) return <Globe className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  // Build the iframe embed src from the CMS map URL
  const buildEmbedSrc = (url: string): string => {
    if (!url) return "";
    if (url.includes("output=embed")) return url;
    
    // For full maps.google.com URLs with q= param
    if (url.includes("maps.google.com") && url.includes("q=")) {
      return url.includes("?") ? url + "&output=embed" : url + "?output=embed";
    }

    // For maps.google.com/maps/place/... URLs
    if (url.includes("/place/")) {
      const placeMatch = url.match(/\/place\/([^/]+)/);
      if (placeMatch && placeMatch[1]) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed`;
      }
    }

    // Try to extract coordinates @lat,lng
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
    }

    // Fallback: use generic query parameter with the encoded URL
    return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
  };

  const embedSrc = buildEmbedSrc(mapLocationUrl);
  const hasMap = !!mapLocationUrl;

  return (
    <section className="pt-12 pb-24 bg-brand-cream/40 text-left relative overflow-hidden">
      <LeafBG />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-[#1E4620] rounded-[3.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border-4 border-white">
          {/* Subtle natural background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="text-left flex flex-col justify-center">
              <span className="inline-block text-brand-cream/80 text-[10px] uppercase font-bold tracking-[0.3em] mb-4 text-left">
                {subtitle}
              </span>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6 italic leading-[1.1] text-left"
                dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
              <p className="text-brand-cream/70 text-sm md:text-base font-light mb-8 leading-relaxed max-w-lg">
                {description}
              </p>

              <div className="space-y-4">
                {/* Phone numbers */}
                {phones.map((ph, i) => (
                  <div key={`phone-${i}`} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-brand-green transition-all duration-300 shadow-md">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-0.5">WhatsApp Kami</div>
                      <a href={`https://wa.me/${String(ph).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-brand-cream/80 transition-colors">{ph}</a>
                    </div>
                  </div>
                ))}

                {/* Emails */}
                {emails.map((em, i) => (
                  <div key={`email-${i}`} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-brand-green transition-all duration-300 shadow-md">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-0.5">Email Kami</div>
                      <a href={`mailto:${em}`} className="text-lg font-bold hover:text-brand-cream/80 transition-colors">{em}</a>
                    </div>
                  </div>
                ))}

                {/* Addresses */}
                {addresses.map((addr, i) => (
                  <div key={`addr-${i}`} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-brand-green transition-all duration-300 shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-0.5">Lokasi Kami</div>
                      {mapLocationUrl ? (
                        <a href={mapLocationUrl} target="_blank" rel="noopener noreferrer" className="text-base font-bold hover:text-brand-cream/80 transition-colors underline leading-relaxed">{addr}</a>
                      ) : (
                        <div className="text-base font-bold leading-relaxed">{addr}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Working Hours */}
                {workingHours && (
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-brand-green transition-all duration-300 shadow-md">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-0.5">Jam Operasional</div>
                      <div className="text-lg font-bold">{workingHours}</div>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && socialLinks.map((sl, i) => {
                  let displayUrl = sl.url;
                  if (sl.url.includes("instagram.com/")) {
                    displayUrl = "@" + sl.url.split("instagram.com/")[1].replace(/\/$/, '');
                  } else {
                    displayUrl = sl.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
                  }

                  return (
                    <div key={`social-${i}`} className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-brand-green transition-all duration-300 shadow-md">
                        {getSocialIcon(sl.name)}
                      </div>
                      <div>
                        <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-0.5">{sl.name}</div>
                        <a
                          href={sl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold hover:text-brand-cream/80 transition-colors flex items-center gap-1.5"
                        >
                          {displayUrl}
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Map Embed from CMS map_location_url */}
            <div className="relative w-full h-[300px] lg:h-auto min-h-[350px] rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-brand-cream/5 flex items-center justify-center">
              {hasMap ? (
                embedSrc ? (
                  <iframe
                    src={embedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi KWT Melati Sorgum"
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <a
                    href={mapLocationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-6 w-full h-full text-center p-8 hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-cream group-hover:border-brand-cream transition-all duration-300 shadow-xl">
                      <MapPin className="w-10 h-10 text-brand-cream group-hover:text-brand-green transition-colors" />
                    </div>
                    <div>
                      <div className="text-white font-serif italic font-bold text-2xl mb-2">Lihat di Google Maps</div>
                      <p className="text-white/60 text-sm max-w-xs mx-auto">Klik tombol di bawah ini untuk membuka lokasi kami di aplikasi Google Maps.</p>
                    </div>
                    <div className="mt-2 px-8 py-3 bg-transparent border border-brand-cream rounded-full text-brand-cream text-xs font-bold uppercase tracking-[0.2em] group-hover:bg-brand-cream group-hover:text-brand-green transition-all shadow-lg">
                      Buka Peta &rarr;
                    </div>
                  </a>
                )
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-white/30 p-8 text-center">
                  <MapPin className="w-10 h-10" />
                  <p className="text-sm italic">Belum ada URL peta yang diset di CMS.</p>
                </div>
              )}
            </div>
          </div>

          <Leaf className="absolute -bottom-16 -left-16 w-60 h-60 text-white/5 rotate-45 pointer-events-none select-none" />
        </div>
      </div>
    </section>
  );
};

export const FAQBlock = ({ data }: { data: any }) => {
  const title = data.title || "Pertanyaan yang Sering Diajukan";
  const subtitle = data.subtitle || "Pusat Bantuan";

  const rawFaqs = data.faqs || data.items || [];
  const faqs = rawFaqs.length > 0 ? rawFaqs : [
    {
      question: "Apakah kegiatan KWT Melati terbuka untuk umum?",
      answer: "Tentu, kami sangat menyambut kolaborasi dari berbagai pihak."
    },
    {
      question: "Bagaimana cara menjalin kerja sama dengan kami?",
      answer: "Anda dapat menghubungi kami melalui halaman kontak atau mengirim pesan ke Whatsapp resmi KWT Melati."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-[#fafaf6] text-left relative overflow-hidden">
      <LeafBG />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic text-center">{subtitle}</span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green text-center">{title}</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-brand-olive/10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className={`w-full p-6 text-left font-serif font-bold text-lg md:text-xl text-stone-850 flex justify-between items-center transition-all ${
                    isOpen ? 'bg-brand-cream/25 text-brand-green' : 'hover:bg-brand-cream/10'
                  }`}
                >
                  <span className="pr-4 leading-snug">{faq.question || faq.title}</span>
                  <div className={`w-8 h-8 rounded-full bg-brand-cream/50 flex items-center justify-center text-brand-green transition-all duration-300 ${isOpen ? 'rotate-95 bg-brand-green text-white shadow-sm' : ''}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-stone-600 font-light leading-relaxed border-t border-stone-50/50">
                        <div
                          className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer || faq.content || "" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const TestimonialsBlock = ({ data }: { data: any }) => {
  const title = data.title || "Apa Kata Mereka Tentang Kami";
  const subtitle = data.subtitle || "Testimoni";

  const rawItems = data.testimonials || data.items || [];
  const items = rawItems.length > 0 ? rawItems : [
    {
      name: "Siti Rahma",
      role: "Pelanggan Pangan Sehat",
      quote: "Tepung sorgum dari KWT Melati sangat lembut dan cocok untuk membuat kue bebas gluten. Keluarga saya sangat menyukainya!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Dr. Ir. Budi Santoso",
      role: "Dosen Pembina PKM Telkom University",
      quote: "Luar biasa dedikasi ibu-ibu kelompok tani KWT Melati dalam melestarikan pangan lokal sorgum. Inovasi yang sangat berdampak.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <section className="py-28 bg-brand-cream/15 text-center relative overflow-hidden">
      <LeafBG />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic text-center">{subtitle}</span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-12 text-center">{title}</h3>

        <div className="bg-white p-8 md:p-16 rounded-[3.5rem] border border-brand-olive/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-6 left-6 text-6xl text-brand-clay/20 font-serif leading-none select-none">“</div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <p className="text-stone-600 text-lg md:text-2xl font-light italic leading-relaxed mb-8">
                {items[activeIndex].quote || items[activeIndex].content}
              </p>
              
              <div className="flex items-center justify-center gap-4">
                {items[activeIndex].image && (
                  <img
                    src={optimizeGoogleDriveUrl(items[activeIndex].image || items[activeIndex].image_url)}
                    alt={items[activeIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-green shadow-inner"
                  />
                )}
                <div className="text-left">
                  <h4 className="font-serif font-bold text-stone-800 text-lg leading-tight">{items[activeIndex].name}</h4>
                  <p className="text-xs text-brand-clay font-bold uppercase tracking-wider mt-0.5">{items[activeIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {items.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'bg-brand-green w-8 shadow-sm' : 'bg-gray-200 w-2.5 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const PartnersBlock = ({ data }: { data: any }) => {
  const title = data.title || "Didukung Oleh Mitra Kami";
  const subtitle = data.subtitle || "Kolaborasi & Kemitraan";

  const rawItems = data.partners || data.items || [];
  const items = rawItems.length > 0 ? rawItems : [
    { name: "Telkom University", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=150" }
  ];

  return (
    <section className="py-16 bg-white border-y border-brand-olive/10 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-3">{subtitle}</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-green mb-8">{title}</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-90 transition-opacity duration-300">
          {items.map((partner: any, idx: number) => (
            <div key={idx} className="h-12 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              {partner.logo || partner.logo_url ? (
                <img
                  src={partner.logo || partner.logo_url}
                  alt={partner.name}
                  className="h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="font-serif text-lg font-bold text-stone-500 hover:text-brand-green transition-colors">{partner.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TeamMembersBlock = ({ data }: { data: any }) => {
  const title = data.title || "Para Penggerak Melati Sorgum";
  const subtitle = data.subtitle || "Anggota Kelompok Tani";

  const rawItems = data.members || data.items || [];
  const items = rawItems.length > 0 ? rawItems : [
    { name: "Ibu Hj. Aminah", role: "Ketua KWT Melati", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
    { name: "Ibu Ratna", role: "Bendahara & Pengolahan Pangan", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300" }
  ];

  return (
    <section className="py-28 bg-[#fafaf6] text-center relative overflow-hidden">
      <LeafBG />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic">{subtitle}</span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green mb-12">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((member: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-md border-4 border-white bg-brand-cream/50">
                <img
                  src={member.image || member.image_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>
              <h4 className="font-serif font-bold text-stone-800 text-xl group-hover:text-brand-green transition-colors leading-tight">{member.name}</h4>
              <p className="text-xs text-brand-clay font-bold uppercase tracking-widest mt-1.5">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GalleryBlock = ({ data, fallbackGallery }: { data: any; fallbackGallery: any[] }) => {
  const title = data.title || "Momen Melati Sorgum";
  const subtitle = data.subtitle || "Galeri Dokumentasi";

  const images = (data.images && data.images.length > 0)
    ? data.images
    : fallbackGallery;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (i: number) => {
    setLightboxIdx(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxIdx(null);
    document.body.style.overflow = '';
  };
  const goNext = () => setLightboxIdx(prev => prev !== null ? (prev + 1) % images.length : null);
  const goPrev = () => setLightboxIdx(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);

  React.useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIdx]);

  const currentItem = lightboxIdx !== null ? images[lightboxIdx] : null;

  return (
    <>
      <section className="py-32 container mx-auto px-4 text-center">
        <div className="text-center mb-12">
          <span className="inline-block text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-brand-clay/10 px-3 py-1 rounded-full italic text-center">{subtitle}</span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green italic text-center">{title}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.length > 0 ? (
            images.map((item: any, i: number) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
                className="group relative aspect-square overflow-hidden rounded-[2.5rem] bg-brand-olive/5 border-4 border-white shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={optimizeGoogleDriveUrl(item.image || item.image_url || item.url)}
                  alt={item.title || item.alt_text || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-green/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6 text-center backdrop-blur-xs">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-8 h-8 mx-auto mb-2.5 text-brand-cream" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-cream">{item.title || item.image_title || "Perbesar"}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-stone-400 font-serif italic text-lg">
              Belum ada dokumentasi di galeri.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10 text-xl font-bold"
              aria-label="Tutup"
            >✕</button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10 text-2xl"
                aria-label="Sebelumnya"
              >‹</button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={optimizeGoogleDriveUrl(currentItem.image || currentItem.image_url || currentItem.url)}
                alt={currentItem.title || currentItem.alt_text || "Gallery image"}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
              {(currentItem.title || currentItem.caption || currentItem.image_title) && (
                <div className="mt-4 text-white/90 text-sm font-medium text-center">
                  {currentItem.title || currentItem.caption || currentItem.image_title}
                </div>
              )}
              <div className="mt-2 text-white/40 text-xs">{lightboxIdx + 1} / {images.length}</div>
            </motion.div>

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10 text-2xl"
                aria-label="Berikutnya"
              >›</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const CTABlock = ({ data }: { data: any }) => {
  const title = data.title || data.headline || "Mari Bermitra Dengan Kami";
  const subtitle = data.subtitle || "Hubungan Kerjasama";
  const buttonText = data.button_text || data.buttonText || "Hubungi Kami";
  const buttonLink = data.button_link || data.buttonLink || "/hubungi-kami";
  const bgColor = data.background_color || data.backgroundColor || "#a7522d"; // default clay color
  const bgImage = optimizeGoogleDriveUrl(data.background_image || data.backgroundImage || data.background_image_url || "");

  return (
    <section
      style={{ backgroundColor: bgImage ? undefined : bgColor }}
      className="relative py-28 text-white text-center overflow-hidden"
    >
      {bgImage && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={bgImage}
            alt="CTA background"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-neutral-950/65 mix-blend-multiply" />
          <div style={{ backgroundColor: bgColor }} className="absolute inset-0 opacity-30 mix-blend-color" />
        </div>
      )}

      {/* Decorative leaf background for organic touch */}
      <div className="absolute top-10 right-10 w-28 h-28 text-white/[0.04] rotate-45 select-none pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50,10 C35,25 30,45 40,65 C45,75 55,85 50,90 C45,85 40,75 35,65 C25,45 30,25 50,10 Z M50,10 C65,25 70,45 60,65 C55,75 45,85 50,90 C55,85 60,75 65,65 C75,45 70,25 50,10 Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="inline-block text-white/80 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-white/10 px-3 py-1 rounded-full italic">{subtitle}</span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight italic text-brand-cream">{title}</h3>
        <SmartLink
          to={buttonLink}
          className="inline-block px-10 py-5 bg-white text-brand-green hover:bg-brand-cream rounded-full font-bold uppercase text-[10px] tracking-[0.25em] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-300"
        >
          {buttonText}
        </SmartLink>
      </div>
    </section>
  );
};

export const renderBlock = (
  block: any,
  products: Post[],
  news: Post[],
  fallbackGallery: GalleryItem[],
  fallbackStats: Stat[],
  formState: any,
  setFormState: any,
  formStatus: any,
  handleContactSubmit: any
) => {
  const data = block.data || {};
  // Normalize type by replacing hyphens with underscores
  const blockType = (block.type || "").replace(/-/g, "_");

  try {
    switch (blockType) {
      case "hero":
        return <HeroBlock data={data} />;
      case "profile_tabs":
        return <ProfileTabsBlock data={data} />;
      case "activity_slider":
        return <ActivitySliderBlock data={data} />;
      case "dynamic_post_feed":
        return <DynamicPostFeedBlock data={data} allPosts={[...products, ...news]} />;
      case "rich_text":
        return <RichTextBlock data={data} />;
      case "contacts":
        console.log("[ContactsBlock] Rendering with data:", JSON.stringify(data, null, 2));
        return (
          <ContactsBlock
            data={data}
          />
        );
      case "features":
        return <FeaturesBlock data={data} />;
      case "faq":
        return <FAQBlock data={data} />;
      case "testimonials":
        return <TestimonialsBlock data={data} />;
      case "partners":
        return <PartnersBlock data={data} />;
      case "team_members":
        return <TeamMembersBlock data={data} />;
      case "gallery":
        return <GalleryBlock data={data} fallbackGallery={fallbackGallery} />;
      case "cta":
      case "cta_banner":
        return <CTABlock data={data} />;
      default:
        console.warn("Unknown block type:", block.type);
        return null;
    }
  } catch (err) {
    console.error(`[renderBlock] Error rendering block type "${blockType}":`, err);
    return null;
  }
};
