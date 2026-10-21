"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Wrench,
  ShieldCheck,
  Tag,
  LayoutDashboard,
  Plus,
  Pencil,
  Copy,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Star,
  MessageCircle,
  X,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";
import {
  Offer,
  PartQuoteRequest,
  InsuranceRequest,
  RequestStatus,
  createPlaceholderOfferImage,
} from "@/data/mockData";
import {
  getOffers,
  addOffer,
  updateOffer,
  setOfferOfTheDay,
  duplicateOffer,
  deleteOffer,
  restoreDeletedOffer,
  bulkImportOffers,
  getPartRequests,
  updatePartRequestStatus,
  deletePartRequest,
  getInsuranceRequests,
  updateInsuranceRequestStatus,
  deleteInsuranceRequest,
  exportFullBackupJson,
  restoreFullBackupJson,
  getAdminAuthenticated,
  setAdminAuthenticated,
  resetAllDemoData,
  STORAGE_UPDATE_EVENT,
} from "@/lib/storage";
import {
  calculateDiscountPercent,
  calculatePromoPriceFromDiscount,
  validateOfferPricing,
  formatPriceLei,
  formatDiscountBadge,
  isOfferExpired,
} from "@/lib/pricing";

const DEMO_PASSWORD = "alexauto2026";

function formatRoWhatsAppUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0")
    ? `40${digits.slice(1)}`
    : digits.startsWith("40")
    ? digits
    : `40${digits}`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

async function resizeAndCompressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Nu am putut citi imaginea selectată."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Fișierul selectat nu este o imagine validă."));
      img.onload = () => {
        const maxWidth = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(compressedDataUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "prezentare" | "oferte" | "piese" | "asigurari"
  >("prezentare");

  // Data state
  const [offers, setOffers] = useState<Offer[]>([]);
  const [partRequests, setPartRequests] = useState<PartQuoteRequest[]>([]);
  const [insuranceRequests, setInsuranceRequests] = useState<InsuranceRequest[]>([]);

  // Offers filter / search / sort state
  const [offerSearch, setOfferSearch] = useState("");
  const [offerFilter, setOfferFilter] = useState<"toate" | "active" | "expirate">("toate");
  const [offerSort, setOfferSort] = useState<"noi" | "reducere" | "pret">("noi");

  // Requests filter / search state
  const [statusFilterPiese, setStatusFilterPiese] = useState<string>("Toate");
  const [searchPiese, setSearchPiese] = useState<string>("");
  const [statusFilterAsig, setStatusFilterAsig] = useState<string>("Toate");
  const [searchAsig, setSearchAsig] = useState<string>("");

  // Confirmation states for deletes
  const [confirmDeleteOfferId, setConfirmDeleteOfferId] = useState<string | null>(null);
  const [confirmDeletePartReqId, setConfirmDeletePartReqId] = useState<string | null>(null);
  const [confirmDeleteInsReqId, setConfirmDeleteInsReqId] = useState<string | null>(null);

  // Toast & Undo state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [undoOffer, setUndoOffer] = useState<Offer | null>(null);

  // Side Panel / Modal for Add/Edit Offer
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPartCode, setFormPartCode] = useState("");
  const [formHasDiscount, setFormHasDiscount] = useState(false);
  const [formOldPrice, setFormOldPrice] = useState("250");
  const [formPromoPrice, setFormPromoPrice] = useState("189");
  const [formDiscountPercent, setFormDiscountPercent] = useState("24");
  const [lastPriceSource, setLastPriceSource] = useState<"promo" | "discount">("promo");
  const [formValidUntil, setFormValidUntil] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsOfferOfTheDay, setFormIsOfferOfTheDay] = useState(false);
  const [formError, setFormError] = useState("");

  const loadAll = () => {
    setOffers(getOffers());
    setPartRequests(getPartRequests());
    setInsuranceRequests(getInsuranceRequests());
  };

  useEffect(() => {
    setAuthenticated(getAdminAuthenticated());
    loadAll();
    window.addEventListener(STORAGE_UPDATE_EVENT, loadAll);
    window.addEventListener("storage", loadAll);
    return () => {
      window.removeEventListener(STORAGE_UPDATE_EVENT, loadAll);
      window.removeEventListener("storage", loadAll);
    };
  }, []);

  const showToast = (msg: string, deletedOfferForUndo?: Offer) => {
    setToastMessage(msg);
    setUndoOffer(deletedOfferForUndo || null);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 6000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === DEMO_PASSWORD) {
      setAdminAuthenticated(true);
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Parolă incorectă. Parola demonstrativă este: alexauto2026");
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setAuthenticated(false);
    setPasswordInput("");
  };

  // --- TWO-WAY PRICE & DISCOUNT HANDLERS ---
  const handleOldPriceChange = (val: string) => {
    setFormOldPrice(val);
    const oldP = parseFloat(val);
    if (!Number.isFinite(oldP) || oldP <= 0) return;

    if (lastPriceSource === "discount") {
      const disc = parseFloat(formDiscountPercent);
      if (Number.isFinite(disc)) {
        const nextPromo = calculatePromoPriceFromDiscount(oldP, disc);
        setFormPromoPrice(String(nextPromo));
      }
    } else {
      const promoP = parseFloat(formPromoPrice);
      if (Number.isFinite(promoP) && promoP > 0) {
        const nextDisc = calculateDiscountPercent(oldP, promoP);
        setFormDiscountPercent(String(nextDisc));
      }
    }
  };

  const handlePromoPriceChange = (val: string) => {
    setLastPriceSource("promo");
    setFormPromoPrice(val);
    const oldP = parseFloat(formOldPrice);
    const promoP = parseFloat(val);
    if (Number.isFinite(oldP) && oldP > 0 && Number.isFinite(promoP) && promoP > 0) {
      const nextDisc = calculateDiscountPercent(oldP, promoP);
      setFormDiscountPercent(String(nextDisc));
    }
  };

  const handleDiscountPercentChange = (val: string) => {
    setLastPriceSource("discount");
    setFormDiscountPercent(val);
    const oldP = parseFloat(formOldPrice);
    const disc = parseFloat(val);
    if (Number.isFinite(oldP) && oldP > 0 && Number.isFinite(disc)) {
      const nextPromo = calculatePromoPriceFromDiscount(oldP, disc);
      setFormPromoPrice(String(nextPromo));
    }
  };

  // --- OPEN ADD / EDIT MODAL ---
  const openAddOfferPanel = () => {
    setEditingOfferId(null);
    setFormName("");
    setFormDescription("");
    setFormPartCode("");
    setFormHasDiscount(false);
    setFormOldPrice("250");
    setFormPromoPrice("189");
    setFormDiscountPercent("24");
    setLastPriceSource("promo");
    setFormValidUntil("");
    setFormImage("");
    setFormIsActive(true);
    setFormIsOfferOfTheDay(false);
    setFormError("");
    setPanelOpen(true);
    setActiveTab("oferte");
  };

  const openEditOfferPanel = (offer: Offer) => {
    const hasDisc = offer.discountPercent > 0 && offer.oldPrice > offer.promoPrice;
    setEditingOfferId(offer.id);
    setFormName(offer.name);
    setFormDescription(offer.description || "");
    setFormPartCode(offer.partCode);
    setFormHasDiscount(hasDisc);
    setFormOldPrice(String(offer.oldPrice));
    setFormPromoPrice(
      hasDisc
        ? String(offer.promoPrice)
        : String(calculatePromoPriceFromDiscount(offer.oldPrice, 20))
    );
    setFormDiscountPercent(hasDisc ? String(offer.discountPercent) : "20");
    setLastPriceSource("promo");
    setFormValidUntil(offer.validUntil || "");
    setFormImage(offer.image);
    setFormIsActive(offer.isActive);
    setFormIsOfferOfTheDay(offer.isOfferOfTheDay);
    setFormError("");
    setPanelOpen(true);
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setFormError("Format neacceptat. Încarcă o poză JPG, PNG sau WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Poza este prea mare. Dimensiunea maximă permisă este 5 MB.");
      return;
    }
    try {
      const compressed = await resizeAndCompressImage(file);
      setFormImage(compressed);
      setFormError("");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Eroare la prelucrarea imaginii."
      );
    }
    e.target.value = "";
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError("Te rugăm să scrii denumirea ofertei.");
      return;
    }
    if (!formPartCode.trim()) {
      setFormError("Te rugăm să introduci codul piesei (OEM).");
      return;
    }

    const oldP = Number(formOldPrice);
    const promoP = formHasDiscount ? Number(formPromoPrice) : oldP;
    const discP = formHasDiscount ? Math.round(Number(formDiscountPercent)) : 0;

    const pricingValidation = validateOfferPricing(oldP, promoP, discP, formHasDiscount);
    if (!pricingValidation.valid) {
      setFormError(pricingValidation.error || "Prețurile introduse nu sunt valide.");
      return;
    }

    const finalImage =
      formImage.trim() ||
      createPlaceholderOfferImage(formName.trim(), formPartCode.trim().toUpperCase());

    if (editingOfferId) {
      const existing = offers.find((o) => o.id === editingOfferId);
      updateOffer({
        id: editingOfferId,
        name: formName.trim(),
        description: formDescription.trim() || undefined,
        partCode: formPartCode.trim().toUpperCase(),
        image: finalImage,
        oldPrice: oldP,
        promoPrice: promoP,
        discountPercent: discP,
        validUntil: formValidUntil.trim() || undefined,
        isActive: formIsActive,
        isOfferOfTheDay: formIsOfferOfTheDay,
        createdAt: existing?.createdAt || new Date().toISOString(),
      });
      showToast(`Oferta „${formName.trim()}” a fost salvată.`);
    } else {
      addOffer({
        name: formName.trim(),
        description: formDescription.trim() || undefined,
        partCode: formPartCode.trim().toUpperCase(),
        image: finalImage,
        oldPrice: oldP,
        promoPrice: promoP,
        discountPercent: discP,
        validUntil: formValidUntil.trim() || undefined,
        isActive: formIsActive,
        isOfferOfTheDay: formIsOfferOfTheDay,
      });
      showToast(`Oferta „${formName.trim()}” a fost adăugată pe site.`);
    }

    setPanelOpen(false);
    loadAll();
  };

  // --- CSV TEMPLATE, IMPORT & EXPORT ---
  const handleDownloadCsvTemplate = () => {
    const csvContent = [
      "name,partCode,oldPrice,promoPrice,validUntil,isActive,description",
      '"Set Plăcuțe Frână Spate TRW Golf 7","5Q0698451N",245,179,2026-12-31,true,"Set plăcuțe frână punte spate"',
      '"Filtru Cutie Automată DSG Mahle","02E305051C",135,95,2026-12-15,true,"Filtru transmisie automată DSG"',
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sablon_oferte_alexauto.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportOffersCsv = () => {
    const header =
      "name,partCode,oldPrice,promoPrice,discountPercent,validUntil,isActive,isOfferOfTheDay,description";
    const rows = offers.map((o) =>
      [
        `"${o.name.replace(/"/g, '""')}"`,
        `"${o.partCode}"`,
        o.oldPrice,
        o.promoPrice,
        o.discountPercent,
        o.validUntil || "",
        o.isActive,
        o.isOfferOfTheDay,
        `"${(o.description || "").replace(/"/g, '""')}"`,
      ].join(",")
    );
    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "oferte_export_alexauto.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Lista de oferte a fost descărcată în format CSV.");
  };

  const parseCsvLine = (line: string, delimiter: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

      if (lines.length < 2) {
        showToast("Fișierul CSV selectat este gol.");
        return;
      }

      const delimiter = lines[0].includes(";") ? ";" : ",";
      const parsedOffers: Omit<Offer, "id" | "createdAt">[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i], delimiter);
        if (cols.length < 4) continue;
        const [
          cName,
          cPartCode,
          cOldPrice,
          cPromoPrice,
          cValidUntil,
          cActive,
          cDesc,
        ] = cols;

        if (!cName || !cPartCode) continue;
        const oldP = Number(cOldPrice) || 250;
        const promoP = Number(cPromoPrice) || 189;
        const discP = calculateDiscountPercent(oldP, promoP);

        parsedOffers.push({
          name: cName,
          partCode: cPartCode.toUpperCase(),
          oldPrice: oldP,
          promoPrice: promoP,
          discountPercent: Math.max(1, Math.min(90, discP || 20)),
          validUntil: cValidUntil || undefined,
          isActive: cActive ? cActive.toLowerCase() !== "false" : true,
          isOfferOfTheDay: false,
          description: cDesc || undefined,
          image: createPlaceholderOfferImage(cName, cPartCode.toUpperCase()),
        });
      }

      if (parsedOffers.length === 0) {
        showToast("Nu s-au găsit rânduri valide în fișierul CSV.");
        return;
      }

      const count = bulkImportOffers(parsedOffers);
      loadAll();
      showToast(`Au fost importate ${count} oferte noi din CSV.`);
      e.target.value = "";
    };
    reader.readAsText(file, "UTF-8");
  };

  // --- JSON BACKUP DOWNLOAD & RESTORE ---
  const handleDownloadJsonBackup = () => {
    const json = exportFullBackupJson();
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `backup_alexauto_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Copia de siguranță (JSON) a fost descărcată.");
  };

  const handleRestoreJsonBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = restoreFullBackupJson(String(reader.result || ""));
      if (res.valid) {
        loadAll();
        showToast("Datele au fost restaurate cu succes din copia de siguranță!");
      } else {
        showToast(res.error || "Eroare la restaurarea copiei de siguranță.");
      }
      e.target.value = "";
    };
    reader.readAsText(file, "UTF-8");
  };

  // --- LOGIN SCREEN ---
  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-6 py-16">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-bg">
            <Lock className="h-6 w-6" />
          </div>
          <div className="text-center">
            <span className="inline-block rounded-md border border-accent px-2.5 py-0.5 text-[11px] font-bold uppercase text-accent">
              MOD DEMO
            </span>
            <h1 className="mt-2 text-2xl font-bold text-primary">
              Panou Administrare AlexAuto
            </h1>
            <p className="mt-1 text-xs text-muted">
              Parolă demonstrativă: <code className="text-accent">{DEMO_PASSWORD}</code>
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-muted">Parolă</label>
                <button
                  type="button"
                  onClick={() => setPasswordInput(DEMO_PASSWORD)}
                  className="text-xs font-medium text-accent underline"
                >
                  Completează parola demo
                </button>
              </div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Introdu parola..."
                className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
              />
              {loginError && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-accent">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover"
            >
              Intră în panou
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Counters
  const newPartRequestsCount = partRequests.filter((r) => r.status === "Nou").length;
  const newInsuranceRequestsCount = insuranceRequests.filter(
    (r) => r.status === "Nou"
  ).length;
  const totalNewRequests = newPartRequestsCount + newInsuranceRequestsCount;
  const activeOffersCount = offers.filter(
    (o) => o.isActive && !isOfferExpired(o.validUntil)
  ).length;
  const currentOfferOfTheDay = offers.find(
    (o) => o.isOfferOfTheDay && o.isActive && !isOfferExpired(o.validUntil)
  );

  // Filtered & Sorted Offers
  const filteredOffers = offers
    .filter((o) => {
      const expired = isOfferExpired(o.validUntil);
      if (offerFilter === "active" && (!o.isActive || expired)) return false;
      if (offerFilter === "expirate" && !expired) return false;
      const q = offerSearch.trim().toLowerCase();
      if (!q) return true;
      return (
        o.name.toLowerCase().includes(q) || o.partCode.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (offerSort === "reducere") return b.discountPercent - a.discountPercent;
      if (offerSort === "pret") return a.promoPrice - b.promoPrice;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Filtered Part Requests
  const filteredPartRequests = partRequests.filter((r) => {
    const matchStatus =
      statusFilterPiese === "Toate" || r.status === statusFilterPiese;
    const q = searchPiese.trim().toLowerCase();
    const matchQuery =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.refNumber.toLowerCase().includes(q) ||
      r.carBrand.toLowerCase().includes(q) ||
      r.desiredParts.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  // Filtered Insurance Requests
  const filteredInsuranceRequests = insuranceRequests.filter((r) => {
    const matchStatus =
      statusFilterAsig === "Toate" || r.status === statusFilterAsig;
    const q = searchAsig.trim().toLowerCase();
    const matchQuery =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.refNumber.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      (r.plateNumber || "").toLowerCase().includes(q) ||
      (r.locality || "").toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  // Live Preview computed values
  const previewOldPrice = Number(formOldPrice) || 250;
  const previewPromoPrice = formHasDiscount
    ? Number(formPromoPrice) || 189
    : previewOldPrice;
  const previewDiscount = formHasDiscount
    ? Math.round(Number(formDiscountPercent)) || 24
    : 0;
  const previewImage =
    formImage.trim() ||
    createPlaceholderOfferImage(
      formName.trim() || "Denumire Piesă",
      formPartCode.trim().toUpperCase() || "COD-OEM"
    );

  return (
    <div className="mx-auto max-w-container px-6 py-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="inline-block rounded border border-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
            PANOU ADMINISTRARE DEMO
          </span>
          <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">
            Administrare AlexAuto
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openAddOfferPanel}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent-hover"
          >
            <Plus className="h-4 w-4" />
            Adaugă ofertă
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary hover:border-accent"
          >
            <ExternalLink className="h-4 w-4 text-accent" />
            Vezi site-ul
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-2.5 text-xs font-semibold text-muted hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Ieșire
          </button>
        </div>
      </div>

      {/* Toast Notification with Optional Undo ("Anulează") */}
      {toastMessage && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent bg-surface px-5 py-3.5 text-sm text-primary">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            <span>{toastMessage}</span>
          </div>
          <div className="flex items-center gap-3">
            {undoOffer && (
              <button
                type="button"
                onClick={() => {
                  restoreDeletedOffer(undoOffer);
                  setUndoOffer(null);
                  setToastMessage("Oferta ștearsă a fost restaurată.");
                  loadAll();
                }}
                className="rounded-md bg-accent px-3 py-1 text-xs font-bold text-bg hover:bg-accent-hover"
              >
                Anulează ștergerea
              </button>
            )}
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-muted hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4 Main Tabs */}
      <div className="mt-8 flex flex-wrap gap-3 border-b border-border pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("prezentare")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${
            activeTab === "prezentare"
              ? "bg-accent text-bg"
              : "border border-border bg-surface text-muted hover:text-primary"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Prezentare
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("oferte")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${
            activeTab === "oferte"
              ? "bg-accent text-bg"
              : "border border-border bg-surface text-muted hover:text-primary"
          }`}
        >
          <Tag className="h-4 w-4" />
          Oferte ({offers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("piese")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${
            activeTab === "piese"
              ? "bg-accent text-bg"
              : "border border-border bg-surface text-muted hover:text-primary"
          }`}
        >
          <Wrench className="h-4 w-4" />
          Cereri piese
          {newPartRequestsCount > 0 && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                activeTab === "piese"
                  ? "bg-bg text-accent"
                  : "bg-accent text-bg"
              }`}
            >
              {newPartRequestsCount} Nou
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("asigurari")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${
            activeTab === "asigurari"
              ? "bg-accent text-bg"
              : "border border-border bg-surface text-muted hover:text-primary"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          Cereri asigurări
          {newInsuranceRequestsCount > 0 && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                activeTab === "asigurari"
                  ? "bg-bg text-accent"
                  : "bg-accent text-bg"
              }`}
            >
              {newInsuranceRequestsCount} Nou
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: PREZENTARE */}
      {activeTab === "prezentare" && (
        <div className="mt-8 space-y-8">
          {/* 3 Summary Counter Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <span className="text-xs font-medium text-muted">
                Cereri noi de preluat
              </span>
              <div className="mt-2 text-4xl font-bold text-accent">
                {totalNewRequests}
              </div>
              <p className="mt-2 text-xs text-muted">
                {newPartRequestsCount} cereri piese • {newInsuranceRequestsCount} cereri asigurări
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <span className="text-xs font-medium text-muted">
                Oferte active pe site
              </span>
              <div className="mt-2 text-4xl font-bold text-primary">
                {activeOffersCount}
              </div>
              <p className="mt-2 text-xs text-muted">
                Din totalul de {offers.length} oferte salvate
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <span className="text-xs font-medium text-muted">
                Oferta zilei curentă
              </span>
              {currentOfferOfTheDay ? (
                <div className="mt-2">
                  <p className="truncate text-base font-bold text-primary">
                    {currentOfferOfTheDay.name}
                  </p>
                  <p className="mt-1 text-lg font-bold text-accent">
                    {formatPriceLei(currentOfferOfTheDay.promoPrice)}{" "}
                    {currentOfferOfTheDay.discountPercent > 0 && (
                      <span className="text-xs font-normal text-muted">
                        ({formatDiscountBadge(currentOfferOfTheDay.discountPercent)})
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  Nicio ofertă nu este marcată ca „Oferta zilei”.
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-bold text-primary">Acțiuni rapide</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openAddOfferPanel}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition hover:bg-accent-hover"
              >
                <Plus className="h-5 w-5" />
                + Adaugă ofertă
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg px-6 py-3.5 text-sm font-semibold text-primary transition hover:border-accent"
              >
                <ExternalLink className="h-4 w-4 text-accent" />
                Vezi site-ul
              </Link>
            </div>
          </div>

          {/* Backup & Restore Section */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-bold text-primary">
              Copie de siguranță (Backup)
            </h2>
            <p className="mt-1 text-sm text-muted">
              În această versiune demonstrativă, toate ofertele și cererile sunt salvate doar în acest browser. Poți descărca oricând o copie de siguranță pe calculator sau o poți încărca înapoi.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleDownloadJsonBackup}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover"
              >
                <Download className="h-4 w-4" />
                Descarcă backup (JSON)
              </button>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-bg px-5 py-3 text-sm font-semibold text-primary transition hover:border-accent">
                <Upload className="h-4 w-4 text-accent" />
                Restaurează backup
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleRestoreJsonBackup}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  resetAllDemoData();
                  loadAll();
                  showToast("Datele demonstrative inițiale au fost reîncărcate.");
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3 text-xs font-semibold text-muted transition hover:text-primary"
              >
                <RotateCcw className="h-4 w-4" />
                Reîncarcă datele demo inițiale
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFERTE */}
      {activeTab === "oferte" && (
        <div className="mt-8 space-y-6">
          {/* Top Action & CSV Bar */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 lg:flex-row lg:items-center">
            <button
              type="button"
              onClick={openAddOfferPanel}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-bg transition hover:bg-accent-hover"
            >
              <Plus className="h-5 w-5" />
              + Adaugă ofertă
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadCsvTemplate}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-2.5 text-xs font-semibold text-primary hover:border-accent"
              >
                <Download className="h-4 w-4 text-accent" />
                Șablon CSV
              </button>

              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-2.5 text-xs font-semibold text-primary hover:border-accent">
                <Upload className="h-4 w-4 text-accent" />
                Importă CSV
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleExportOffersCsv}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-2.5 text-xs font-semibold text-primary hover:border-accent"
              >
                <Download className="h-4 w-4 text-accent" />
                Exportă CSV
              </button>
            </div>
          </div>

          {/* Search, Filter & Sort Controls */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-4 md:grid-cols-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={offerSearch}
                onChange={(e) => setOfferSearch(e.target.value)}
                placeholder="Caută după nume sau cod piesă..."
                className="w-full rounded-lg border border-border bg-bg py-2 pl-9 pr-3 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted">Afișează:</span>
              {(
                [
                  { id: "toate", label: "Toate" },
                  { id: "active", label: "Active" },
                  { id: "expirate", label: "Expirate" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setOfferFilter(f.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    offerFilter === f.id
                      ? "bg-accent text-bg"
                      : "bg-bg text-muted hover:text-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-medium text-muted">Ordine:</span>
              <select
                value={offerSort}
                onChange={(e) =>
                  setOfferSort(e.target.value as "noi" | "reducere" | "pret")
                }
                className="rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary focus:border-accent focus:outline-none"
              >
                <option value="noi">Cele mai noi</option>
                <option value="reducere">Reducere (%)</option>
                <option value="pret">Preț crescător</option>
              </select>
            </div>
          </div>

          {/* Offers Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            {filteredOffers.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted">
                Nicio ofertă nu corespunde criteriilor selectate.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-muted">
                <thead className="border-b border-border bg-bg text-[11px] uppercase text-muted">
                  <tr>
                    <th className="px-4 py-3.5">Produs</th>
                    <th className="px-4 py-3.5">Prețuri &amp; Reducere</th>
                    <th className="px-4 py-3.5">Stare</th>
                    <th className="px-4 py-3.5 text-center">Activă pe site</th>
                    <th className="px-4 py-3.5 text-center">Oferta zilei</th>
                    <th className="px-4 py-3.5 text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredOffers.map((offer) => {
                    const expired = isOfferExpired(offer.validUntil);
                    return (
                      <tr key={offer.id} className="hover:bg-bg/40">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={offer.image}
                              alt={offer.name}
                              className="h-14 w-20 shrink-0 rounded-lg border border-border object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold text-primary">
                                {offer.name}
                              </p>
                              <p className="mt-0.5 font-mono text-xs text-muted">
                                Cod: {offer.partCode}
                              </p>
                              {offer.validUntil && (
                                <p className="mt-0.5 text-[11px] text-muted">
                                  Valabilă până la: {offer.validUntil}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          {offer.discountPercent > 0 &&
                          offer.oldPrice > offer.promoPrice ? (
                            <>
                              <span className="block text-xs line-through text-muted">
                                {formatPriceLei(offer.oldPrice)}
                              </span>
                              <span className="text-sm font-bold text-accent">
                                {formatPriceLei(offer.promoPrice)}
                              </span>
                              <span className="ml-2 inline-block rounded bg-accent px-1.5 py-0.5 text-[11px] font-bold text-bg">
                                {formatDiscountBadge(offer.discountPercent)}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-bold text-accent">
                              {formatPriceLei(offer.promoPrice)}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {expired ? (
                            <span className="inline-block rounded border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-muted">
                              Expirată
                            </span>
                          ) : offer.isActive ? (
                            <span className="inline-block rounded border border-accent bg-bg px-2.5 py-1 text-xs font-semibold text-accent">
                              Activă
                            </span>
                          ) : (
                            <span className="inline-block rounded border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-muted">
                              Oprită
                            </span>
                          )}
                        </td>

                        {/* Inline Toggle: Activă */}
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={offer.isActive}
                            onClick={() => {
                              updateOffer({ ...offer, isActive: !offer.isActive });
                              showToast(
                                `Oferta „${offer.name}” este acum ${
                                  !offer.isActive ? "activă" : "oprită"
                                }.`
                              );
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${
                              offer.isActive
                                ? "border-accent bg-accent"
                                : "border-border bg-bg"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full transition ${
                                offer.isActive
                                  ? "translate-x-5 bg-bg"
                                  : "translate-x-1 bg-muted"
                              }`}
                            />
                          </button>
                        </td>

                        {/* Inline Toggle: Oferta zilei */}
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              const nextVal = !offer.isOfferOfTheDay;
                              setOfferOfTheDay(offer.id, nextVal);
                              showToast(
                                nextVal
                                  ? `„${offer.name}” a fost setată ca Oferta zilei!`
                                  : `„${offer.name}” nu mai este Oferta zilei.`
                              );
                            }}
                            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                              offer.isOfferOfTheDay
                                ? "border-accent bg-accent text-bg"
                                : "border-border bg-bg text-muted hover:border-accent hover:text-primary"
                            }`}
                          >
                            <Star className="h-3.5 w-3.5" />
                            {offer.isOfferOfTheDay ? "Oferta zilei" : "Setează"}
                          </button>
                        </td>

                        {/* Actions: Editează / Duplică / Șterge */}
                        <td className="px-4 py-4 text-right">
                          {confirmDeleteOfferId === offer.id ? (
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const deleted = deleteOffer(offer.id);
                                  setConfirmDeleteOfferId(null);
                                  if (deleted) {
                                    showToast(
                                      `Oferta „${deleted.name}” a fost ștearsă.`,
                                      deleted
                                    );
                                  }
                                }}
                                className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-bg"
                              >
                                Confirmă ștergerea
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteOfferId(null)}
                                className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs text-muted hover:text-primary"
                              >
                                Renunță
                              </button>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditOfferPanel(offer)}
                                className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs font-semibold text-primary hover:border-accent"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                Editează
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  duplicateOffer(offer.id);
                                  showToast(`Oferta „${offer.name}” a fost duplicată.`);
                                }}
                                className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs font-semibold text-primary hover:border-accent"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                Duplică
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteOfferId(offer.id)}
                                className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs font-semibold text-muted hover:border-accent hover:text-primary"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Șterge
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CERERI PIESE */}
      {activeTab === "piese" && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              {["Toate", "Nou", "Contactat", "Închis"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilterPiese(st)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    statusFilterPiese === st
                      ? "bg-accent text-bg"
                      : "bg-bg text-muted hover:text-primary"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchPiese}
                onChange={(e) => setSearchPiese(e.target.value)}
                placeholder="Caută client, telefon, mașină..."
                className="w-full rounded-lg border border-border bg-bg py-2 pl-8 pr-3 text-xs text-primary focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            {filteredPartRequests.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted">
                Nu există cereri de piese pentru filtrul selectat.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-muted">
                <thead className="border-b border-border bg-bg text-[11px] uppercase text-muted">
                  <tr>
                    <th className="px-4 py-3.5">Referință</th>
                    <th className="px-4 py-3.5">Client</th>
                    <th className="px-4 py-3.5">Mașină</th>
                    <th className="px-4 py-3.5">Piese dorite</th>
                    <th className="px-4 py-3.5">Stare</th>
                    <th className="px-4 py-3.5 text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPartRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-4 py-4 align-top font-mono font-bold text-accent">
                        {req.refNumber}
                        <span className="block font-sans text-[11px] font-normal text-muted">
                          {new Date(req.createdAt).toLocaleDateString("ro-RO")}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm font-semibold text-primary">
                          {req.name}
                        </p>
                        <p className="text-muted">
                          {req.phone} ({req.preferredContact})
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="font-semibold text-primary">
                          {req.carBrand} {req.carModel} ({req.carYear})
                        </p>
                        <p>{req.carEngine}</p>
                      </td>
                      <td className="max-w-xs px-4 py-4 align-top text-primary">
                        {req.desiredParts}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <select
                          value={req.status}
                          onChange={(e) =>
                            updatePartRequestStatus(
                              req.id,
                              e.target.value as RequestStatus
                            )
                          }
                          className="rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                        >
                          <option value="Nou">Nou</option>
                          <option value="Contactat">Contactat</option>
                          <option value="Închis">Închis</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-right align-top">
                        <div className="inline-flex flex-wrap items-center justify-end gap-2">
                          <a
                            href={formatRoWhatsAppUrl(
                              req.phone,
                              `Salut ${req.name}! Referitor la cererea ta de piese ${req.refNumber} (${req.carBrand} ${req.carModel}) pe AlexAuto:`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-bg transition hover:bg-accent-hover"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Deschide WhatsApp
                          </a>

                          {confirmDeletePartReqId === req.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  deletePartRequest(req.id);
                                  setConfirmDeletePartReqId(null);
                                  showToast(`Cererea ${req.refNumber} a fost ștearsă.`);
                                }}
                                className="rounded-lg border border-accent bg-bg px-2.5 py-1.5 text-xs font-bold text-accent"
                              >
                                Confirmă
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeletePartReqId(null)}
                                className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-muted"
                              >
                                Nu
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeletePartReqId(req.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs text-muted hover:border-accent hover:text-primary"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Șterge
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CERERI ASIGURĂRI */}
      {activeTab === "asigurari" && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              {["Toate", "Nou", "Contactat", "Închis"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilterAsig(st)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    statusFilterAsig === st
                      ? "bg-accent text-bg"
                      : "bg-bg text-muted hover:text-primary"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchAsig}
                onChange={(e) => setSearchAsig(e.target.value)}
                placeholder="Caută client, telefon, tip..."
                className="w-full rounded-lg border border-border bg-bg py-2 pl-8 pr-3 text-xs text-primary focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            {filteredInsuranceRequests.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted">
                Nu există cereri de asigurare pentru filtrul selectat.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-muted">
                <thead className="border-b border-border bg-bg text-[11px] uppercase text-muted">
                  <tr>
                    <th className="px-4 py-3.5">Referință</th>
                    <th className="px-4 py-3.5">Tip</th>
                    <th className="px-4 py-3.5">Client</th>
                    <th className="px-4 py-3.5">Detalii asigurare</th>
                    <th className="px-4 py-3.5">Stare</th>
                    <th className="px-4 py-3.5 text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredInsuranceRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-4 py-4 align-top font-mono font-bold text-accent">
                        {req.refNumber}
                        <span className="block font-sans text-[11px] font-normal text-muted">
                          {new Date(req.createdAt).toLocaleDateString("ro-RO")}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className="inline-block rounded border border-accent bg-bg px-2.5 py-1 text-xs font-bold text-accent">
                          {req.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm font-semibold text-primary">
                          {req.name}
                        </p>
                        <p className="text-muted">
                          {req.phone} ({req.preferredContact})
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top text-primary">
                        {req.type === "RCA" ? (
                          <div>
                            <p className="font-semibold">
                              {req.plateNumber} — {req.carBrand} {req.carModel} ({req.carYear})
                            </p>
                            <p className="text-muted">
                              Perioadă: {req.periodMonths} luni
                              {req.currentPolicyExpiry
                                ? ` • Expiră la: ${req.currentPolicyExpiry}`
                                : ""}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-semibold">
                              {req.propertyType} în {req.locality} ({req.surfaceMp} m²)
                            </p>
                            <p className="text-muted">
                              Poliță: {req.policyType}
                              {req.yearBuilt ? ` • An: ${req.yearBuilt}` : ""}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <select
                          value={req.status}
                          onChange={(e) =>
                            updateInsuranceRequestStatus(
                              req.id,
                              e.target.value as RequestStatus
                            )
                          }
                          className="rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                        >
                          <option value="Nou">Nou</option>
                          <option value="Contactat">Contactat</option>
                          <option value="Închis">Închis</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-right align-top">
                        <div className="inline-flex flex-wrap items-center justify-end gap-2">
                          <a
                            href={formatRoWhatsAppUrl(
                              req.phone,
                              `Salut ${req.name}! Referitor la cererea ta de asigurare ${req.type} (${req.refNumber}) pe AlexAuto:`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-bg transition hover:bg-accent-hover"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Deschide WhatsApp
                          </a>

                          {confirmDeleteInsReqId === req.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteInsuranceRequest(req.id);
                                  setConfirmDeleteInsReqId(null);
                                  showToast(`Cererea ${req.refNumber} a fost ștearsă.`);
                                }}
                                className="rounded-lg border border-accent bg-bg px-2.5 py-1.5 text-xs font-bold text-accent"
                              >
                                Confirmă
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteInsReqId(null)}
                                className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-muted"
                              >
                                Nu
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteInsReqId(req.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs text-muted hover:border-accent hover:text-primary"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Șterge
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* SIDE PANEL / MODAL FOR ADD / EDIT OFFER WITH LIVE PREVIEW */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-bg/85 backdrop-blur-sm">
          <div className="h-full w-full max-w-4xl overflow-y-auto border-l border-border bg-surface p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xl font-bold text-primary">
                {editingOfferId ? "Editează oferta" : "Adaugă ofertă nouă"}
              </h2>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="rounded-lg border border-border bg-bg p-2 text-muted hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Form Column */}
              <form
                onSubmit={handleSaveOffer}
                className="space-y-4 lg:col-span-7"
              >
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Denumire piesă / ofertă *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: Set Discuri Frână Față Brembo 288mm"
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Cod piesă (OEM) *
                    </label>
                    <input
                      type="text"
                      value={formPartCode}
                      onChange={(e) => setFormPartCode(e.target.value.toUpperCase())}
                      placeholder="Ex: 1K0615301AA"
                      className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Valabilă până la (opțional)
                    </label>
                    <input
                      type="date"
                      value={formValidUntil}
                      onChange={(e) => setFormValidUntil(e.target.value)}
                      className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price & Optional Discount Checkbox */}
                <div className="rounded-xl border border-border bg-bg p-4 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="sm:w-1/2">
                      <label className="mb-1 block text-xs font-medium text-muted">
                        {formHasDiscount ? "Preț întreg (lei) *" : "Preț produs (lei) *"}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formOldPrice}
                        onChange={(e) => handleOldPriceChange(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-primary focus:border-accent focus:outline-none"
                      />
                    </div>

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-2.5 sm:mt-5">
                      <input
                        type="checkbox"
                        checked={formHasDiscount}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormHasDiscount(checked);
                          if (checked) {
                            const oldP = parseFloat(formOldPrice) || 250;
                            const disc = parseFloat(formDiscountPercent) || 20;
                            const promoP = calculatePromoPriceFromDiscount(oldP, disc);
                            setFormPromoPrice(String(promoP));
                            setFormDiscountPercent(String(disc));
                          }
                        }}
                        className="h-4 w-4 accent-accent"
                      />
                      <span className="text-xs font-semibold text-primary">
                        Produs la reducere (preț promoțional)
                      </span>
                    </label>
                  </div>

                  {formHasDiscount && (
                    <div className="grid grid-cols-1 gap-3 border-t border-border pt-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-muted">
                          Preț redus (lei) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formPromoPrice}
                          onChange={(e) => handlePromoPriceChange(e.target.value)}
                          className="w-full rounded-lg border border-accent bg-surface px-3 py-2 text-sm font-bold text-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-muted">
                          Reducere (%) *
                        </label>
                        <input
                          type="number"
                          step="1"
                          min="1"
                          max="90"
                          value={formDiscountPercent}
                          onChange={(e) => handleDiscountPercentChange(e.target.value)}
                          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm font-bold text-primary focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Scurtă descriere (opțional)
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Detalii scurte despre piesă..."
                    className="w-full rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                </div>

                {/* Image Upload with resize & remove */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Poză produs (JPG, PNG, WEBP — max 5 MB, redimensionată automat)
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-bg px-4 py-2.5 text-xs font-semibold text-primary hover:border-accent">
                      <ImageIcon className="h-4 w-4 text-accent" />
                      Încarcă poză
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageFileSelect}
                        className="hidden"
                      />
                    </label>
                    {formImage && (
                      <button
                        type="button"
                        onClick={() => setFormImage("")}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg px-3 py-2.5 text-xs font-semibold text-muted hover:text-primary"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Șterge poza
                      </button>
                    )}
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-bg px-4 py-3">
                    <span className="text-xs font-semibold text-primary">
                      Activă pe site
                    </span>
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="h-4 w-4 accent-accent"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-bg px-4 py-3">
                    <span className="text-xs font-semibold text-primary">
                      Setează ca „Oferta zilei”
                    </span>
                    <input
                      type="checkbox"
                      checked={formIsOfferOfTheDay}
                      onChange={(e) => setFormIsOfferOfTheDay(e.target.checked)}
                      className="h-4 w-4 accent-accent"
                    />
                  </label>
                </div>

                {formError && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {formError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => setPanelOpen(false)}
                    className="rounded-lg border border-border bg-bg px-5 py-3 text-xs font-semibold text-muted hover:text-primary"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-bg transition hover:bg-accent-hover"
                  >
                    Salvează oferta
                  </button>
                </div>
              </form>

              {/* Live Preview Column */}
              <div className="lg:col-span-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Previzualizare live pe site
                </p>

                <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-bg">
                  <div>
                    <div className="relative h-44 w-full bg-surface">
                      <img
                        src={previewImage}
                        alt="Previzualizare"
                        className="h-full w-full object-cover"
                      />
                      {formIsOfferOfTheDay && (
                        <span className="absolute left-3 top-3 rounded bg-accent px-2.5 py-1 text-[11px] font-bold text-bg">
                          Oferta zilei
                        </span>
                      )}
                      {formHasDiscount && previewDiscount > 0 && (
                        <span className="absolute right-3 top-3 rounded bg-accent px-2 py-0.5 text-xs font-bold text-bg">
                          {formatDiscountBadge(previewDiscount)}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <p className="font-mono text-xs text-muted">
                        OEM: {formPartCode.trim() || "COD-PIESĂ"}
                      </p>
                      <h3 className="mt-1.5 text-base font-semibold text-primary">
                        {formName.trim() || "Denumire ofertă promoțională"}
                      </h3>
                      {formDescription.trim() && (
                        <p className="mt-1 text-xs text-muted">
                          {formDescription.trim()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border p-5">
                    <div className="mb-4">
                      {formHasDiscount && previewOldPrice > previewPromoPrice && (
                        <span className="block text-xs text-muted line-through">
                          {formatPriceLei(previewOldPrice)}
                        </span>
                      )}
                      <span className="text-xl font-bold text-accent">
                        {formatPriceLei(previewPromoPrice)}
                      </span>
                    </div>
                    <div className="w-full rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-bg">
                      Cere ofertă
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
