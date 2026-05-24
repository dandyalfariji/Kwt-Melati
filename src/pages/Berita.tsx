import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Newspaper, ChevronRight, Calendar, Search, X, Clock, Tag } from "lucide-react";
import { Post } from "../types";
import { LeafBG } from "../components/Blocks";

interface BeritaProps {
  cmsNews: Post[];
}

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

const getPostMetadata = (content: any) => {
  let tags = "";
  let readingTime = "";
  if (Array.isArray(content)) {
    content.forEach(item => {
      if (item && typeof item === "object") {
        if (!tags && item.tags) tags = item.tags;
        if (!readingTime && item.reading_time) readingTime = item.reading_time;
        if (item.data) {
          if (!tags && item.data.tags) tags = item.data.tags;
          if (!readingTime && item.data.reading_time) readingTime = item.data.reading_time;
        }
      }
    });
  }
  return { tags, readingTime };
};

export default function Berita({ cmsNews }: BeritaProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered news items with safe null checks
  const filteredNews = cmsNews.filter((item) => {
    const title = item.title || "";
    const excerpt = item.excerpt || "";
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const { tags: fTags, readingTime: fReadingTime } = filteredNews.length > 0 ? getPostMetadata(filteredNews[0].content) : { tags: "", readingTime: "" };
  const fTagsList = fTags ? fTags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden bg-gradient-to-br from-[#F5F7F2] via-[#FAF9F6] to-[#E8F0E6] text-stone-900 selection:bg-brand-olive/30">
      {/* Organic Background Elements */}
      <LeafBG />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 bg-white shadow-md border border-brand-green/5 px-5 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-brand-clay animate-pulse" />
            <span className="text-brand-clay font-bold uppercase tracking-[0.2em] text-[11px]">Kabar Terbaru</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-brand-green leading-tight"
          >
            Berita & Kegiatan Kelompok
          </motion.h1>
          

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="w-8 h-[1px] bg-brand-olive/15" />
            <svg className="w-4 h-4 text-brand-clay/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C11.5,4 9.5,6 6,6C5,8 5,10 7,12C8,13 9.5,12 11,10.5C11.5,12 11.5,13.5 10,15C9.5,15.5 9,16 9,16.5C9,17 10,17.5 10.5,17C12,15.5 12,13.5 12,12C12,13.5 12,15.5 13.5,17C14,17.5 15,17 15,16.5C15,16 14.5,15.5 14,15C12.5,13.5 12.5,12 13,10.5C14.5,12 16,13 17,12C19,10 19,8 18,6C14.5,6 12.5,4 12,2Z" />
            </svg>
            <div className="w-8 h-[1px] bg-brand-olive/15" />
          </motion.div>
        </div>

        {/* Search Section */}
        {cmsNews.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 flex justify-center"
          >
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Cari berita atau kegiatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-brand-olive/15 rounded-full text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="relative">
          {filteredNews.length > 0 ? (
            <>
              {/* Grid Posts */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-10 text-left">
                <AnimatePresence mode="popLayout">
                  {filteredNews.map((item, idx) => {
                    const { tags: gTags, readingTime: gReadingTime } = getPostMetadata(item.content);
                    const gTagsList = gTags ? gTags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

                    return (
                      <motion.article 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="group bg-white rounded-[2.5rem] border border-white/60 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                      >
                        <div className="aspect-[16/10] overflow-hidden relative shadow-sm">
                          <img 
                            src={item.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600"} 
                            alt={item.title} 
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-brand-green text-white px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm">
                            {item.category || "Artikel"}
                          </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            {((item as any).created_at || (item as any).published_at || (item as any).date) && (
                              <div className="text-[11px] text-stone-400 flex items-center gap-1.5 font-light">
                                <Calendar className="w-3.5 h-3.5 text-brand-clay" />
                                {formatDate((item as any).created_at || (item as any).published_at || (item as any).date)}
                              </div>
                            )}
                            {gReadingTime && (
                              <div className="text-[11px] text-stone-400 flex items-center gap-1.5 font-light">
                                <Clock className="w-3 h-3 text-[#FFD000]" />
                                {gReadingTime}
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-brand-green transition-colors leading-tight line-clamp-2 min-h-[50px]">
                            {item.title}
                          </h3>
                          
                          <p className="text-stone-500 text-sm font-light mb-4 line-clamp-3 leading-relaxed min-h-[68px]">
                            {item.excerpt}
                          </p>

                          <div className="mt-auto flex flex-col">
                            <div className="flex flex-wrap gap-1.5 mb-6 min-h-[24px]">
                              {gTagsList.length > 0 && gTagsList.slice(0, 2).map((t: string, i: number) => (
                                <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-[#FFD000]/10 border border-[#FFD000]/20 text-[#B38800] font-bold uppercase tracking-wider">
                                  #{t}
                                </span>
                              ))}
                            </div>
                            
                            <div className="pt-5 border-t border-stone-100 flex items-center justify-between">
                              <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-light">
                                <Newspaper className="w-3.5 h-3.5 text-brand-clay" />
                                Baca Artikel
                              </span>
                              <Link 
                                to={`/berita/${item.slug}`} 
                                className="w-10 h-10 rounded-full bg-brand-green/5 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-sm"
                              >
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center text-stone-400 font-serif italic max-w-md mx-auto"
            >
              <Newspaper className="w-16 h-16 text-stone-300 mx-auto mb-4 animate-float" />
              <p className="text-lg">
                {searchQuery 
                  ? "Belum ada berita atau kegiatan yang cocok dengan pencarian Anda." 
                  : "Belum ada berita atau kegiatan yang dipublikasikan saat ini."}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
