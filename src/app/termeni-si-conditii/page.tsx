import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Înapoi
      </Link>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-bold text-primary">
          Termeni și Condiții (Demo)
        </h1>
        <div className="mt-6 space-y-4 text-sm text-muted">
          <p>
            Acest prototip funcționează exclusiv pe bază de cereri de ofertă verificate după seria de șasiu (VIN). Nu există coș de cumpărături sau plăți online.
          </p>
          <p>
            Toate prețurile promoționale și tarifele RCA afișate au caracter strict demonstrativ.
          </p>
        </div>
      </div>
    </div>
  );
}
