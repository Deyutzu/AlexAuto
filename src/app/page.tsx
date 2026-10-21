"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, ShieldCheck, MessageCircle, Clock, Star } from "lucide-react";
import { Offer } from "@/data/mockData";
import { getOffers, setQuotePrefill, STORAGE_UPDATE_EVENT } from "@/lib/storage";
import {
  formatPriceLei,
  formatDiscountBadge,
  isOfferExpired,
} from "@/lib/pricing";
import VehicleSelector from "@/components/VehicleSelector";

function getCountdownLabel(validUntil?: string): string | null {
  if (!validUntil || !validUntil.trim()) return null;
  const end = new Date(`${validUntil.trim()}T23:59:59`);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return null;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  if (days > 0) {
    return `Mai sunt ${days} ${days === 1 ? "zi" : "zile"} și ${hours} ore`;
  }
  return `Mai sunt ${ Math.max(1, hours) } ore`;
}

export default function HomePage() {
  const router = useRouter();
  const [activeOffers, setActiveOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const loadOffers = () => {
      const all = getOffers();
      const visible = all.filter(
        (o) => o.isActive && !isOfferExpired(o.validUntil)
      );
      setActiveOffers(visible);
    };
    loadOffers();
    window.addEventListener(STORAGE_UPDATE_EVENT, loadOffers);
    window.addEventListener("storage", loadOffers);
    return () => {
      window.removeEventListener(STORAGE_UPDATE_EVENT, loadOffers);
      window.removeEventListener("storage", loadOffers);
    };
  }, []);

  const offerOfTheDay = activeOffers.find((o) => o.isOfferOfTheDay) || null;
  const gridOffers = activeOffers.slice(0, 8);

  const handleRequestOffer = (offer: Offer) => {
    setQuotePrefill({
      desiredParts: `${offer.name} — Cod OEM: ${offer.partCode} [Preț promo: ${formatPriceLei(
        offer.promoPrice
      )}]`,
      fromOfferTitle: `${offer.name} (${offer.partCode})`,
      fromOfferOem: offer.partCode,
      fromOfferPrice: offer.promoPrice,
    });
    router.push("/cere-oferta");
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl">
                Piese auto verificate după șasiu și asigurări.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted">
                Trimite cererea ta și primești oferta exactă pe WhatsApp sau telefon.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/cere-oferta"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition hover:bg-accent-hover"
                >
                  Cere ofertă piese
                </Link>
                <Link
                  href="/asigurari"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition hover:border-accent"
                >
                  Cere ofertă asigurare
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <VehicleSelector />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFERTA ZILEI BLOCK (Hidden automatically if none is set) */}
      {offerOfTheDay && (
        <section className="border-b border-border py-16 md:py-20">
          <div className="mx-auto max-w-container px-6">
            <div className="overflow-hidden rounded-2xl border border-accent bg-surface">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="relative h-64 w-full bg-bg sm:h-80 lg:col-span-6 lg:h-full">
                  <img
                    src={offerOfTheDay.image}
                    alt={offerOfTheDay.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1 text-xs font-bold text-bg">
                    <Star className="h-3.5 w-3.5" />
                    Oferta zilei
                  </span>
                </div>

                <div className="p-6 sm:p-8 lg:col-span-6 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    {offerOfTheDay.discountPercent > 0 && (
                      <span className="rounded bg-accent px-2.5 py-1 text-xs font-bold text-bg">
                        {formatDiscountBadge(offerOfTheDay.discountPercent)}
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted">
                      OEM: {offerOfTheDay.partCode}
                    </span>
                    {getCountdownLabel(offerOfTheDay.validUntil) && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                        <Clock className="h-3.5 w-3.5" />
                        {getCountdownLabel(offerOfTheDay.validUntil)}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
                    {offerOfTheDay.name}
                  </h2>

                  {offerOfTheDay.description && (
                    <p className="mt-2 text-sm text-muted">
                      {offerOfTheDay.description}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-baseline gap-4">
                    <span className="text-3xl font-bold text-accent">
                      {formatPriceLei(offerOfTheDay.promoPrice)}
                    </span>
                    {offerOfTheDay.discountPercent > 0 &&
                      offerOfTheDay.oldPrice > offerOfTheDay.promoPrice && (
                        <span className="text-base text-muted line-through">
                          {formatPriceLei(offerOfTheDay.oldPrice)}
                        </span>
                      )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleRequestOffer(offerOfTheDay)}
                      className="w-full rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition hover:bg-accent-hover sm:w-auto"
                    >
                      Cere ofertă
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. OFFERS GRID (MAX 8 CARDS) */}
      <section id="oferte" className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              Oferte AlexAuto
            </h2>
            <p className="mt-2 text-sm text-muted">
              Promoții active cu verificare gratuită a compatibilității pe seria VIN.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {gridOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition hover:border-accent"
              >
                <div>
                  <div className="relative h-44 w-full bg-bg">
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="h-full w-full object-cover"
                    />
                    {offer.isOfferOfTheDay && (
                      <span className="absolute left-3 top-3 rounded bg-accent px-2 py-0.5 text-[11px] font-bold text-bg">
                        Oferta zilei
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs text-muted">
                      OEM: {offer.partCode}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-primary">
                      {offer.name}
                    </h3>
                  </div>
                </div>

                <div className="border-t border-border p-5">
                  <div className="mb-4">
                    {offer.discountPercent > 0 &&
                      offer.oldPrice > offer.promoPrice && (
                        <span className="block text-xs text-muted line-through">
                          {formatPriceLei(offer.oldPrice)}
                        </span>
                      )}
                    <span className="text-xl font-bold text-accent">
                      {formatPriceLei(offer.promoPrice)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRequestOffer(offer)}
                    className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent-hover"
                  >
                    Cere ofertă
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIMPLE 3-STEP "CUM FUNCȚIONEAZĂ" ROW */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-container px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-primary sm:text-3xl">
            Cum funcționează
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-8 text-center">
              <Car className="h-8 w-8 text-accent" />
              <p className="mt-4 text-base font-semibold text-primary">
                1. Alegi mașina și piesa
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-8 text-center">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <p className="mt-4 text-base font-semibold text-primary">
                2. Verificăm seria VIN
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-8 text-center">
              <MessageCircle className="h-8 w-8 text-accent" />
              <p className="mt-4 text-base font-semibold text-primary">
                3. Primești oferta rapid
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
