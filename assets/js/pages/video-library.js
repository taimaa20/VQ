/* Video Library — BRD 8.3 (embedded player shown as a static mock) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', category: 'all', page: 1, current: VQ.param('id') || D.videos[0].id };
    const PAGE_SIZE = 6;

    const catOf = key => D.videoCategories.find(c => c.key === key);

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.videos
            .filter(v => s.category === 'all' || v.category === s.category)
            .filter(v => !q || (v.title.ar + ' ' + v.title.en + ' ' + v.description.ar + ' ' + v.description.en).toLowerCase().includes(q))
            .sort((a, b) => b.date.localeCompare(a.date));
    }

    function featured() {
        const v = D.videos.find(x => x.id === s.current) || D.videos[0];
        const cat = catOf(v.category);
        return `<div class="space-y-3" id="featuredVideo">
            ${ui.videoPlayer({ poster: v.thumb, title: tx(v.title), length: v.length })}
            <div class="pb-5 border-b border-slate-100">
                <div class="flex flex-wrap items-center gap-2 mb-2">${ui.tag(t('vlNowPlaying'), 'solidRuby', 'fa-tower-broadcast')}${ui.tag(tx(cat.label), 'teal', cat.icon)}</div>
                <h2 class="text-base font-medium text-slate-800 leading-snug">${esc(tx(v.title))}</h2>
                <p class="text-xs text-slate-500 leading-relaxed mt-1">${esc(tx(v.description))}</p>
                <p class="text-[11px] text-slate-400 mt-2"><i class="fa-solid fa-building me-1"></i>${VQ.deptName(v.department)} · ${VQ.fmtDate(v.date)}</p>
            </div>
        </div>`;
    }

    function card(v) {
        const cat = catOf(v.category);
        const on = v.id === s.current;
        return `<button type="button" data-video-id="${v.id}" class="group ${ui.CARD} overflow-hidden hover:shadow-md transition flex flex-col text-start ${on ? 'ring-2 ring-vq-ruby border-vq-ruby' : ''}">
            <span class="relative block h-36 w-full bg-slate-800 overflow-hidden">
                ${VQ.img(v.thumb, 'w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105', 600)}
                <span class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></span>
                <span class="absolute inset-0 m-auto w-11 h-11 rounded-full ${on ? 'bg-vq-ruby text-white' : 'bg-white/90 text-vq-ruby'} flex items-center justify-center shadow-lg transition group-hover:scale-110"><i class="fa-solid ${on ? 'fa-volume-high' : 'fa-play'}" ${on ? '' : 'style="margin-left:3px"'}></i></span>
                <span class="absolute bottom-2 end-2 text-[10px] text-white bg-slate-900/75 px-2 py-0.5 rounded-md" dir="ltr">${v.length}</span>
            </span>
            <span class="p-3.5 flex-1 flex flex-col gap-1.5 w-full">
                <span class="self-start">${ui.tag(tx(cat.label), 'teal', cat.icon)}</span>
                <span class="block text-xs font-medium text-slate-800 leading-snug line-clamp-2">${esc(tx(v.title))}</span>
                <span class="block text-[10px] text-slate-400 mt-auto">${VQ.deptName(v.department)} · ${VQ.fmtDate(v.date, 'short')}</span>
            </span>
        </button>`;
    }

    VQ.boot({
        title: () => t('vlTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-circle-play', title: t('vlTitle'), desc: t('vlDesc'), crumbs: [{ label: t('navVideos') }] }) +
                `<div id="featuredWrap">${featured()}</div>` +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'vlQ', value: s.q, placeholder: t('vlSearch') })),
                    ui.chips({ name: 'category', active: s.category, items: [{ value: 'all', label: t('all') }]
                        .concat(D.videoCategories.map(c => ({ value: c.key, label: tx(c.label), icon: c.icon }))) })
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
                : ui.emptyState('fa-video'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'vlQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s[chip.dataset.chip] = chip.dataset.value; s.page = 1; this.render(); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); return; }
                const vid = e.target.closest('[data-video-id]');
                if (vid) {
                    VQ.stopVideos();
                    s.current = vid.dataset.videoId;
                    VQ.$('#featuredWrap').innerHTML = featured();
                    this.update();
                    VQ.$('#featuredWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
})();
