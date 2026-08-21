import { Children, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from 'react';

type CellProps = { children?: ReactNode };

function elementsOf(node: ReactNode, tag: string): ReactElement<CellProps>[] {
  const out: ReactElement<CellProps>[] = [];
  Children.forEach(node, (child) => {
    if (isValidElement<CellProps>(child) && child.type === tag) out.push(child);
  });
  return out;
}

function parseTable(children: ReactNode) {
  const thead = elementsOf(children, 'thead')[0];
  const tbody = elementsOf(children, 'tbody')[0];
  if (!thead || !tbody) return null;
  const headRow = elementsOf(thead.props.children, 'tr')[0];
  if (!headRow) return null;
  const head = elementsOf(headRow.props.children, 'th').map((th) => th.props.children);
  const rows = elementsOf(tbody.props.children, 'tr').map((tr) =>
    [...elementsOf(tr.props.children, 'th'), ...elementsOf(tr.props.children, 'td')].map((cell) => cell.props.children),
  );
  if (!head.length || !rows.length) return null;
  return { head, rows };
}

function hasContent(node: ReactNode): boolean {
  if (node === null || node === undefined || node === false) return false;
  if (typeof node === 'string') return node.trim().length > 0;
  if (Array.isArray(node)) return node.some(hasContent);
  return true;
}

/**
 * Markdown tables render as a real table from the sm breakpoint up and as
 * stacked label-value cards below it, so articles never scroll horizontally.
 */
export function ResponsiveTable({ children, ...props }: ComponentProps<'table'>) {
  const parsed = parseTable(children);

  const table = (
    <div className={parsed ? 'prose-no-margin relative my-6 hidden sm:block print:block' : 'prose-no-margin relative my-6 overflow-hidden'}>
      <table {...props}>{children}</table>
    </div>
  );

  if (!parsed) return table;

  return (
    <>
      {table}
      <div className="my-6 space-y-3 sm:hidden print:hidden" role="presentation">
        {parsed.rows.map((cells, rowIndex) => (
          <div key={rowIndex} className="rounded-xl border bg-fd-card p-3">
            <dl className="m-0 space-y-2">
              {cells.map((cell, cellIndex) =>
                hasContent(cell) ? (
                  <div key={cellIndex}>
                    {hasContent(parsed.head[cellIndex]) ? (
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-fd-muted-foreground">
                        {parsed.head[cellIndex]}
                      </dt>
                    ) : null}
                    <dd className="m-0 text-sm leading-6">{cell}</dd>
                  </div>
                ) : null,
              )}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
