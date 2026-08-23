import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { siteUrl, skillsIndexUrl, skillsRepoSlug } from '@/lib/shared';

export const revalidate = false;

export function GET() {
  const skills = [
    '',
    '## Agent skills',
    '',
    'This site publishes its own content as installable Agent Skills, so an agent can carry the architecture, the decisions and the measured evidence without fetching pages.',
    '',
    `- Discovery index: ${skillsIndexUrl}`,
    `- Catalogue and install instructions: ${siteUrl}/skills`,
    `- Install everything: npx skills add ${skillsRepoSlug}`,
    '',
    'Every page is also available as Markdown: append .md to any URL, or send Accept: text/markdown.',
    '',
  ].join('\n');

  return new Response(llms(source).index() + skills);
}
