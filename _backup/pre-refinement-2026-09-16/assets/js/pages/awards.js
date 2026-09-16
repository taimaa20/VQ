/* Received Awards — BRD 5.2 menu item (illustrative entries) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const accents = ['from-vq-teal to-vq-teal-dark', 'from-vq-ruby to-[#5e0e26]', 'from-vq-amber to-[#a85200]', 'from-vq-gold to-[#7a6a1f]'];

    function card(a, i) {
        return `<div class="${ui.CARD} overflow-hidden flex flex-col hover:shadow-md transition">
            <div class="relative h-36 bg-gradient-to-br ${accents[i % accents.length]} flex items-center justify-center overflow-hidden">
                <div class="absolute -top-10 -end-10 w-40 h-40 rounded-full bg-white/10"></div>
                <div class="absolute -bottom-12 -start-6 w-32 h-32 rounded-full bg-white/5"></div>
                <span class="relative w-16 h-16 rounded-full bg-white text-vq-amber text-2xl flex items-center justify-center shadow-xl"><i class="fa-solid ${a.icon}"></i></span>
                <span class="absolute top-3 end-3">${ui.tag(a.year, 'white', 'fa-calendar')}</span>
            </div>
            <div class="p-4 flex-1 flex flex-col gap-2">
                <h3 class="text-sm font-medium text-slate-800">${esc(tx(a.title))}</h3>
                <p class="text-[11px] text-slate-500 flex items-center gap-1.5"><i class="fa-solid fa-building-columns text-vq-teal"></i>${esc(tx(a.body))}</p>
                <p class="text-[11px] text-slate-500 leading-relaxed">${esc(tx(a.summary))}</p>
            </div>
        </div>`;
    }

    VQ.boot({
        title: () => t('awTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-award', title: t('awTitle'), desc: t('awDesc'), crumbs: [{ label: t('navAwards') }], badge: ui.sampleBadge() }) +
                `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${D.awards.map(card).join('')}</div>`
            );
        }
    });
})();
