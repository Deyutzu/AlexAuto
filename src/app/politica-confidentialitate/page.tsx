import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          Politica de Confidențialitate (GDPR)
        </h1>
        <div className="mt-6 space-y-4 text-sm text-muted">
          <p>
            Prin formularele de pe site colectăm doar datele de contact și detaliile generale ale mașinii sau locuinței pentru a-ți pregăti oferta. Nu solicităm CNP sau CUI în formularul de asigurări.
          </p>
          <p>
            În acest prototip, cererile sunt salvate local în browserul tău (localStorage) exclusiv pentru demonstrarea panoului de administrare.
          </p>
        </div>
      </div>
    </div>
  );
}
