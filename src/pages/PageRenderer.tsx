import React from "react";
import { useParams } from "react-router-dom";
import { Post, GalleryItem, Stat } from "../types";
import { renderBlock } from "../components/Blocks";

interface PageRendererProps {
  cmsPages: any[];
  cmsProducts: Post[];
  cmsNews: Post[];
  gallery: GalleryItem[];
  stats: Stat[];
  formState: any;
  setFormState: any;
  formStatus: any;
  handleContactSubmit: any;
  customSlug?: string;
}

export default function PageRenderer({
  cmsPages,
  cmsProducts,
  cmsNews,
  gallery,
  stats,
  formState,
  setFormState,
  formStatus,
  handleContactSubmit,
  customSlug
}: PageRendererProps) {
  const { slug: urlSlug } = useParams();
  const slug = customSlug || urlSlug;
  const page = cmsPages.find((p: any) => p.slug === slug);

  if (!page) {
    return (
      <div className="py-32 text-center text-stone-500 font-serif italic flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-4xl text-brand-olive mb-4">404</h2>
        <p>Halaman tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 pt-20">
      {Array.isArray(page.content) && page.content.map((block: any, blockIdx: number) => (
        <React.Fragment key={block.id || blockIdx}>
          {renderBlock(
            block,
            cmsProducts,
            cmsNews,
            gallery,
            stats,
            formState,
            setFormState,
            formStatus,
            handleContactSubmit
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
