import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Calendar, Newspaper, Clock, ChevronRight, Tag } from "lucide-react";
import * as api from "../api";
import { Post } from "../types";
import { getPostImage } from "../App";
import { LeafBG } from "../components/Blocks";

const renderPostContent = (content: any): string => {
  if (!content) return "";
  if (typeof content === "string") return content;
  
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item;
        if (typeof item === "object") {
          // If it's a block structure
          if (item.type && item.data) {
            const data = item.data;
            return data.content || data.text || data.description || "";
          }
          // Direct properties - prioritize body_content
          return (
            item.body_content ||
            item.content ||
            item.text ||
            item.body ||
            item.value ||
            item.description ||
            item.excerpt ||
            ""
          );
        }
        return String(item);
      })
      .map((text) => {
        const trimmed = text.trim();
        if (!trimmed) return "";
        if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
          return trimmed;
        }
        return `<p class="mb-4">${trimmed.replace(/\n/g, "<br />")}</p>`;
      })
      .join("");
  }
  
  return String(content);
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

interface BeritaDetailProps {
  cmsNews?: Post[];
}

export default function BeritaDetail({ cmsNews = [] }: BeritaDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getPostDetail(slug);
        
        // Map data structure if needed
        const mappedPost = {
          ...data,
          image: getPostImage(data)
        };
        setPost(mappedPost);
      } catch (err: any) {
        console.error("Failed to load post detail:", err);
        setError("Gagal memuat detail berita. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] flex flex-col items-center justify-center gap-4 pt-20">
        <Loader2 className="w-10 h-10 text-brand-green animate-spin" />
        <p className="text-stone-500 font-serif italic">Memuat kabar terbaru...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] flex flex-col items-center justify-center gap-4 text-center px-4 pt-20">
        <h2 className="text-3xl font-serif font-bold text-brand-green">Detail Berita Tidak Ditemukan</h2>
        <p className="text-stone-500 max-w-md">{error || "Maaf, berita yang Anda cari tidak tersedia."}</p>
        <Link 
          to="/berita" 
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#FFD000] text-stone-900 rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-[#E6BC00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
        </Link>
      </div>
    );
  }

  const otherNews = cmsNews.filter(n => n.slug !== slug).slice(0, 5);
  const { tags, readingTime } = getPostMetadata(post.content);

  // Split tags into an array if it's a comma-separated string
  const tagsList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <article className="relative pt-32 pb-24 min-h-screen overflow-hidden bg-gradient-to-br from-[#F5F7F2] via-[#FAF9F6] to-[#E8F0E6] text-stone-900 selection:bg-[#FFD000]/30 text-left animate-in fade-in duration-500">
      {/* Organic Background Elements */}
      <LeafBG />
      
      {/* Custom CSS for Prose to handle specific bullet points and blockquotes precisely */}
      <style>{`
        .article-content ul {
          list-style: none;
          padding-left: 0;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .article-content ul li {
          position: relative;
          padding-left: 1.75rem;
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        .article-content ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.3rem;
          width: 1.25rem;
          height: 1.25rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FFD000' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'/%3E%3Cpolyline points='22 4 12 14.01 9 11.01'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
        }
        .article-content blockquote {
          border-left: 6px solid #FFD000;
          background-color: rgba(255, 208, 0, 0.05);
          padding: 1rem 1.5rem;
          border-radius: 0 1rem 1rem 0;
          font-style: italic;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          color: #444;
          margin: 1.5rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .article-content h2, .article-content h3 {
          color: #1c1917;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .article-content h2 { font-size: 2.25rem; }
        .article-content h3 { font-size: 1.75rem; }
        .article-content p {
          margin-bottom: 1.25rem;
          line-height: 1.7;
          color: #44403c;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/berita" 
          className="group inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-bold uppercase text-[10px] tracking-wider mb-8 transition-colors bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-stone-200 shadow-sm hover:shadow-md"
        >
          <div className="bg-[#FFD000] p-1 rounded-full text-stone-900 group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-3 h-3" />
          </div>
          Kembali ke Berita
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-8">
            {/* Header Section */}
            <div className="mb-6">
              {/* Category, Date & Reading Time */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#FFD000] text-stone-900 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {post.category || "Berita"}
                </span>
                
                {((post as any).created_at || (post as any).published_at || (post as any).date) && (
                  <span className="text-xs text-stone-500 flex items-center gap-1.5 font-medium bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-stone-100">
                    <Calendar className="w-3.5 h-3.5 text-[#FFD000]" /> 
                    {formatDate((post as any).created_at || (post as any).published_at || (post as any).date)}
                  </span>
                )}

                {readingTime && (
                  <span className="text-xs text-stone-500 flex items-center gap-1.5 font-medium bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-stone-100">
                    <Clock className="w-3.5 h-3.5 text-[#FFD000]" /> 
                    {readingTime}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-black text-stone-900 leading-[1.1] mb-6 drop-shadow-sm tracking-tight">
                {post.title}
              </h1>
            </div>

            {/* Hero/Feature Image */}
            <div className="w-full aspect-[16/9] md:aspect-[16/10] max-h-[500px] rounded-[2rem] overflow-hidden shadow-lg mb-8 bg-stone-100 border border-stone-200 relative group">
              <img 
                src={post.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200"} 
                alt={post.title} 
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Content Body */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 relative overflow-hidden">
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#FFD000]"></div>
              
              <div 
                className="article-content prose prose-lg max-w-none 
                           prose-a:text-brand-green hover:prose-a:text-[#FFD000] prose-a:transition-colors
                           prose-strong:text-stone-900 prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: renderPostContent(post.content) }}
              />
            </div>

            {/* Tags Section */}
            {tagsList.length > 0 && (
              <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 mb-8 lg:mb-0">
                <span className="text-sm font-bold text-stone-800 flex items-center gap-2 shrink-0">
                  <Tag className="w-4 h-4 text-[#FFD000]" /> Tag Artikel:
                </span>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-1.5 bg-[#FFD000]/10 hover:bg-[#FFD000]/20 text-[#B38800] hover:text-stone-900 transition-colors text-xs font-bold rounded-full border border-[#FFD000]/20 cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-4 sticky top-32">
            {/* Soft, Elevated Sidebar Card */}
            <div className="bg-[#FDFDFD] rounded-[2rem] border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 relative overflow-hidden">
              
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 pb-4 border-b border-stone-200 flex items-center gap-3 relative z-10">
                <div className="bg-[#FFD000]/20 p-2 rounded-lg">
                  <Newspaper className="w-5 h-5 text-[#B38800]" />
                </div>
                Berita Lainnya
              </h3>
              
              {otherNews.length > 0 ? (
                <div className="space-y-6 relative z-10">
                  {otherNews.map((news) => (
                    <Link 
                      key={news.id || news.slug} 
                      to={`/berita/${news.slug}`}
                      className="group flex gap-4 items-start p-2 -m-2 rounded-xl hover:bg-stone-50 transition-colors"
                    >
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm relative">
                        <img 
                          src={news.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=300"} 
                          alt={news.title}
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-stone-800 group-hover:text-[#B38800] transition-colors line-clamp-2 mb-2 leading-snug">
                          {news.title}
                        </h4>
                        {((news as any).created_at || (news as any).published_at || (news as any).date) && (
                          <div className="text-[10px] text-stone-500 flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#FFD000]" />
                            {formatDate((news as any).created_at || (news as any).published_at || (news as any).date)}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                  
                  <Link 
                    to="/berita"
                    className="group block text-center mt-6 pt-4 text-xs font-bold text-stone-800 hover:text-stone-900 uppercase tracking-wider transition-all"
                  >
                    <span className="flex items-center justify-center gap-2 bg-[#FFD000]/10 hover:bg-[#FFD000] hover:shadow-md py-3 px-4 rounded-xl transition-all">
                      Lihat Semua Berita 
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-stone-500 font-light italic relative z-10">Belum ada berita lainnya.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
