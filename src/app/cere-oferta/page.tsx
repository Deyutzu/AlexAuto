import React from "react";
import QuoteRequestForm from "@/components/QuoteRequestForm";

export default function CereOfertaPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Cere ofertă piese
          </h1>
          <p className="mt-2 text-sm text-muted">
            Verificăm compatibilitatea pe seria de șasiu și revenim rapid cu oferta.
          </p>
        </div>

        <QuoteRequestForm />
      </div>
    </section>
  );
}
