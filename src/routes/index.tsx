import { createFileRoute } from "@tanstack/react-router";
import { memo, useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import content from "../reference-content.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kutanga Natural — Fim do corrimento e do mau cheiro em 7 dias" },
      { name: "description", content: "Conhece o método Kutanga Natural: receitas naturais e discretas para cuidar da higiene íntima, com acesso imediato por e-mail." },
      { property: "og:title", content: "Kutanga Natural — Fim do corrimento e do mau cheiro em 7 dias" },
      { property: "og:description", content: "Conhece o método Kutanga Natural: receitas naturais e discretas para cuidar da higiene íntima, com acesso imediato por e-mail." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The timer re-renders every second; keeping it isolated stops it from
// touching the page content (FAQ items, images) on each tick.
function CountdownBar() {
  const [seconds, setSeconds] = useState(47 * 60 + 8);

  useEffect(() => {
    const ticker = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(ticker);
  }, []);

  const time = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className="sticky top-0 z-50 bg-forest text-forest-foreground">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 py-2.5 text-[13px]">
        <Clock3 aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />
        <span className="opacity-80">Acesso limitado · Só para hoje ·</span>
        <span className="font-bold text-gold" suppressHydrationWarning>{time} restantes</span>
      </div>
    </div>
  );
}

const PageContent = memo(function PageContent() {
  return <div dangerouslySetInnerHTML={{ __html: content }} suppressHydrationWarning />;
});

function Index() {
  return (
    <div>
      <CountdownBar />
      <PageContent />
    </div>
  );
}