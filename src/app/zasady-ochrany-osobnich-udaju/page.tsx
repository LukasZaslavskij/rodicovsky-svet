import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description: "Informace o tom, jak Rodičovský svět zpracovává osobní údaje návštěvníků.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <span>Zásady ochrany osobních údajů</span>
      </nav>

      <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-2">
        Zásady ochrany osobních údajů
      </h1>
      <p className="text-sm text-[var(--muted)] mb-10">Platné od 1. ledna 2024</p>

      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-[var(--accent)]">

        <h2>1. Správce osobních údajů</h2>
        <p>
          Provozovatelem webu Rodičovský svět dostupného na adrese rodicovskysvet.cz je fyzická osoba
          (dále jen „provozovatel"). Kontaktní e-mail:{" "}
          <a href="mailto:rodicovskysvet@seznam.cz">rodicovskysvet@seznam.cz</a>.
        </p>

        <h2>2. Jaké údaje shromažďujeme</h2>
        <p>
          Tento web automaticky shromažďuje určité technické informace prostřednictvím cookies
          a analytických nástrojů. Jedná se zejména o:
        </p>
        <ul>
          <li>IP adresu v anonymizované podobě</li>
          <li>typ prohlížeče a operačního systému</li>
          <li>navštívené stránky a dobu strávenou na webu</li>
          <li>zdroj návštěvy (odkud jste přišli)</li>
        </ul>
        <p>
          Pokud nás kontaktujete e-mailem, zpracováváme vaši e-mailovou adresu a obsah zprávy
          výhradně za účelem odpovědi na váš dotaz.
        </p>

        <h2>3. Cookies a reklamy</h2>
        <p>
          Tento web používá soubory cookies — malé textové soubory ukládané do vašeho prohlížeče.
          Cookies slouží k:
        </p>
        <ul>
          <li><strong>Analytickým účelům</strong> — sledování návštěvnosti (Google Analytics)</li>
          <li><strong>Reklamním účelům</strong> — zobrazování relevantních reklam (Google AdSense)</li>
        </ul>
        <p>
          Google AdSense může používat cookies třetích stran k zobrazování reklam na základě
          vašich předchozích návštěv tohoto webu nebo jiných webů. Uživatelé mohou personalizaci
          reklam vypnout na stránce{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Nastavení reklam Google
          </a>.
        </p>
        <p>
          Souhlas s cookies lze kdykoliv odvolat smazáním cookies v nastavení prohlížeče.
        </p>

        <h2>4. Účel a právní základ zpracování</h2>
        <p>
          Osobní údaje zpracováváme na základě oprávněného zájmu provozovatele (čl. 6 odst. 1
          písm. f) GDPR) za účelem zajištění provozu webu, jeho zlepšování a zobrazování reklam.
        </p>

        <h2>5. Předávání údajů třetím stranám</h2>
        <p>
          Vaše údaje mohou být předávány následujícím třetím stranám, které provozují vlastní
          ochranu soukromí:
        </p>
        <ul>
          <li>
            <strong>Google LLC</strong> — analytika (Google Analytics) a reklama (Google AdSense).{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Zásady ochrany soukromí Google
            </a>
          </li>
          <li>
            <strong>Vercel Inc.</strong> — hosting webu.{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Zásady ochrany soukromí Vercel
            </a>
          </li>
        </ul>

        <h2>6. Doba uchovávání údajů</h2>
        <p>
          Analytická data jsou uchovávána po dobu 26 měsíců. E-mailová korespondence je
          uchovávána po dobu nezbytně nutnou pro vyřízení dotazu, nejdéle 1 rok.
        </p>

        <h2>7. Vaše práva</h2>
        <p>V souladu s GDPR máte právo:</p>
        <ul>
          <li>na přístup ke svým osobním údajům</li>
          <li>na opravu nepřesných údajů</li>
          <li>na výmaz údajů („právo být zapomenut")</li>
          <li>na omezení zpracování</li>
          <li>vznést námitku proti zpracování</li>
          <li>podat stížnost u Úřadu pro ochranu osobních údajů (uoou.cz)</li>
        </ul>
        <p>
          Svá práva můžete uplatnit na e-mailové adrese{" "}
          <a href="mailto:rodicovskysvet@seznam.cz">rodicovskysvet@seznam.cz</a>.
        </p>

        <h2>8. Změny zásad</h2>
        <p>
          Tyto zásady mohou být průběžně aktualizovány. Datum poslední aktualizace je uvedeno
          v záhlaví dokumentu.
        </p>

      </div>

      <div className="mt-12 pt-6 border-t border-[var(--border)] flex gap-4 text-sm text-[var(--muted)]">
        <Link href="/podminky-uzivani" className="hover:text-[var(--accent)]">Podmínky užívání</Link>
        <span>·</span>
        <Link href="/" className="hover:text-[var(--accent)]">← Zpět na hlavní stránku</Link>
      </div>

    </div>
  );
}
