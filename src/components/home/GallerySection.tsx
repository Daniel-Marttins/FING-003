import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryStat {
  label: string;
  value: string;
}

interface GalleryEdition {
  year: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  stats: GalleryStat[];
  highlights: string[];
}

interface GallerySectionProps {
  sectionRef: (node: HTMLElement | null) => void;
  inView: boolean;
  fadeInClass: string;
}

const AUTOPLAY_DELAY = 7000;

const galleryEditions: GalleryEdition[] = [
  {
    year: "2023",
    title: "Conexões que transformam negócios",
    description:
      "A edição de 2023 marcou a consolidação do FING como ponto de encontro do ecossistema de inovação do Agreste, reunindo lideranças e iniciativas que aceleraram novos projetos para a região.",
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      alt: "Público da edição 2023 do FING assistindo a uma palestra",
    },
    stats: [
      { value: "950+", label: "Participantes" },
      { value: "38", label: "Palestras e painéis" },
      { value: "22", label: "Startups expo" },
    ],
    highlights: [
      "Arena de inovação com protótipos locais",
      "Mentorias exclusivas com investidores",
      "Hackathon de soluções urbanas",
    ],
  },
  {
    year: "2022",
    title: "Impacto social através da inovação",
    description:
      "Em 2022, o festival destacou iniciativas que unem tecnologia e impacto social, fortalecendo projetos de educação empreendedora e inclusão digital para comunidades do interior.",
    image: {
      src: "https://images.unsplash.com/photo-1518609571773-39b7d303a86b?auto=format&fit=crop&w=1200&q=80",
      alt: "Workshop colaborativo da edição 2022 do FING",
    },
    stats: [
      { value: "780", label: "Participantes" },
      { value: "26", label: "Workshops imersivos" },
      { value: "15", label: "Projetos acelerados" },
    ],
    highlights: [
      "Jornada formativa para empreendedores iniciantes",
      "Painéis sobre ESG e sustentabilidade",
      "Feira de negócios criativos regionais",
    ],
  },
  {
    year: "2021",
    title: "O início de uma comunidade colaborativa",
    description:
      "A estreia do FING apresentou a força da comunidade empreendedora de Garanhuns, conectando empresas locais, universidades e agentes públicos em torno de uma visão compartilhada para o futuro.",
    image: {
      src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
      alt: "Primeira edição do FING em 2021 com networking entre participantes",
    },
    stats: [
      { value: "540", label: "Participantes" },
      { value: "18", label: "Conteúdos ao vivo" },
      { value: "12", label: "Parceiros locais" },
    ],
    highlights: [
      "Primeiro laboratório de ideias colaborativas",
      "Matchmaking entre startups e investidores",
      "Lançamento do programa Comunidade Sete Colinas",
    ],
  },
];

export function GallerySection({
  sectionRef,
  inView,
  fadeInClass,
}: GallerySectionProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const apiRef = useRef<CarouselApi | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();

    if (!apiRef.current) {
      return;
    }

    autoplayRef.current = window.setInterval(() => {
      const api = apiRef.current;

      if (!api) {
        return;
      }

      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_DELAY);
  }, [stopAutoplay]);

  const handleSetApi = useCallback((api: CarouselApi) => {
    apiRef.current = api;
    setCarouselApi(api);
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, [carouselApi, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleInteractionStart = () => {
      stopAutoplay();
    };

    const handleInteractionEnd = () => {
      startAutoplay();
    };

    carouselApi.on("pointerDown", handleInteractionStart);
    carouselApi.on("pointerUp", handleInteractionEnd);
    carouselApi.on("select", handleInteractionEnd);

    return () => {
      carouselApi.off("pointerDown", handleInteractionStart);
      carouselApi.off("pointerUp", handleInteractionEnd);
      carouselApi.off("select", handleInteractionEnd);
    };
  }, [carouselApi, startAutoplay, stopAutoplay]);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 py-24"
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="container relative mx-auto px-4">
        <div
          className={`${fadeInClass} delay-150 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Galeria de edições
            </span>
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">
              Memórias que inspiram o futuro
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Reviva os melhores momentos de cada edição do FING e acompanhe a
              evolução do festival que movimenta o ecossistema de inovação do
              Agreste pernambucano.
            </p>
          </div>

          <Carousel
            setApi={handleSetApi}
            opts={{ align: "start", loop: true }}
            className="group mx-auto max-w-5xl"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
            onFocus={stopAutoplay}
            onBlur={startAutoplay}
            onTouchStart={stopAutoplay}
            onTouchEnd={startAutoplay}
          >
            <CarouselContent className="py-2">
              {galleryEditions.map((edition, index) => (
                <CarouselItem key={edition.year} className="pl-0 sm:pl-4">
                  <article className="overflow-hidden rounded-3xl border border-border/40 bg-background/95 shadow-lg backdrop-blur">
                    <div
                      className={`flex flex-col lg:flex-row ${
                        index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="relative lg:w-2/5">
                        <img
                          src={edition.image.src}
                          alt={edition.image.alt}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-6 top-6 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur">
                          Edição {edition.year}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-8 p-8 lg:w-3/5">
                        <header className="space-y-3">
                          <h3 className="text-2xl font-bold text-foreground">
                            {edition.title}
                          </h3>
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
                              <span className="text-sm text-muted-foreground">
                                {stat.label}
                              </span>
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
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden h-12 w-12 -left-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-background/90 shadow-lg md:flex" />
            <CarouselNext className="hidden h-12 w-12 -right-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-background/90 shadow-lg md:flex" />

            <div className="mt-8 flex justify-center gap-2">
              {galleryEditions.map((edition, index) => {
                const isActive = carouselApi?.selectedScrollSnap() === index;

                return (
                  <button
                    key={edition.year}
                    type="button"
                    className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                      isActive ? "bg-primary" : "bg-muted"
                    }`}
                    onClick={() => {
                      apiRef.current?.scrollTo(index);
                    }}
                    aria-label={`Ir para edição ${edition.year}`}
                  />
                );
              })}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
