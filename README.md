# AlexAuto — Prototip Interactiv (Piese Auto pe bază de Ofertă & Asigurări)

Prototip demonstrativ pentru **AlexAuto**, dezvoltat cu **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Lucide React** și **Framer Motion**.

---

## 1. Pornire Rapidă

```bash
npm install
npm run dev
```

Aplicația rulează la `http://localhost:3000`.
- **Prima pagină (`/`)**: Hero + Selector auto în cascadă (18 mărci), secțiunea dedicată **„Oferta zilei”**, grila de oferte promoționale (max 8 carduri) și pașii „Cum funcționează”.
- **Cere ofertă piese (`/cere-oferta`)**: Formular cu validare VIN (17 caractere, fără `I`, `O`, `Q`), pre-completat automat din selectorul auto sau din cardurile de oferte.
- **Asigurări (`/asigurari`)**: Pagină de cerere ofertă cu două carduri selectabile (**RCA Auto** și **Asigurare locuință**) și câmpuri condiționale, fără colectare de CNP/CUI în formular.
- **Panou Admin (`/admin`)**: Parolă demo `alexauto2026`. Include tab-urile **Prezentare**, **Oferte** (cu previzualizare live și calcul bidirecțional preț/reducere), **Cereri piese** și **Cereri asigurări**.

---

## 2. Cum Funcționează Ofertele și „Oferta Zilei”

Logica de calcul și validare a prețurilor se află în [`src/lib/pricing.ts`](src/lib/pricing.ts):
- **Calcul bidirecțional în timp real**:
  - Dacă administratorul introduce **Prețul redus (`promoPrice`)**, procentul de reducere este calculat automat: `round((oldPrice - promoPrice) / oldPrice * 100)`.
  - Dacă administratorul introduce **Reducerea (`discountPercent`)**, prețul redus este calculat automat cu 2 zecimale: `round(oldPrice * (1 - discountPercent / 100) * 100) / 100`.
  - Ultimul câmp editat rămâne sursa de adevăr la modificarea prețului întreg (`oldPrice`).
- **Formatare și Validare**:
  - Prețurile sunt afișate în format românesc (`1.234,50 lei`), iar reducerile ca întreg (`-24%`).
  - Reguli validate: `oldPrice > 0`, `promoPrice > 0` și `< oldPrice`, iar reducerea între `1%` și `90%`.
- **Oferta zilei**:
  - O singură ofertă poate fi marcată ca **„Oferta zilei”** (`isOfferOfTheDay: true`). Activarea ei pe o ofertă o dezactivează automat pe cea anterioară.
  - Pe prima pagină, „Oferta zilei” apare într-un bloc evidențiat imediat sub Hero (cu numărătoare inversă dacă are dată de expirare setată) și poartă eticheta „Oferta zilei” și în grila de oferte.
  - Ofertele expirate (`validUntil` în trecut) sunt ascunse automat de pe site-ul public și marcate ca **„Expirată”** în panoul Admin.
- **Imagini optimizate client-side**:
  - Fotografiile încărcate (JPG/PNG/WEBP, max 5 MB) sunt redimensionate automat în browser la maximum `800px` lățime și comprimate înainte de salvarea în `localStorage`.

---

## 3. Ce a fost eliminat (Simplificare Flux Asigurări)

- Au fost eliminate complet: wizard-ul calculatorului RCA în 3 pași (`/asigurari-rca`), interfața `RcaProvider` / `MockRcaProvider` / `BrokerRcaProvider`, cotațiile fictive pe asiguratori, bannerul „DEMO prețuri” și validatoarele de CNP/CUI din formular.
- În locul lor, pagina `/asigurari` folosește un flux simplu de **cerere de ofertă** pentru **RCA Auto** și **Asigurare locuință**, urmând ca brokerul să solicite telefonic sau pe WhatsApp documentele necesare emiterii.

---

## 4. Pentru Producție (Pași Necesari pentru Lansarea Reală)

1. **Bază de date și Stocare Imagini**:
   - Înlocuirea `localStorage` (`src/lib/storage.ts`) cu o bază de date relațională (ex: PostgreSQL + Prisma / Supabase) și stocare cloud pentru pozele ofertelor și ale taloanelor (ex: AWS S3 / Cloudflare R2).
2. **Autentificare Reală pentru Admin**:
   - Înlocuirea parolei demonstrative (`alexauto2026`) cu autentificare securizată pe server (NextAuth / Auth.js sau Supabase Auth) cu sesiuni HTTP-only și protecție pe rutele de administrare.
3. **Validare Server-Side și Anti-Spam**:
   - Dublarea validărilor din `src/lib/pricing.ts` și `src/lib/validators.ts` în Route Handlers / Server Actions, plus rate-limiting și protecție Cloudflare Turnstile / reCAPTCHA pe lângă câmpul honeypot existent.
4. **Notificări Email & WhatsApp**:
   - Trimiterea automată de alerte prin email (Resend / SendGrid) sau WhatsApp Business API către proprietarul magazinului în momentul înregistrării unei cereri noi de piese sau asigurări.
5. **Conformitate Legală și DPA (GDPR)**:
   - Semnarea acordurilor de prelucrare a datelor (DPA) cu furnizorii de hosting și email, actualizarea Politicii de Confidențialitate cu datele reale ale societății comerciale și păstrarea unui registru de ștergere a datelor la cerere.
