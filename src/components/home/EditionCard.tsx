import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface GalleryStat {
  label: string;
  value: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryEdition {
  year: string;
  title: string;
  description: string;
  image: GalleryImage;
  stats: GalleryStat[];
  highlights: string[];
  gallery: GalleryImage[];
}

interface EditionCardProps {
  edition: GalleryEdition;
  inverted?: boolean;
}

export function EditionCard({ edition, inverted = false }: EditionCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const handleThumbnailClick = (image: GalleryImage) => {
    setActiveImage(image);
    setIsLightboxOpen(true);
  };

  const handleLightboxChange = (open: boolean) => {
    setIsLightboxOpen(open);

    if (!open) {
      setActiveImage(null);
    }
  };

  return (
    <article className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-3xl border border-border/40 bg-background/95 shadow-lg backdrop-blur lg:min-h-[520px]">
      <div
        className={cn(
          "flex flex-1 flex-col lg:flex-row",
          inverted && "lg:flex-row-reverse",
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:w-2/5 lg:aspect-auto">
          <img
            src={edition.image.src}
            alt={edition.image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute left-6 top-6 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur">
            Edição {edition.year}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8 p-8 lg:w-3/5">
          <header className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground">{edition.title}</h3>
            <p className="leading-relaxed text-muted-foreground">
              {edition.description}
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {edition.stats.map((stat) => (
              <li
                key={`${edition.year}-${stat.label}`}
                className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-center"
              >
                <span className="block text-2xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            {edition.highlights.map((highlight) => (
              <span
                key={`${edition.year}-${highlight}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
              >
                <Sparkles className="h-4 w-4" />
                {highlight}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-foreground">
                Galeria da edição
              </h4>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Clique nas imagens
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {edition.gallery.map((image) => (
                <button
                  key={`${edition.year}-${image.src}`}
                  type="button"
                  onClick={() => handleThumbnailClick(image)}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-sm transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:-translate-y-1"
                  aria-label={`Ampliar imagem: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isLightboxOpen} onOpenChange={handleLightboxChange}>
        <DialogContent className="max-w-3xl border-0 bg-background/95 p-0 shadow-2xl sm:rounded-2xl">
          {activeImage ? (
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </article>
  );
}
