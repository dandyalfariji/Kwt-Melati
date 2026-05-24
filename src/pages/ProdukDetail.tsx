import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, ShoppingBag, MessageCircle, ShieldCheck, CheckCircle2, Store, ZoomIn, X } from "lucide-react";
import * as api from "../api";
import { Post } from "../types";
import { getPostImage } from "../App";

const formatPrice = (price: string | number, currency: string = 'Rp') => {
  if (!price) return null;
  const num = typeof price === 'string' ? parseInt(price, 10) : price;
  if (isNaN(num)) return price;
  return `${currency} ${num.toLocaleString('id-ID')}`;
};

export default function ProdukDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxOpen]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getPostDetail(slug);
        const mappedProduct = {
          ...data,
          image: getPostImage(data)
        };
        setProduct(mappedProduct);
      } catch (err: any) {
        console.error("Failed to load product detail:", err);
        setError("Gagal memuat detail kegiatan/kerja sama. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-4 pt-20">
        <Loader2 className="w-10 h-10 text-brand-green animate-spin" />
        <p className="text-stone-500 font-serif italic">Menyiapkan detail kegiatan...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-4 text-center px-4 pt-20">
        <h2 className="text-3xl font-serif font-bold text-brand-green">Detail Tidak Ditemukan</h2>
        <p className="text-stone-500 max-w-md">{error || "Maaf, data kegiatan yang Anda cari tidak tersedia."}</p>
        <Link 
          to="/#produk-berita-semua" 
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-brand-olive transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  // Extract structured product data
  let productData: any = {};
  if (Array.isArray(product.content) && product.content.length > 0) {
    productData = product.content[0] || {};
  } else if (typeof product.content === 'object' && product.content !== null) {
    productData = product.content;
  }

  const basePrice = productData.base_price || productData.harga_normal || null;
  const discountPrice = productData.discount_price || productData.harga_diskon || null;
  const currency = productData.currency || productData.mata_uang || 'Rp';
  const stockStatus = productData.stock_status || productData.status_stok || 'Tersedia';
  const purchaseUrl = productData.purchase_url || productData.url_pembelian || null;
  const specifications = productData.specifications || productData.spesifikasi_produk || [];
  
  const hasDiscount = discountPrice && parseInt(discountPrice) > 0 && parseInt(discountPrice) < parseInt(basePrice);
  const displayPrice = hasDiscount ? discountPrice : basePrice;

  // Define WhatsApp message template
  const phoneNumber = "628522334455"; // You can change this to the actual number
  const waMessage = encodeURIComponent(`Halo KWT Melati, saya tertarik untuk informasi lebih lanjut mengenai kegiatan/kerja sama: *${product.title}*.`);
  const waLink = `https://wa.me/${phoneNumber}?text=${waMessage}`;

  return (
    <article className="pt-32 pb-24 bg-[#FAFAFA] min-h-screen animate-in fade-in duration-500">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Breadcrumb / Back Navigation */}
        <nav className="flex items-center text-sm text-stone-500 mb-8 font-medium">
          <Link to="/" className="hover:text-brand-green transition-colors">Beranda</Link>
          <span className="mx-2 text-stone-300">/</span>
          <Link to="/#produk-berita-semua" className="hover:text-brand-green transition-colors">Kerja Sama</Link>
          <span className="mx-2 text-stone-300">/</span>
          <span className="text-stone-800 line-clamp-1">{product.title}</span>
        </nav>

        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden mb-10">
          <div className="flex flex-col md:flex-row">
            
            {/* Product Image Gallery (Shopee/Tokopedia style left side) */}
            <div className="w-full md:w-2/5 lg:w-1/2 p-4 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-stone-100 flex flex-col justify-center">
              <div
                className="w-full aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 relative group shadow-inner cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
                title="Klik untuk perbesar"
              >
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1621939514649-280e2ee20f60?auto=format&fit=crop&q=80&w=800"} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-3 md:p-4 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 shadow-lg">
                    <ZoomIn className="w-5 h-5 text-[#1E4620]" />
                  </div>
                </div>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 inline-block text-[10px] uppercase font-bold tracking-widest text-[#1E4620] px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
                  {product.category || "Kerja Sama"}
                </span>

                {/* Overlapping Organic Badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#1E4620] text-xs font-bold rounded-full shadow-md border border-[#1E4620]/10">
                  <ShieldCheck className="w-4 h-4 text-[#1E4620]" /> Kegiatan & Sinergi KWT Melati
                </div>
              </div>
              <p className="text-center text-stone-400 text-xs mt-3 flex items-center justify-center gap-1">
                <ZoomIn className="w-3 h-3" /> Klik gambar untuk memperbesar
              </p>
            </div>

            {/* Product Info (Shopee/Tokopedia style right side) */}
            <div className="w-full md:w-3/5 lg:w-1/2 p-6 md:p-12 lg:py-16 lg:px-14 flex flex-col">
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-[1.2] mb-4">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-stone-100">
                <div className="flex items-center text-[#FFD000]">
                  {"★★★★★".split("").map((star, i) => <span key={i} className="text-lg drop-shadow-sm">{star}</span>)}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
                <span className="text-stone-500 text-sm font-medium">Terjual 100+</span>
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
                <span className="text-[#1E4620] text-sm font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> {stockStatus}
                </span>
              </div>

              {/* Price block */}
              <div className="bg-[#eef8f0] p-6 rounded-2xl mb-10 border border-[#cbe8d2] shadow-sm">
                <span className="text-stone-500 text-xs uppercase tracking-wider mb-2 block font-bold">Harga</span>
                {basePrice ? (
                  <div className="flex items-end gap-3">
                    <div className="text-4xl md:text-5xl font-extrabold text-[#1E4620] tracking-tight">
                      {formatPrice(displayPrice, currency)}
                    </div>
                    {hasDiscount && (
                      <div className="text-lg text-stone-400 line-through decoration-stone-300 font-medium mb-1.5">
                        {formatPrice(basePrice, currency)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-4xl md:text-5xl font-extrabold text-[#1E4620] tracking-tight">
                    Hubungi Kami
                  </div>
                )}
              </div>

              {/* Specifications / Detail Singkat */}
              {specifications && specifications.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xs font-bold text-[#1E4620] uppercase tracking-widest mb-4">Informasi Kegiatan</h3>
                  <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-stone-100">
                    {specifications.map((spec: any, idx: number) => (
                      <div key={idx} className={`flex px-5 py-4 ${idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
                        <span className="w-1/3 text-stone-500 text-sm font-medium">{spec.label}</span>
                        <span className="w-2/3 text-stone-800 text-sm font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-stone-100 w-full">
                <a 
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#1E4620] text-white rounded-xl font-black uppercase text-sm tracking-widest hover:bg-[#153416] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] shadow-[0_10px_40px_-10px_rgba(30,70,32,0.6)]"
                >
                  <MessageCircle className="w-6 h-6" /> Beli via WhatsApp
                </a>
                
                {purchaseUrl && (
                  <a 
                    href={purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1E4620] border-2 border-[#1E4620] rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#eef8f0] transition-all"
                  >
                    <Store className="w-5 h-5" /> Beli di Toko Online
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Full Description Section */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8 md:p-12 mb-10 border-l-[8px] border-l-[#1E4620]">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-100">
            <div className="w-10 h-10 rounded-full bg-[#eef8f0] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#1E4620]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Detail Kegiatan</h3>
          </div>
          
          {product.excerpt && (
            <p className="text-stone-600 text-lg font-light leading-relaxed mb-8 italic">
              {product.excerpt}
            </p>
          )}

          {/* Fallback for description if any exists in content but not mapped yet */}
          {productData.description && (
             <div 
               className="prose prose-lg max-w-none text-stone-600 leading-relaxed font-light space-y-4
                          prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#1E4620]
                          prose-a:text-[#1E4620] prose-a:underline hover:prose-a:text-[#153416] prose-a:transition-colors"
               dangerouslySetInnerHTML={{ __html: productData.description }}
             />
          )}
        </div>
      </div>
      {/* Image Lightbox */}
      {lightboxOpen && product.image && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl bg-white"
            />
            <p className="mt-3 text-white/70 text-sm text-center font-medium">{product.title}</p>
          </div>
        </div>
      )}
    </article>
  );
}
