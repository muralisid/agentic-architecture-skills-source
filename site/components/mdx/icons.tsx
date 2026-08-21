import type { ComponentType, SVGProps } from 'react';
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowRightLeft,
  Banknote,
  BookMarked,
  Bot,
  Brain,
  Building2,
  Cable,
  Check,
  CircleDot,
  ClipboardList,
  Cog,
  Coins,
  Compass,
  Cpu,
  Database,
  Eye,
  Factory,
  FileCheck2,
  FlaskConical,
  Funnel,
  Gauge,
  GitBranch,
  Grid3x3,
  HardDrive,
  KeyRound,
  Landmark,
  Layers,
  Lightbulb,
  ListChecks,
  Lock,
  Map,
  MessageSquare,
  OctagonAlert,
  RefreshCcw,
  Route,
  Scale,
  ScrollText,
  Search,
  Server,
  ShieldCheck,
  Siren,
  SlidersHorizontal,
  Target,
  Timer,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

/** Curated icon registry for article content. Keys are stable, kebab-case names. */
export const ARTICLE_ICONS = {
  activity: Activity,
  alert: AlertTriangle,
  archive: Archive,
  banknote: Banknote,
  book: BookMarked,
  bot: Bot,
  brain: Brain,
  building: Building2,
  cable: Cable,
  check: Check,
  clipboard: ClipboardList,
  cog: Cog,
  coins: Coins,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  dot: CircleDot,
  exchange: ArrowRightLeft,
  eye: Eye,
  factory: Factory,
  'file-check': FileCheck2,
  flask: FlaskConical,
  funnel: Funnel,
  gauge: Gauge,
  branch: GitBranch,
  grid: Grid3x3,
  'hard-drive': HardDrive,
  key: KeyRound,
  landmark: Landmark,
  layers: Layers,
  bulb: Lightbulb,
  'list-checks': ListChecks,
  lock: Lock,
  map: Map,
  message: MessageSquare,
  'octagon-alert': OctagonAlert,
  refresh: RefreshCcw,
  route: Route,
  scale: Scale,
  scroll: ScrollText,
  search: Search,
  server: Server,
  shield: ShieldCheck,
  siren: Siren,
  sliders: SlidersHorizontal,
  target: Target,
  timer: Timer,
  users: Users,
  workflow: Workflow,
  wrench: Wrench,
  x: X,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type ArticleIconName = keyof typeof ARTICLE_ICONS;

export interface InlineIconProps {
  name: ArticleIconName;
  className?: string;
}

/**
 * Inline article icon. Sized in em so it follows the surrounding text,
 * decorative by default (the adjacent text carries the meaning).
 */
export function I({ name, className }: InlineIconProps) {
  const Icon = ARTICLE_ICONS[name];
  if (!Icon) return null;
  return (
    <Icon
      aria-hidden="true"
      className={cn('inline size-[1.05em] shrink-0 translate-y-[-0.08em] align-middle text-fd-primary', className)}
    />
  );
}

/** Tinted chip around an icon, used ahead of headings and card titles. */
export function IconChip({ name, className }: InlineIconProps) {
  const Icon = ARTICLE_ICONS[name];
  if (!Icon) return null;
  return (
    <span
      aria-hidden="true"
      className={cn(
        'not-prose me-[0.55em] inline-flex size-[1.55em] shrink-0 items-center justify-center rounded-[0.4em] border border-fd-primary/15 bg-fd-primary/10 align-[-0.34em] text-fd-primary',
        className,
      )}
    >
      <Icon className="size-[1em]" />
    </span>
  );
}
