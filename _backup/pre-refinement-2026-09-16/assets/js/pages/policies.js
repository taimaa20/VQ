/* General Policies, Procedures & Forms — BRD 7.8 & 8.11: search + type selector + document table (view only) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', category: 'all', page: 1 };
    const PAGE_SIZE = 6;

    const catOf = key => D.policyCategories.find(c => c.key === key);

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.policies
            .filter(d => s.category === 'all' || d.category === s.category)
            .filter(d => !q || (d.title.ar + ' ' + d.title.en + ' ' + d.summary.ar + ' ' + d.summary.en).toLowerCase().includes(q))
            .sort((a, b) => b.updated.localeCompare(a.updated));
    }

    function docRow(d) {
        const f = VQ.fileIcon(d.ext);
        return `<tr class="hover:bg-slate-50 transition">
            <td class="px-4 py-3">
                <button type="button" data-doc="${d.id}" class="flex items-center gap-3 text-start">
                    <span class="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 ${f.color}"><i class="fa-solid ${f.icon}"></i></span>
                    <span class="min-w-0">
                        <span class="block font-medium text-slate-800 hover:text-vq-teal">${esc(tx(d.title))}</span>
                        <span class="block text-[10px] text-slate-400 mt-0.5">${VQ.deptName(d.department)}</span>
                    </span>
                </button>
            </td>
            <td class="px-4 py-3 text-slate-600 whitespace-nowrap">${esc(tx(catOf(d.category).label))}</td>
            <td class="px-4 py-3 text-slate-600 whitespace-nowrap">${VQ.fmtDate(d.updated, 'short')}</td>
            <td class="px-4 py-3 text-end"><button type="button" data-doc="${d.id}" class="${ui.BTN.soft} px-3 py-1.5"><i class="fa-regular fa-eye"></i>${t('view')}</button></td>
        </tr>`;
    }

    function table(items) {
        const th = label => `<th class="text-start font-medium px-4 py-3 whitespace-nowrap">${label}</th>`;
        return `<div class="${ui.CARD} overflow-hidden">
            <div class="overflow-x-auto"><table class="w-full text-xs min-w-[34rem]">
                <thead class="text-[11px] text-slate-500 bg-slate-50 border-b border-slate-100">
                    <tr>${th(t('plDocument'))}${th(t('type'))}${th(t('updated'))}<th class="px-4 py-3"></th></tr>
                </thead>
                <tbody class="divide-y divide-slate-100">${items.map(docRow).join('')}</tbody>
            </table></div>
        </div>`;
    }

    function openDoc(id) {
        const d = D.policies.find(x => x.id === id);
        if (!d) return;
        ui.openDocument({
            title: tx(d.title),
            fileName: `${d.title.en.replace(/[^A-Za-z0-9]+/g, '-')}.${d.ext}`,
            pages: d.pages,
            content: ui.docLetterhead(esc(tx(d.title)), `${tx(catOf(d.category).label)} · ${t('version')} ${d.version}`) +
                `<div class="px-6 sm:px-8 pt-5 flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-slate-500 border-b border-slate-100 pb-4">
                    <span>${t('plOwner')}: <b class="font-medium text-slate-700">${VQ.deptName(d.department)}</b></span>
                    <span>${t('updated')}: <b class="font-medium text-slate-700">${VQ.fmtDate(d.updated)}</b></span>
                    <span>${t('pagesCount', { n: d.pages })}</span>
                </div>` + ui.docSkeleton(5)
        });
    }

    VQ.boot({
        title: () => t('plTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-folder-open', title: t('plTitle'), desc: t('plDesc'), crumbs: [{ label: t('navPolicies') }] }) +
                ui.toolbar([
                    ui.row(
                        ui.searchInput({ id: 'plQ', value: s.q, placeholder: t('plSearch') }) +
                        ui.select({ id: 'plType', value: s.category, label: t('type'), options: [{ value: 'all', label: t('plAllTypes') }]
                            .concat(D.policyCategories.map(c => ({ value: c.key, label: tx(c.label) }))) })
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
                ? table(slice) + ui.pagination(s.page, pages)
                : ui.emptyState('fa-folder-open'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'plQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('change', e => {
                if (e.target.id === 'plType') { s.category = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const doc = e.target.closest('[data-doc]');
                if (doc) { openDoc(doc.dataset.doc); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        },

        afterBoot() {
            if (VQ.param('doc')) openDoc(VQ.param('doc'));
        }
    });
})();
