import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock3, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const names = [
  ["Joana M. de Luanda", "acabou de receber o tratamento por e-mail"],
  ["Domingas A. do Huambo", "acabou de receber o tratamento por e-mail"],
  ["Teresa N. do Lubango", "garantiu o Plano Completo agora mesmo"],
];

function Index() {
  const [seconds, setSeconds] = useState(47 * 60 + 8);
  const [notice, setNotice] = useState(-1);

  useEffect(() => {
    const ticker = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    const show = window.setTimeout(() => setNotice(0), 2800);
    const rotate = window.setInterval(() => setNotice((current) => (current + 1) % names.length), 11000);
    return () => { window.clearInterval(ticker); window.clearTimeout(show); window.clearInterval(rotate); };
  }, []);

  const time = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <main>
      <div className="sticky top-0 z-50 bg-forest text-forest-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 py-2.5 text-[13px]">
          <Clock3 aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />
          <span className="opacity-80">Acesso limitado · Só para hoje ·</span>
          <span className="font-bold text-gold">{time} restantes</span>
        </div>
      </div>
      {notice >= 0 && (
        <div className="fixed inset-x-3 bottom-4 z-50 mx-auto max-w-sm rounded-xl border border-primary/20 bg-secondary p-3 shadow-xl">
          <Button aria-label="Fechar" title="Fechar" variant="ghost" size="icon" onClick={() => setNotice(-1)} className="absolute -left-2 -top-2 h-5 w-5 rounded-full border border-border bg-card text-muted-foreground">
            <X className="h-3 w-3" />
          </Button>
          <div className="flex items-start gap-2.5">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="text-sm leading-snug"><p className="font-semibold text-secondary-foreground">{names[notice][0]}</p><p className="text-primary">{names[notice][1]}</p></div>
          </div>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}