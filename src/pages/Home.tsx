import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ChevronRight, 
  Sun, 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  Eye, 
  Newspaper, 
  Phone, 
  MapPin, 
  Leaf, 
  Sparkles, 
  Flame, 
  Heart,
  Settings as SettingsIcon,
  Sprout
} from "lucide-react";
import { Post, GalleryItem, Stat } from "../types";
import { iconMap, ProfileTabsBlock } from "../components/Blocks";

const staticProfileData = {
  title: "Melati Sorgum: Dedikasi Sang Ibu Tani",
  subtitle: "Profil Kelompok",
  badge_title: "100%",
  badge_subtitle: "Organik & Alami Tanpa Bahan Pengawet",
  tabs: [
    {
      title: "Tentang Kami",
      content: "Kelompok Wanita Tani (KWT) Melati di Bojongmanggu berdedikasi tinggi dalam mengembangkan budidaya sorgum lokal secara berkelanjutan. Kami percaya pangan sehat adalah hak setiap keluarga."
    },
    {
      title: "Visi Kami",
      content: "Menjadi pelopor ketahanan pangan lokal berbasis sorgum yang unggul, berdaya saing, dan berkontribusi pada kesejahteraan masyarakat petani."
    },
    {
      title: "Misi Kami",
      content: "1. Membudidayakan sorgum secara organik tanpa bahan kimia berbahaya.<br/>2. Melakukan kerja sama untuk mengembangkan potensi pangan lokal.<br/>3. Mengedukasi masyarakat tentang manfaat nutrisi sorgum."
    }
  ]
};

interface HomeProps {
  cmsProducts: Post[];
  cmsNews: Post[];
  gallery: GalleryItem[];
  stats: Stat[];
  formState: { name: string; phone: string; message: string };
  setFormState: React.Dispatch<React.SetStateAction<{ name: string; phone: string; message: string }>>;
  formStatus: { type: "success" | "error" | null; message: string };
  handleContactSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function Home({
  cmsProducts,
  cmsNews,
  gallery,
  stats,
  formState,
  setFormState,
  formStatus,
  handleContactSubmit
}: HomeProps) {

  // New Content data: Keunggulan Sorgum
  const keunggulanItems = [
    {
      icon: <Sun className="w-8 h-8 text-amber-600" />,
      title: "100% Bebas Gluten",
      desc: "Sangat baik untuk pencernaan, pelaku diet bebas gluten, serta aman bagi penderita penyakit celiac."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-700" />,
      title: "Indeks Glikemik Rendah",
      desc: "Membantu menstabilkan kadar gula darah, menjadikannya pilihan makanan pokok terbaik bagi penderita diabetes."
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-600" />,
      title: "Kaya Nutrisi & Protein",
      desc: "Mengandung serat tinggi, zat besi, antioksidan, dan protein esensial yang lebih melimpah dibanding beras biasa."
    },
    {
      icon: <Flame className="w-8 h-8 text-orange-600" />,
      title: "Energi Tahan Lama",
      desc: "Karbohidrat kompleks sorghum dicerna lebih lambat oleh tubuh sehingga memberikan pasokan energi berkelanjutan."
    },
    {
      icon: <Sprout className="w-8 h-8 text-brand-green" />,
      title: "Pertanian Berkelanjutan",
      desc: "Sorgum merupakan tanaman hemat air dan toleran kekeringan, sangat ramah bagi kelestarian lingkungan lokal."
    }
  ];

  // New Content data: Langkah Produksi
  const langkahProduksi = [
    {
      step: "01",
      title: "Pemilihan Benih",
      desc: "Menyeleksi benih sorgum varietas unggul lokal Bojongmanggu untuk menjamin kualitas hasil tani optimal."
    },
    {
      step: "02",
      title: "Budidaya Organik",
      desc: "Ditanam oleh kelompok wanita tani dengan metode ramah lingkungan dan pupuk organik alami tanpa pestisida kimia."
    },
    {
      step: "03",
      title: "Pemanenan Selektif",
      desc: "Bulir sorgum dipotong secara manual pada tingkat kematangan yang tepat oleh para ibu tani demi cita rasa murni."
    },
    {
      step: "04",
      title: "Kegiatan Bersama",
      desc: "Kolaborasi dan sinergi berkelanjutan demi inovasi dan pemberdayaan masyarakat."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pt-20">
      {/* Hero Section */}
      <section id="beranda" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center container mx-auto px-4 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-clay font-medium uppercase tracking-[0.4em] text-[10px] mb-8">
              Inovasi Pangan Sehat & Berkelanjutan
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-brand-green leading-[1.1] mb-10">
              Keajaiban <br /> <span className="italic font-light">Sorgum</span> Lokal
            </h1>
            <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              KWT Melati Sorgum Bojongmanggu menghadirkan dedikasi dalam setiap butir sorgum. 
              Sinergi inovasi melalui Program PKM Abdimas Telkom University.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/#profil" className="w-full sm:w-auto px-10 py-5 bg-brand-green text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-olive transition-all flex items-center justify-center gap-3 group">
                Lihat Profil Kami <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/hubungi-kami" className="w-full sm:w-auto px-10 py-5 border border-brand-green text-brand-green rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-cream transition-all text-center">
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-clay/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Keunggulan Sorgum Melati (Section 2) */}
      <section id="keunggulan" className="py-24 bg-white scroll-mt-24 text-left">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Mengapa Memilih Sorgum?</span>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-green">Pilihan Pangan Super Masa Depan</h3>
            <p className="text-stone-500 font-light mt-4">
              Sorgum bukan sekadar alternatif pengganti beras. Bulir sehat ini kaya akan kebaikan hayati yang mendukung gaya hidup sehat Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {keunggulanItems.slice(0, 3).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-cream/20 border border-brand-olive/5 p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-8">
                  {item.icon}
                </div>
                <h4 className="font-serif font-bold text-stone-800 text-2xl mb-4">{item.title}</h4>
                <p className="text-stone-600 font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {keunggulanItems.slice(3, 5).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-cream/20 border border-brand-olive/5 p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-2xl mb-4">{item.title}</h4>
                  <p className="text-stone-600 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Static Fallback Profile Tabs Block */}
      <ProfileTabsBlock data={staticProfileData} />

      {/* Bottom CTA Section (Section 3) */}
      <section className="py-24 bg-stone-50 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-clay font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">KWT Melati Sorgum</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-green leading-[1.15] mb-8">
              Bawa Kebaikan Sorgum Lokal <br /> <span className="italic font-light">ke Meja Makan</span> Anda
            </h2>
            <p className="text-xl md:text-2xl text-stone-300 font-light max-w-3xl mx-auto leading-relaxed">
              Mulai kolaborasi untuk pangan berkelanjutan bersama ibu-ibu tani Desa Bojongmanggu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/berita" className="w-full sm:w-auto px-10 py-5 bg-brand-green text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-olive transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-green/20">
                Baca Kabar Berita <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/hubungi-kami" className="w-full sm:w-auto px-10 py-5 border border-brand-green text-brand-green rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-cream transition-all text-center">
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-clay/5 rounded-full blur-[100px] pointer-events-none" />
      </section>
    </div>
  );
}
