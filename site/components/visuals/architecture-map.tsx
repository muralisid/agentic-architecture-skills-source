import Link from 'next/link';
import layers from '@/lib/architecture-map.json';

export function ArchitectureMap() {
  return <div className="not-prose my-8" aria-label="Fourteen enterprise architecture layers">
    <p className="mb-4 text-sm text-fd-muted-foreground">Select a layer to see its role, then open the complete design. The groups help you navigate; they do not prescribe a deployment order.</p>
    <div className="grid gap-5 md:grid-cols-2">
      {['Operate the enterprise', 'Run intelligence', 'Supply knowledge', 'Connect and control'].map((group) =>
        <section key={group} className="overflow-hidden rounded-xl border bg-fd-card">
          <h3 className="border-b px-5 py-3 text-sm font-semibold">{group}</h3>
          <div className="divide-y">{layers.filter((layer) => layer.group === group).map((layer) =>
            <details key={layer.id} className="group px-5 py-3">
              <summary className="cursor-pointer text-sm font-medium marker:text-ember"><span className="mr-2 font-mono text-xs text-fd-muted-foreground">{layer.id}</span>{layer.title}</summary>
              <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">{layer.body}</p>
              <Link href={layer.url} className="mt-2 inline-block text-sm font-semibold text-ember-deep underline underline-offset-4">Explore this layer →</Link>
            </details>)}</div>
        </section>)}
    </div>
  </div>;
}
