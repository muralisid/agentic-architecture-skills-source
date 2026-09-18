import sections from '../content-map.json';
import type * as PageTree from 'fumadocs-core/page-tree';

export const SECTIONS = sections;
export function sectionFor(url: string) {
  return SECTIONS.find((section) => section.prefixes.some((prefix) => url === prefix || url.startsWith(`${prefix}/`))) ?? SECTIONS[4];
}

/** Group retained URLs by reader interest rather than by storage location. */
export function readerTree(tree: PageTree.Root): PageTree.Root {
  function select(nodes: PageTree.Node[], id: string): PageTree.Node[] {
    return nodes.flatMap((node): PageTree.Node[] => {
      if (node.type === 'separator') return id === 'memory' ? [node] : [];
      if (node.type === 'page') return sectionFor(node.url).id === id ? [node] : [];
      const children = select(node.children, id);
      const index = node.index && sectionFor(node.index.url).id === id ? node.index : undefined;
      if (!children.length && !index) return [];
      return [{ ...node, $id: `${id}:${node.$id ?? node.index?.url ?? String(node.name)}`, root: false, index, children }];
    });
  }
  return {
    ...tree,
    children: SECTIONS.map((section): PageTree.Folder => {
      const children = select(tree.children, section.id);
      const landing = children.find((n) => n.type === 'folder' && (n.index?.url === section.url ||
        (section.id === 'memory' && n.children.some((child) => child.type === 'page' && child.url === section.url))));
      if (landing?.type === 'folder') {
        if (section.id === 'memory') {
          const grouped: PageTree.Node[] = [];
          let group: PageTree.Folder | undefined;
          for (const node of landing.children) {
            if (node.type === 'separator') {
              group = { type: 'folder', name: node.name, $id: `memory-group:${String(node.name)}`, collapsible: true,
                defaultOpen: !String(node.name).startsWith('Optional') && !String(node.name).startsWith('Advanced'),
                children: [] };
              grouped.push(group);
            } else if (group) group.children.push(node);
            else grouped.push(node);
          }
          const related = children.filter((node) => node !== landing && node.type !== 'separator');
          if (group) group.children.push(...related);
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
