import { Link } from "@tanstack/react-router";
import { trackCtaClick } from "@/lib/track";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-xl text-primary sm:text-2xl">
          KENNETH PADONOU
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            activeProps={{ className: "text-sm font-medium text-primary" }}
          >
            Articles
          </Link>
          <Link
            to="/audit-gratuit"
            className="cta-btn cta-btn-sm"
            onClick={() => trackCtaClick("header")}
          >
            <span className="hidden sm:inline">Réserver un audit gratuit</span>
            <span className="sm:hidden">Audit gratuit</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
