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

import { EditionCard, type GalleryEdition } from "./EditionCard";

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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
        alt: "Participantes interagindo em um estande da edição 2023",
      },
      {
        src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
        alt: "Palestra concorrida durante a edição 2023",
      },
      {
        src: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=900&q=80",
        alt: "Mentoria individual com especialista na edição 2023",
      },
      {
        src: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=900&q=80",
        alt: "Exposição de startups com tecnologia aplicada",
      },
      {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
        alt: "Área de networking da edição 2023",
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        alt: "Painel sobre inovação digital no FING 2023",
      },
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
        alt: "Dinâmica em grupo focada em impacto social no FING 2022",
      },
      {
        src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
        alt: "Mentoria coletiva durante a edição 2022",
      },
      {
        src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        alt: "Participantes registrando ideias colaborativas",
      },
      {
        src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80",
        alt: "Painel sobre sustentabilidade e ESG",
      },
      {
        src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80",
        alt: "Startup apresentando solução de impacto social",
      },
      {
        src: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?auto=format&fit=crop&w=900&q=80",
        alt: "Networking entre participantes da edição 2022",
      },
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
        alt: "Empreendedores trocando experiências na edição 2021",
      },
      {
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
        alt: "Oficina prática de co-criação em 2021",
      },
      {
        src: "https://images.unsplash.com/photo-1521737451536-00a86f630f14?auto=format&fit=crop&w=900&q=80",
        alt: "Apresentação de negócios locais na edição inaugural",
      },
      {
        src: "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?auto=format&fit=crop&w=900&q=80",
        alt: "Participantes conectando-se em área de convivência em 2021",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        alt: "Primeiro painel colaborativo do FING",
      },
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        alt: "Registro coletivo de metas da comunidade FING",
      },
    ],
  },
];

export function GallerySection({
  sectionRef,
  inView,
  fadeInClass,
}: GallerySectionProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

    const handleSelect = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      startAutoplay();
    };

    handleSelect();

    carouselApi.on("pointerDown", handleInteractionStart);
    carouselApi.on("pointerUp", handleInteractionEnd);
    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);

    return () => {
      carouselApi.off("pointerDown", handleInteractionStart);
      carouselApi.off("pointerUp", handleInteractionEnd);
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
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
            <CarouselContent className="py-2 items-stretch">
              {galleryEditions.map((edition, index) => (
                <CarouselItem
                  key={edition.year}
                  className="h-full pl-0 sm:pl-4"
                >
                  <EditionCard edition={edition} inverted={index % 2 === 1} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="ghost"
              className="hidden h-12 w-12 -left-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-background/90 shadow-lg md:flex"
            />
            <CarouselNext
              variant="ghost"
              className="hidden h-12 w-12 -right-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-background/90 shadow-lg md:flex"
            />

            <div className="mt-8 flex justify-center gap-2">
              {galleryEditions.map((edition, index) => (
                <button
                  key={edition.year}
                  type="button"
                  className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => {
                    apiRef.current?.scrollTo(index);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Ir para edição ${edition.year}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
