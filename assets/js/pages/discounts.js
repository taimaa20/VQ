/* Discounts listing — BRD 7.5 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', category: 'all', page: 1 };
    const PAGE_SIZE = 6;

    const catOf = key => D.discountCategories.find(c => c.key === key);

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.discounts
            .filter(d => s.category === 'all' || d.category === s.category)
            .filter(d => !q || (d.title.ar + ' ' + d.title.en + ' ' + d.partner.ar + ' ' + d.partner.en).toLowerCase().includes(q))
            .sort((a, b) => b.start.localeCompare(a.start));
    }

    const badgeColor = p => (p >= 25 ? 'bg-vq-ruby' : p >= 20 ? 'bg-vq-amber' : 'bg-vq-teal');

    function expiryText(d) {
        const days = VQ.daysUntil(d.end);
        if (days < 0) return { text: t('expired'), cls: 'text-slate-400' };
        if (days === 0) return { text: t('endsToday'), cls: 'text-vq-ruby' };
        return { text: t('daysLeft', { n: days }), cls: days <= 30 ? 'text-vq-amber' : 'text-slate-500' };
    }

    function card(d) {
        const cat = catOf(d.category);
        const exp = expiryText(d);
        return `<a href="${VQ.href('discount-details', { id: d.id })}" class="group ${ui.CARD} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col">
            <div class="relative h-44 bg-slate-800 overflow-hidden">
                ${VQ.img(d.image, 'absolute inset-0 w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105', 700)}
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent"></div>
                <span class="absolute top-3 start-3 ${badgeColor(d.percent)} text-white px-2.5 py-1 rounded-xl shadow-lg leading-none text-center">
                    <span class="block text-[9px] opacity-90">${t('dsUpTo')}</span>
                    <span class="block text-lg font-medium" dir="ltr">${d.percent}%</span>
                </span>
                <span class="absolute bottom-3 start-3 end-3 text-white">
                    <span class="block text-[10px] text-white/80"><i class="fa-solid fa-store me-1"></i>${esc(tx(d.partner))}</span>
                </span>
            </div>
            <div class="p-4 flex-1 flex flex-col gap-2">
                <span class="self-start">${ui.tag(tx(cat.label), 'teal', cat.icon)}</span>
                <h3 class="text-sm font-medium text-slate-800 leading-snug line-clamp-1">${esc(tx(d.title))}</h3>
                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(d.summary))}</p>
                <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span class="text-[11px] ${exp.cls} inline-flex items-center gap-1.5"><i class="fa-regular fa-clock"></i>${exp.text}</span>
                    <span class="text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('viewDetails')} ${ui.arrow()}</span>
                </div>
            </div>
        </a>`;
    }

    VQ.boot({
        title: () => t('dsTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-tags', title: t('dsTitle'), desc: t('dsDesc'), crumbs: [{ label: t('navDiscounts') }] }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'dsQ', value: s.q, placeholder: t('dsSearch') })),
                    ui.chips({ name: 'category', active: s.category, items: [{ value: 'all', label: t('all') }]
                        .concat(D.discountCategories.map(c => ({ value: c.key, label: tx(c.label), icon: c.icon }))) })
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
                : ui.emptyState('fa-tags'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'dsQ') { s.q = e.target.value; s.page = 1; this.update(); }
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
