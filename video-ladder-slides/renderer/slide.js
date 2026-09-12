/* Renders one slide of a journey, at one build, as the site variant or the video variant. */
(function () {
  const ICON_ALIAS = {
    warning: 'triangle-alert', chart: 'trending-up', skip: 'skip-forward', loop: 'refresh-cw',
    document: 'file-text', person: 'user', tool: 'wrench', money: 'coins', branch: 'git-branch',
    shield: 'shield-check', book: 'book-open', bank: 'landmark', arrow: 'arrow-right', chip: 'cpu',
  };

  const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Accent words sit in *asterisks*. Short hyphenated words never break across lines.
  // The outer span stops flex containers from dropping the space before a wrapped word.
  const rich = (s) => `<span>${esc(s)
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/[A-Za-z0-9']+(?:-[A-Za-z0-9']+)+/g, (w) => (w.length <= 14 ? `<span class="nw">${w}</span>` : w))}</span>`;

  function icon(name) {
    const icons = window.ICONS || {};
    const nodes = icons[ICON_ALIAS[name] || name] || icons.circle || [];
    const inner = nodes.map(([tag, attrs]) => {
      const a = Object.entries(attrs).filter(([k]) => k !== 'key').map(([k, v]) => `${k}="${esc(v)}"`).join(' ');
      return `<${tag} ${a}/>`;
    }).join('');
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  }

  // Builds accumulate: each build states only what changes from the build before.
  function stateAt(slide, buildIndex, variant) {
    const builds = slide.builds && slide.builds.length ? slide.builds : [{}];
    const last = variant === 'site' ? builds.length - 1 : Math.min(buildIndex, builds.length - 1);
    const st = { build: last, total: builds.length };
    for (let i = 0; i <= last; i += 1) {
      for (const [k, v] of Object.entries(builds[i])) if (k !== 'narration') st[k] = v;
    }
    // The site shows the whole slide: everything revealed, and a focus only if it holds in every build.
    if (variant === 'site') {
      const foci = new Set(builds.map((b) => JSON.stringify(b.focus ?? null)));
      if (foci.size > 1) delete st.focus;
      delete st.reveal;
    }
    return st;
  }

  const vis = (i, st) => (st.reveal === undefined || i < st.reveal ? 'visible' : 'hidden');
  const foc = (i, st) => (!st.focus ? '' : st.focus.includes(i) ? 'on' : 'off');
  const textShown = (s, st) => Boolean(s.text) && (st.total === 1 || st.build >= 1);
  const topTitle = (s) => `<h1 class="title">${rich(s.title)}</h1>`;
  const sizeFor = (n, sizes) => sizes[Math.max(0, Math.min(n, sizes.length) - 1)];

  function motif(m) {
    if (!m) return '';
    if (m.kind === 'ladder') {
      const all = m.index === undefined || m.index < 0;
      const tints = ['#ffe9e0', '#ffc9b6', '#f04a2a'];
      const rungs = [0, 1, 2].map((i) => {
        const y = 330 - i * 130;
        const fill = all ? tints[i] : m.index === i ? '#f04a2a' : '#efebe4';
        const ink = fill === '#f04a2a' ? '#ffffff' : all ? '#b02c10' : '#9a948a';
        return `<rect x="74" y="${y}" width="252" height="62" rx="14" fill="${fill}"/>`
          + `<text x="200" y="${y + 44}" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="38" font-weight="600" fill="${ink}">${i + 1}</text>`;
      }).join('');
      return `<svg class="motif" viewBox="0 0 400 440" width="400" height="440">`
        + '<rect x="56" y="12" width="18" height="416" rx="9" fill="#0f172a"/><rect x="326" y="12" width="18" height="416" rx="9" fill="#0f172a"/>'
        + `${rungs}</svg>`;
    }
    if (m.kind === 'branch') {
      const ys = [40, 130, 220, 310, 400];
      const paths = ys.map((y, i) => `<path d="M86 220 C 200 220, 200 ${y}, 312 ${y}" fill="none" stroke="${m.index === i ? '#f04a2a' : '#ddd8cf'}" stroke-width="${m.index === i ? 9 : 7}" stroke-linecap="round"/>`).join('');
      const dots = ys.map((y, i) => `<circle cx="340" cy="${y}" r="${m.index === i ? 30 : 22}" fill="${m.index === i ? '#f04a2a' : '#e6e2da'}"/>`).join('');
      return `<svg class="motif" viewBox="0 0 400 440" width="400" height="440">${paths}<circle cx="60" cy="220" r="34" fill="#0f172a"/>${dots}</svg>`;
    }
    return '';
  }

  // A picture beside the words on statement and list slides. A slide still waiting for its picture shows the brief.
  function sidePicture(s, ctx, cls) {
    if (s.image) return `<figure class="${cls} card"><img src="${esc(ctx.base + s.image)}" alt=""></figure>`;
    if (s.needsPicture) return `<figure class="${cls} card"><div class="ph"><span>Picture to come</span><p>${esc(s.picture || '')}</p></div></figure>`;
    return '';
  }

  const L = {
    title(s, st, ctx) {
      return `${motif(ctx.motif)}<div class="L-title"><h1 class="hero">${rich(s.title)}</h1>`
        + `${s.text ? `<p class="lede">${rich(s.text)}</p>` : ''}</div>`;
    },

    statement(s, st, ctx) {
      const pic = sidePicture(s, ctx, 'spic');
      return `<div class="L-statement${pic ? ' with-pic' : ''}"><div class="stext"><h1 class="big">${rich(s.title)}</h1>`
        + `${s.text ? `<p class="lede" style="visibility:${textShown(s, st) ? 'visible' : 'hidden'}">${rich(s.text)}</p>` : ''}</div>`
        + `${pic || (s.icon ? `<div class="disc">${icon(s.icon)}</div>` : '')}</div>`;
    },

    rule(s, st) {
      return `<div class="L-rule"><div class="rk">${esc(s.kicker || 'The rule')}</div><h1 class="big">${rich(s.title)}</h1>`
        + `${s.text ? `<p class="lede" style="visibility:${textShown(s, st) ? 'visible' : 'hidden'}">${rich(s.text)}</p>` : ''}</div>`;
    },

    picture(s, st, ctx) {
      const items = s.items || [];
      const img = s.image
        ? `<img src="${esc(ctx.base + s.image)}" alt="">`
        : `<div class="ph"><span>Picture to come</span><p>${esc(s.picture || '')}</p></div>`;
      const pins = (s.pins || []).map((p, i) => `<span class="pin" style="left:${p[0]}%;top:${p[1]}%;visibility:${vis(i, st)}">${i + 1}</span>`).join('');
      const labels = items.map((t, i) => `<li style="visibility:${vis(i, st)}"><span class="n">${i + 1}</span><span>${rich(t)}</span></li>`).join('');
      const stageW = ctx.variant === 'video' ? 1380 : 1680;
      const stageH = ctx.stageH || (ctx.variant === 'video' ? 530 : 640);
      const aspect = s.aspect || 1.6;
      const picW = Math.round(Math.min(stageW - 400, stageH * aspect));
      return `${topTitle(s)}<div class="stage L-picture"><figure class="pic card" style="width:${picW}px;aspect-ratio:${aspect}">${img}${pins}</figure><ol class="labels">${labels}</ol></div>`;
    },

    tiles(s, st, ctx) {
      const items = s.items || [];
      const per = s.groups ? Math.max(...s.groups.map((g) => g.items.length)) : Math.min(4, items.length);
      // Fewer tiles get bigger type and taller cards.
      const font = sizeFor(per, ctx.variant === 'video' ? [38, 38, 36, 31, 27] : [44, 44, 40, 36, 32]);
      const height = per <= 3 ? 230 : per === 4 ? 200 : 170;
      const tile = (i) => `<div class="tile card ${foc(i, st)}" style="visibility:${vis(i, st)}"><span class="k">${String(i + 1).padStart(2, '0')}</span><span class="l">${rich(items[i])}</span></div>`;
      let rows = '';
      if (s.groups) {
        rows = s.groups.map((g) => {
          const on = st.focus && g.items.some((i) => st.focus.includes(i));
          return `<div class="group ${st.focus ? (on ? 'on' : 'dim') : ''}"><div class="glabel">${rich(g.label)}</div><div class="row">${g.items.map(tile).join('')}</div></div>`;
        }).join('');
      } else {
        for (let r = 0; r < items.length; r += per) {
          rows += `<div class="row">${items.slice(r, r + per).map((_, j) => tile(r + j)).join('')}</div>`;
        }
      }
      return `${topTitle(s)}<div class="stage L-tiles" style="--per:${per};--tile-font:${font}px;--tile-h:${height}px">${rows}</div>`;
    },

    steps(s, st, ctx) {
      const items = s.items || [];
      if (s.style === 'ladder') {
        const rungs = items.map((_, i) => i).reverse()
          .map((i) => `<div class="rung card ${foc(i, st)}" style="visibility:${vis(i, st)}"><span class="num">${i + 1}</span><span class="l">${rich(items[i])}</span></div>`).join('');
        const text = s.text ? `<div class="prow"><div class="pk">${esc(s.textLabel || 'What it changes')}</div><div class="pv">${rich(s.text)}</div></div>` : '';
        const gate = s.gate ? `<div class="prow gate card" style="visibility:${st.showGate ? 'visible' : 'hidden'}"><div class="pk">Move on when</div><div class="pv">${rich(s.gate)}</div></div>` : '';
        return `${topTitle(s)}<div class="stage L-ladder"><div class="rungs">${rungs}</div>${text || gate ? `<div class="panel">${text}${gate}</div>` : ''}</div>`;
      }
      const size = sizeFor(items.length, ctx.variant === 'video' ? [44, 44, 40, 32, 26] : [48, 48, 44, 38, 33]);
      const cells = items.map((t, i) => `${i ? `<div class="chev" style="visibility:${vis(i, st)}">${icon('chevron-right')}</div>` : ''}`
        + `<div class="step card ${foc(i, st)}" style="visibility:${vis(i, st)}"><span class="num">${i + 1}</span><span class="l" style="font-size:${size}px">${rich(t)}</span></div>`).join('');
      return `${topTitle(s)}<div class="stage L-steps"><div class="srow">${cells}</div>${s.text ? `<p class="lede">${rich(s.text)}</p>` : ''}</div>`;
    },

    flow(s, st, ctx) {
      const items = s.items || [];
      const size = sizeFor(items.length, ctx.variant === 'video' ? [46, 44, 40, 32, 26] : [50, 48, 44, 38, 33]);
      const cells = items.map((t, i) => `${i ? `<div class="arrow" style="visibility:${vis(i, st)}">${icon('arrow-right')}</div>` : ''}`
        + `<div class="box card ${foc(i, st)}" style="font-size:${size}px;visibility:${vis(i, st)}">${rich(t)}</div>`).join('');
      return `${topTitle(s)}<div class="stage L-flow"><div class="frow">${cells}</div>${s.text ? `<p class="lede">${rich(s.text)}</p>` : ''}</div>`;
    },

    cycle(s, st, ctx) {
      const items = s.items || [];
      const n = items.length;
      const W = ctx.variant === 'video' ? 1380 : 1680;
      const H = ctx.stageH || (ctx.variant === 'video' ? 530 : 640);
      const nw = ctx.variant === 'video' ? 360 : 400;
      const nh = ctx.variant === 'video' ? 136 : 150;
      const cx = W / 2;
      const cy = H / 2;
      const rx = W / 2 - nw / 2 - 20;
      const ry = H / 2 - nh / 2 - 10;
      const at = (k) => -Math.PI / 2 + (2 * Math.PI * k) / n;
      const marks = items.map((_, k) => {
        const a = at(k + 0.5);
        const deg = (Math.atan2(ry * Math.cos(a), -rx * Math.sin(a)) * 180) / Math.PI;
        const target = (k + 1) % n;
        const shown = target === 0 ? vis(n - 1, st) : vis(target, st);
        return `<g transform="translate(${cx + rx * Math.cos(a)} ${cy + ry * Math.sin(a)}) rotate(${deg})" style="visibility:${shown}">`
          + '<path d="M-18 -22 L13 0 L-18 22" fill="none" stroke="#f04a2a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>';
      }).join('');
      const nodes = items.map((t, k) => `<div class="node card ${foc(k, st)}" style="left:${cx + rx * Math.cos(at(k)) - nw / 2}px;top:${cy + ry * Math.sin(at(k)) - nh / 2}px;width:${nw}px;height:${nh}px;visibility:${vis(k, st)}">${rich(t)}</div>`).join('');
      return `${topTitle(s)}<div class="stage L-cycle"><svg class="ring" width="${W}" height="${H}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#e2ddd3" stroke-width="6"/>${marks}</svg>${nodes}</div>`;
    },

    compare(s, st) {
      const col = (c, side) => `<div class="col card ${side}"><div class="chead">${rich(c.head)}</div>`
        + `${(c.rows || []).map((r, i) => `<div class="crow" style="visibility:${vis(i, st)}">${rich(r)}</div>`).join('')}</div>`;
      return `${topTitle(s)}<div class="stage L-compare">${col(s.left || {}, 'left')}${col(s.right || {}, 'right')}</div>`;
    },

    list(s, st, ctx) {
      const marks = s.marks || [];
      const rows = (s.items || []).map((t, i) => {
        const m = marks[i];
        const badge = m === 'check' ? icon('check') : m === 'cross' ? icon('x') : String(i + 1);
        return `<li class="${foc(i, st)} ${m || ''}" style="visibility:${vis(i, st)}"><span class="n">${badge}</span><span class="t">${rich(t)}</span></li>`;
      }).join('');
      const pic = sidePicture(s, ctx, 'lpic');
      return `${topTitle(s)}<div class="stage L-list${pic ? ' with-pic' : ''}"><ol>${rows}</ol>${pic}</div>`;
    },

    number(s) {
      return `${topTitle(s)}<div class="stage L-number"><div class="value">${esc(s.value)}</div>`
        + `<div class="unit">${rich(s.unit || '')}</div>${s.text ? `<p class="lede">${rich(s.text)}</p>` : ''}</div>`;
    },

    branch(s, st) {
      const pairs = s.pairs || (s.items && s.items.length === 2 ? [s.items] : []);
      const rows = pairs.map(([a, b], i) => `<div class="brow" style="visibility:${vis(i, st)}"><div class="sym card">${rich(a)}</div>`
        + `<div class="barrow">${icon('arrow-right')}</div><div class="opt">${rich(b)}</div></div>`).join('');
      return `${topTitle(s)}<div class="stage L-branch ${pairs.length === 1 ? 'single' : ''}">`
        + `<div class="bhead"><span>What is failing</span><span>Where to go</span></div>${rows}</div>`;
    },
  };

  const WATCH = ['stage', 'tile', 'rung', 'step', 'box', 'node', 'col', 'crow', 'sym', 'opt', 'caption', 'pv', 'L-statement', 'L-rule', 'L-title', 'labels'];

  function describe(el) {
    return `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${el.textContent.trim().slice(0, 48)}"`;
  }

  // Layout checks: text that spills out of its box, anything off canvas, anything under the presenter.
  function checks(root, variant) {
    const out = [];
    for (const el of root.querySelectorAll('.slide *')) {
      if (el.closest('.bubble, .zone, .mark')) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.right > 1921 || r.bottom > 1081 || r.left < -1 || r.top < -1) out.push(`off canvas: ${describe(el)}`);
      if (variant === 'video' && r.right > 1520 && r.bottom > 690) out.push(`under the presenter: ${describe(el)}`);
      if (WATCH.some((c) => el.classList.contains(c))) {
        if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) out.push(`text spills: ${describe(el)}`);
      }
    }
    return [...new Set(out)];
  }

  window.show = async function show(p) {
    const { slide, variant } = p;
    const st = stateAt(slide, p.build ?? 0, variant);
    const ctx = { variant, base: p.base || '', motif: p.motif || null };
    const eyebrow = slide.layout === 'title' ? (slide.eyebrow || 'Agentic Architecture Skills') : p.eyebrow;
    const head = `<div class="eyebrow">${esc(eyebrow)}</div>${slide.source ? `<div class="source">Source: ${esc(slide.source)}</div>` : ''}`;
    let extra = '';
    if (variant === 'video') {
      if (p.caption) extra += `<div class="caption ${p.caption.length > 118 ? 'long' : ''}"><span>${esc(p.caption)}</span></div>`;
      if (p.mockBubble) extra += `<div class="bubble"><img src="${esc(p.mockBubble)}" alt=""></div>`;
      if (p.showZone) extra += '<div class="zone"></div>';
    }
    const root = document.getElementById('root');
    const paint = () => {
      const body = (L[slide.layout] || L.statement)(slide, st, ctx);
      root.innerHTML = `<div class="slide v-${variant} layout-${slide.layout}">${head}${body}${extra}</div>`;
    };
    paint();
    await document.fonts.ready;
    // The stage starts a fixed gap below the title, however many lines the title takes.
    const title = root.querySelector('.title');
    if (title && root.querySelector('.stage')) {
      // film frames leave room at the bottom for the captions the video tool burns in
      const limit = variant === 'video' ? 870 : variant === 'film' ? 880 : 980;
      const top = Math.max(300, Math.round(title.getBoundingClientRect().bottom + 64));
      ctx.stageH = limit - top;
      paint();
      await document.fonts.ready;
      const stage = root.querySelector('.stage');
      stage.style.top = `${top}px`;
      stage.style.height = `${limit - top}px`;
    }
    await Promise.all([...root.querySelectorAll('img')].map((img) => img.decode().catch(() => null)));
    // Style frames only: a sample highlight around one element, in the proposed marking colour.
    if (variant === 'video' && p.mark) {
      const target = root.querySelector(p.mark);
      if (target) {
        const b = target.getBoundingClientRect();
        const mark = document.createElement('div');
        mark.className = 'mark';
        Object.assign(mark.style, { left: `${b.left - 10}px`, top: `${b.top - 10}px`, width: `${b.width + 20}px`, height: `${b.height + 20}px` });
        root.querySelector('.slide').appendChild(mark);
      }
    }
    return checks(root, variant);
  };
}());
