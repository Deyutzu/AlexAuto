"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Upload,
  AlertCircle,
  Phone,
  MessageCircle,
  X,
  RotateCcw,
} from "lucide-react";
import {
  addPartRequest,
  getQuotePrefill,
  clearQuotePrefill,
  STORAGE_UPDATE_EVENT,
} from "@/lib/storage";
import { validateVIN, validateRoPhone } from "@/lib/validators";
import { PartQuoteRequest } from "@/data/mockData";

export default function QuoteRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carEngine, setCarEngine] = useState("");
  const [vin, setVin] = useState("");
  const [desiredParts, setDesiredParts] = useState("");
  const [talonFileName, setTalonFileName] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<"WhatsApp" | "Telefon">("WhatsApp");
  const [prefillBanner, setPrefillBanner] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRequest, setSubmittedRequest] = useState<PartQuoteRequest | null>(null);

  useEffect(() => {
    const applyPrefill = () => {
      const prefill = getQuotePrefill();
      if (!prefill) return;
      if (prefill.carBrand) setCarBrand(prefill.carBrand);
      if (prefill.carModel) setCarModel(prefill.carModel);
      if (prefill.carYear) setCarYear(prefill.carYear);
      if (prefill.carEngine) setCarEngine(prefill.carEngine);
      if (prefill.desiredParts) {
        setDesiredParts((prev) => {
          if (!prev.trim()) return prefill.desiredParts!;
          if (prev.includes(prefill.desiredParts!)) return prev;
          return `${prev}\n• ${prefill.desiredParts}`;
        });
      }
      if (prefill.fromOfferTitle) {
        setPrefillBanner(`Produs selectat: ${prefill.fromOfferTitle}`);
      } else if (prefill.carBrand) {
        setPrefillBanner(
          `Mașină selectată: ${prefill.carBrand} ${prefill.carModel || ""} ${prefill.carYear || ""}`
        );
      }
      clearQuotePrefill();
    };

    applyPrefill();
    window.addEventListener(STORAGE_UPDATE_EVENT, applyPrefill);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, applyPrefill);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTalonFileName(file.name);
    }
  };

  const handleFillDemoVin = () => {
    setVin("WVWZZZ3CZHE123456");
    setErrors((prev) => {
      const next = { ...prev };
      delete next.vin;
      return next;
    });
  };

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      nextErrors.name = "Introdu numele complet.";
    }

    const phoneRes = validateRoPhone(phone);
    if (!phoneRes.valid) {
      nextErrors.phone = phoneRes.error || "Număr de telefon invalid.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Format email invalid.";
    }

    if (!carBrand.trim()) nextErrors.carBrand = "Marca este obligatorie.";
    if (!carModel.trim()) nextErrors.carModel = "Modelul este obligatoriu.";
    if (!carYear.trim()) nextErrors.carYear = "Anul este obligatoriu.";
    if (!carEngine.trim()) nextErrors.carEngine = "Motorizarea este obligatorie.";

    const vinRes = validateVIN(vin);
    if (!vinRes.valid) {
      nextErrors.vin = vinRes.error || "Seria VIN este invalidă.";
    }

    if (!desiredParts.trim() || desiredParts.trim().length < 5) {
      nextErrors.desiredParts = "Menționează piesele dorite.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const cleanVin = vin.trim().toUpperCase();
    const maskedVin = `${cleanVin.slice(0, 8)}*********`;

    const saved = addPartRequest({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      carBrand: carBrand.trim(),
      carModel: carModel.trim(),
      carYear: carYear.trim(),
      carEngine: carEngine.trim(),
      vinProvided: true,
      vinMasked: maskedVin,
      desiredParts: desiredParts.trim(),
      talonFileName: talonFileName || undefined,
      preferredContact,
    });

    setVin("");
    setSubmittedRequest(saved);
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setName("");
    setPhone("");
    setEmail("");
    setDesiredParts("");
    setTalonFileName("");
    setPrefillBanner(null);
    setErrors({});
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
      <AnimatePresence mode="wait">
        {submittedRequest ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-bg text-accent">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-primary">
              Referință:{" "}
              <span className="font-mono text-accent">{submittedRequest.refNumber}</span>
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Te vom contacta pe {submittedRequest.preferredContact} la numărul{" "}
              <strong className="text-primary">{submittedRequest.phone}</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/40799000123?text=${encodeURIComponent(
                  `Salut AlexAuto! Am trimis cererea ${submittedRequest.refNumber} pentru ${submittedRequest.carBrand} ${submittedRequest.carModel}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover"
              >
                <MessageCircle className="h-4 w-4" />
                Trimite pe WhatsApp
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg px-5 py-3 text-sm font-semibold text-primary transition hover:border-accent"
              >
                <RotateCcw className="h-4 w-4" />
                Cerere nouă
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
          >
            {prefillBanner && (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-accent bg-bg px-4 py-3 text-xs text-primary">
                <span>{prefillBanner}</span>
                <button
                  type="button"
                  onClick={() => setPrefillBanner(null)}
                  className="text-muted hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* 1. Date contact */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Nume și prenume *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Andrei Popescu"
                  className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                />
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Telefon *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0744 123 456"
                  className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                />
                {errors.phone && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Email (opțional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="andrei@exemplu.ro"
                  className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-accent">{errors.email}</p>
                )}
              </div>
            </div>

            {/* 2. Date vehicul */}
            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Marcă *
                  </label>
                  <input
                    type="text"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    placeholder="Volkswagen"
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                  {errors.carBrand && (
                    <p className="mt-1 text-xs text-accent">{errors.carBrand}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="Golf 7"
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                  {errors.carModel && (
                    <p className="mt-1 text-xs text-accent">{errors.carModel}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    An *
                  </label>
                  <input
                    type="text"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    placeholder="2018"
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                  {errors.carYear && (
                    <p className="mt-1 text-xs text-accent">{errors.carYear}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Motorizare *
                  </label>
                  <input
                    type="text"
                    value={carEngine}
                    onChange={(e) => setCarEngine(e.target.value)}
                    placeholder="2.0 TDI 150 CP"
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                  {errors.carEngine && (
                    <p className="mt-1 text-xs text-accent">{errors.carEngine}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium text-muted">
                    Serie șasiu (VIN — 17 caractere, fără I, O, Q) *
                  </label>
                  <button
                    type="button"
                    onClick={handleFillDemoVin}
                    className="text-xs font-medium text-accent underline"
                  >
                    Completează VIN demo
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={17}
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    placeholder="WVWZZZ3CZHE123456"
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 font-mono text-sm uppercase text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted">
                    {vin.length}/17
                  </span>
                </div>
                {errors.vin && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.vin}
                  </p>
                )}
              </div>
            </div>

            {/* 3. Piese dorite & contact */}
            <div className="border-t border-border pt-6">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Piese dorite *
                </label>
                <textarea
                  rows={4}
                  value={desiredParts}
                  onChange={(e) => setDesiredParts(e.target.value)}
                  placeholder="Descrie piesele necesare sau codurile OEM..."
                  className="w-full rounded-lg border border-border bg-bg p-3.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                />
                {errors.desiredParts && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.desiredParts}
                  </p>
                )}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Poză talon (opțional)
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-dashed border-border bg-bg px-4 py-3 text-xs text-muted transition hover:border-accent">
                    <span className="truncate">
                      {talonFileName || "Încarcă poză talon (JPG, PNG, PDF)"}
                    </span>
                    <Upload className="h-4 w-4 shrink-0 text-accent" />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Contact preferat *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPreferredContact("WhatsApp")}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition ${
                        preferredContact === "WhatsApp"
                          ? "border-accent bg-accent text-bg"
                          : "border-border bg-bg text-primary hover:border-accent"
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredContact("Telefon")}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition ${
                        preferredContact === "Telefon"
                          ? "border-accent bg-accent text-bg"
                          : "border-border bg-bg text-primary hover:border-accent"
                      }`}
                    >
                      <Phone className="h-4 w-4" />
                      Telefon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-border pt-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition hover:bg-accent-hover sm:w-auto"
              >
                Trimite cererea
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
