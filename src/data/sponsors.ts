export type Sponsor = {
  name: string;
  url?: string;
  logo?: string;
  tier?: "ouro" | "prata" | "bronze" | "apoio";
};

export const sponsors: Sponsor[] = [
  {
    name: "TechCorp Solutions",
    url: "https://techcorp.com.br",
    tier: "ouro",
  },
  {
    name: "DevTools Inc",
    url: "https://devtools.com",
    tier: "prata",
  },
];
