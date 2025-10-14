import React, { useMemo } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Info,
  Building,
  Images,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks";
import { LayoutProps, NavigationItem } from "@/types";

export function Layout({ children }: LayoutProps) {
  // Memoize navigation to prevent re-creation on every render
  const navigation: NavigationItem[] = useMemo(
    () => [
      { name: "Início", href: "#inicio", icon: Calendar },
      { name: "Sobre", href: "#sobre", icon: Info },
      { name: "Galeria", href: "#galeria", icon: Images },
      { name: "Realização", href: "#realizacao", icon: Building },
      { name: "Localização", href: "#localizacao", icon: MapPin },
      { name: "Palestrantes", href: "#palestrantes", icon: Users },
      { name: "Programação", href: "#programacao", icon: Clock },
    ],
    [],
  );

  // Use optimized hook for active section management
  const { activeSection, handleNavClick } = useActiveSection({
    sections: navigation,
    offset: 100,
  });

  const isActivePath = (hash: string) => {
    return activeSection === hash;
  };

  const mobilePrimaryKeys = ["#sobre", "#galeria", "#realizacao"] as const;
  const mobilePrimarySet = new Set<string>([...mobilePrimaryKeys]);
  const centerItem = navigation.find((item) => item.href === "#inicio");
  const mobilePrimaryItems = mobilePrimaryKeys
    .map((href) => navigation.find((item) => item.href === href) ?? null)
    .filter((item): item is NavigationItem => item !== null);
  const overflowItems = navigation.filter(
    (item) => item.href !== "#inicio" && !mobilePrimarySet.has(item.href),
  );

  const overflowIsActive = overflowItems.some((item) => isActivePath(item.href));

  const renderStandardMobileItem = (item?: NavigationItem) => {
    if (!item) {
      return <div />;
    }

    const Icon = item.icon;
    const isActive = isActivePath(item.href);

    return (
      <button
        type="button"
        onClick={() => handleNavClick(item.href)}
        className={cn(
          "flex flex-col items-center gap-1 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
        aria-label={item.name}
      >
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            isActive
              ? "bg-primary/15 text-primary"
              : "bg-muted text-foreground/70",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[11px] leading-none">{item.name}</span>
      </button>
    );
  };

  const renderCenterMobileItem = () => {
    if (!centerItem) {
      return null;
    }

    const Icon = centerItem.icon;
    const isActive = isActivePath(centerItem.href);

    return (
      <button
        type="button"
        onClick={() => handleNavClick(centerItem.href)}
        className="relative -translate-y-6 flex flex-col items-center gap-2 text-xs font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={centerItem.name}
      >
        <span
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform ring-4 ring-background",
            isActive ? "-translate-y-0.5" : "translate-y-0",
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-[11px] leading-none text-primary">{centerItem.name}</span>
      </button>
    );
  };

  const renderMoreMobileItem = () => {
    if (overflowItems.length === 0) {
      return <div />;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex flex-col items-center gap-1 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              overflowIsActive ? "text-primary" : "text-muted-foreground",
            )}
            aria-label="Mais seções"
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                overflowIsActive
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-foreground/70",
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
            </span>
            <span className="text-[11px] leading-none">Mais</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={12}>
          {overflowItems.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onSelect={(event) => {
                event.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const [firstMobileItem, secondMobileItem, thirdMobileItem] = mobilePrimaryItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F42e34fe79f13424399d236fc2c7311f6%2Feb31e9232fe94232aad18320963e5242?format=webp&width=800"
                  alt="FING 2024 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl text-gradient">FING 2024</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-link group relative px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out ${
                      isActivePath(item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </button>
              ))}
            </nav>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-28 md:pb-0">{children}</main>

      {/* Bottom Navigation */}
      {centerItem && (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto grid min-h-[86px] w-full max-w-lg grid-cols-5 items-end gap-2 px-4 pb-3 pt-2">
            {renderStandardMobileItem(firstMobileItem)}
            {renderStandardMobileItem(secondMobileItem)}
            {renderCenterMobileItem()}
            {renderStandardMobileItem(thirdMobileItem)}
            {renderMoreMobileItem()}
          </div>
        </nav>
      )}

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 pt-12 pb-28 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F42e34fe79f13424399d236fc2c7311f6%2Feb31e9232fe94232aad18320963e5242?format=webp&width=800"
                    alt="FING 2024 Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-xl text-gradient">
                  FING 2024
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Festival de Inovação e Negócios de Garanhuns - Um evento
                transformador que conecta empreendedores, inovadores e
                visionários.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 contato@fing2024.com.br</p>
                <p>��� (87) 99999-9999</p>
                <p>📍 Garanhuns - PE</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  <span>Instagram</span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  <span>LinkedIn</span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  <span>Facebook</span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 FING - Festival de Inovação e Negócios. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
