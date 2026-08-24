import { getLLMText, source } from '@/lib/source';
import { appName, author, citation, siteUrl } from '@/lib/shared';

export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  // The whole corpus in one file. Attribution leads, and each page repeats it,
  // because a model may take any single section out of this file.
  const header = [
    `# ${appName}`,
    '',
    `Every page below is written by ${author.name}, ${author.jobTitle}.`,
    `LinkedIn: ${author.linkedin}`,
    `About the author: ${siteUrl}${author.page}`,
    `Licence: ${citation.license} (${citation.licenseUrl}). Quote freely with attribution to ${author.name}.`,
    '',
    '---',
    '',
  ].join('\n');

  return new Response(header + scanned.join('\n\n'));
}
