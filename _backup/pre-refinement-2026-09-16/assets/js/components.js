/* ==========================================================================
   components.js — reusable UI building blocks for internal pages.
   All visuals reuse the homepage language: white rounded-2xl cards,
   slate-50 section headers, teal accents, text-xs typography.
   ========================================================================== */
(function () {
    'use strict';

    const { t, tx, esc } = VQ;

    const CARD = 'bg-white rounded-2xl shadow-sm border border-slate-200';

    const BTN = {
        primary: 'inline-flex items-center justify-center gap-2 text-xs bg-vq-teal hover:bg-vq-teal-dark text-white font-medium px-4 py-2 rounded-xl transition',
        secondary: 'inline-flex items-center justify-center gap-2 text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium px-4 py-2 rounded-xl transition',
        soft: 'inline-flex items-center justify-center gap-2 text-xs bg-vq-teal/10 hover:bg-vq-teal/15 text-vq-teal font-medium px-3.5 py-2 rounded-xl transition',
        ruby: 'inline-flex items-center justify-center gap-2 text-xs bg-vq-ruby hover:bg-rose-900 text-white font-medium px-4 py-2 rounded-xl transition',
        icon: 'inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-vq-teal hover:bg-vq-teal/10 transition'
    };

    const arrow = (cls) => `<i class="fa-solid fa-arrow-left dir-icon ${cls || 'text-[10px]'}"></i>`;

    /* ---------- Page structure ---------- */

    function breadcrumb(crumbs) {
        const trail = [{ label: t('navHome'), href: VQ.href('home') }].concat(crumbs || []);
        return `<nav class="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400" aria-label="Breadcrumb">
            ${trail.map((c, i) => i < trail.length - 1
                ? `<a href="${c.href}" class="hover:text-vq-teal transition">${esc(c.label)}</a><i class="fa-solid fa-chevron-left dir-icon text-[8px] text-slate-300"></i>`
                : `<span class="text-vq-teal font-medium line-clamp-1">${esc(c.label)}</span>`).join('')}
        </nav>`;
    }

    function pageHeader({ icon, title, desc, crumbs, actions, badge }) {
        return `<div class="${CARD} vq-page-header relative overflow-hidden p-4 md:p-5">
            ${breadcrumb(crumbs)}
            <div class="relative z-[1] mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-start gap-3 min-w-0">
                    <span class="bg-vq-teal text-white w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"><i class="fa-solid ${icon}"></i></span>
                    <div class="min-w-0">
                        <h1 class="text-lg md:text-xl font-medium text-slate-800 leading-snug flex flex-wrap items-center gap-2">${title}${badge || ''}</h1>
                        ${desc ? `<p class="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">${desc}</p>` : ''}
                    </div>
                </div>
                ${actions ? `<div class="flex flex-wrap items-center gap-2 shrink-0">${actions}</div>` : ''}
            </div>
        </div>`;
    }

    function detailHeader({ crumbs, title, chips, meta, actions }) {
        return `<div class="${CARD} vq-page-header relative overflow-hidden p-4 md:p-6">
            ${breadcrumb(crumbs)}
            <div class="relative z-[1]">
                ${chips ? `<div class="mt-4 flex flex-wrap items-center gap-2">${chips}</div>` : ''}
                <h1 class="mt-2 text-xl md:text-2xl font-medium text-slate-800 leading-snug">${title}</h1>
                ${meta && meta.length ? `<div class="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
                    ${meta.map(m => `<span class="inline-flex items-center gap-1.5"><i class="${m.icon} text-vq-teal"></i>${m.text}</span>`).join('')}
                </div>` : ''}
                ${actions ? `<div class="mt-4 flex flex-wrap gap-2">${actions}</div>` : ''}
            </div>
        </div>`;
    }

    /* Key details shown inside a detail article (replaces a separate side panel) */
    function facts(rows) {
        return `<dl class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${rows.filter(r => r && r.value).map(r => `<div class="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 min-w-0">
                <span class="w-8 h-8 rounded-lg bg-white text-vq-teal flex items-center justify-center shrink-0 text-xs shadow-sm"><i class="fa-solid ${r.icon}"></i></span>
                <div class="min-w-0">
                    <dt class="text-[10px] text-slate-400">${r.label}</dt>
                    <dd class="text-xs font-medium text-slate-800 mt-0.5">${r.value}</dd>
                </div>
            </div>`).join('')}
        </dl>`;
    }

    /* Bottom row of every detail article: back navigation only */
    function articleFooter(label, href) {
        return `<div class="px-5 md:px-6 py-4 border-t border-slate-100">${backButton(label, href)}</div>`;
    }

    /* Section card with the homepage "slate-50" header strip */
    function sectionCard({ title, icon, body, link, linkLabel, extra, bodyClass, id }) {
        return `<div class="${CARD} overflow-hidden" ${id ? `id="${id}"` : ''}>
            <div class="p-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <h3 class="text-xs font-medium text-slate-800 flex items-center gap-1.5"><i class="fa-solid ${icon} text-vq-teal"></i> <span>${title}</span></h3>
                <div class="flex items-center gap-2">${extra || ''}${link ? `<a href="${link}" class="text-xs text-vq-teal hover:underline font-medium">${linkLabel || t('viewAll')}</a>` : ''}</div>
            </div>
            <div class="${bodyClass == null ? 'p-4' : bodyClass}">${body}</div>
        </div>`;
    }

    /* Plain heading between groups of cards */
    function groupTitle(title, icon, extra) {
        return `<div class="flex flex-wrap items-center justify-between gap-2 px-1">
            <h2 class="text-sm font-medium text-slate-800 flex items-center gap-2"><i class="fa-solid ${icon} text-vq-teal"></i>${title}</h2>
            ${extra || ''}
        </div>`;
    }

    /* ---------- Filters ---------- */

    function toolbar(rows) {
        return `<div class="${CARD} p-3 space-y-3">${rows.filter(Boolean).join('')}</div>`;
    }

    const row = (inner, cls) => `<div class="flex flex-col md:flex-row md:items-center gap-2 ${cls || ''}">${inner}</div>`;

    function searchInput({ id, value, placeholder }) {
        return `<div class="relative flex-1 min-w-0">
            <i class="fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 start-3 text-slate-400 text-xs pointer-events-none"></i>
            <input id="${id}" type="search" value="${esc(value)}" placeholder="${esc(placeholder)}" class="vq-input ps-9" autocomplete="off">
        </div>`;
    }

    function select({ id, value, options, label, cls }) {
        return `<label class="block ${cls || 'md:w-48'} shrink-0">
            <span class="sr-only">${label || ''}</span>
            <select id="${id}" class="vq-input vq-select">
                ${options.map(o => `<option value="${o.value}" ${String(o.value) === String(value) ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}
            </select>
        </label>`;
    }

    function dateField({ id, value, label }) {
        return `<label class="flex items-center gap-2 text-[11px] text-slate-500 shrink-0">
            <span class="shrink-0 w-6 md:w-auto">${label}</span>
            <input type="date" id="${id}" value="${value || ''}" class="vq-input md:w-40">
        </label>`;
    }

    function chips({ name, items, active }) {
        return `<div class="flex gap-1.5 overflow-x-auto no-scrollbar md:flex-wrap" role="group">
            ${items.map(i => `<button type="button" data-chip="${name}" data-value="${i.value}" class="vq-chip ${String(i.value) === String(active) ? 'is-active' : ''}">
                ${i.dot ? `<span class="w-2 h-2 rounded-full shrink-0" style="background:${i.dot}"></span>` : ''}
                ${i.icon ? `<i class="fa-solid ${i.icon} text-[10px]"></i>` : ''}
                <span>${esc(i.label)}</span>
                ${i.count != null ? `<span class="vq-chip-count">${i.count}</span>` : ''}
            </button>`).join('')}
        </div>`;
    }

    /* Segmented view switch (same as the homepage events list / calendar switch) */
    function segmented({ name, items, active }) {
        return `<div class="flex rounded-lg overflow-hidden border border-slate-200 shrink-0 self-start md:self-auto" role="group">
            ${items.map(i => {
                const on = i.value === active;
                return `<button type="button" data-chip="${name}" data-value="${i.value}" class="px-3 py-2 text-[11px] font-medium ${on ? 'bg-vq-teal text-white' : 'bg-white text-slate-600 hover:bg-slate-50'} transition" aria-pressed="${on}">
                    <i class="fa-solid ${i.icon}"></i><span class="ms-1.5">${i.label}</span></button>`;
            }).join('')}
        </div>`;
    }

    function resultsBar(count, extra) {
        return `<div class="flex flex-wrap items-center justify-between gap-2 px-1">
            <p class="text-[11px] text-slate-500">${t('resultsCount', { n: count })}</p>
            ${extra || ''}
        </div>`;
    }

    function emptyState(icon) {
        return `<div class="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <span class="mx-auto w-12 h-12 rounded-2xl bg-vq-teal/10 text-vq-teal flex items-center justify-center text-lg"><i class="fa-solid ${icon || 'fa-magnifying-glass'}"></i></span>
            <p class="mt-3 text-sm font-medium text-slate-700">${t('noResults')}</p>
            <p class="text-xs text-slate-500 mt-1">${t('noResultsHint')}</p>
        </div>`;
    }

    /* Shared pagination: Previous · 1 2 3 · Next (chevrons mirror in LTR) */
    function pagination(current, pages) {
        if (pages <= 1) return '';
        const btn = (n, label, disabled, active) => `<button type="button" data-page-num="${n}" ${disabled ? 'disabled' : ''}
            class="min-w-8 h-8 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition ${active ? 'bg-vq-teal text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-vq-teal hover:text-vq-teal'} disabled:opacity-40 disabled:pointer-events-none">${label}</button>`;
        let html = btn(current - 1, `<i class="fa-solid fa-chevron-right dir-icon text-[10px]"></i><span class="hidden sm:inline">${t('prev')}</span>`, current === 1);
        for (let i = 1; i <= pages; i++) html += btn(i, i, false, i === current);
        html += btn(current + 1, `<span class="hidden sm:inline">${t('next')}</span><i class="fa-solid fa-chevron-left dir-icon text-[10px]"></i>`, current === pages);
        return `<div class="flex items-center justify-center gap-1.5 pt-1">${html}</div>`;
    }

    /* Slice a list for the current page; clamps the page number in the given state */
    function paginate(items, state, size) {
        const pages = Math.max(1, Math.ceil(items.length / size));
        state.page = Math.min(Math.max(1, state.page || 1), pages);
        return { pages, slice: items.slice((state.page - 1) * size, state.page * size) };
    }

    /* ---------- Small elements ---------- */

    const TAG_COLORS = {
        teal: 'bg-vq-teal/10 text-vq-teal',
        amber: 'bg-vq-amber/10 text-vq-amber',
        ruby: 'bg-vq-ruby/10 text-vq-ruby',
        gold: 'bg-vq-gold/10 text-vq-gold',
        slate: 'bg-slate-100 text-slate-600',
        green: 'bg-emerald-50 text-emerald-700',
        white: 'bg-white/95 text-slate-700 shadow-sm',
        solidTeal: 'bg-vq-teal text-white',
        solidRuby: 'bg-vq-ruby text-white',
        solidAmber: 'bg-vq-amber text-white',
        solidDark: 'bg-slate-900/70 text-white'
    };

    function tag(label, color, icon) {
        return `<span class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-lg whitespace-nowrap ${TAG_COLORS[color || 'teal']}">${icon ? `<i class="fa-solid ${icon}"></i>` : ''}${label}</span>`;
    }

    function statusTag(st) {
        const map = { upcoming: ['amber', 'fa-hourglass-half'], ongoing: ['green', 'fa-circle-play'], past: ['slate', 'fa-circle-check'] };
        return tag(t(st), map[st][0], map[st][1]);
    }

    const sampleBadge = () => tag(t('sampleData'), 'amber', 'fa-flask');

    function infoList(rows) {
        return `<dl class="divide-y divide-slate-100">
            ${rows.filter(r => r && r.value).map(r => `<div class="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <span class="w-8 h-8 rounded-lg bg-vq-teal/10 text-vq-teal flex items-center justify-center shrink-0 text-xs"><i class="fa-solid ${r.icon}"></i></span>
                <div class="min-w-0">
                    <dt class="text-[10px] text-slate-400">${r.label}</dt>
                    <dd class="text-xs font-medium text-slate-800 mt-0.5 break-words">${r.value}</dd>
                </div>
            </div>`).join('')}
        </dl>`;
    }

    const paragraphs = list => (list || []).map(p => `<p>${esc(tx(p))}</p>`).join('');

    function backButton(label, href) {
        return `<a href="${href}" class="${BTN.secondary}"><i class="fa-solid fa-arrow-right dir-icon"></i>${label}</a>`;
    }

    /* Compact related item (thumbnail + title + meta) */
    function miniItem({ url, image, imageHTML, title, meta }) {
        return `<a href="${url}" class="flex items-center gap-3 p-3 hover:bg-slate-50 transition">
            ${imageHTML || VQ.img(image, 'w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100', 200)}
            <div class="min-w-0">
                <p class="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">${esc(title)}</p>
                <p class="text-[10px] text-slate-500 mt-0.5">${meta}</p>
            </div>
        </a>`;
    }

    /* Date block on images: teal strip like the homepage events list */
    function dateBadge(iso) {
        return `<div class="bg-white rounded-xl overflow-hidden text-center shadow-md w-12">
            <div class="text-base font-medium text-vq-teal leading-none pt-1.5 pb-1">${VQ.fmtDay(iso)}</div>
            <div class="bg-vq-teal text-white text-[9px] py-0.5">${VQ.fmtMonth(iso)}</div>
        </div>`;
    }

    /* ---------- Document viewer (static PDF preview) ---------- */

    /* View-only preview: file name, page count and zoom */
    function docViewer({ fileName, pages, content, height }) {
        return `<div class="doc-viewer">
            <div class="doc-toolbar" dir="ltr">
                <i class="fa-solid fa-bars opacity-80"></i>
                <span class="font-medium truncate min-w-0">${esc(fileName)}</span>
                <span class="hidden sm:inline-flex items-center gap-1.5 ms-auto shrink-0"><span class="doc-pill">1</span>/ ${pages || 1}</span>
                <span class="hidden sm:block w-px h-5 bg-white/20"></span>
                <span class="hidden sm:flex items-center gap-1 shrink-0">
                    <button type="button" class="doc-btn" data-doc-zoom="-1" aria-label="Zoom out"><i class="fa-solid fa-minus"></i></button>
                    <span class="doc-pill" data-doc-zoom-label>100%</span>
                    <button type="button" class="doc-btn" data-doc-zoom="1" aria-label="Zoom in"><i class="fa-solid fa-plus"></i></button>
                </span>
            </div>
            <div class="doc-stage" style="max-height:${height || '34rem'}">
                <div class="doc-page" data-doc-page>${content}</div>
            </div>
        </div>`;
    }

    /* Teal letterhead for document pages */
    function docLetterhead(title, subtitle) {
        return `<div class="bg-vq-teal text-white px-6 py-5 flex items-center justify-between gap-4">
            <img src="https://visitqatar.com/etc.clientlibs/visitqatar/clientlibs/clientlib-static/resources/img/vq-logo-white.svg" alt="Visit Qatar" class="h-9">
            <div class="text-end min-w-0">
                <p class="text-[10px] text-white/75">${subtitle || ''}</p>
                <p class="text-sm font-medium leading-snug">${title}</p>
            </div>
        </div>`;
    }

    /* Neutral placeholder body — used where real document text is not available */
    function docSkeleton(sections) {
        const widths = ['w-full', 'w-11/12', 'w-10/12', 'w-full', 'w-9/12', 'w-11/12', 'w-7/12'];
        let html = '';
        for (let s = 0; s < (sections || 4); s++) {
            html += `<div class="space-y-2">
                <div class="h-2.5 w-1/3 rounded-full bg-vq-teal/25"></div>
                ${widths.slice(0, 4 + (s % 3)).map(w => `<div class="skeleton-line ${w}"></div>`).join('')}
            </div>`;
        }
        return `<div class="p-6 sm:p-8 space-y-6">${html}</div>`;
    }

    function openDocument({ title, fileName, pages, content }) {
        const f = VQ.fileIcon(fileName);
        VQ.openModal({
            title: esc(title),
            icon: f.icon,
            size: 'max-w-4xl',
            body: `<div class="p-3 sm:p-4 bg-slate-100">${docViewer({ fileName, pages, content, height: '70vh' })}</div>`,
            footer: `<button type="button" class="${BTN.secondary}" data-modal-close>${t('close')}</button>`
        });
    }

    /* ---------- Video player mock ---------- */

    function videoPlayer({ poster, title, length }) {
        return `<div class="video-mock group" data-video data-length="${length || '05:00'}">
            ${VQ.img(poster, 'absolute inset-0 w-full h-full object-cover', 1200)}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
            <button type="button" data-video-play class="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 text-vq-teal text-xl flex items-center justify-center shadow-xl hover:scale-105 transition" aria-label="Play">
                <i class="fa-solid fa-play" style="margin-left:4px"></i>
            </button>
            <div class="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                <p class="text-xs sm:text-sm font-medium mb-2 truncate">${esc(title)}</p>
                <div class="flex items-center gap-3 text-[10px]" dir="ltr">
                    <button type="button" data-video-toggle class="w-5 text-start" aria-label="Play / pause"><i class="fa-solid fa-play" data-video-icon></i></button>
                    <div class="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"><div class="h-full bg-vq-amber" style="width:0" data-video-bar></div></div>
                    <span data-video-time class="tabular-nums">00:00 / ${length || '05:00'}</span>
                    <i class="fa-solid fa-closed-captioning opacity-80"></i>
                    <i class="fa-solid fa-volume-high opacity-80"></i>
                    <i class="fa-solid fa-expand opacity-80"></i>
                </div>
            </div>
        </div>`;
    }

    /* ---------- Map placeholder (stands in for the Power BI geographic view) ---------- */

    function mapPanel({ points, compact }) {
        return `<div class="map-canvas ${compact ? 'min-h-[14rem]' : 'md:min-h-[26rem]'}" dir="ltr">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                    <pattern id="mapDots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#00626C" opacity="0.16"/></pattern>
                </defs>
                <rect width="800" height="450" fill="#d7e9eb"/>
                <rect width="800" height="450" fill="url(#mapDots)"/>
                <path d="M0 0 H500 C455 70 420 130 452 205 C485 280 530 310 492 372 C470 408 490 430 515 450 H0 Z" fill="#f6f2e7" stroke="#bcd8dc" stroke-width="4"/>
                <path d="M40 90 C150 140 270 150 410 215 M20 300 C150 285 290 305 470 340 M210 0 C220 130 235 270 190 450 M330 0 C320 110 350 190 330 450" stroke="#e8dfc6" stroke-width="7" fill="none" stroke-linecap="round"/>
                <path d="M40 90 C150 140 270 150 410 215 M20 300 C150 285 290 305 470 340" stroke="#ffffff" stroke-width="2" fill="none" stroke-dasharray="10 8" stroke-linecap="round"/>
                <text x="655" y="235" fill="#00626C" opacity="0.4" font-size="18" font-family="Tahoma" text-anchor="middle" letter-spacing="3">${t('mapSea')}</text>
            </svg>
            ${points.map(p => `<a href="${p.url}" class="map-pin group" style="left:${p.x}%;top:${p.y}%" title="${esc(p.label)}">
                <span class="map-pin-dot" style="background:${p.color}"><i class="fa-solid ${p.icon}"></i></span>
                <span class="map-pin-pulse"></span>
                <span class="absolute top-full mt-2 whitespace-nowrap bg-white text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md shadow ${compact ? '' : 'opacity-0 group-hover:opacity-100'} transition">${esc(p.label)}</span>
            </a>`).join('')}
            <div class="absolute top-3 left-3 bg-white/95 rounded-xl shadow-sm px-3 py-2 text-[10px] text-slate-600 flex items-center gap-2">
                <i class="fa-solid fa-chart-simple text-vq-amber"></i><span>Power BI · <span dir="auto">${t('evMapNote')}</span></span>
            </div>
            <div class="absolute top-3 right-3 flex flex-col rounded-xl overflow-hidden shadow-sm bg-white text-slate-600 text-xs">
                <span class="w-8 h-8 flex items-center justify-center border-b border-slate-100"><i class="fa-solid fa-plus"></i></span>
                <span class="w-8 h-8 flex items-center justify-center"><i class="fa-solid fa-minus"></i></span>
            </div>
        </div>`;
    }

    /* ---------- Shared cards ---------- */

    function avatar(person, size) {
        const sz = size || 'w-12 h-12 text-base';
        if (person.photo) return VQ.img(person.photo, `${sz} rounded-xl object-cover shrink-0`, 200);
        const palette = ['#00626C', '#8A1538', '#D76800', '#522D6E', '#01A786', '#A18B29'];
        const name = tx(person.name);
        const initials = VQ.isAr() ? name.trim().charAt(0) : name.split(/\s+/).map(w => w.charAt(0)).slice(0, 2).join('');
        const color = palette[(person.id || name).split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length];
        return `<span class="${sz} rounded-xl shrink-0 flex items-center justify-center text-white font-medium" style="background:${color}">${esc(initials)}</span>`;
    }

    window.VQ.ui = {
        CARD, BTN, arrow,
        breadcrumb, pageHeader, detailHeader, facts, articleFooter, sectionCard, groupTitle,
        toolbar, row, searchInput, select, dateField, chips, segmented, resultsBar, emptyState, pagination, paginate,
        tag, statusTag, sampleBadge, infoList, paragraphs, backButton, miniItem, dateBadge,
        docViewer, docLetterhead, docSkeleton, openDocument, videoPlayer, mapPanel, avatar
    };
})();
