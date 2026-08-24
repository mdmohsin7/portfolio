import { getAgentRecoveryLinks } from "@/lib/agent-links";
import { DATA } from "@/data/resume";
import Link from "next/link";

export default function NotFound() {
  const links = getAgentRecoveryLinks();

  return (
    <main className="flex flex-col space-y-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Not found",
            description: `This path does not exist on mohsin.xyz, the personal site of ${DATA.name}.`,
            mainEntity: {
              "@type": "ItemList",
              name: "Where to look next",
              itemListElement: links.map((link, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: link.label,
                url: link.href,
              })),
            },
          }),
        }}
      />
      <h1 className="text-2xl font-bold tracking-tighter">Not found</h1>
      <p className="text-muted-foreground text-sm">
        This path does not exist on mohsin.xyz, the personal site of {DATA.name}.
        If you are an agent, start from the links below.
      </p>
      <section>
        <h2 className="text-xl font-bold mb-3">Where to look next</h2>
        <ul className="space-y-2 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-blue-500 hover:underline">
                {link.label}
              </Link>
              <span className="text-muted-foreground"> — {link.hint}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
