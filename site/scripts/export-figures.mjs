import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadFigureManifestModule, siteDirectory } from './figure-manifest-loader.mjs';

const outputDirectory = path.join(siteDirectory, 'public', 'figures');

const palette = {
  human: { fill: '#fffbeb', stroke: '#d97706', text: '#78350f' },
  agent: { fill: '#f5f3ff', stroke: '#7c3aed', text: '#4c1d95' },
  system: { fill: '#eff6ff', stroke: '#2563eb', text: '#1e3a8a' },
  control: { fill: '#f8fafc', stroke: '#475569', text: '#0f172a' },
  evidence: { fill: '#f0fdfa', stroke: '#0f766e', text: '#134e4a' },
  risk: { fill: '#fff1f2', stroke: '#e11d48', text: '#881337' },
  neutral: { fill: '#f8fafc', stroke: '#94a3b8', text: '#1e293b' },
};

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapText(value, maxCharacters, maxLines = 6) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxCharacters || !line) line = next;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  return [...lines.slice(0, maxLines - 1), `${lines[maxLines - 1].slice(0, Math.max(1, maxCharacters - 1))}…`];
}

function textBlock(value, x, y, options = {}) {
  const { width = 40, lineHeight = 22, className = 'body', maxLines = 6 } = options;
  const lines = wrapText(value, width, maxLines);
  return `<text x="${x}" y="${y}" class="${className}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${escapeXml(line)}</tspan>`).join('')}</text>`;
}

function cardsFor(figure) {
  const data = figure.data;
  if (data.lanes?.length) return data.lanes.map((lane) => ({ label: lane.label, detail: lane.steps.join(' → '), kind: lane.kind }));
  if (data.columns?.length) return data.columns.map((column) => ({ label: column.label, detail: column.items.join(' • '), kind: column.kind }));
  if (data.stages?.length) return data.stages.map((stage, index) => ({ label: `${index + 1}. ${stage.label}`, detail: `${stage.detail}${stage.gate ? ` Gate: ${stage.gate}.` : ''}`, kind: stage.kind }));
  if (data.metrics?.length) return data.metrics.map((metric) => ({ label: metric.label, detail: `${metric.value}${metric.detail ? `: ${metric.detail}` : ''}`, kind: 'evidence' }));
  if (data.nodes?.length) return data.nodes.map((node) => ({ label: node.label, detail: node.detail ?? node.group ?? '', kind: node.kind }));
  if (data.items?.length) return data.items.map((item) => ({ label: item.label, detail: item.detail ?? (item.active ? 'Highlighted' : ''), kind: item.active ? 'agent' : item.kind }));
  if (data.rows?.length && data.axisColumns?.length) return data.rows.map((row) => ({
    label: row,
    detail: data.axisColumns.map((column) => {
      const cell = data.cells?.find((candidate) => candidate.row === row && candidate.column === column);
      return `${column}: ${cell?.label ?? 'no special annotation'}`;
    }).join(' • '),
    kind: data.cells?.some((cell) => cell.row === row && cell.emphasis) ? 'evidence' : 'neutral',
  }));
  if (data.cells?.length) return data.cells.map((cell) => ({ label: cell.label, detail: `${cell.row} × ${cell.column}${cell.detail ? `: ${cell.detail}` : ''}`, kind: cell.emphasis ? 'evidence' : 'neutral' }));
  return [{ label: figure.title, detail: figure.takeaway, kind: 'neutral' }];
}

const canvasWidth = 1200;
const canvasMargin = 56;
const contentWidth = canvasWidth - canvasMargin * 2;
const contentTop = 260;
const layoutGap = 18;

function colorFor(kind) {
  return palette[kind ?? 'neutral'] ?? palette.neutral;
}

function edgeStyle(kind) {
  if (kind === 'advisory') return { color: '#7c3aed', dash: '3 7' };
  if (kind === 'evidence') return { color: '#0f766e', dash: '2 4' };
  if (kind === 'feedback') return { color: '#0284c7', dash: '8 6' };
  if (kind === 'blocked') return { color: '#e11d48', dash: '10 6' };
  return { color: '#475569', dash: '' };
}

function card({ x, y, width, height, label, detail = '', kind, gate, attributes = '', index, labelMaxLines = 2, detailY = 75 }) {
  const color = colorFor(kind);
  const textWidth = Math.max(16, Math.floor((width - 42) / 7.7));
  const indexMarkup = index === undefined
    ? ''
    : `<circle cx="${x + 25}" cy="${y + 26}" r="14" fill="#ffffff" fill-opacity="0.72" stroke="${color.stroke}"/><text x="${x + 25}" y="${y + 31}" text-anchor="middle" class="index">${index + 1}</text>`;
  const labelX = index === undefined ? x + 22 : x + 48;
  const gateMarkup = gate
    ? `<rect x="${x + 20}" y="${y + height - 48}" width="${width - 40}" height="36" rx="12" fill="#ffffff" fill-opacity="0.58"/>${textBlock(gate, x + 31, y + height - 30, { width: Math.max(14, Math.floor((width - 62) / 6.8)), lineHeight: 14, className: 'gate', maxLines: 2 })}`
    : '';
  const detailLines = gate ? 3 : Math.max(2, Math.floor((height - detailY) / 18));

  return `<g ${attributes}>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" fill="${color.fill}" stroke="${color.stroke}" stroke-width="2"/>
    <rect x="${x}" y="${y}" width="7" height="${height}" rx="3.5" fill="${color.stroke}"/>
    ${indexMarkup}
    ${textBlock(label, labelX, y + 32, { width: Math.max(12, textWidth - (index === undefined ? 0 : 4)), lineHeight: 19, className: 'card-title', maxLines: labelMaxLines })}
    ${textBlock(detail, x + 22, y + detailY, { width: textWidth, lineHeight: 18, className: 'body', maxLines: detailLines })}
    ${gateMarkup}
  </g>`;
}

function comparisonLayout(figure, semantic = 'comparison') {
  const columns = figure.data.columns ?? [];
  const count = Math.max(1, columns.length);
  const gap = 20;
  const columnWidth = (contentWidth - gap * (count - 1)) / count;
  const maxItems = Math.max(1, ...columns.map((column) => column.items.length));
  const height = 86 + maxItems * 55;
  const markup = columns.map((column, columnIndex) => {
    const x = canvasMargin + columnIndex * (columnWidth + gap);
    const color = colorFor(column.kind);
    const items = column.items.map((item, itemIndex) => {
      const itemY = 74 + itemIndex * 55;
      return `<g data-comparison-item="${columnIndex}-${itemIndex}">
        <circle cx="${x + 28}" cy="${itemY + 14}" r="4" fill="${color.stroke}"/>
        ${textBlock(item, x + 42, itemY + 18, { width: Math.max(18, Math.floor((columnWidth - 64) / 7.5)), lineHeight: 17, className: 'body', maxLines: 2 })}
      </g>`;
    }).join('\n');

    return `<g data-comparison-column="${columnIndex}">
      <rect x="${x}" y="0" width="${columnWidth}" height="${height}" rx="18" fill="${color.fill}" stroke="${color.stroke}" stroke-width="2"/>
      <rect x="${x}" y="0" width="${columnWidth}" height="58" rx="18" fill="${color.stroke}" fill-opacity="0.12"/>
      ${textBlock(column.label, x + 22, 35, { width: Math.max(16, Math.floor((columnWidth - 44) / 7.5)), lineHeight: 19, className: 'card-title', maxLines: 2 })}
      ${items}
    </g>`;
  }).join('\n');

  return { height, semantic, markup: `<g data-semantic="${semantic}">${markup}</g>` };
}

function metricsLayout(figure) {
  const metrics = figure.data.metrics ?? [];
  const columns = Math.min(3, Math.max(1, metrics.length));
  const rows = Math.ceil(metrics.length / columns);
  const cardWidth = (contentWidth - layoutGap * (columns - 1)) / columns;
  const cardHeight = 170;
  const height = rows * cardHeight + Math.max(0, rows - 1) * layoutGap;
  const markup = metrics.map((metric, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = canvasMargin + column * (cardWidth + layoutGap);
    const y = row * (cardHeight + layoutGap);
    const gaugeWidth = cardWidth - 44;
    const fillWidth = metric.direction === 'down' ? gaugeWidth * 0.34 : metric.direction === 'up' ? gaugeWidth * 0.82 : gaugeWidth * 0.58;
    const gaugeColor = metric.direction === 'down' ? '#e11d48' : metric.direction === 'up' ? '#0f766e' : '#0284c7';

    return `<g data-metric="${index}">
      <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      ${textBlock(metric.label, x + 22, y + 34, { width: Math.floor((cardWidth - 44) / 7.5), lineHeight: 19, className: 'card-title', maxLines: 2 })}
      ${textBlock(metric.value, x + 22, y + 79, { width: 24, lineHeight: 25, className: 'metric-value', maxLines: 1 })}
      ${metric.detail ? textBlock(metric.detail, x + 22, y + 105, { width: Math.floor((cardWidth - 44) / 7.5), lineHeight: 17, className: 'body', maxLines: 2 }) : ''}
      <rect data-metric-gauge="${index}" x="${x + 22}" y="${y + cardHeight - 24}" width="${gaugeWidth}" height="8" rx="4" fill="#e2e8f0"/>
      <rect x="${x + 22}" y="${y + cardHeight - 24}" width="${fillWidth}" height="8" rx="4" fill="${gaugeColor}"/>
    </g>`;
  }).join('\n');

  return { height, semantic: 'metrics', markup: `<g data-semantic="metrics">${markup}</g>` };
}

function matrixLayout(figure) {
  const rows = figure.data.rows ?? [];
  const columns = figure.data.axisColumns ?? [];
  const labelWidth = 220;
  const headerHeight = 70;
  const rowHeight = rows.length > 10 ? 66 : 78;
  const cellWidth = (contentWidth - labelWidth) / Math.max(1, columns.length);
  const height = headerHeight + rows.length * rowHeight;
  const columnMarkup = columns.map((column, columnIndex) => {
    const x = canvasMargin + labelWidth + columnIndex * cellWidth;
    return `<g data-matrix-column="${columnIndex}">
      <rect x="${x}" y="0" width="${cellWidth}" height="${headerHeight}" fill="#f1f5f9" stroke="#cbd5e1"/>
      ${textBlock(column, x + 10, 27, { width: Math.max(8, Math.floor((cellWidth - 20) / 6.8)), lineHeight: 16, className: 'matrix-head', maxLines: 3 })}
    </g>`;
  }).join('\n');
  const rowMarkup = rows.map((row, rowIndex) => {
    const y = headerHeight + rowIndex * rowHeight;
    const cells = columns.map((column, columnIndex) => {
      const x = canvasMargin + labelWidth + columnIndex * cellWidth;
      const cell = figure.data.cells?.find((candidate) => candidate.row === row && candidate.column === column);
      const fill = cell?.emphasis ? '#ccfbf1' : cell ? '#ffffff' : '#f8fafc';
      const stroke = cell?.emphasis ? '#0f766e' : '#cbd5e1';
      const label = cell?.label ?? '·';
      return `<g data-matrix-cell="${rowIndex}-${columnIndex}">
        <rect x="${x}" y="${y}" width="${cellWidth}" height="${rowHeight}" fill="${fill}" stroke="${stroke}"/>
        ${textBlock(label, x + 10, y + 28, { width: Math.max(8, Math.floor((cellWidth - 20) / 6.8)), lineHeight: 16, className: cell ? 'matrix-cell' : 'matrix-empty', maxLines: cell?.detail ? 2 : 3 })}
        ${cell?.detail ? textBlock(cell.detail, x + 10, y + 60, { width: Math.max(8, Math.floor((cellWidth - 20) / 6.8)), lineHeight: 14, className: 'matrix-detail', maxLines: 1 }) : ''}
      </g>`;
    }).join('\n');

    return `<g data-matrix-row="${rowIndex}">
      <rect x="${canvasMargin}" y="${y}" width="${labelWidth}" height="${rowHeight}" fill="#f1f5f9" stroke="#cbd5e1"/>
      ${textBlock(row, canvasMargin + 14, y + 29, { width: 27, lineHeight: 17, className: 'matrix-row', maxLines: 3 })}
      ${cells}
    </g>`;
  }).join('\n');
  const corner = `<rect x="${canvasMargin}" y="0" width="${labelWidth}" height="${headerHeight}" rx="12" fill="#e2e8f0" stroke="#94a3b8"/><text x="${canvasMargin + 14}" y="40" class="matrix-head">DIMENSION</text>`;

  return { height, semantic: 'matrix', markup: `<g data-semantic="matrix-grid">${corner}${columnMarkup}${rowMarkup}</g>` };
}

function architectureLayout(figure) {
  const nodes = figure.data.nodes ?? [];
  const edges = figure.data.edges ?? [];
  const planeHeight = 74;
  const planeGap = 10;
  const planeWidth = 740;
  const planeRight = canvasMargin + planeWidth;
  const edgePanelX = 860;
  const edgePanelWidth = canvasWidth - canvasMargin - edgePanelX;
  const height = Math.max(
    nodes.length * planeHeight + Math.max(0, nodes.length - 1) * planeGap,
    66 + edges.length * 82,
  );
  const nodeIndex = new Map(nodes.map((node, index) => [node.id, index]));
  const planes = nodes.map((node, index) => {
    const y = index * (planeHeight + planeGap);
    const color = colorFor(node.kind);
    return `<g data-plane="${index}" data-node-id="${escapeXml(node.id)}">
      <rect x="${canvasMargin}" y="${y}" width="${planeWidth}" height="${planeHeight}" rx="14" fill="${color.fill}" stroke="${color.stroke}" stroke-width="2"/>
      <rect x="${canvasMargin}" y="${y}" width="128" height="${planeHeight}" rx="14" fill="${color.stroke}" fill-opacity="0.13"/>
      ${textBlock(node.group ?? 'Plane', canvasMargin + 16, y + 31, { width: 14, lineHeight: 16, className: 'plane-group', maxLines: 2 })}
      ${textBlock(node.label, canvasMargin + 152, y + 31, { width: 27, lineHeight: 18, className: 'card-title', maxLines: 2 })}
      ${textBlock(node.detail ?? '', canvasMargin + 375, y + 31, { width: 42, lineHeight: 17, className: 'body', maxLines: 2 })}
    </g>`;
  }).join('\n');
  const edgePaths = edges.map((edge, index) => {
    const fromIndex = nodeIndex.get(edge.from);
    const toIndex = nodeIndex.get(edge.to);
    if (fromIndex === undefined || toIndex === undefined) return '';
    const fromY = fromIndex * (planeHeight + planeGap) + planeHeight / 2;
    const toY = toIndex * (planeHeight + planeGap) + planeHeight / 2;
    const railX = planeRight + 18 + index * 8;
    const style = edgeStyle(edge.kind);
    const dash = style.dash ? ` stroke-dasharray="${style.dash}"` : '';
    return `<path data-edge="${index}" d="M ${planeRight} ${fromY} H ${railX} V ${toY} H ${planeRight}" fill="none" stroke="${style.color}" stroke-width="2"${dash} marker-end="url(#arrow)"/>`;
  }).join('\n');
  const edgeItems = edges.map((edge, index) => {
    const y = 57 + index * 82;
    const from = nodes.find((node) => node.id === edge.from)?.label ?? edge.from;
    const to = nodes.find((node) => node.id === edge.to)?.label ?? edge.to;
    const style = edgeStyle(edge.kind);
    return `<g data-edge-label="${index}">
      <line x1="${edgePanelX + 18}" y1="${y}" x2="${edgePanelX + 54}" y2="${y}" stroke="${style.color}" stroke-width="3" marker-end="url(#arrow)"/>
      ${textBlock(`${from} to ${to}`, edgePanelX + 66, y - 3, { width: 27, lineHeight: 17, className: 'edge-title', maxLines: 2 })}
      ${edge.label ? textBlock(edge.label, edgePanelX + 66, y + 33, { width: 27, lineHeight: 16, className: 'body', maxLines: 2 }) : ''}
    </g>`;
  }).join('\n');

  return {
    height,
    semantic: 'architecture',
    markup: `<g data-semantic="architecture-planes">
      ${planes}
      ${edgePaths}
      <rect x="${edgePanelX}" y="0" width="${edgePanelWidth}" height="${height}" rx="16" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="${edgePanelX + 18}" y="30" class="eyebrow">CROSS-PLANE FLOWS</text>
      ${edgeItems}
    </g>`,
  };
}

function sequenceLayout(figure, mode) {
  const stages = figure.data.stages ?? [];
  const columns = Math.min(4, Math.max(1, stages.length));
  const rows = Math.ceil(stages.length / columns);
  const cardWidth = (contentWidth - layoutGap * (columns - 1)) / columns;
  const cardHeight = mode === 'timeline' ? 178 : 158;
  const rowGap = 58;
  const height = rows * cardHeight + Math.max(0, rows - 1) * rowGap;
  const positions = stages.map((_, index) => {
    const row = Math.floor(index / columns);
    const columnInRow = index % columns;
    const visualColumn = row % 2 === 0 ? columnInRow : columns - 1 - columnInRow;
    return {
      x: canvasMargin + visualColumn * (cardWidth + layoutGap),
      y: row * (cardHeight + rowGap),
    };
  });
  const connectors = positions.slice(0, -1).map((position, index) => {
    const next = positions[index + 1];
    let pathData;
    if (position.y === next.y) {
      const movingRight = next.x > position.x;
      const startX = movingRight ? position.x + cardWidth : position.x;
      const endX = movingRight ? next.x : next.x + cardWidth;
      pathData = `M ${startX} ${position.y + cardHeight / 2} H ${endX}`;
    } else {
      const centerX = position.x + cardWidth / 2;
      pathData = `M ${centerX} ${position.y + cardHeight} V ${next.y}`;
    }
    return `<path data-sequence-connector="${index}" d="${pathData}" fill="none" stroke="#64748b" stroke-width="3" marker-end="url(#arrow)"/>`;
  }).join('\n');
  const cards = stages.map((stage, index) => {
    const { x, y } = positions[index];
    const gate = stage.gate ? `${mode === 'timeline' ? 'Advance when' : 'Gate'}: ${stage.gate}` : undefined;
    return card({
      x,
      y,
      width: cardWidth,
      height: cardHeight,
      label: stage.label,
      detail: stage.detail,
      gate,
      kind: stage.kind,
      index,
      attributes: `data-sequence-stage="${index}" data-${mode}-stage="${index}"`,
    });
  }).join('\n');

  return {
    height,
    semantic: mode,
    markup: `<g data-semantic="${mode}-sequence">${connectors}${cards}</g>`,
  };
}

function funnelLayout(figure) {
  const stages = figure.data.stages ?? [];
  const stageHeight = 94;
  const stageGap = 24;
  const startWidth = contentWidth - 80;
  const endWidth = Math.max(620, startWidth * 0.62);
  const widthStep = stages.length > 1 ? (startWidth - endWidth) / (stages.length - 1) : 0;
  const height = 32 + stages.length * stageHeight + Math.max(0, stages.length - 1) * stageGap;
  const markup = stages.map((stage, index) => {
    const stageWidth = startWidth - widthStep * index;
    const x = (canvasWidth - stageWidth) / 2;
    const y = 32 + index * (stageHeight + stageGap);
    const slant = Math.min(24, stageWidth * 0.04);
    const color = colorFor(stage.kind);
    const gate = stage.gate ? `Gate: ${stage.gate}` : index === stages.length - 1 ? 'Qualified result' : '';
    const connector = index < stages.length - 1
      ? `<line data-funnel-connector="${index}" x1="${canvasWidth / 2}" y1="${y + stageHeight}" x2="${canvasWidth / 2}" y2="${y + stageHeight + stageGap - 5}" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>`
      : '';
    return `<g data-funnel-stage="${index}">
      <polygon data-funnel-shape="trapezoid" points="${x},${y} ${x + stageWidth},${y} ${x + stageWidth - slant},${y + stageHeight} ${x + slant},${y + stageHeight}" fill="${color.fill}" stroke="${color.stroke}" stroke-width="2"/>
      <circle cx="${x + 42}" cy="${y + 34}" r="17" fill="#ffffff" fill-opacity="0.72" stroke="${color.stroke}"/><text x="${x + 42}" y="${y + 39}" text-anchor="middle" class="index">${index + 1}</text>
      ${textBlock(stage.label, x + 72, y + 34, { width: Math.floor((stageWidth - 270) / 7.5), lineHeight: 19, className: 'card-title', maxLines: 2 })}
      ${textBlock(stage.detail, x + 72, y + 68, { width: Math.floor((stageWidth - 270) / 7.5), lineHeight: 17, className: 'body', maxLines: 2 })}
      ${gate ? textBlock(gate, x + stageWidth - 190, y + 42, { width: 20, lineHeight: 17, className: 'gate', maxLines: 3 }) : ''}
      ${connector}
    </g>`;
  }).join('\n');

  return { height, semantic: 'funnel', markup: `<g data-semantic="funnel">${markup}</g>` };
}

function loopLayout(figure) {
  const loopItems = figure.data.stages?.length
    ? figure.data.stages.map((stage) => ({ ...stage }))
    : (figure.data.columns ?? []).map((column) => ({
        label: column.label,
        detail: [column.detail, ...column.items].filter(Boolean).join(' • '),
        kind: column.kind,
      }));
  const itemCount = Math.max(1, loopItems.length);
  const cardWidth = itemCount <= 2 ? 330 : 230;
  const cardHeight = itemCount <= 2 ? 140 : 112;
  const centerX = canvasWidth / 2;
  const centerY = 315;
  const radiusX = itemCount <= 2 ? 0 : 385;
  const radiusY = 220;
  const height = 650;
  const loopPath = `<path data-loop-path="closed" d="M ${centerX} ${centerY - radiusY} A ${Math.max(180, radiusX)} ${radiusY} 0 1 1 ${centerX - 0.1} ${centerY - radiusY}" fill="none" stroke="#0284c7" stroke-width="4" stroke-dasharray="10 8" marker-end="url(#arrow-blue)"/>`;
  const cards = loopItems.map((item, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / itemCount);
    const x = centerX + radiusX * Math.cos(angle) - cardWidth / 2;
    const y = centerY + radiusY * Math.sin(angle) - cardHeight / 2;
    return card({
      x,
      y,
      width: cardWidth,
      height: cardHeight,
      label: item.label,
      detail: item.detail,
      gate: item.gate,
      kind: item.kind,
      index,
      attributes: `data-loop-stage="${index}"`,
    });
  }).join('\n');

  return {
    height,
    semantic: 'loop',
    markup: `<g data-semantic="loop"><text x="${centerX}" y="${centerY - 8}" text-anchor="middle" class="loop-label">GOVERNED CYCLE</text><text x="${centerX}" y="${centerY + 18}" text-anchor="middle" class="body">Evidence feeds the next controlled pass</text>${loopPath}${cards}</g>`,
  };
}

function swimlaneLayout(figure) {
  const lanes = figure.data.lanes ?? [];
  const laneHeight = 108;
  const laneGap = 12;
  const labelWidth = 190;
  const height = lanes.length * laneHeight + Math.max(0, lanes.length - 1) * laneGap;
  const markup = lanes.map((lane, laneIndex) => {
    const y = laneIndex * (laneHeight + laneGap);
    const color = colorFor(lane.kind);
    const stepAreaX = canvasMargin + labelWidth + 18;
    const stepAreaWidth = contentWidth - labelWidth - 18;
    const stepGap = 14;
    const stepWidth = (stepAreaWidth - stepGap * Math.max(0, lane.steps.length - 1)) / Math.max(1, lane.steps.length);
    const steps = lane.steps.map((step, stepIndex) => {
      const x = stepAreaX + stepIndex * (stepWidth + stepGap);
      const connector = stepIndex < lane.steps.length - 1
        ? `<line x1="${x + stepWidth}" y1="${y + laneHeight / 2}" x2="${x + stepWidth + stepGap - 3}" y2="${y + laneHeight / 2}" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>`
        : '';
      return `<g data-lane-step="${laneIndex}-${stepIndex}">
        <rect x="${x}" y="${y + 13}" width="${stepWidth}" height="${laneHeight - 26}" rx="13" fill="#ffffff" stroke="#cbd5e1"/>
        ${textBlock(step, x + 16, y + 46, { width: Math.max(12, Math.floor((stepWidth - 32) / 7.3)), lineHeight: 18, className: 'body', maxLines: 3 })}
        ${connector}
      </g>`;
    }).join('\n');

    return `<g data-lane="${laneIndex}">
      <rect x="${canvasMargin}" y="${y}" width="${contentWidth}" height="${laneHeight}" rx="16" fill="#f8fafc" stroke="#cbd5e1"/>
      <rect x="${canvasMargin}" y="${y}" width="${labelWidth}" height="${laneHeight}" rx="16" fill="${color.fill}" stroke="${color.stroke}" stroke-width="2"/>
      ${textBlock(lane.label, canvasMargin + 18, y + 47, { width: 19, lineHeight: 19, className: 'card-title', maxLines: 3 })}
      ${steps}
    </g>`;
  }).join('\n');

  return { height, semantic: 'swimlane', markup: `<g data-semantic="swimlane">${markup}</g>` };
}

function spectrumLayout(figure) {
  const stages = figure.data.stages ?? [];
  const count = Math.max(1, stages.length);
  const slotWidth = contentWidth / count;
  const railY = 55;
  const cardY = 102;
  const cardHeight = 198;
  const height = cardY + cardHeight;
  const firstCenter = canvasMargin + slotWidth / 2;
  const lastCenter = canvasMargin + contentWidth - slotWidth / 2;
  const markup = stages.map((stage, index) => {
    const x = canvasMargin + index * slotWidth + 5;
    const width = slotWidth - 10;
    const center = x + width / 2;
    const color = colorFor(stage.kind);
    return `<g data-spectrum-stage="${index}">
      <line x1="${center}" y1="${railY}" x2="${center}" y2="${cardY}" stroke="${color.stroke}" stroke-width="2"/>
      <circle cx="${center}" cy="${railY}" r="10" fill="${color.fill}" stroke="${color.stroke}" stroke-width="3"/>
      ${card({ x, y: cardY, width, height: cardHeight, label: stage.label, detail: stage.detail, gate: stage.gate, kind: stage.kind, index, labelMaxLines: 3, detailY: 94 })}
    </g>`;
  }).join('\n');

  return {
    height,
    semantic: 'spectrum',
    markup: `<g data-semantic="spectrum">
      <text x="${firstCenter}" y="20" text-anchor="middle" class="eyebrow">START OF RANGE</text>
      <text x="${lastCenter}" y="20" text-anchor="middle" class="eyebrow">END OF RANGE</text>
      <rect data-spectrum-rail="continuous" x="${firstCenter}" y="${railY - 5}" width="${Math.max(1, lastCenter - firstCenter)}" height="10" rx="5" fill="url(#spectrum-gradient)"/>
      ${markup}
    </g>`,
  };
}

function stackLayout(figure) {
  const stages = figure.data.stages ?? [];
  const stageHeight = 96;
  const stageGap = 9;
  const minimumWidth = contentWidth * 0.68;
  const widthStep = stages.length > 1 ? (contentWidth - minimumWidth) / (stages.length - 1) : 0;
  const height = 34 + stages.length * stageHeight + Math.max(0, stages.length - 1) * stageGap;
  const markup = stages.map((stage, index) => {
    const layerWidth = minimumWidth + widthStep * index;
    const x = (canvasWidth - layerWidth) / 2;
    const y = 34 + index * (stageHeight + stageGap);
    const color = colorFor(stage.kind);
    return `<g data-stack-layer="${index}">
      <rect data-stack-shape="layer" x="${x}" y="${y}" width="${layerWidth}" height="${stageHeight}" rx="12" fill="${color.fill}" stroke="${color.stroke}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="${Math.min(150, layerWidth * 0.22)}" height="${stageHeight}" rx="12" fill="${color.stroke}" fill-opacity="0.12"/>
      <text x="${x + 20}" y="${y + 28}" class="index">LAYER ${index + 1}</text>
      ${textBlock(stage.label, x + 20, y + 57, { width: 21, lineHeight: 19, className: 'card-title', maxLines: 2 })}
      ${textBlock(stage.detail, x + 180, y + 37, { width: Math.max(25, Math.floor((layerWidth - 410) / 7.5)), lineHeight: 18, className: 'body', maxLines: 3 })}
      ${stage.gate ? textBlock(`Control: ${stage.gate}`, x + layerWidth - 210, y + 42, { width: 22, lineHeight: 17, className: 'gate', maxLines: 3 }) : ''}
    </g>`;
  }).join('\n');

  return {
    height,
    semantic: 'stack',
    markup: `<g data-semantic="stack"><text x="${canvasMargin}" y="20" class="eyebrow">PERSISTENCE AND OBLIGATION INCREASE DOWNWARD</text>${markup}</g>`,
  };
}

function topologyLayout(figure) {
  const nodes = figure.data.nodes ?? [];
  const edges = figure.data.edges ?? [];
  const columns = Math.min(4, Math.max(1, nodes.length));
  const rows = Math.ceil(nodes.length / columns);
  const cardWidth = (contentWidth - layoutGap * (columns - 1)) / columns;
  const cardHeight = 118;
  const rowGap = 64;
  const height = rows * cardHeight + Math.max(0, rows - 1) * rowGap;
  const positions = new Map(nodes.map((node, index) => [node.id, {
    x: canvasMargin + (index % columns) * (cardWidth + layoutGap),
    y: Math.floor(index / columns) * (cardHeight + rowGap),
  }]));
  const edgeMarkup = edges.map((edge, index) => {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    if (!from || !to) return '';
    const style = edgeStyle(edge.kind);
    const dash = style.dash ? ` stroke-dasharray="${style.dash}"` : '';
    return `<line data-map-edge="${index}" x1="${from.x + cardWidth / 2}" y1="${from.y + cardHeight / 2}" x2="${to.x + cardWidth / 2}" y2="${to.y + cardHeight / 2}" stroke="${style.color}" stroke-width="3"${dash} marker-end="url(#arrow)"/>`;
  }).join('\n');
  const nodeMarkup = nodes.map((node, index) => {
    const position = positions.get(node.id);
    return card({
      x: position.x,
      y: position.y,
      width: cardWidth,
      height: cardHeight,
      label: node.label,
      detail: node.detail ?? node.group ?? '',
      kind: node.kind,
      attributes: `data-map-node="${index}"`,
    });
  }).join('\n');

  return { height, semantic: 'topology-map', markup: `<g data-semantic="topology-map">${edgeMarkup}${nodeMarkup}</g>` };
}

function itemGridLayout(figure) {
  const items = figure.data.items?.length
    ? figure.data.items
    : cardsFor(figure).map((item) => ({ ...item }));
  const columns = Math.min(4, Math.max(1, items.length));
  const rows = Math.ceil(items.length / columns);
  const cardWidth = (contentWidth - layoutGap * (columns - 1)) / columns;
  const cardHeight = 138;
  const height = rows * cardHeight + Math.max(0, rows - 1) * layoutGap;
  const markup = items.map((item, index) => {
    const x = canvasMargin + (index % columns) * (cardWidth + layoutGap);
    const y = Math.floor(index / columns) * (cardHeight + layoutGap);
    return card({
      x,
      y,
      width: cardWidth,
      height: cardHeight,
      label: item.label,
      detail: item.detail ?? (item.active ? 'Highlighted layer' : ''),
      kind: item.active ? 'agent' : item.kind,
      attributes: `data-item="${index}"`,
    });
  }).join('\n');

  return { height, semantic: 'item-map', markup: `<g data-semantic="item-map">${markup}</g>` };
}

function layoutFor(figure) {
  if (figure.type === 'architecture') return architectureLayout(figure);
  if (figure.type === 'matrix') return matrixLayout(figure);
  if (figure.type === 'funnel') return funnelLayout(figure);
  if (figure.type === 'journey' || figure.type === 'flow' || figure.type === 'timeline') return sequenceLayout(figure, figure.type);
  if (figure.type === 'loop') return loopLayout(figure);
  if (figure.type === 'swimlane') return swimlaneLayout(figure);
  if (figure.type === 'spectrum') return spectrumLayout(figure);
  if (figure.type === 'stack') return stackLayout(figure);
  if (figure.type === 'comparison') return comparisonLayout(figure);
  if (figure.type === 'scorecard') return metricsLayout(figure);
  if (figure.type === 'profile') return figure.data.metrics?.length ? metricsLayout(figure) : sequenceLayout(figure, 'profile');
  if (figure.type === 'storyboard') return figure.data.columns?.length ? comparisonLayout(figure, 'storyboard') : sequenceLayout(figure, 'storyboard');
  if (figure.type === 'map') return figure.data.nodes?.length ? topologyLayout(figure) : itemGridLayout(figure);
  if (figure.data.metrics?.length) return metricsLayout(figure);
  if (figure.data.columns?.length) return comparisonLayout(figure);
  if (figure.data.stages?.length) return sequenceLayout(figure, 'flow');
  if (figure.data.nodes?.length) return topologyLayout(figure);
  return itemGridLayout(figure);
}

function createSvg(figure) {
  const layout = layoutFor(figure);
  const noteHeight = figure.data.note ? 105 : 0;
  const footerHeight = 80;
  const height = contentTop + layout.height + noteHeight + footerHeight;
  const titleLines = wrapText(figure.title, 62, 2);
  const takeawayLines = wrapText(figure.takeaway, 112, 3);
  const desc = figure.longDescription || figure.alt;
  const noteY = contentTop + layout.height + 28;
  const noteMarkup = figure.data.note ? `<g data-semantic="boundary-note"><rect x="${canvasMargin}" y="${noteY}" width="${contentWidth}" height="72" rx="14" fill="#fffbeb" stroke="#d97706"/><text x="${canvasMargin + 22}" y="${noteY + 27}" class="note-label">BOUNDARY</text>${textBlock(figure.data.note, canvasMargin + 112, noteY + 27, { width: 105, lineHeight: 19, className: 'note', maxLines: 2 })}</g>` : '';
  const footerY = height - 45;
  const sourceLabels = figure.sources.map((source) => source.label).join(' · ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${height}" role="img" aria-labelledby="title desc" focusable="false" data-figure-id="${escapeXml(figure.id)}" data-figure-type="${escapeXml(figure.type)}" data-layout="${escapeXml(layout.semantic)}">
  <title id="title">${escapeXml(figure.title)}</title>
  <desc id="desc">${escapeXml(desc)}</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7"/></marker>
    <linearGradient id="spectrum-gradient" x1="0" x2="1"><stop offset="0" stop-color="#0f766e"/><stop offset="0.5" stop-color="#7c3aed"/><stop offset="1" stop-color="#e11d48"/></linearGradient>
  </defs>
  <style>
    text { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #0f172a; }
    .eyebrow { font-size: 14px; font-weight: 700; letter-spacing: 1.8px; fill: #64748b; }
    .title { font-size: 34px; font-weight: 700; letter-spacing: -0.5px; }
    .takeaway { font-size: 18px; fill: #475569; }
    .card-title { font-size: 17px; font-weight: 700; }
    .body { font-size: 14px; fill: #334155; }
    .index { font-size: 12px; font-weight: 800; fill: #334155; }
    .gate { font-size: 12px; font-weight: 700; fill: #334155; }
    .metric-value { font-size: 22px; font-weight: 750; fill: #0f172a; }
    .matrix-head, .matrix-row { font-size: 12px; font-weight: 750; fill: #334155; }
    .matrix-cell { font-size: 12px; font-weight: 650; fill: #0f172a; }
    .matrix-detail, .matrix-empty { font-size: 11px; fill: #64748b; }
    .plane-group { font-size: 11px; font-weight: 750; letter-spacing: 0.8px; fill: #334155; }
    .edge-title { font-size: 12px; font-weight: 700; fill: #0f172a; }
    .loop-label { font-size: 14px; font-weight: 800; letter-spacing: 1.2px; fill: #0369a1; }
    .note-label { font-size: 12px; font-weight: 800; letter-spacing: 1.2px; fill: #92400e; }
    .note { font-size: 13px; fill: #78350f; }
    .footer { font-size: 12px; fill: #64748b; }
  </style>
  <rect width="${canvasWidth}" height="${height}" rx="28" fill="#ffffff"/>
  <rect x="1" y="1" width="${canvasWidth - 2}" height="${height - 2}" rx="27" fill="none" stroke="#cbd5e1" stroke-width="2"/>
  <text x="${canvasMargin}" y="54" class="eyebrow">${escapeXml(figure.category.toUpperCase())} · ${escapeXml(figure.type.toUpperCase())} · ${escapeXml(figure.evidenceStatus.replaceAll('-', ' ').toUpperCase())}</text>
  <text x="${canvasMargin}" y="96" class="title">${titleLines.map((line, index) => `<tspan x="${canvasMargin}" dy="${index ? 40 : 0}">${escapeXml(line)}</tspan>`).join('')}</text>
  ${textBlock(takeawayLines.join(' '), canvasMargin, titleLines.length > 1 ? 182 : 145, { width: 112, lineHeight: 24, className: 'takeaway', maxLines: 3 })}
  <g transform="translate(0 ${contentTop})">${layout.markup}</g>
  ${noteMarkup}
  <line x1="${canvasMargin}" y1="${footerY - 25}" x2="${canvasWidth - canvasMargin}" y2="${footerY - 25}" stroke="#e2e8f0"/>
  <text x="${canvasMargin}" y="${footerY}" class="footer">Reviewed ${escapeXml(figure.reviewedAt)} · ${escapeXml(sourceLabels)}</text>
</svg>\n`;
}

const { figureManifest } = await loadFigureManifestModule();
await mkdir(outputDirectory, { recursive: true });

for (const figure of figureManifest) {
  await writeFile(path.join(outputDirectory, `${figure.id}.svg`), createSvg(figure), 'utf8');
}

console.log(`Exported ${figureManifest.length} deterministic figure SVGs to ${outputDirectory}`);
