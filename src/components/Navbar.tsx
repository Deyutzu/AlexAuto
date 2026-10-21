"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#oferte", label: "Oferte" },
    { href: "/cere-oferta", label: "Cere ofertă" },
    { href: "/asigurari", label: "Asigurări" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-bg">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            Alex<span className="text-accent">Auto</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href !== "/#oferte" &&
              link.href !== "/#contact" &&
              pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-accent" : "text-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/cere-oferta"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent-hover"
          >
            Cere ofertă
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Meniu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-primary md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-bg px-6 py-5 md:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-sm font-medium text-muted transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cere-oferta"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent-hover"
            >
              Cere ofertă
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
