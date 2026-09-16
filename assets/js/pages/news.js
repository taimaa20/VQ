/* News listing — BRD 8.4 (with pagination) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', category: 'all', page: 1 };
    const PAGE_SIZE = 4;

    const catOf = key => D.newsCategories.find(c => c.key === key);

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.news
            .filter(n => s.category === 'all' || n.category === s.category)
            .filter(n => !q || (n.title.ar + ' ' + n.title.en).toLowerCase().includes(q))
            .sort((a, b) => b.date.localeCompare(a.date));
    }

    /* Same overlay style as the homepage news slider */
    function feature(n) {
        return `<a href="${VQ.href('news-details', { id: n.id })}" class="group relative block h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-800">
            ${VQ.img(n.image, 'absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105', 1400)}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"></div>
            <span class="absolute top-4 start-4">${ui.tag(t('nwFeatured'), 'solidAmber', 'fa-star')}</span>
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-[10px] bg-vq-teal text-white px-2 py-0.5 rounded-full">${tx(catOf(n.category).label)}</span>
                    <span class="text-[11px] text-white/80">${VQ.fmtDate(n.date)}</span>
                </div>
                <h2 class="text-lg md:text-2xl font-medium leading-snug max-w-2xl">${esc(tx(n.title))}</h2>
                <p class="text-xs text-white/80 mt-2 max-w-xl line-clamp-2">${esc(tx(n.summary))}</p>
            </div>
        </a>`;
    }

    function card(n) {
        return `<a href="${VQ.href('news-details', { id: n.id })}" class="group ${ui.CARD} overflow-hidden hover:shadow-md transition flex flex-col sm:flex-row">
            <div class="relative sm:w-44 h-44 sm:h-auto shrink-0 bg-slate-200 overflow-hidden">
                ${VQ.img(n.image, 'absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105', 600)}
            </div>
            <div class="p-4 flex-1 flex flex-col gap-2 min-w-0">
                <div class="flex items-center gap-2">
                    ${ui.tag(tx(catOf(n.category).label), 'teal')}
                    <span class="text-[10px] text-slate-400">${VQ.fmtDate(n.date)}</span>
                </div>
                <h3 class="text-sm font-medium text-slate-800 leading-snug line-clamp-2">${esc(tx(n.title))}</h3>
                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(n.summary))}</p>
                <span class="mt-auto text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('nwReadMore')} ${ui.arrow()}</span>
            </div>
        </a>`;
    }

    VQ.boot({
        title: () => t('nwTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-newspaper', title: t('nwTitle'), desc: t('nwDesc'), crumbs: [{ label: t('navNews') }] }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'nwQ', value: s.q, placeholder: t('nwSearch') })),
                    ui.chips({ name: 'category', active: s.category, items: [{ value: 'all', label: t('all') }]
                        .concat(D.newsCategories.map(c => ({ value: c.key, label: tx(c.label) }))) })
                ]) +
                `<div id="results" class="space-y-4"></div>`
            );
            this.update();
        },

        update() {
            let items = filtered();
            const box = VQ.$('#results');
            if (!items.length) { box.innerHTML = ui.resultsBar(0) + ui.emptyState('fa-newspaper'); return; }

            let html = '';
            if (!s.q && s.category === 'all' && s.page === 1) {
                html += feature(items[0]);
            }
            const rest = (!s.q && s.category === 'all') ? items.slice(1) : items;
            const pages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
            s.page = Math.min(s.page, pages);
            const slice = rest.slice((s.page - 1) * PAGE_SIZE, s.page * PAGE_SIZE);

            html += ui.groupTitle(t('nwLatest'), 'fa-newspaper', `<span class="text-[11px] text-slate-500">${t('resultsCount', { n: items.length })}</span>`) +
                `<div class="grid grid-cols-1 gap-4">${slice.map(card).join('')}</div>` +
                ui.pagination(s.page, pages);
            box.innerHTML = html;
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'nwQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s[chip.dataset.chip] = chip.dataset.value; s.page = 1; this.render(); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) {
                    s.page = Number(pg.dataset.pageNum);
                    this.update();
                    VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
})();
