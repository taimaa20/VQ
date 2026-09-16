/* User Guide for each system — BRD 6.11 & 8.9 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', system: 'all', page: 1 };
    const PAGE_SIZE = 6;

    const sysOf = key => D.guideSystems.find(x => x.key === key);
    const KIND = {
        video: { icon: 'fa-circle-play', label: () => t('ugVideo'), color: 'solidRuby' },
        image: { icon: 'fa-images', label: () => t('ugImage'), color: 'solidTeal' },
        link: { icon: 'fa-arrow-up-right-from-square', label: () => t('ugLink'), color: 'solidAmber' }
    };

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.guides
            .filter(g => s.system === 'all' || g.system === s.system)
            .filter(g => !q || (g.title.ar + ' ' + g.title.en + ' ' + g.description.ar + ' ' + g.description.en).toLowerCase().includes(q));
    }

    function card(g) {
        const kind = KIND[g.kind];
        const sys = sysOf(g.system);
        return `<button type="button" data-guide="${g.id}" class="group ${ui.CARD} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col text-start">
            <span class="relative block h-40 w-full bg-slate-200 overflow-hidden">
                ${VQ.img(g.image, 'w-full h-full object-cover transition duration-500 group-hover:scale-105', 700)}
                <span class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></span>
                <span class="absolute top-3 start-3">${ui.tag(kind.label(), kind.color, kind.icon)}</span>
                ${g.kind === 'video' ? `<span class="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-vq-ruby flex items-center justify-center shadow-lg"><i class="fa-solid fa-play" style="margin-left:3px"></i></span>
                    <span class="absolute bottom-3 end-3 text-[10px] text-white bg-slate-900/70 px-2 py-0.5 rounded-md" dir="ltr">${g.length}</span>` : ''}
                ${g.kind === 'image' ? `<span class="absolute bottom-3 end-3 text-[10px] text-white bg-slate-900/70 px-2 py-0.5 rounded-md"><i class="fa-solid fa-list-ol me-1"></i>${g.steps.length}</span>` : ''}
            </span>
            <span class="p-4 flex-1 flex flex-col gap-2 w-full">
                <span class="self-start">${ui.tag(esc(tx(sys.name)), 'teal', sys.icon)}</span>
                <span class="block text-sm font-medium text-slate-800 leading-snug">${esc(tx(g.title))}</span>
                <span class="block text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(g.description))}</span>
                <span class="mt-auto pt-3 border-t border-slate-100 flex justify-end">
                    <span class="text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('open')} ${ui.arrow()}</span>
                </span>
            </span>
        </button>`;
    }

    function openGuide(id) {
        const g = D.guides.find(x => x.id === id);
        if (!g) return;
        const sys = sysOf(g.system);
        let body = '';

        if (g.kind === 'video') {
            body = `<div class="p-3 bg-slate-900">${ui.videoPlayer({ poster: g.image, title: tx(g.title), length: g.length })}</div>`;
        } else if (g.kind === 'image') {
            body = `<div class="p-4 space-y-3">${g.steps.map((step, i) => `<div class="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center rounded-2xl border border-slate-200 p-3">
                <div class="sm:col-span-2 relative rounded-xl overflow-hidden h-32 bg-slate-200">
                    ${VQ.img(g.image, 'w-full h-full object-cover', 500)}
                    <span class="absolute top-2 start-2 w-7 h-7 rounded-full bg-vq-teal text-white text-xs font-medium flex items-center justify-center shadow">${i + 1}</span>
                    <span class="absolute border-2 border-vq-amber rounded-lg" style="top:${22 + i * 14}%;left:${18 + i * 16}%;width:38%;height:26%"></span>
                </div>
                <div class="sm:col-span-3">
                    <p class="text-[10px] text-vq-teal font-medium">${t('ugStep', { n: i + 1 })}</p>
                    <p class="text-sm text-slate-800 mt-1 leading-relaxed">${esc(tx(step))}</p>
                </div>
            </div>`).join('')}</div>`;
        } else {
            body = `<div class="p-6 text-center">
                <span class="mx-auto w-16 h-16 rounded-2xl bg-vq-amber/10 text-vq-amber text-2xl flex items-center justify-center"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
                <p class="mt-4 text-sm font-medium text-slate-800">${esc(tx(g.title))}</p>
                <p class="mt-1 text-xs text-slate-500">${esc(tx(g.description))}</p>
                <p class="mt-4 text-[11px] text-slate-500 bg-slate-50 rounded-xl p-3 inline-flex items-center gap-2"><i class="fa-solid fa-circle-info text-vq-teal"></i>${t('ugExternalNote')}</p>
            </div>`;
        }

        body += `<div class="px-4 pb-4 ${g.kind === 'link' ? 'hidden' : ''}"><p class="text-xs text-slate-600 leading-relaxed">${esc(tx(g.description))}</p></div>`;

        VQ.openModal({
            title: esc(tx(g.title)), icon: KIND[g.kind].icon, size: g.kind === 'link' ? 'max-w-lg' : 'max-w-3xl',
            body,
            footer: `<span class="me-auto">${ui.tag(esc(tx(sys.name)), 'teal', sys.icon)}</span>
                <a href="${sys.url}" target="_blank" rel="noopener noreferrer" class="${g.kind === 'link' ? ui.BTN.primary : ui.BTN.secondary}">
                    ${g.kind === 'link' ? t('ugOpenLink') : t('ugOpenSystem')} <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>`
        });
    }

    VQ.boot({
        title: () => t('ugTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-book-open', title: t('ugTitle'), desc: t('ugDesc'), crumbs: [{ label: t('navUserGuide') }] }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'ugQ', value: s.q, placeholder: t('ugSearch') })),
                    ui.chips({ name: 'system', active: s.system, items: [{ value: 'all', label: t('ugAllSystems') }]
                        .concat(D.guideSystems.map(x => ({ value: x.key, label: tx(x.name), icon: x.icon }))) })
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
                : ui.emptyState('fa-book-open'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'ugQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s[chip.dataset.chip] = chip.dataset.value; s.page = 1; this.render(); return; }
                const guide = e.target.closest('[data-guide]');
                if (guide) { openGuide(guide.dataset.guide); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        },

        afterBoot() {
            if (VQ.param('id')) openGuide(VQ.param('id'));
        }
    });
})();
