/* Search results — BRD 5.1.6 (front-end search across the static data) */
(function () {
    const { t, esc, ui } = VQ;
    const FILTERS = [
        { value: 'all', key: 'filterAll', icon: 'fa-border-all' },
        { value: 'pages', key: 'filterPages', icon: 'fa-file-lines' },
        { value: 'people', key: 'filterPeople', icon: 'fa-user' },
        { value: 'documents', key: 'filterDocuments', icon: 'fa-file-pdf' },
        { value: 'images', key: 'filterImages', icon: 'fa-image' },
        { value: 'videos', key: 'filterVideos', icon: 'fa-circle-play' }
    ];
    const s = {
        q: VQ.param('q') || '',
        type: FILTERS.some(f => f.value === VQ.param('type')) ? VQ.param('type') : 'all'
    };

    function syncUrl() {
        const params = new URLSearchParams();
        if (s.q) params.set('q', s.q);
        if (s.type !== 'all') params.set('type', s.type);
        history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : ''));
    }

    function row(item) {
        const typeLabel = t(FILTERS.find(f => f.value === item.type).key);
        return `<a href="${item.url}" class="group flex items-center gap-4 p-4 hover:bg-slate-50 transition">
            <span class="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-base ${item.color}"><i class="fa-solid ${item.icon}"></i></span>
            <span class="min-w-0 flex-1">
                <span class="block text-sm font-medium text-slate-800 group-hover:text-vq-teal truncate">${esc(item.title)}</span>
                <span class="block text-[11px] text-slate-500 truncate mt-0.5">${esc(item.meta)}</span>
            </span>
            <span class="hidden sm:inline">${ui.tag(typeLabel, 'slate')}</span>
            <span class="${ui.BTN.icon} shrink-0">${ui.arrow('text-xs')}</span>
        </a>`;
    }

    VQ.boot({
        title: () => t('srTitle'),

        render() {
            VQ.content(
                ui.pageHeader({
                    icon: 'fa-magnifying-glass', title: t('srTitle'), crumbs: [{ label: t('navSearch') }],
                    desc: `<span id="srDesc">${s.q ? t('srFor', { q: esc(s.q) }) : t('srHint')}</span>`
                }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'srQ', value: s.q, placeholder: t('searchPlaceholder') })),
                    `<div id="srChips"></div>`
                ]) +
                `<div id="results" class="space-y-3"></div>`
            );
            this.update();
        },

        update() {
            const all = VQ.searchItems(s.q, 'all');
            const items = s.type === 'all' ? all : all.filter(i => i.type === s.type);
            VQ.$('#srChips').innerHTML = ui.chips({
                name: 'type', active: s.type,
                items: FILTERS.map(f => ({ value: f.value, label: t(f.key), icon: f.icon }))
            });
            VQ.$('#srDesc').innerHTML = s.q ? t('srFor', { q: esc(s.q) }) : t('srHint');
            VQ.$('#results').innerHTML = ui.resultsBar(items.length) + (items.length
                ? `<div class="${ui.CARD} overflow-hidden divide-y divide-slate-100">${items.map(row).join('')}</div>`
                : ui.emptyState());
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'srQ') { s.q = e.target.value; syncUrl(); this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s.type = chip.dataset.value; syncUrl(); this.update(); }
            });
        }
    });
})();
