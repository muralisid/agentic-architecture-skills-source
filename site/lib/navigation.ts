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
      if (node.type === 'separator') return [];
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
      const landing = children.find((n) => n.type === 'folder' && n.index?.url === section.url);
      if (landing?.type === 'folder') {
        return { ...landing, $id: `section:${section.id}`, name: section.text, root: true,
          children: [...landing.children, ...children.filter((n) => n !== landing)] };
      }
      return { type: 'folder', $id: `section:${section.id}`, name: section.text, root: true, children };
    }),
  };
}
