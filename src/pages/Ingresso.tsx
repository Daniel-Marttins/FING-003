import { FormEvent, Fragment } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface MarqueeImage {
  src: string;
  alt: string;
}

interface TicketTier {
  name: string;
  price: string;
  description: string;
  perks: string[];
  highlight?: boolean;
}

const marqueeImages: MarqueeImage[] = [
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    alt: "Público animado assistindo a uma apresentação em auditório",
  },
  {
    src: "https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=1200&q=80",
    alt: "Workshop colaborativo com participantes interagindo",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    alt: "Palestrante inspirando o público em um palco iluminado",
  },
  {
    src: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1200&q=80",
    alt: "Painel de inovação com telões e tecnologia",
  },
  {
    src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80",
    alt: "Mentoria individual em espaço de networking",
  },
  {
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    alt: "Equipe comemorando resultado de hackathon",
  },
];

const ticketTiers: TicketTier[] = [
  {
    name: "Passaporte Comunidade",
    price: "R$ 120",
    description:
      "Acesso completo aos três dias do FING com trilhas principais e lounges de networking.",
    perks: [
      "Acesso a todas as palestras e painéis",
      "Sessões de matchmaking com mentores",
      "Certificado digital de participação",
    ],
  },
  {
    name: "Passaporte Visionário",
    price: "R$ 220",
    description:
      "Experiência imersiva com áreas VIP, mentorias exclusivas e fast-track nos principais espaços.",
    perks: [
      "Lounge VIP com cafés especiais",
      "Sessão de mentoria com especialistas",
      "Kit de boas-vindas personalizado",
      "Reservas antecipadas em workshops",
    ],
    highlight: true,
  },
  {
    name: "Passaporte Corporativo",
    price: "Sob consulta",
    description:
      "Pacote para equipes e organizações que desejam acelerar projetos com benefícios personalizados.",
    perks: [
      "Credenciais para até 8 integrantes",
      "Sessão estratégica com curadoria do FING",
      "Branding em ambientes selecionados",
      "Acesso às gravações pós-evento",
    ],
  },
];

const registrationBenefits = [
  {
    title: "Experiências imersivas",
    description:
      "Vivencie conteúdos exclusivos, laboratórios de inovação e interações com quem está transformando o mercado.",
  },
  {
    title: "Conexões estratégicas",
    description:
      "Conecte-se com investidores, startups e lideranças públicas em agenda preparada para gerar oportunidades reais.",
  },
  {
    title: "Acesso antecipado",
    description:
      "Garanta sua vaga em workshops de alta demanda e receba materiais especiais antes do festival.",
  },
];

const faqs = [
  {
    question: "Posso parcelar o ingresso?",
    answer:
      "Sim. Os ingressos podem ser parcelados em até 6x sem juros no cartão de crédito durante o checkout.",
  },
  {
    question: "Há descontos para grupos?",
    answer:
      "Equipes a partir de cinco pessoas possuem condições diferenciadas. Basta selecionar a opção corporativa ou falar com nosso time comercial.",
  },
  {
    question: "O evento possui tradução simultânea?",
    answer:
      "As principais trilhas contarão com tradução simultânea em português e inglês, além de acessibilidade em Libras em sessões selecionadas.",
  },
];

function MarqueeRow({
  images,
  reverse = false,
  offset = "translate-y-0",
}: {
  images: MarqueeImage[];
  reverse?: boolean;
  offset?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-max gap-6",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
        offset,
      )}
    >
      {[...images, ...images].map((image, index) => (
        <Fragment key={`${image.src}-${index}`}>
          <div className="relative h-40 w-64 overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/20">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function MarqueeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      <div className="absolute inset-0 -translate-y-10">
        <MarqueeRow images={marqueeImages} />
        <MarqueeRow
          images={marqueeImages.slice().reverse()}
          reverse
          offset="-translate-y-12"
        />
        <MarqueeRow images={marqueeImages} offset="-translate-y-24" />
      </div>
    </div>
  );
}

const eventHighlights = [
  {
    icon: Calendar,
    title: "15 a 17 de Novembro",
    description: "Três dias de programação transformadora em Garanhuns",
  },
  {
    icon: MapPin,
    title: "Centro Cultural Alfredo Leite",
    description: "Ambientes imersivos, auditórios e lounges interativos",
  },
  {
    icon: Clock,
    title: "Mais de 40 horas de conteúdo",
    description: "Trilhas simultâneas de inovação, negócios e impacto social",
  },
  {
    icon: Shield,
    title: "Evento seguro e acessível",
    description: "Estrutura com acessibilidade, apoio médico e segurança 24h",
  },
];

export default function Ingresso() {
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Pré-inscrição enviada",
      description:
        "Em breve nossa equipe entrará em contato para finalizar sua inscrição.",
    });
  };

  return (
    <div className="bg-background text-foreground">
      <section id="inicio" className="relative overflow-hidden">
        <MarqueeBackground />
        <div className="container relative mx-auto flex min-h-[90vh] flex-col justify-center px-4 py-24">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />A experiência oficial do FING 2024
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Garanta seu lugar no festival que está redefinindo o futuro dos
              negócios
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Inscreva-se para viver três dias intensos de conexões
              estratégicas, conteúdo de alto impacto e oportunidades para
              acelerar seu projeto ou empresa.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group">
                <a href="#inscricao">
                  Fazer pré-inscrição agora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Voltar para o site</Link>
              </Button>
            </div>
            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              {eventHighlights.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-lg shadow-black/5 backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="detalhes" className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-sm font-semibold text-accent">
              <Ticket className="h-4 w-4" />
              Por que participar
            </span>
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">
              Mais do que um ingresso, um passaporte para o futuro
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Tenha acesso a espaços exclusivos, experiências imersivas e uma
              rede preparada para impulsionar novas oportunidades de negócios na
              região.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {registrationBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-muted/40 p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <h3 className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="relative bg-muted/40 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/60" />
        <div className="container relative mx-auto px-4">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Escolha o passaporte ideal para sua jornada
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Cada modalidade foi pensada para garantir a melhor experiência de
              acordo com seus objetivos no FING.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {ticketTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex h-full flex-col rounded-3xl border border-border/70 bg-background/90 p-8 shadow-xl backdrop-blur transition-transform duration-300 hover:-translate-y-2",
                  tier.highlight && "ring-2 ring-primary",
                )}
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {tier.name}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-6 text-4xl font-bold text-foreground">
                  {tier.price}
                </div>
                <ul className="mt-8 space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{perk}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-10 w-full"
                  variant={tier.highlight ? "default" : "outline"}
                >
                  Quero este passaporte
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inscricao" className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Pré-inscrição exclusiva
              </span>
              <h2 className="text-3xl font-bold md:text-4xl">
                Dê o primeiro passo para viver o melhor do FING 2024
              </h2>
              <p className="text-lg text-muted-foreground">
                Preencha o formulário ao lado e receba em primeira mão os
                próximos passos para garantir seu ingresso. Nossa equipe
                retornará com opções personalizadas conforme seu perfil.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Agenda personalizada
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Receba recomendações de trilhas e workshops alinhados ao
                      seu objetivo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Suporte dedicado</h3>
                    <p className="text-xs text-muted-foreground">
                      Nossa equipe acompanha cada etapa até a confirmação da sua
                      participação.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-border/70 bg-background/95 p-8 shadow-2xl backdrop-blur"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="nome"
                    className="text-sm font-semibold text-foreground"
                  >
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Como deseja ser identificado no evento"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground"
                  >
                    E-mail profissional
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="nome@empresa.com"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="telefone"
                      className="text-sm font-semibold text-foreground"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="telefone"
                      name="telefone"
                      required
                      type="tel"
                      className="mt-2 w-full rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="(00) 90000-0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="empresa"
                      className="text-sm font-semibold text-foreground"
                    >
                      Empresa ou projeto
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      required
                      type="text"
                      className="mt-2 w-full rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Nome da organização"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="segmento"
                    className="text-sm font-semibold text-foreground"
                  >
                    Segmento de atuação
                  </label>
                  <select
                    id="segmento"
                    name="segmento"
                    required
                    className="mt-2 w-full appearance-none rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="startup">Startup ou scale-up</option>
                    <option value="empresa">Empresa consolidada</option>
                    <option value="academia">Universidade ou pesquisa</option>
                    <option value="governo">Órgão público</option>
                    <option value="investidor">Investidor ou mentor</option>
                    <option value="outros">Outro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="objetivo"
                    className="text-sm font-semibold text-foreground"
                  >
                    Objetivo principal no FING
                  </label>
                  <textarea
                    id="objetivo"
                    name="objetivo"
                    required
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Conte o que deseja alcançar durante o festival"
                  />
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 text-xs text-muted-foreground">
                  <Shield className="mt-0.5 h-4 w-4 text-primary" />
                  <p>
                    Seus dados serão utilizados exclusivamente para contato
                    sobre o FING 2024, conforme nossa política de privacidade.
                  </p>
                </div>
                <Button size="lg" className="mt-2 w-full" type="submit">
                  Enviar pré-inscrição
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="faq" className="relative bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tire suas dúvidas sobre os ingressos, formatos e condições
              especiais.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-6">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-border/60 bg-background/90 p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
