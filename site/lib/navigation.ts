import sections from '../content-map.json';
import type * as PageTree from 'fumadocs-core/page-tree';

export const SECTIONS = sections;
/** Pages outside every prefix belong to Research, found by id so a new tab cannot shift it. */
const FALLBACK_SECTION = SECTIONS.find((section) => section.id === 'research') ?? SECTIONS[0];
export function sectionFor(url: string) {
  return SECTIONS.find((section) => section.prefixes.some((prefix) => url === prefix || url.startsWith(`${prefix}/`))) ?? FALLBACK_SECTION;
}

/** Sections whose '---Name---' separators become collapsible groups in the sidebar. */
const GROUPED_SECTIONS = ['memory', 'use-cases', 'architecture'];

function groupOpenByDefault(sectionId: string, name: string, isFirstGroup: boolean) {
  if (sectionId === 'use-cases') return name === 'Choose an industry' || name === 'Choose and fund';
  if (sectionId === 'architecture') return true;
  return !name.startsWith('Optional') && !name.startsWith('Advanced');
}

/** Group retained URLs by reader interest rather than by storage location. */
export function readerTree(tree: PageTree.Root): PageTree.Root {
  function select(nodes: PageTree.Node[], id: string): PageTree.Node[] {
    return nodes.flatMap((node): PageTree.Node[] => {
      if (node.type === 'separator') return GROUPED_SECTIONS.includes(id) ? [node] : [];
      if (node.type === 'page') return sectionFor(node.url).id === id ? [node] : [];
      const children = select(node.children, id);
      const index = node.index && sectionFor(node.index.url).id === id ? node.index : undefined;
      if (!index && !children.some((child) => child.type !== 'separator')) return [];
      return [{ ...node, $id: `${id}:${node.$id ?? node.index?.url ?? String(node.name)}`, root: false, index, children }];
    });
  }
  return {
    ...tree,
    children: SECTIONS.map((section): PageTree.Folder => {
      const children = select(tree.children, section.id);
      const landing = children.find((n) => n.type === 'folder' && (n.index?.url === section.url ||
        (['memory', 'use-cases'].includes(section.id) && n.children.some((child) => child.type === 'page' && child.url === section.url))));
      if (landing?.type === 'folder') {
        if (GROUPED_SECTIONS.includes(section.id)) {
          const grouped: PageTree.Node[] = [];
          let group: PageTree.Folder | undefined;
          for (const node of landing.children) {
            if (node.type === 'separator') {
              group = { type: 'folder', name: node.name, $id: `${section.id}-group:${String(node.name)}`, collapsible: true,
                defaultOpen: groupOpenByDefault(section.id, String(node.name), !group),
                children: [] };
              grouped.push(group);
            } else if (group) group.children.push(node);
            else grouped.push(node);
          }
          const related = children.filter((node) => node !== landing && node.type !== 'separator');
          if (section.id === 'architecture') {
            // The fourteen layers follow the first group, so a reader meets them
            // straight after the system view. Security, the Agentic OS and the
            // decisions stay after the groups, in the root order.
            const isLayers = (node: PageTree.Node) => node.type === 'folder' && node.index?.url === '/layers';
            const firstGroup = grouped.findIndex((node) => node.type === 'folder' && node.$id?.startsWith(`${section.id}-group:`));
            grouped.splice(firstGroup + 1, 0, ...related.filter(isLayers));
            grouped.push(...related.filter((node) => !isLayers(node)));
          } else if (group) group.children.push(...related);
          else grouped.push(...related);
          return { ...landing, $id: `section:${section.id}`, name: section.text, root: true, children: grouped };
        }
        return { ...landing, $id: `section:${section.id}`, name: section.text, root: true,
          children: [...landing.children, ...children.filter((n) => n !== landing)] };
      }
      return { type: 'folder', $id: `section:${section.id}`, name: section.text, root: true, children };
    }),
  };
}
