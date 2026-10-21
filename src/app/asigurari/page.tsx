"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Home,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  RotateCcw,
} from "lucide-react";
import { VEHICLES_DB, getYearsFromRange } from "@/data/vehicles";
import { SearchableDropdown } from "@/components/VehicleSelector";
import { validateRoPhone, validateRoPlate } from "@/lib/validators";
import { addInsuranceRequest } from "@/lib/storage";
import { InsuranceRequest } from "@/data/mockData";

export default function AsigurariPage() {
  const [selectedType, setSelectedType] = useState<"RCA" | "Locuință">("RCA");

  // Common fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState<"WhatsApp" | "Telefon">("WhatsApp");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // RCA fields
  const [plateNumber, setPlateNumber] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [currentPolicyExpiry, setCurrentPolicyExpiry] = useState("");
  const [periodMonths, setPeriodMonths] = useState<1 | 6 | 12>(12);

  // Locuință fields
  const [propertyType, setPropertyType] = useState<"Apartament" | "Casă">("Apartament");
  const [locality, setLocality] = useState("");
  const [surfaceMp, setSurfaceMp] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [policyType, setPolicyType] = useState<
    "Obligatorie PAD" | "Facultativă" | "Ambele (PAD + Facultativă)"
  >("Ambele (PAD + Facultativă)");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<InsuranceRequest | null>(null);

  // Vehicle options for RCA
  const brandNames = VEHICLES_DB.map((b) => b.brand);
  const currentBrandObj = VEHICLES_DB.find((b) => b.brand === carBrand);
  const modelNames = currentBrandObj ? currentBrandObj.models.map((m) => m.name) : [];
  const currentModelObj = currentBrandObj?.models.find((m) => m.name === carModel);
  const yearOptions = currentModelObj ? getYearsFromRange(currentModelObj.yearsRange) : [];

  const validateForm = (): boolean => {
    const nextErr: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      nextErr.name = "Te rugăm să introduci numele complet.";
    }

    const phoneRes = validateRoPhone(phone);
    if (!phoneRes.valid) {
      nextErr.phone = phoneRes.error || "Număr de telefon invalid.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErr.email = "Formatul adresei de email este invalid.";
    }

    if (selectedType === "RCA") {
      const plateRes = validateRoPlate(plateNumber);
      if (!plateRes.valid) {
        nextErr.plateNumber = plateRes.error || "Număr de înmatriculare invalid.";
      }
      if (!carBrand) nextErr.carBrand = "Selectează marca mașinii.";
      if (!carModel) nextErr.carModel = "Selectează modelul mașinii.";
      if (!carYear) nextErr.carYear = "Selectează anul fabricației.";
    } else {
      if (!locality.trim() || locality.trim().length < 2) {
        nextErr.locality = "Introdu localitatea în care se află locuința.";
      }
      const surf = Number(surfaceMp);
      if (!surf || surf < 10 || surf > 2000) {
        nextErr.surfaceMp = "Introdu suprafața aproximativă în m² (între 10 și 2000).";
      }
      if (yearBuilt.trim()) {
        const yb = Number(yearBuilt);
        if (!yb || yb < 1850 || yb > 2026) {
          nextErr.yearBuilt = "Introdu un an al construcției valid (1850 – 2026).";
        }
      }
    }

    if (!gdprConsent) {
      nextErr.gdprConsent = "Acordul de prelucrare a datelor este obligatoriu.";
    }

    setErrors(nextErr);
    return Object.keys(nextErr).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Anti-spam honeypot check
    if (honeypot.trim().length > 0) return;
    if (!validateForm()) return;

    const saved = addInsuranceRequest({
      type: selectedType,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      preferredContact,
      ...(selectedType === "RCA"
        ? {
            plateNumber: plateNumber.trim().toUpperCase(),
            carBrand,
            carModel,
            carYear,
            currentPolicyExpiry: currentPolicyExpiry || undefined,
            periodMonths,
          }
        : {
            propertyType,
            locality: locality.trim(),
            surfaceMp: Number(surfaceMp),
            yearBuilt: yearBuilt.trim() || undefined,
            policyType,
          }),
    });

    setSubmitted(saved);
  };

  const handleReset = () => {
    setSubmitted(null);
    setName("");
    setPhone("");
    setEmail("");
    setPlateNumber("");
    setCarBrand("");
    setCarModel("");
    setCarYear("");
    setCurrentPolicyExpiry("");
    setLocality("");
    setSurfaceMp("");
    setYearBuilt("");
    setGdprConsent(false);
    setErrors({});
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Asigurări
          </h1>
          <p className="mt-2 text-sm text-muted">
            Alege tipul de asigurare dorit și îți trimitem cea mai bună ofertă pe telefon sau WhatsApp.
          </p>
        </div>

        {/* Two Big Selectable Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setSelectedType("RCA");
              setSubmitted(null);
              setErrors({});
            }}
            className={`flex items-center gap-4 rounded-2xl border p-6 text-left transition ${
              selectedType === "RCA"
                ? "border-accent bg-surface"
                : "border-border bg-bg hover:border-muted"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                selectedType === "RCA"
                  ? "bg-accent text-bg"
                  : "bg-surface text-muted"
              }`}
            >
              <Car className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-lg font-bold text-primary">
                RCA Auto
              </span>
              <span className="text-xs text-muted">
                Asigurare obligatorie auto pe 1, 6 sau 12 luni
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedType("Locuință");
              setSubmitted(null);
              setErrors({});
            }}
            className={`flex items-center gap-4 rounded-2xl border p-6 text-left transition ${
              selectedType === "Locuință"
                ? "border-accent bg-surface"
                : "border-border bg-bg hover:border-muted"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                selectedType === "Locuință"
                  ? "bg-accent text-bg"
                  : "bg-surface text-muted"
              }`}
            >
              <Home className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-lg font-bold text-primary">
                Asigurare locuință
              </span>
              <span className="text-xs text-muted">
                Poliță PAD obligatorie și asigurare facultativă
              </span>
            </div>
          </button>
        </div>

        {/* Conditional Form / Success Screen */}
        <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
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
                <h2 className="text-2xl font-bold text-primary">
                  Referință:{" "}
                  <span className="font-mono text-accent">{submitted.refNumber}</span>
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  Cererea ta pentru{" "}
                  <strong className="text-primary">
                    {submitted.type === "RCA" ? "RCA Auto" : "Asigurare locuință"}
                  </strong>{" "}
                  a fost înregistrată. Te vom contacta pe {submitted.preferredContact} la numărul{" "}
                  <strong className="text-primary">{submitted.phone}</strong>.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/40799000123?text=${encodeURIComponent(
                      `Salut AlexAuto! Am trimis cererea de asigurare ${submitted.type} cu nr. ${submitted.refNumber}.`
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
                key={selectedType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-8"
              >
                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Nu completa acest câmp
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>

                {/* Common Contact Fields */}
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

                {/* CONDITIONAL FIELDS: RCA AUTO */}
                {selectedType === "RCA" ? (
                  <div className="space-y-5 border-t border-border pt-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div>
                        <SearchableDropdown
                          label="Marcă *"
                          placeholder="Alege marca"
                          value={carBrand}
                          options={brandNames}
                          onChange={(val) => {
                            setCarBrand(val);
                            setCarModel("");
                            setCarYear("");
                          }}
                        />
                        {errors.carBrand && (
                          <p className="mt-1 text-xs text-accent">{errors.carBrand}</p>
                        )}
                      </div>

                      <div>
                        <SearchableDropdown
                          label="Model *"
                          placeholder="Alege modelul"
                          value={carModel}
                          options={modelNames}
                          disabled={!carBrand}
                          onChange={(val) => {
                            setCarModel(val);
                            setCarYear("");
                          }}
                        />
                        {errors.carModel && (
                          <p className="mt-1 text-xs text-accent">{errors.carModel}</p>
                        )}
                      </div>

                      <div>
                        <SearchableDropdown
                          label="An fabricație *"
                          placeholder="Alege anul"
                          value={carYear}
                          options={yearOptions}
                          disabled={!carModel}
                          onChange={(val) => setCarYear(val)}
                        />
                        {errors.carYear && (
                          <p className="mt-1 text-xs text-accent">{errors.carYear}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Număr înmatriculare (RO) *
                        </label>
                        <input
                          type="text"
                          value={plateNumber}
                          onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                          placeholder="B 123 ALX"
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 font-mono text-sm uppercase text-primary placeholder-muted focus:border-accent focus:outline-none"
                        />
                        {errors.plateNumber && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            {errors.plateNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Expirare poliță actuală (opțional)
                        </label>
                        <input
                          type="date"
                          value={currentPolicyExpiry}
                          onChange={(e) => setCurrentPolicyExpiry(e.target.value)}
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Perioadă dorită *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {([1, 6, 12] as const).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setPeriodMonths(m)}
                              className={`rounded-lg border py-2.5 text-xs font-semibold transition ${
                                periodMonths === m
                                  ? "border-accent bg-accent text-bg"
                                  : "border-border bg-bg text-primary hover:border-accent"
                              }`}
                            >
                              {m} {m === 1 ? "lună" : "luni"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* CONDITIONAL FIELDS: ASIGURARE LOCUINȚĂ */
                  <div className="space-y-5 border-t border-border pt-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Tip locuință *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {(["Apartament", "Casă"] as const).map((pt) => (
                            <button
                              key={pt}
                              type="button"
                              onClick={() => setPropertyType(pt)}
                              className={`rounded-lg border py-2.5 text-xs font-semibold transition ${
                                propertyType === pt
                                  ? "border-accent bg-accent text-bg"
                                  : "border-border bg-bg text-primary hover:border-accent"
                              }`}
                            >
                              {pt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Localitate *
                        </label>
                        <input
                          type="text"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          placeholder="Ex: București, Sector 3"
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                        />
                        {errors.locality && (
                          <p className="mt-1 text-xs text-accent">{errors.locality}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Suprafață aproximativă (m²) *
                        </label>
                        <input
                          type="number"
                          value={surfaceMp}
                          onChange={(e) => setSurfaceMp(e.target.value)}
                          placeholder="Ex: 65"
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                        />
                        {errors.surfaceMp && (
                          <p className="mt-1 text-xs text-accent">{errors.surfaceMp}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          An construcție (opțional)
                        </label>
                        <input
                          type="number"
                          value={yearBuilt}
                          onChange={(e) => setYearBuilt(e.target.value)}
                          placeholder="Ex: 2015"
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                        />
                        {errors.yearBuilt && (
                          <p className="mt-1 text-xs text-accent">{errors.yearBuilt}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          Tip poliță dorită *
                        </label>
                        <select
                          value={policyType}
                          onChange={(e) =>
                            setPolicyType(
                              e.target.value as
                                | "Obligatorie PAD"
                                | "Facultativă"
                                | "Ambele (PAD + Facultativă)"
                            )
                          }
                          className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary focus:border-accent focus:outline-none"
                        >
                          <option value="Obligatorie PAD">Obligatorie PAD</option>
                          <option value="Facultativă">Facultativă</option>
                          <option value="Ambele (PAD + Facultativă)">
                            Ambele (PAD + Facultativă)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferred Contact & GDPR */}
                <div className="space-y-5 border-t border-border pt-6">
                  <div className="max-w-xs">
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Cum preferi să te contactăm? *
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

                  <div className="rounded-xl border border-border bg-bg p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 accent-accent"
                      />
                      <span className="text-xs text-muted">
                        Sunt de acord cu prelucrarea datelor de contact pentru ofertare conform{" "}
                        <Link
                          href="/politica-confidentialitate"
                          target="_blank"
                          className="font-semibold text-primary underline hover:text-accent"
                        >
                          Politicii de Confidențialitate
                        </Link>
                        . *
                      </span>
                    </label>
                    {errors.gdprConsent && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-accent">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.gdprConsent}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end border-t border-border pt-6">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition hover:bg-accent-hover sm:w-auto"
                  >
                    Cere ofertă asigurare
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
