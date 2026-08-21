import type { ComponentProps, ComponentType, ReactNode } from 'react';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { type ArticleIconName, IconChip } from '@/components/mdx/icons';

/** Exact heading-to-icon assignments for the house vocabulary. Keys are normalized (lowercased, leading numbering stripped). */
const EXACT: Record<string, ArticleIconName> = {
  // layer-page template
  'target state': 'target',
  mechanisms: 'cog',
  'design decisions': 'scale',
  'cross-cutting concerns': 'grid',
  'evidence and limits': 'flask',
  // architecture pages
  'the principle': 'compass',
  'the premise': 'compass',
  'the shape': 'layers',
  'the whole thing, on one page': 'map',
  'the crosswalk': 'map',
  'the map': 'map',
  'the chain': 'key',
  'the pipeline': 'funnel',
  'the records': 'landmark',
  'zone by zone': 'octagon-alert',
  'the two-estate reality': 'building',
  'the two rules that make it governance, not plumbing': 'scale',
  'three builds of the same planes': 'layers',
  'how the pages are built': 'wrench',
  'how to read it': 'book',
  'where to go deep': 'search',
  'design consequences': 'list-checks',
  'owned and enforced': 'shield',
  'seven invariants': 'list-checks',
  'the open gaps': 'search',
  'two loops, separated by governance': 'refresh',
  'two axes, applied per workload': 'sliders',
  'readiness gates autonomy': 'gauge',
  'the controls column is the contract': 'shield',
  'the oversight gate, as a burst rate': 'gauge',
  'the promotion gate, as the evidence left it': 'flask',
  'judges are governed components': 'scale',
  'memory tiers': 'database',
  knowledge: 'book',
  improvement: 'zap',
  action: 'zap',
  'control and evidence': 'shield',
  'execution and platform': 'server',
  'human-facing surfaces': 'users',
  'operational floor': 'gauge',
  'lifecycle and rollout': 'refresh',
  'sponsor at access identity, presence by exception': 'key',
  'the architectural fork': 'branch',
  'the caveat that keeps this honest': 'alert',
  'the harness is an attack surface': 'siren',
  'what guardrails are for': 'shield',
  'tier 1: the gateway': 'cable',
  'tier 2: the policy decision point': 'shield',
  'tier 3: promoted rules, landed outside the model': 'scale',
  'the four zones at a glance': 'map',
  'access and entitlements': 'key',
  'movement of money': 'banknote',
  'safety actuation': 'factory',
  'formal regulatory records': 'landmark',
  'how to implement it': 'wrench',
  'what the agent may never do': 'x',
  'find the zones in your enterprise': 'search',
};

/** Ordered keyword rules for the long tail. First match wins. */
const KEYWORD_RULES: Array<[RegExp, ArticleIconName]> = [
  [/^cd-\d+/, 'scale'],
  [/attack|threat|incident|abuse|hijack|poison|exploit|adversar/, 'siren'],
  [/guardrail|enforce|protect|defen[cs]e|permission|acl|entitle/, 'shield'],
  [/identity|credential|token|sponsor|auth|sso/, 'key'],
  [/payment|money|commerce|mandate|transaction/, 'banknote'],
  [/zone|safety|oversight|kill/, 'octagon-alert'],
  [/regulat|compliance|law|attest|filing|record|disclosure|sovereign/, 'landmark'],
  [/evidence|eval|judge|measure|benchmark|verification|test/, 'flask'],
  [/cost|econom|meter|budget|pricing|finops|spend/, 'coins'],
  [/lifecycle|loop|cycle|promotion|flywheel|learning|upgrade/, 'refresh'],
  [/memory|embed|vector|index|corpus|retriev|chunk|data/, 'database'],
  [/observ|telemetry|trace|monitor|signal/, 'activity'],
  [/rout/, 'route'],
  [/gateway|integration|mcp|protocol|api|esb|event/, 'cable'],
  [/harness|agent|orchestrat|autonom/, 'bot'],
  [/model|reasoning|intelligen|distill|fine-tun/, 'brain'],
  [/\bot\b|scada|plant|actuation|robot|physical/, 'factory'],
  [/channel|voice|experience|conversation|disclos/, 'message'],
  [/people|team|workforce|staff|supervis|human|operator/, 'users'],
  [/infra|gpu|serving|compute|kubernetes|runtime|execution|session/, 'server'],
  [/parse|parsing|extract/, 'funnel'],
  [/version|migration|portab|strangler|legacy/, 'branch'],
  [/freshness|latency|real-time|time\b/, 'timer'],
  [/registry|catalog|inventory|skill/, 'clipboard'],
  [/knowledge|library|research|standard/, 'book'],
  [/crosswalk|landscape|map\b/, 'map'],
  [/question|gap|open\b|unknown/, 'search'],
  [/principle|premise|rule|position/, 'compass'],
  [/caveat|limit|honest|trap|failure|wrong/, 'alert'],
  [/state machine|workflow|process/, 'workflow'],
  [/capacity|load|scale\b|burst/, 'gauge'],
  [/curation|quality|accuracy/, 'check'],
];

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

export function resolveHeadingIcon(heading: string, level: 2 | 3): ArticleIconName | null {
  const normalized = heading
    .trim()
    .toLowerCase()
    .replace(/^\d+\.\s*/, '');
  const exact = EXACT[normalized];
  if (exact) return exact;
  for (const [pattern, icon] of KEYWORD_RULES) {
    if (pattern.test(normalized)) return icon;
  }
  return level === 2 ? 'dot' : null;
}

type HeadingProps = ComponentProps<'h2'> & { children?: ReactNode };

function withHeadingIcon(level: 2 | 3, Base: ComponentType<HeadingProps>) {
  return function IconHeading({ children, ...props }: HeadingProps) {
    const icon = resolveHeadingIcon(textOf(children), level);
    if (!icon) return <Base {...props}>{children}</Base>;
    return (
      <Base {...props}>
        <IconChip name={icon} className={level === 3 ? 'me-[0.5em] size-[1.45em]' : undefined} />
        {children}
      </Base>
    );
  };
}

export const H2WithIcon = withHeadingIcon(2, defaultMdxComponents.h2 as ComponentType<HeadingProps>);
export const H3WithIcon = withHeadingIcon(3, defaultMdxComponents.h3 as ComponentType<HeadingProps>);
