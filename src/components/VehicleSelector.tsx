"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, RotateCcw, ArrowRight } from "lucide-react";
import { VEHICLES_DB, getYearsFromRange } from "@/data/vehicles";
import { setQuotePrefill } from "@/lib/storage";

export interface SearchableDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  disabled?: boolean;
  onChange: (val: string) => void;
}

export function SearchableDropdown({
  label,
  placeholder,
  value,
  options,
  disabled = false,
  onChange,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isSearchable = options.length > 5;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    if (!open) setFilter("");
  }, [open]);

  const filteredOptions =
    isSearchable && filter.trim()
      ? options.filter((opt) =>
          opt.toLowerCase().includes(filter.trim().toLowerCase())
        )
      : options;

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-1.5 block text-xs font-medium text-muted">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-bg px-3.5 py-2.5 text-left text-sm text-primary transition focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className={value ? "truncate text-primary" : "truncate text-muted"}>
          {value || placeholder}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-muted" />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
          {isSearchable && (
            <div className="border-b border-border p-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  autoFocus
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Tastează pentru filtrare..."
                  className="w-full rounded-md border border-border bg-bg py-1.5 pl-8 pr-2.5 text-xs text-primary placeholder-muted focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="max-h-56 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3.5 py-2.5 text-xs text-muted">
                Niciun rezultat găsit.
              </div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-sm transition ${
                    value === opt
                      ? "bg-accent font-semibold text-bg"
                      : "text-primary hover:bg-border/60"
                  }`}
                >
                  {opt}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function VehicleSelector() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");

  const brandNames = VEHICLES_DB.map((b) => b.brand);
  const currentBrandObj = VEHICLES_DB.find((b) => b.brand === selectedBrand);
  const modelNames = currentBrandObj ? currentBrandObj.models.map((m) => m.name) : [];
  const currentModelObj = currentBrandObj?.models.find((m) => m.name === selectedModel);
  const yearOptions = currentModelObj ? getYearsFromRange(currentModelObj.yearsRange) : [];
  const engineOptions = currentModelObj ? currentModelObj.engines : [];

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
  };

  const handleContinue = () => {
    if (!selectedBrand || !selectedModel || !selectedYear || !selectedEngine) return;
    setQuotePrefill({
      carBrand: selectedBrand,
      carModel: selectedModel,
      carYear: selectedYear,
      carEngine: selectedEngine,
    });
    router.push("/cere-oferta");
  };

  const hasSelection = Boolean(selectedBrand || selectedModel || selectedYear || selectedEngine);
  const isComplete = Boolean(selectedBrand && selectedModel && selectedYear && selectedEngine);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Selectează mașina</h2>
        {hasSelection && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Resetează
          </button>
        )}
      </div>

      <div className="space-y-4">
        <SearchableDropdown
          label="1. Marcă"
          placeholder="Alege marca"
          value={selectedBrand}
          options={brandNames}
          onChange={(val) => {
            setSelectedBrand(val);
            setSelectedModel("");
            setSelectedYear("");
            setSelectedEngine("");
          }}
        />

        <SearchableDropdown
          label="2. Model"
          placeholder="Alege modelul"
          value={selectedModel}
          options={modelNames}
          disabled={!selectedBrand}
          onChange={(val) => {
            setSelectedModel(val);
            setSelectedYear("");
            setSelectedEngine("");
          }}
        />

        <SearchableDropdown
          label="3. An fabricație"
          placeholder="Alege anul"
          value={selectedYear}
          options={yearOptions}
          disabled={!selectedModel}
          onChange={(val) => {
            setSelectedYear(val);
            setSelectedEngine("");
          }}
        />

        <SearchableDropdown
          label="4. Motorizare"
          placeholder="Alege motorizarea"
          value={selectedEngine}
          options={engineOptions}
          disabled={!selectedYear}
          onChange={(val) => setSelectedEngine(val)}
        />

        <button
          type="button"
          disabled={!isComplete}
          onClick={handleContinue}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-border disabled:text-muted"
        >
          <span>Cere ofertă pentru mașină</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
