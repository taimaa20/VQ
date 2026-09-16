/* Announcements listing — BRD 7.2 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', type: 'all', page: 1 };
    const PAGE_SIZE = 6;

    const typeOf = key => D.announcementTypes.find(x => x.key === key);

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.announcements
            .filter(a => s.type === 'all' || a.type === s.type)
            .filter(a => !q || (a.title.ar + ' ' + a.title.en + ' ' + a.number).toLowerCase().includes(q))
            .sort((a, b) => b.start.localeCompare(a.start));
    }

    function card(a) {
        const ty = typeOf(a.type);
        return `<a href="${VQ.href('announcement-details', { id: a.id })}" class="group ${ui.CARD} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col">
            <div class="circular-content-normal" style="border-radius:0;box-shadow:none">
                <div class="circular-image-normal"><img src="${VQ.photo(ty.image)}" alt="" class="group-hover:scale-105"></div>
                <div class="circular-text-normal ${ty.css}">
                    <div class="circular-text-content">
                        <h5>${esc(tx(a.title))}</h5>
                        <p>${tx(ty.label)} · ${VQ.fmtDate(a.start)}</p>
                    </div>
                </div>
            </div>
            <div class="p-3.5 flex-1 flex flex-col gap-2">
                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(a.summary))}</p>
                <div class="mt-auto flex items-center justify-between gap-2 pt-2.5 border-t border-slate-100">
                    <span class="text-[10px] text-slate-400"><span dir="ltr">${a.number}</span></span>
                    <span class="text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('viewDetails')} ${ui.arrow()}</span>
                </div>
            </div>
        </a>`;
    }

    VQ.boot({
        title: () => t('annTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-bullhorn', title: t('annTitle'), desc: t('annDesc'), crumbs: [{ label: t('navAnnouncements') }] }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'annQ', value: s.q, placeholder: t('annSearch') })),
                    ui.chips({ name: 'type', active: s.type, items: [{ value: 'all', label: t('all') }]
                        .concat(D.announcementTypes.map(ty => ({ value: ty.key, label: tx(ty.label), dot: ty.color }))) })
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
                : ui.emptyState('fa-bullhorn'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'annQ') { s.q = e.target.value; s.page = 1; this.update(); }
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
