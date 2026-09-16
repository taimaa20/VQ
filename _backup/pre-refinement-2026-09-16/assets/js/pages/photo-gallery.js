/* Photo Gallery — albums (BRD 8.2) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', page: 1 };
    const PAGE_SIZE = 6;

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.albums
            .filter(a => !q || (a.title.ar + ' ' + a.title.en).toLowerCase().includes(q))
            .sort((a, b) => b.date.localeCompare(a.date));
    }

    function card(a) {
        return `<a href="${VQ.href('album', { id: a.id })}" class="group album-stack block pt-3">
            <span class="block ${ui.CARD} overflow-hidden hover:shadow-md transition">
                <span class="relative block h-52 bg-slate-800 overflow-hidden">
                    ${VQ.img(a.cover, 'w-full h-full object-cover transition duration-700 group-hover:scale-105', 800)}
                    <span class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent"></span>
                    <span class="absolute top-3 end-3">${ui.tag(t('pgPhotos', { n: a.photos.length }), 'solidDark', 'fa-images')}</span>
                    <span class="absolute bottom-0 inset-x-0 p-4 text-white">
                        <span class="block text-sm font-medium leading-snug">${esc(tx(a.title))}</span>
                        <span class="block text-[11px] text-white/75 mt-1"><i class="fa-regular fa-calendar me-1"></i>${VQ.fmtDate(a.date)}</span>
                    </span>
                </span>
            </span>
        </a>`;
    }

    VQ.boot({
        title: () => t('pgTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-images', title: t('pgTitle'), desc: t('pgDesc'), crumbs: [{ label: t('navPhotos') }] }) +
                ui.toolbar([ui.row(ui.searchInput({ id: 'pgQ', value: s.q, placeholder: t('pgSearch') }))]) +
                `<div id="results" class="space-y-4"></div>`
            );
            this.update();
        },

        update() {
            const items = filtered();
            const { slice, pages } = ui.paginate(items, s, PAGE_SIZE);
            VQ.$('#results').innerHTML = ui.resultsBar(items.length) + (items.length
                ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">${slice.map(card).join('')}</div>` + ui.pagination(s.page, pages)
                : ui.emptyState('fa-images'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'pgQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); }
            });
        }
    });
})();
