import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://rodicovskysvet.cz/podminky-uzivani" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
  title: "Podmínky užívání",
  description: "Podmínky užívání webu Rodičovský svět.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <span>Podmínky užívání</span>
      </nav>

      <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-2">
        Podmínky užívání
      </h1>
      <p className="text-sm text-[var(--muted)] mb-10">Platné od 1. ledna 2024</p>

      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-[var(--accent)]">

        <h2>1. Provozovatel</h2>
        <p>
          Web Rodičovský svět (dále jen „web") provozuje fyzická osoba dostupná na e-mailové
          adrese <a href="mailto:rodicovskysvet@seznam.cz">rodicovskysvet@seznam.cz</a>.
          Používáním webu souhlasíte s těmito podmínkami.
        </p>

        <h2>2. Charakter obsahu</h2>
        <p>
          Veškerý obsah zveřejněný na tomto webu má <strong>pouze informační charakter</strong>{" "}
          a neslouží jako odborná lékařská, psychologická ani právní rada. Obsah vychází
          z osobních zkušeností autorů a přispěvatelů.
        </p>
        <p>
          Před jakýmkoliv rozhodnutím týkajícím se zdraví vašeho dítěte vždy konzultujte
          lékaře nebo jiného odborníka.
        </p>

        <h2>3. Autorská práva</h2>
        <p>
          Veškeré texty, fotografie a grafické prvky zveřejněné na webu jsou chráněny
          autorským zákonem. Bez předchozího písemného souhlasu provozovatele není dovoleno:
        </p>
        <ul>
          <li>kopírovat nebo rozmnožovat obsah webu</li>
          <li>šířit obsah webu na jiných webových stránkách nebo v médiích</li>
          <li>využívat obsah webu ke komerčním účelům</li>
        </ul>
        <p>
          Pro sdílení článků používejte prosím odkaz na původní zdroj.
        </p>

        <h2>4. Příběhy čtenářů</h2>
        <p>
          Zasláním příběhu na e-mailovou adresu provozovatele udělujete souhlas se zveřejněním
          tohoto příběhu na webu. Příběh bude zveřejněn anonymně nebo s vaším jménem dle
          vaší volby. Provozovatel si vyhrazuje právo příběh upravit pro lepší čitelnost
          nebo jej nezveřejnit.
        </p>

        <h2>5. Reklama</h2>
        <p>
          Web zobrazuje reklamy prostřednictvím služby Google AdSense. Provozovatel nenese
          odpovědnost za obsah reklamních sdělení třetích stran zobrazovaných na webu.
        </p>

        <h2>6. Dostupnost webu</h2>
        <p>
          Provozovatel usiluje o nepřetržitý provoz webu, avšak negarantuje stálou dostupnost.
          Web může být dočasně nedostupný z důvodu technické údržby nebo okolností mimo
          kontrolu provozovatele.
        </p>

        <h2>7. Odpovědnost</h2>
        <p>
          Provozovatel neodpovídá za žádné přímé ani nepřímé škody vzniklé v důsledku
          použití informací zveřejněných na webu. Veškeré informace užíváte na vlastní
          odpovědnost.
        </p>

        <h2>8. Změny podmínek</h2>
        <p>
          Provozovatel si vyhrazuje právo tyto podmínky kdykoliv změnit. Aktuální znění
          podmínek je vždy dostupné na této stránce. Datum poslední aktualizace je uvedeno
          v záhlaví dokumentu.
        </p>

        <h2>9. Rozhodné právo</h2>
        <p>
          Tyto podmínky se řídí právním řádem České republiky. Případné spory budou
          řešeny příslušnými soudy České republiky.
        </p>

        <h2>10. Kontakt</h2>
        <p>
          Veškeré dotazy k těmto podmínkám zasílejte na{" "}
          <a href="mailto:rodicovskysvet@seznam.cz">rodicovskysvet@seznam.cz</a>.
        </p>

      </div>

      <div className="mt-12 pt-6 border-t border-[var(--border)] flex gap-4 text-sm text-[var(--muted)]">
        <Link href="/zasady-ochrany-osobnich-udaju" className="hover:text-[var(--accent)]">Zásady ochrany osobních údajů</Link>
        <span>·</span>
        <Link href="/" className="hover:text-[var(--accent)]">← Zpět na hlavní stránku</Link>
      </div>

    </div>
  );
}
