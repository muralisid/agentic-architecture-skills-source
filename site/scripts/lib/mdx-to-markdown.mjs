/**
 * Turns a synced page into the plain Markdown a skill bundle ships.
 *
 * The pages are MDX: their components carry real content (a figure's data, a
 * chart's numbers, a glossary), so stripping the JSX would silently drop the
 * evidence a skill exists to supply. Every component therefore has an explicit
 * rendering here, and an unmapped one is a build error rather than a hole in a
 * published bundle.
 *
 * The output is read by an agent, not a browser: no HTML, no icons, tables in
 * GitHub-flavoured form, and every site-relative link rewritten to an absolute
 * URL so a bundled page can still be followed back to its source.
 */

import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { parse as parseYaml } from 'yaml';

const KNOWN_COMPONENTS = new Set([
  'PlainTerms',
  'Term',
  'GuideFigure',
  'TeachingIllustration',
  'ComparisonFigure',
  'WallChart',
  'ResultChart',
  'StatTiles',
  'PrincipleCard',
  'EvidenceBadge',
  'Steps',
  'Step',
  'Cards',
  'Card',
  'Callout',
  'Glossary',
  'I',
  'IconChip',
  // MDX parses lowercase HTML tags as JSX elements too. These two carry meaning
  // in the pages (the collapsible "research behind this page" block); any other
  // lowercase tag is presentational and is simply unwrapped, while an unmapped
  // uppercase component is an error, because those carry data.
  'details',
  'summary',
]);

const EVIDENCE_LABELS = {
  'conceptual-guide': 'Guide model',
  'primary-source': 'Primary source',
  'independently-measured': 'Independently measured',
  'vendor-reported': 'Vendor reported',
  'preprint-or-prototype': 'Preprint or prototype',
  'author-position': 'Author position',
  'no-published-precedent': 'Open evidence gap',
  'mixed-evidence': 'Mixed evidence',
};

/* --------------------------------------------------------------------------
 * Reading JSX attribute values.
 * Attributes are either string literals or `{...}` expressions whose estree the
 * MDX parser attaches. Only literal data is supported: an expression that has
 * to be evaluated is content the page should not have hidden in a component.
 * ----------------------------------------------------------------------- */

function fromEstree(node) {
  switch (node.type) {
    case 'Literal':
      return node.value;
    case 'TemplateLiteral':
      if (node.expressions.length) throw new Error('template literal with expressions in an attribute');
      return node.quasis.map((q) => q.value.cooked).join('');
    case 'UnaryExpression':
      if (node.operator === '-') return -fromEstree(node.argument);
      if (node.operator === '+') return +fromEstree(node.argument);
      throw new Error(`unsupported unary operator ${node.operator}`);
    case 'ArrayExpression':
      return node.elements.map((el) => (el === null ? null : fromEstree(el)));
    case 'ObjectExpression': {
      const out = {};
      for (const prop of node.properties) {
        const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
        out[key] = fromEstree(prop.value);
      }
      return out;
    }
    case 'JSXElement':
      return null; // an icon or other decoration passed as a prop; carries no text
    default:
      throw new Error(`unsupported expression type ${node.type}`);
  }
}

function attributes(node) {
  const out = {};
  for (const attr of node.attributes ?? []) {
    if (attr.type !== 'mdxJsxAttribute') continue;
    if (attr.value === null || attr.value === undefined) {
      out[attr.name] = true;
    } else if (typeof attr.value === 'string') {
      out[attr.name] = attr.value;
    } else if (attr.value.type === 'mdxJsxAttributeValueExpression') {
      const expression = attr.value.data?.estree?.body?.[0]?.expression;
      if (!expression) throw new Error(`attribute ${attr.name} has no parsable expression`);
      out[attr.name] = fromEstree(expression);
    }
  }
  return out;
}

/* --------------------------------------------------------------------------
 * mdast builders
 * ----------------------------------------------------------------------- */

const text = (value) => ({ type: 'text', value });
const paragraph = (children) => ({ type: 'paragraph', children: Array.isArray(children) ? children : [text(children)] });
const strong = (value) => ({ type: 'strong', children: [text(value)] });
const html = (value) => ({ type: 'html', value });

function table(header, rows) {
  const cell = (value) => ({ type: 'tableCell', children: [text(String(value ?? ''))] });
  return {
    type: 'table',
    align: header.map(() => null),
    children: [
      { type: 'tableRow', children: header.map(cell) },
      ...rows.map((row) => ({ type: 'tableRow', children: row.map(cell) })),
    ],
  };
}

function formatNumber(value, decimals, signed) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a';
  const body = Number(value).toFixed(decimals);
  if (signed && value > 0) return `+${body}`;
  return body;
}

/* --------------------------------------------------------------------------
 * Component renderings. Each returns an array of mdast nodes.
 * ----------------------------------------------------------------------- */

function renderResultChart(props) {
  const decimals = props.decimals ?? 3;
  const signed = props.signed ?? false;
  const nodes = [paragraph([strong(`Measured result: ${props.title}.`), text(props.subtitle ? ` ${props.subtitle}` : '')])];

  if (props.points) {
    nodes.push(
      table(
        [props.xLabel ?? 'x', props.yLabel ?? 'y', 'Point'],
        props.points.map((p) => [formatNumber(p.x, decimals, false), formatNumber(p.y, decimals, false), p.label]),
      ),
    );
  } else if (props.categories && props.series) {
    const header = [props.xLabel ?? 'Category', ...props.series.map((s) => s.name)];
    if (props.intervals) header.push('95% interval');
    const rows = props.categories.map((category, i) => {
      const row = [category, ...props.series.map((s) => formatNumber(s.values[i], decimals, signed))];
      if (props.intervals) {
        const interval = props.intervals[i];
        row.push(
          interval
            ? `${formatNumber(interval.low, decimals, signed)} to ${formatNumber(interval.high, decimals, signed)}`
            : '',
        );
      }
      return row;
    });
    nodes.push(table(header, rows));
  }

  if (props.caption) nodes.push(paragraph(props.caption));
  if (props.source) nodes.push(paragraph([strong('Source:'), text(` ${props.source}`)]));
  return nodes;
}

function renderStatTiles(props) {
  return [table(['Measure', 'Value', 'Note'], (props.items ?? []).map((item) => [item.label, item.value, item.note ?? '']))];
}

function renderFigure(props, { figures, siteUrl }) {
  const figure = figures.get(props.id);
  if (!figure) throw new Error(`figure "${props.id}" is not in the manifest`);
  const nodes = [
    paragraph([strong(`Figure: ${figure.title}.`), text(` ${figure.takeaway}`)]),
    paragraph(figure.caption),
  ];
  if (figure.longDescription) nodes.push(paragraph([strong('What the diagram shows:'), text(` ${figure.longDescription}`)]));
  nodes.push(paragraph(`Diagram: ${siteUrl}/figures/${figure.id}.svg`));
  return nodes;
}

function renderTeachingIllustration(props, { siteUrl }) {
  const source = String(props.src ?? '');
  const imageUrl = /^https?:\/\//.test(source)
    ? source
    : `${siteUrl}${source.startsWith('/') ? '' : '/'}${source}`;
  const nodes = [
    paragraph([
      strong(`Figure: ${props.title ?? 'Teaching illustration'}.`),
      ...(props.caption ? [text(` ${props.caption}`)] : []),
    ]),
  ];
  if (props.alt) nodes.push(paragraph([strong('What the image shows:'), text(` ${props.alt}`)]));
  if (source) nodes.push(paragraph(`Image: ${imageUrl}`));
  return nodes;
}

function renderWallChart(props, { siteUrl }) {
  const caption =
    props.caption ??
    'Fourteen layers with their control point, key mechanisms, and the products that serve them, grouped into the seven planes, with the ten cross-cutting concerns as columns and the four deterministic zones underneath.';
  return [
    paragraph([strong(`Figure: ${props.title ?? 'The agentic enterprise, on one page'}.`), text(` ${caption}`)]),
    paragraph(`Diagram: ${siteUrl}/diagrams/target-state.svg`),
  ];
}

function renderGlossary({ glossary }) {
  const groups = new Map();
  for (const entry of glossary) {
    if (!groups.has(entry.group)) groups.set(entry.group, []);
    groups.get(entry.group).push(entry);
  }
  const nodes = [];
  for (const [group, entries] of groups) {
    nodes.push({ type: 'heading', depth: 3, children: [text(group)] });
    nodes.push(
      table(
        ['Term', 'In plain words'],
        entries.sort((a, b) => a.term.localeCompare(b.term)).map((e) => [e.term, e.plain]),
      ),
    );
  }
  return nodes;
}

/* --------------------------------------------------------------------------
 * The transform
 * ----------------------------------------------------------------------- */

function componentPlugin(context) {
  return (tree) => {
    // Depth-first so a component nested inside another is handled first.
    const replace = (node, index, parent) => {
      const name = node.name;
      if (!name) {
        // A fragment: keep the children.
        parent.children.splice(index, 1, ...node.children);
        return index;
      }
      if (!KNOWN_COMPONENTS.has(name) && /^[a-z]/.test(name)) {
        // Presentational HTML: keep whatever it wraps, drop the tag itself.
        parent.children.splice(index, 1, ...node.children);
        return index;
      }
      if (!KNOWN_COMPONENTS.has(name)) {
        throw new Error(
          `unmapped component <${name}> in ${context.route}. Add a rendering to scripts/lib/mdx-to-markdown.mjs so it cannot vanish from a skill bundle.`,
        );
      }
      const props = attributes(node);
      let replacement;

      switch (name) {
        case 'Term':
          // Inline: keep the words, drop the tooltip.
          replacement = node.children.length ? node.children : [text(String(props.k ?? ''))];
          break;
        case 'I':
        case 'IconChip':
          replacement = [];
          break;
        case 'PlainTerms':
          replacement = [
            { type: 'blockquote', children: [paragraph([strong('In plain terms.')]), ...node.children] },
          ];
          break;
        case 'Callout':
          replacement = [
            {
              type: 'blockquote',
              children: [...(props.title ? [paragraph([strong(String(props.title))])] : []), ...node.children],
            },
          ];
          break;
        case 'PrincipleCard':
          replacement = [
            paragraph([strong(`${props.eyebrow ?? 'Design principle'}: ${props.title}.`)]),
            ...node.children,
          ];
          break;
        case 'EvidenceBadge':
          replacement = [paragraph(`[Evidence status: ${EVIDENCE_LABELS[props.status] ?? props.status}]`)];
          break;
        case 'Steps':
          replacement = node.children;
          break;
        case 'Step':
          replacement = node.children;
          break;
        case 'Cards':
          replacement = node.children;
          break;
        case 'Card': {
          const heading = props.href ? `${props.title} (${props.href})` : String(props.title ?? '');
          replacement = [paragraph([strong(heading)]), ...node.children];
          break;
        }
        case 'GuideFigure':
        case 'ComparisonFigure':
          replacement = renderFigure(props, context);
          break;
        case 'TeachingIllustration':
          replacement = renderTeachingIllustration(props, context);
          break;
        case 'WallChart':
          replacement = renderWallChart(props, context);
          break;
        case 'ResultChart':
          replacement = renderResultChart(props);
          break;
        case 'StatTiles':
          replacement = renderStatTiles(props);
          break;
        case 'Glossary':
          replacement = renderGlossary(context);
          break;
        case 'details':
          // A bundle has no collapsing, so the contents are simply kept.
          replacement = node.children;
          break;
        case 'summary':
          replacement = [paragraph([strong(node.children.map((c) => c.value ?? '').join('').trim() || 'Details')])];
          break;
        default:
          throw new Error(`no rendering for <${name}>`);
      }

      parent.children.splice(index, 1, ...replacement);
      return index;
    };

    let changed = true;
    let guard = 0;
    while (changed) {
      changed = false;
      if (++guard > 50) throw new Error('component expansion did not settle');
      visit(tree, (node, index, parent) => {
        if (!parent || index === null) return;
        if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return;
        replace(node, index, parent);
        changed = true;
        return index;
      });
    }

    // Expressions and imports carry no reader-facing content.
    visit(tree, (node, index, parent) => {
      if (!parent || index === null) return;
      if (['mdxFlowExpression', 'mdxTextExpression', 'mdxjsEsm'].includes(node.type)) {
        parent.children.splice(index, 1);
        return index;
      }
    });

    // Site-relative links become absolute so a bundled page stays followable.
    visit(tree, 'link', (node) => {
      if (node.url.startsWith('/')) node.url = `${context.siteUrl}${node.url}`;
    });

    // Raw HTML would confuse a reader that is not a browser.
    visit(tree, 'html', (node, index, parent) => {
      const value = node.value.trim();
      if (/^<details/i.test(value)) node.value = '';
      else if (/^<\/details>/i.test(value)) node.value = '';
      else if (/^<summary>(.*)<\/summary>$/is.test(value)) {
        const label = value.replace(/^<summary>/i, '').replace(/<\/summary>$/i, '');
        parent.children.splice(index, 1, paragraph([strong(label)]));
      } else if (/^<[a-z]/i.test(value)) {
        node.value = '';
      }
    });
  };
}

/**
 * @param {string} source the page's raw MDX or Markdown, frontmatter included
 * @param {object} context { route, siteUrl, figures: Map, glossary: [] }
 * @returns {{ title: string, description: string, body: string }}
 */
export function convertPage(source, context) {
  let frontmatter = {};
  let body = source;
  if (source.startsWith('---\n')) {
    const end = source.indexOf('\n---\n', 4);
    if (end !== -1) {
      frontmatter = parseYaml(source.slice(4, end)) ?? {};
      body = source.slice(end + 5);
    }
  }

  const file = remark()
    .use(remarkMdx)
    .use(remarkGfm)
    .use(() => componentPlugin(context))
    .processSync(body);

  const markdown = String(file)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const title = frontmatter.title ?? context.route;
  const description = frontmatter.description ?? '';
  const heading = [
    `# ${title}`,
    '',
    ...(description ? [description, ''] : []),
    // A bundled page travels away from the site, so it carries its own
    // attribution: whoever reads it should be able to say where it came from
    // and who wrote it without going back for the original.
    ...(context.author ? [`Author: ${context.author.name} (${context.author.linkedin})`] : []),
    `Source: ${context.siteUrl}${context.route} (Markdown: ${context.siteUrl}${context.route}.md)`,
    ...(frontmatter.dateModified ? [`Updated: ${frontmatter.dateModified}`] : []),
    ...(context.licence ? [`Licence: ${context.licence}`] : []),
    '',
  ].join('\n');

  return { title, description, body: `${heading}\n${markdown}\n` };
}

export { KNOWN_COMPONENTS };
