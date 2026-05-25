import React from "react";
import { useParams } from "react-router-dom";
import { Post, GalleryItem, Stat } from "../types";
import { renderBlock } from "../components/Blocks";

// Error Boundary to catch rendering errors in CMS blocks
class BlockErrorBoundary extends React.Component<
  { children: React.ReactNode; blockType?: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[BlockErrorBoundary] Error in block "${this.props.blockType}":`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-500 bg-red-50 border border-red-200 rounded-xl m-4">
          <p className="font-bold">Terjadi kesalahan saat memuat blok "{this.props.blockType}"</p>
          <p className="text-sm mt-1 text-red-400">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

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
        <BlockErrorBoundary key={block.id || blockIdx} blockType={block.type || "unknown"}>
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
        </BlockErrorBoundary>
      ))}
    </div>
  );
}
