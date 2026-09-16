/* Employee Information — BRD 7.9 (sample records; production data comes from HR integration) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', department: 'all', page: 1 };
    const PAGE_SIZE = 6;

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.employees
            .filter(p => s.department === 'all' || p.department === s.department)
            .filter(p => !q || (p.name.ar + ' ' + p.name.en + ' ' + p.id + ' ' + p.position.ar + ' ' + p.position.en).toLowerCase().includes(q));
    }

    function card(p) {
        return `<div class="${ui.CARD} p-4 hover:shadow-md transition flex flex-col">
            <button type="button" data-person="${p.id}" class="flex items-center gap-3 text-start">
                ${ui.avatar(p, 'w-14 h-14 text-lg')}
                <span class="min-w-0">
                    <span class="block text-sm font-medium text-slate-800 truncate">${esc(tx(p.name))}</span>
                    <span class="block text-[11px] text-slate-500 truncate">${esc(tx(p.position))}</span>
                </span>
            </button>
            <div class="mt-3 flex flex-wrap gap-1.5">
                ${ui.tag(VQ.deptName(p.department), 'teal', 'fa-building')}
                ${ui.tag(`<span dir="ltr">${p.id}</span>`, 'slate', 'fa-id-badge')}
            </div>
            <div class="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                <button type="button" data-person="${p.id}" class="text-xs text-vq-teal hover:underline font-medium inline-flex items-center gap-1.5">${t('emProfile')} ${ui.arrow()}</button>
            </div>
        </div>`;
    }

    function openProfile(id) {
        const p = D.employees.find(x => x.id === id);
        if (!p) return;
        VQ.openModal({
            title: t('emProfile'), icon: 'fa-id-card', size: 'max-w-md',
            body: `<div class="p-5">
                <div class="flex flex-col items-center text-center">
                    ${ui.avatar(p, 'w-24 h-24 text-3xl')}
                    <p class="mt-3 text-base font-medium text-slate-800">${esc(tx(p.name))}</p>
                    <p class="text-xs text-slate-500">${esc(tx(p.position))}</p>
                </div>
                <div class="mt-5 rounded-2xl border border-slate-200 p-4">
                    ${ui.infoList([
                        { icon: 'fa-id-badge', label: t('emId'), value: `<span dir="ltr">${p.id}</span>` },
                        { icon: 'fa-briefcase', label: t('emPosition'), value: esc(tx(p.position)) },
                        { icon: 'fa-building', label: t('department'), value: VQ.deptName(p.department) }
                    ])}
                </div>
                <p class="mt-4 text-[10px] text-slate-400 flex items-center gap-1.5 justify-center"><i class="fa-solid fa-arrows-rotate"></i>${t('emSource')}</p>
            </div>`
        });
    }

    VQ.boot({
        title: () => t('emTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-address-book', title: t('emTitle'), desc: t('emDesc'), crumbs: [{ label: t('navEmployees') }], badge: ui.sampleBadge() }) +
                ui.toolbar([
                    ui.row(
                        ui.searchInput({ id: 'emQ', value: s.q, placeholder: t('emSearch') }) +
                        ui.select({ id: 'emDept', value: s.department, label: t('department'), options: [{ value: 'all', label: t('evAllDepartments') }]
                            .concat(D.departments.map(d => ({ value: d.key, label: tx(d.name) }))) })
                    )
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
                : ui.emptyState('fa-user'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'emQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('change', e => {
                if (e.target.id === 'emDept') { s.department = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const person = e.target.closest('[data-person]');
                if (person) { openProfile(person.dataset.person); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); }
            });
        },

        afterBoot() {
            if (VQ.param('id')) openProfile(VQ.param('id'));
        }
    });
})();
