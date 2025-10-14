import { sponsors as defaultSponsors, type Sponsor } from "@/data/sponsors";
import { cn } from "@/lib/utils";

type SponsorsMarqueeProps = {
  sponsors?: Sponsor[];
  title?: string;
  className?: string;
};

function Row({ items, reverse = false }: { items: Sponsor[]; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-w-max items-center gap-8 py-2",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
      aria-hidden
    >
      {[...items, ...items].map((s, idx) => (
        <a
          key={`${s.name}-${idx}`}
          href={s.url}
          target={s.url ? "_blank" : undefined}
          rel={s.url ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-5 py-2.5 shadow-sm backdrop-blur transition-colors hover:bg-background/90"
        >
          {s.logo ? (
            <img
              src={s.logo}
              alt={s.name}
              className="h-6 w-6 rounded-sm object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-primary/15 text-[10px] font-semibold uppercase tracking-wide text-primary">
              {s.name.slice(0, 2)}
            </span>
          )}
          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
            {s.name}
          </span>
        </a>
      ))}
    </div>
  );
}

export function SponsorsMarquee({ sponsors = defaultSponsors, title = "Patrocinadores", className }: SponsorsMarqueeProps) {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section className={cn("relative overflow-hidden", className)} aria-label={title}>
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      <div className="relative">
        <div className="overflow-hidden">
          <Row items={sponsors} />
        </div>
      </div>
    </section>
  );
}

export default SponsorsMarquee;
