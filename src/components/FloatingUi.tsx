"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Cookie, X, Send } from "lucide-react";
import { getCookieConsent, setCookieConsent } from "@/lib/storage";

export default function FloatingUi() {
  const [cookieAccepted, setCookieAccepted] = useState(true);
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState(
    "Salut AlexAuto! Doresc o ofertă pentru piese auto / RCA."
  );

  useEffect(() => {
    setCookieAccepted(getCookieConsent());
  }, []);

  const handleAcceptCookies = () => {
    setCookieConsent();
    setCookieAccepted(true);
  };

  const whatsappUrl = `https://wa.me/40799000123?text=${encodeURIComponent(quickMessage)}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {waModalOpen && (
          <div className="mb-3 w-72 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-bg px-4 py-3">
              <span className="text-xs font-semibold text-primary">
                WhatsApp (0799 000 123)
              </span>
              <button
                type="button"
                onClick={() => setWaModalOpen(false)}
                className="text-muted hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <textarea
                rows={3}
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg p-2.5 text-xs text-primary focus:border-accent focus:outline-none"
              />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-bg transition hover:bg-accent-hover"
              >
                <Send className="h-3.5 w-3.5" />
                Trimite pe WhatsApp
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setWaModalOpen(!waModalOpen)}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-bg shadow-lg transition hover:bg-accent-hover"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </button>
      </div>

      {/* Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface p-4">
          <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-4 px-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Cookie className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-xs text-muted">
                Folosim stocarea locală pentru acest prototip.{" "}
                <Link
                  href="/politica-confidentialitate"
                  className="text-primary underline hover:text-accent"
                >
                  Politica de Confidențialitate
                </Link>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={handleAcceptCookies}
              className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-bg transition hover:bg-accent-hover"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
