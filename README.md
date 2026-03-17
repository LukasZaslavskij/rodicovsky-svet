# Můj blog – Next.js + Markdown template

Jednoduchý, rychlý blog postavený na **Next.js 14**, **Tailwind CSS** a **Markdown souborech**.
Žádná databáze, žádný CMS – články píšeš přímo jako `.md` soubory.

---

## 🚀 Rychlý start

```bash
# 1. Nainstaluj závislosti
npm install

# 2. Spusť vývojový server
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

---

## 📁 Struktura projektu

```
├── content/                  ← TVŮJ OBSAH (Markdown články)
│   ├── programovani/
│   │   └── prvni-clanek.md
│   ├── cestovani/
│   │   └── pariz.md
│   └── tipy/                 ← přidej libovolnou podsložku = nová kategorie
│       └── produktivita.md
│
├── src/
│   ├── app/
│   │   ├── page.tsx          ← homepage
│   │   ├── layout.tsx        ← globální layout (navbar, footer)
│   │   ├── clanky/[slug]/    ← stránka článku
│   │   └── kategorie/[category]/ ← stránka kategorie
│   ├── components/
│   │   ├── ArticleCard.tsx   ← karta článku (featured + card varianta)
│   │   ├── Navbar.tsx        ← navigace (automaticky načte kategorie)
│   │   └── Footer.tsx
│   └── lib/
│       └── articles.ts       ← veškerá logika načítání článků
│
└── public/                   ← statické soubory (obrázky, favicon...)
```

---

## ✍️ Jak přidat nový článek

### 1. Vytvoř soubor v `/content/<kategorie>/<slug>.md`

Název souboru = URL článku (slug). Používej pomlčky místo mezer.

### 2. Přidej frontmatter na začátek souboru

```markdown
---
title: "Název mého článku"
date: "2024-03-15"
categoryLabel: "Programování"
tags: ["react", "javascript"]
excerpt: "Krátký popis článku, který se zobrazí v kartě."
coverImage: "/images/muj-obrazek.jpg"   # volitelné
---

Tady začíná samotný obsah článku v Markdownu...
```

### Povinné pole
| Pole | Popis |
|------|-------|
| `title` | Název článku |
| `date` | Datum ve formátu `YYYY-MM-DD` |

### Volitelná pole
| Pole | Popis |
|------|-------|
| `categoryLabel` | Hezký název kategorie (jinak se odvodí z názvu složky) |
| `tags` | Pole tagů jako `["react", "web"]` |
| `excerpt` | Krátký perex zobrazený v kartě |
| `coverImage` | Cesta k obrázku v `/public/` |

---

## 📂 Jak přidat novou kategorii

Stačí **vytvořit novou složku** v `/content/`:

```bash
mkdir content/recepty
```

Do ní přidej první článek a kategorie se automaticky objeví v navigaci.

---

## 🎨 Přizpůsobení designu

### Barvy a písmo – `tailwind.config.js`

```js
colors: {
  ink: "#1a1a2e",      // hlavní barva textu
  paper: "#faf9f6",    // barva pozadí
  accent: "#c0392b",   // akcent (červená) – změň na svoji
  muted: "#8a8a9a",    // sekundární text
},
```

### Název blogu a popis – `src/app/layout.tsx` a `src/app/page.tsx`

Vyhledej `Můj blog` a nahraď svým názvem.

---

## 🌐 Nasazení na Vercel

### Možnost A – přes GitHub (doporučeno)

1. Nahraj projekt na GitHub
2. Jdi na [vercel.com](https://vercel.com) → **New Project**
3. Vyber repozitář → **Deploy**

Hotovo. Každý push na `main` = automatické nasazení.

### Možnost B – přes Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## 🔧 Rozšíření do budoucna

Pár nápadů, jak projekt rozvíjet:

- **RSS feed** – přidej `/app/feed.xml/route.ts` generující RSS ze článků
- **Vyhledávání** – [Fuse.js](https://fusejs.io/) pro client-side fulltextové hledání
- **Tmavý režim** – Tailwind `dark:` třídy + `next-themes`
- **OG obrázky** – Next.js `ImageResponse` pro dynamické náhledy při sdílení
- **Komentáře** – [Giscus](https://giscus.app/) (GitHub Discussions jako komentáře)
- **Headless CMS** – vyměň `/content/` za [Contentlayer](https://contentlayer.dev/) nebo [Sanity](https://sanity.io/)
- **Sitemap** – přidej `next-sitemap` pro automatické generování sitemap.xml

---

## 📦 Použité technologie

| Technologie | Verze | Účel |
|------------|-------|------|
| Next.js | 14 | Framework |
| TypeScript | 5 | Typová bezpečnost |
| Tailwind CSS | 3 | Stylování |
| gray-matter | 4 | Parsování frontmatteru |
| remark + remark-html | 15/16 | Konverze Markdownu na HTML |
| @tailwindcss/typography | latest | Hezké styly pro obsah článků |

---

## ❓ Časté dotazy

**Jak změním URL článků?**
Přejmenuj složky nebo soubory v `/content/`. URL = `/<slug>?kat=<kategorie>`.

**Mohu mít článek ve více kategoriích?**
Zatím ne – každý článek leží v jedné složce. Lze rozšířit přidáním pole `tags`.

**Jak přidám obrázky do článků?**
Ulož obrázek do `/public/images/` a v Markdownu jej vlož jako:
```markdown
![Popis obrázku](/images/muj-obrazek.jpg)
```
