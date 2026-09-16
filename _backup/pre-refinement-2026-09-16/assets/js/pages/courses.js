/* Training courses listing — BRD 7.7 & 8.12 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', type: 'all', page: 1 };
    const PAGE_SIZE = 6;

    const typeOf = key => D.courseTypes.find(c => c.key === key);

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.courses
            .filter(c => s.type === 'all' || c.type === s.type)
            .filter(c => !q || (c.title.ar + ' ' + c.title.en).toLowerCase().includes(q))
            .sort((a, b) => b.start.localeCompare(a.start));
    }

    function card(c) {
        const type = typeOf(c.type);
        return `<a href="${VQ.href('course-details', { id: c.id })}" class="group ${ui.CARD} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col">
            <div class="relative h-40 bg-slate-200 overflow-hidden">
                ${VQ.img(c.image, 'w-full h-full object-cover transition duration-500 group-hover:scale-105', 700)}
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <span class="absolute top-3 start-3">${ui.tag(tx(type.label), 'white', type.icon)}</span>
                ${c.video ? `<span class="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-vq-teal flex items-center justify-center shadow-lg"><i class="fa-solid fa-play" style="margin-left:3px"></i></span>
                    <span class="absolute bottom-3 end-3 text-[10px] text-white bg-slate-900/70 px-2 py-0.5 rounded-md" dir="ltr">${c.videoLength}</span>` : ''}
            </div>
            <div class="p-4 flex-1 flex flex-col gap-2">
                <h3 class="text-sm font-medium text-slate-800 leading-snug line-clamp-2">${esc(tx(c.title))}</h3>
                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(c.summary))}</p>
                <div class="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span><i class="fa-regular fa-calendar text-vq-teal me-1"></i>${VQ.fmtDate(c.start, 'short')}</span>
                    <span><i class="fa-regular fa-clock text-vq-teal me-1"></i>${esc(tx(c.duration))}</span>
                </div>
                <div class="mt-auto pt-3 border-t border-slate-100 flex justify-end">
                    <span class="text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('viewDetails')} ${ui.arrow()}</span>
                </div>
            </div>
        </a>`;
    }

    VQ.boot({
        title: () => t('crTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-graduation-cap', title: t('crTitle'), desc: t('crDesc'), crumbs: [{ label: t('navCourses') }] }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'crQ', value: s.q, placeholder: t('crSearch') })),
                    ui.chips({ name: 'type', active: s.type, items: [{ value: 'all', label: t('all') }]
                        .concat(D.courseTypes.map(c => ({ value: c.key, label: tx(c.label), icon: c.icon }))) })
                ]) +
                `<div id="results" class="space-y-4"></div>`
            );
            this.update();
        },

        update() {
            const items = filtered();
            const { slice, pages } = ui.paginate(items, s, PAGE_SIZE);
            VQ.$('#results').innerHTML = ui.resultsBar(items.length) + (items.length
                ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${slice.map(card).join('')}</div>` + ui.pagination(s.page, pages)
                : ui.emptyState('fa-graduation-cap'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'crQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s[chip.dataset.chip] = chip.dataset.value; s.page = 1; this.render(); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        }
    });
})();
