import React from "react";
import Link from "next/link";
import { Wrench, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface text-muted">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-bg">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-primary">
                Alex<span className="text-accent">Auto</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Piese auto pe bază de ofertă și asigurări în România.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary">Navigare</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#oferte" className="transition hover:text-primary">
                  Oferte
                </Link>
              </li>
              <li>
                <Link href="/cere-oferta" className="transition hover:text-primary">
                  Cere ofertă
                </Link>
              </li>
              <li>
                <Link href="/asigurari" className="transition hover:text-primary">
                  Asigurări
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary">Contact</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-primary">0799 000 123</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                <span>B-dul Industriei Auto 42, București</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span>L–V: 08:30–18:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary">Legal &amp; ANPC</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/termeni-si-conditii"
                  className="transition hover:text-primary"
                >
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-confidentialitate"
                  className="transition hover:text-primary"
                >
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-primary"
                >
                  ANPC — SAL <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-primary"
                >
                  Platforma SOL <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} AlexAuto Demo. Toate datele sunt fictive.</p>
          <Link
            href="/admin"
            className="text-xs text-muted transition hover:text-primary"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
