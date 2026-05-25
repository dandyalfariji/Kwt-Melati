import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import * as api from "./api";
import { Product, Stat, GalleryItem, Post, Navigation, Settings } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Berita from "./pages/Berita";
import BeritaDetail from "./pages/BeritaDetail";
import PageRenderer from "./pages/PageRenderer";

const getCmsOrigin = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  try {
    const url = new URL(baseUrl);
    return url.origin;
  } catch (e) {
    return "https://uni-verse-headless-cms.onrender.com";
  }
};

const optimizeGoogleDriveUrl = (url: string): string => {
  if (!url || typeof url !== "string") return url;
  const decodedUrl = url.replace(/&amp;/g, "&");
  
  // If it's already a local proxy URL, return as-is
  if (decodedUrl.startsWith('/api/img-proxy')) return decodedUrl;
  
  // Proxy all Google Drive and googleusercontent images through local server to bypass CORS
  if (decodedUrl.includes("drive.google.com") || decodedUrl.includes("googleusercontent.com")) {
    return `/api/img-proxy?url=${encodeURIComponent(decodedUrl)}`;
  }

  return decodedUrl;
};

export const getPostImage = (post: any): string => {
  if (!post) return "";
  const origin = getCmsOrigin();
  let imgUrl = "";
  
  if (typeof post.image === "string" && post.image) {
    if (post.image.startsWith("http") || post.image.startsWith("data:")) {
      imgUrl = post.image;
    } else {
      imgUrl = `${origin}${post.image.startsWith("/") ? "" : "/"}${post.image}`;
    }
  } else if (post.featured_image) {
    if (typeof post.featured_image === "string") {
      if (post.featured_image.startsWith("http") || post.featured_image.startsWith("data:")) {
        imgUrl = post.featured_image;
      } else {
        imgUrl = `${origin}${post.featured_image.startsWith("/") ? "" : "/"}${post.featured_image}`;
      }
    } else if (typeof post.featured_image === "object") {
      if (post.featured_image.url) {
        imgUrl = post.featured_image.url;
      } else if (post.featured_image.path) {
        if (post.featured_image.path.startsWith("http")) {
          imgUrl = post.featured_image.path;
        } else {
          imgUrl = `${origin}${post.featured_image.path.startsWith("/") ? "" : "/"}${post.featured_image.path}`;
        }
      }
    }
  } else if (post.featured_image_url) {
    imgUrl = post.featured_image_url;
  } else if (post.image_url) {
    imgUrl = post.image_url;
  } else if (Array.isArray(post.content) && post.content.length > 0) {
    const firstBlock = post.content[0];
    if (firstBlock) {
      if (typeof firstBlock.featured_image === "string" && firstBlock.featured_image) {
        if (firstBlock.featured_image.startsWith("http")) {
          imgUrl = firstBlock.featured_image;
        } else {
          imgUrl = `${origin}${firstBlock.featured_image.startsWith("/") ? "" : "/"}${firstBlock.featured_image}`;
        }
      } else if (typeof firstBlock.featured_image === "object" && firstBlock.featured_image) {
        if (firstBlock.featured_image.url) {
          imgUrl = firstBlock.featured_image.url;
        } else if (firstBlock.featured_image.path) {
          if (firstBlock.featured_image.path.startsWith("http")) {
            imgUrl = firstBlock.featured_image.path;
          } else {
            imgUrl = `${origin}${firstBlock.featured_image.path.startsWith("/") ? "" : "/"}${firstBlock.featured_image.path}`;
          }
        }
      }
    }
  } else if (Array.isArray(post.content_blocks) && post.content_blocks.length > 0) {
    const firstBlock = post.content_blocks[0];
    if (firstBlock) {
      if (typeof firstBlock.featured_image === "string" && firstBlock.featured_image) {
        if (firstBlock.featured_image.startsWith("http")) {
          imgUrl = firstBlock.featured_image;
        } else {
          imgUrl = `${origin}${firstBlock.featured_image.startsWith("/") ? "" : "/"}${firstBlock.featured_image}`;
        }
      } else if (typeof firstBlock.featured_image === "object" && firstBlock.featured_image) {
        if (firstBlock.featured_image.url) {
          imgUrl = firstBlock.featured_image.url;
        } else if (firstBlock.featured_image.path) {
          if (firstBlock.featured_image.path.startsWith("http")) {
            imgUrl = firstBlock.featured_image.path;
          } else {
            imgUrl = `${origin}${firstBlock.featured_image.path.startsWith("/") ? "" : "/"}${firstBlock.featured_image.path}`;
          }
        }
      }
    }
  }

  return optimizeGoogleDriveUrl(imgUrl);
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        let attempts = 0;
        const intervalId = setInterval(() => {
          attempts++;
          if (scrollToElement() || attempts >= 10) {
            clearInterval(intervalId);
          }
        }, 100);
        return () => clearInterval(intervalId);
      }
    } else {
      window.scrollTo(0, 0);

      // Fallback delay to ensure it stays at the top after rendering
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);

      const timeoutId2 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(timeoutId2);
      };
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [cmsProducts, setCmsProducts] = useState<Post[]>([]);
  const [cmsNews, setCmsNews] = useState<Post[]>([]);
  const [cmsPages, setCmsPages] = useState<any[]>([]);
  const [navigation, setNavigation] = useState<Navigation[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [s, g, postsData, navData, settingsData, pagesData] = await Promise.all([
          api.fetchStats(),
          api.fetchGallery(),
          api.getPosts(),
          api.getNavigation(),
          api.getSettings(),
          api.getPages().catch(() => [])
        ]);
        
        // Map posts to resolve image URL from nested content structure
        const postsWithImages = postsData.map((post: any) => ({
          ...post,
          image: getPostImage(post)
        }));

        // Filter posts based on category
        const productsList = postsWithImages.filter((p: any) => (p.category || '').toLowerCase() === 'produk');
        const newsList = postsWithImages.filter((p: any) => (p.category || '').toLowerCase() !== 'produk');
        
        setCmsProducts(productsList);
        setCmsNews(newsList);
        setStats(s);
        setGallery(g);
        // Sort navigation by priority
        setNavigation(navData.sort((a: Navigation, b: Navigation) => a.priority - b.priority));
        setSettings(settingsData);
        // Dynamically insert the Profile Tabs section into the Beranda page content if not already present
        const berandaPage = pagesData.find((p: any) => p.slug === "beranda");
        const profilPage = pagesData.find((p: any) => p.slug === "profil");
        
        if (berandaPage && profilPage) {
          const hasProfileBlock = berandaPage.content.some((b: any) => b.type === "profile-tabs" || b.type === "profile_tabs");
          if (!hasProfileBlock) {
            const profileBlock = profilPage.content.find((b: any) => b.type === "profile-tabs" || b.type === "profile_tabs");
            if (profileBlock) {
              const heroIndex = berandaPage.content.findIndex((b: any) => b.type === "hero");
              const insertIndex = heroIndex !== -1 ? heroIndex + 1 : 1;
              const newContent = [...berandaPage.content];
              newContent.splice(insertIndex, 0, {
                ...profileBlock,
                id: profileBlock.id + "_injected"
              });
              berandaPage.content = newContent;
            }
          }
        }

        setCmsPages(pagesData.sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0)));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: null, message: "" });
    try {
      await api.submitContact(formState);
      setFormStatus({ type: "success", message: "Pesan Anda berhasil dikirim!" });
      setFormState({ name: "", phone: "", message: "" });
    } catch (err: any) {
      setFormStatus({ type: "error", message: err.message || "Gagal mengirim pesan." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-brand-green animate-spin" />
        <p className="text-brand-olive font-serif italic text-xl">Menyiapkan Keajaiban Sorgum...</p>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-brand-olive/30 overflow-x-hidden">
        <Navbar settings={settings} cmsPages={cmsPages} />

        <main>
          <Routes>
            <Route path="/" element={
              <Home 
                cmsProducts={cmsProducts}
                cmsNews={cmsNews}
                gallery={gallery}
                stats={stats}
                formState={formState}
                setFormState={setFormState}
                formStatus={formStatus}
                handleContactSubmit={handleContactSubmit}
              />
            } />
            <Route path="/berita" element={
              <Berita cmsNews={cmsNews} />
            } />
            <Route path="/berita/:slug" element={
              <BeritaDetail cmsNews={cmsNews} />
            } />
            <Route path="/profil" element={<Navigate to="/#profil" replace />} />
            <Route path="/:slug" element={
              <PageRenderer 
                cmsPages={cmsPages} 
                cmsProducts={cmsProducts} 
                cmsNews={cmsNews} 
                gallery={gallery} 
                stats={stats} 
                formState={formState} 
                setFormState={setFormState} 
                formStatus={formStatus} 
                handleContactSubmit={handleContactSubmit} 
              />
            } />
          </Routes>
        </main>

        <Footer settings={settings} cmsPages={cmsPages} />
      </div>
    </Router>
  );
}
