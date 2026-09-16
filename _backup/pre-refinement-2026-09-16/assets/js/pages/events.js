/* Events & Calendars listing — BRD 7.3 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', category: 'all', from: '', to: '', view: 'grid', page: 1 };
    const PAGE_SIZE = 4;

    const catOf = key => D.eventCategories.find(c => c.key === key);
    const hasFilters = () => s.q || s.category !== 'all' || s.from || s.to;

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.events
            .filter(e => s.category === 'all' || e.category === s.category)
            .filter(e => !s.from || e.end >= s.from)
            .filter(e => !s.to || e.start <= s.to)
            .filter(e => !q || (e.title.ar + ' ' + e.title.en + ' ' + e.number + ' ' + e.location.ar + ' ' + e.location.en).toLowerCase().includes(q))
            .sort((a, b) => b.start.localeCompare(a.start));
    }

    function card(e) {
        const cat = catOf(e.category);
        return `<a href="${VQ.href('event-details', { id: e.id })}" class="group ${ui.CARD} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col">
            <div class="relative h-44 bg-slate-200 overflow-hidden">
                ${VQ.img(e.image, 'w-full h-full object-cover transition duration-500 group-hover:scale-105', 700)}
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                <div class="absolute top-3 start-3">${ui.dateBadge(e.start)}</div>
                <div class="absolute top-3 end-3">${ui.statusTag(VQ.status(e.start, e.end))}</div>
            </div>
            <div class="p-4 flex-1 flex flex-col gap-2">
                <span class="self-start">${ui.tag(tx(cat.label), 'teal', cat.icon)}</span>
                <h3 class="text-sm font-medium text-slate-800 leading-snug line-clamp-2">${esc(tx(e.title))}</h3>
                <p class="text-[11px] text-slate-500 flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-vq-ruby"></i>${esc(tx(e.location))}</p>
                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(e.summary))}</p>
                <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[10px] text-slate-400"><span dir="ltr">${e.number}</span></span>
                    <span class="text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('viewDetails')} ${ui.arrow()}</span>
                </div>
            </div>
        </a>`;
    }

    /* Same overlay style as the News top story */
    function featured(e) {
        const cat = catOf(e.category);
        return `<a href="${VQ.href('event-details', { id: e.id })}" class="group relative block h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-800">
            ${VQ.img(e.image, 'absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105', 1200)}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"></div>
            <span class="absolute top-4 start-4">${ui.tag(t('evNext'), 'solidAmber', 'fa-star')}</span>
            <div class="absolute top-4 end-4">${ui.dateBadge(e.start)}</div>
            <div class="absolute inset-x-0 bottom-0 p-5 text-white">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="text-[10px] bg-vq-teal text-white px-2 py-0.5 rounded-full">${tx(cat.label)}</span>
                    <span class="text-[11px] text-white/80"><i class="fa-solid fa-location-dot me-1"></i>${esc(tx(e.location))}</span>
                    <span class="text-[11px] text-amber-300"><i class="fa-solid fa-hourglass-half me-1"></i>${t('daysLeft', { n: VQ.daysUntil(e.start) })}</span>
                </div>
                <h2 class="text-lg md:text-xl font-medium leading-snug">${esc(tx(e.title))}</h2>
                <p class="text-xs text-white/80 mt-1.5 line-clamp-2">${esc(tx(e.summary))}</p>
            </div>
        </a>`;
    }

    /* Map placeholder only — the event cards already list the details */
    function mapView(items) {
        const points = items.map(e => {
            const cat = catOf(e.category);
            return { x: e.map.x, y: e.map.y, color: cat.color, icon: cat.icon, label: tx(e.title), url: VQ.href('event-details', { id: e.id }) };
        });
        const legend = D.eventCategories.map(c => `<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full" style="background:${c.color}"></span>${tx(c.label)}</span>`).join('');
        return ui.sectionCard({
            title: t('evMapTitle'), icon: 'fa-map-location-dot', bodyClass: 'p-3',
            body: ui.mapPanel({ points }) + `<div class="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-500 pt-3 px-1">${legend}</div>`
        });
    }

    VQ.boot({
        title: () => t('evTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-calendar-days', title: t('evTitle'), desc: t('evDesc'), crumbs: [{ label: t('navEvents') }] }) +
                ui.toolbar([
                    ui.row(
                        ui.searchInput({ id: 'evQ', value: s.q, placeholder: t('evSearch') }) +
                        ui.select({ id: 'evCat', value: s.category, label: t('category'), options: [{ value: 'all', label: t('evAllCategories') }]
                            .concat(D.eventCategories.map(c => ({ value: c.key, label: tx(c.label) }))) })
                    ),
                    ui.row(
                        `<div class="flex flex-col sm:flex-row gap-2 flex-1">${ui.dateField({ id: 'evFrom', value: s.from, label: t('from') })}${ui.dateField({ id: 'evTo', value: s.to, label: t('to') })}</div>` +
                        ui.segmented({ name: 'view', active: s.view, items: [
                            { value: 'grid', icon: 'fa-grip', label: t('gridView') },
                            { value: 'map', icon: 'fa-map-location-dot', label: t('mapView') }
                        ] })
                    )
                ]) +
                `<div id="results" class="space-y-4"></div>`
            );
            this.update();
        },

        update() {
            let items = filtered();
            const box = VQ.$('#results');
            if (!items.length) { box.innerHTML = ui.resultsBar(0) + ui.emptyState('fa-calendar-xmark'); return; }

            if (s.view === 'map') {
                box.innerHTML = ui.resultsBar(items.length) + mapView(items);
                return;
            }

            let html = '';
            const next = !hasFilters() && D.events.filter(e => VQ.daysUntil(e.start) > 0).sort((a, b) => a.start.localeCompare(b.start))[0];
            if (next) {
                if (s.page === 1) html += featured(next);
                items = items.filter(e => e.id !== next.id);
            }

            const { slice, pages } = ui.paginate(items, s, PAGE_SIZE);
            html += ui.groupTitle(t('evAll'), 'fa-calendar-days', `<span class="text-[11px] text-slate-500">${t('resultsCount', { n: filtered().length })}</span>`) +
                `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${slice.map(card).join('')}</div>` +
                ui.pagination(s.page, pages);
            box.innerHTML = html;
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'evQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('change', e => {
                const map = { evCat: 'category', evFrom: 'from', evTo: 'to' };
                if (map[e.target.id]) { s[map[e.target.id]] = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s[chip.dataset.chip] = chip.dataset.value; this.render(); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        }
    });
})();
