import Link from 'next/link';
import { Download, FileCode2, Terminal } from 'lucide-react';
import { bundleUrl, installCommands, listSkills, skillMarkdownUrl, type PublishedSkill } from '@/lib/skills';
import { CopyLine } from './copy-line';
import { cn } from '@/lib/cn';

const trackLabel: Record<PublishedSkill['track'], string> = {
  enterprise: 'Enterprise',
  product: 'Product',
  both: 'Both tracks',
};

function kilobytes(bytes: number) {
  return `${Math.round(bytes / 1024)} KB`;
}

function SkillCard({ skill }: { skill: PublishedSkill }) {
  return (
    <article className="card-soft flex flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ember-soft px-2.5 py-1 text-[11px] font-semibold text-ember-ink dark:bg-fd-accent dark:text-fd-accent-foreground">
          {skill.kind === 'task' ? 'Task' : 'Reference'}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-fd-muted-foreground">
          {trackLabel[skill.track]}
        </span>
        {skill.hasScripts ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-fd-muted-foreground">
            <Terminal className="size-3" aria-hidden="true" />
            script
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 font-mono text-[15px] font-semibold tracking-tight text-fd-foreground">{skill.name}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-fd-muted-foreground">{skill.description}</p>

      <div className="mt-4">
        <CopyLine command={installCommands.one(skill.name)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-fd-muted-foreground">
        <a href={bundleUrl(skill.name)} download className="inline-flex items-center gap-1.5 hover:text-ember-ink">
          <Download className="size-3.5" aria-hidden="true" />
          Download ({kilobytes(skill.bytes)})
        </a>
        <a href={skillMarkdownUrl(skill.name)} className="inline-flex items-center gap-1.5 hover:text-ember-ink">
          <FileCode2 className="size-3.5" aria-hidden="true" />
          Read SKILL.md
        </a>
        <span>{skill.references.length} pages bundled</span>
        <span title={skill.digest}>v{skill.version}</span>
      </div>
    </article>
  );
}

/**
 * The catalogue, generated from what the build actually published. Task skills
 * lead, because a reader arrives wanting to do something rather than to read.
 */
export function SkillsCatalog({ kind, className }: { kind?: PublishedSkill['kind']; className?: string }) {
  const skills = listSkills().filter((skill) => !kind || skill.kind === kind);

  if (skills.length === 0) {
    return (
      <p className="not-prose rounded-xl border border-fd-border bg-fd-muted/40 p-4 text-sm text-fd-muted-foreground">
        No skills have been built yet. Run <code className="font-mono">npm run skills:build</code>.
      </p>
    );
  }

  return (
    <div className={cn('not-prose my-6 grid gap-4 sm:grid-cols-2', className)}>
      {skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </div>
  );
}

/** A compact strip for the home page: names and one line each, linking to the catalogue. */
export function SkillsStrip({ limit = 6 }: { limit?: number }) {
  const skills = listSkills()
    .filter((skill) => skill.kind === 'task')
    .slice(0, limit);
  if (skills.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <Link
          key={skill.name}
          href="/skills"
          className="card-soft block p-4 transition-transform hover:-translate-y-0.5"
        >
          <p className="m-0 font-mono text-[13px] font-semibold text-ember-ink dark:text-fd-accent-foreground">
            {skill.name}
          </p>
          <p className="m-0 mt-1.5 line-clamp-3 text-[13px] leading-[1.55] text-fd-muted-foreground">
            {skill.description.split(/(?<=\.)\s/)[0]}
          </p>
        </Link>
      ))}
    </div>
  );
}
