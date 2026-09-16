/* General Policies, Procedures & Forms — BRD 7.8 & 8.11
   Structure follows the QT Mini System Guide screen: upload area · search + type + download · document table.
   Upload, download and edit are visual only (no files are stored or sent). */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', category: 'all', page: 1, selected: new Set() };
    const PAGE_SIZE = 6;

    const catOf = key => D.policyCategories.find(c => c.key === key);
    const docOf = id => D.policies.find(x => x.id === id);
    const fileName = d => `${d.title.en.replace(/[^A-Za-z0-9]+/g, '-')}.${d.ext}`;

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.policies
            .filter(d => s.category === 'all' || d.category === s.category)
            .filter(d => !q || (d.title.ar + ' ' + d.title.en + ' ' + d.summary.ar + ' ' + d.summary.en).toLowerCase().includes(q))
            .sort((a, b) => b.updated.localeCompare(a.updated));
    }

    function uploadArea() {
        return `<div id="plUpload" class="vq-dropzone rounded-2xl border-2 border-dashed border-slate-200 px-4 py-6 text-center">
            <span class="mx-auto w-12 h-12 rounded-xl bg-vq-teal/10 text-vq-teal text-xl flex items-center justify-center"><i class="fa-solid fa-cloud-arrow-up"></i></span>
            <p class="mt-3 text-xs text-slate-700">${t('plUploadDrag')}</p>
            <div class="mt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <span>${t('or')}</span>
                <label class="${ui.BTN.secondary} cursor-pointer !text-vq-teal !border-vq-teal/40">
                    <input type="file" id="plFile" class="sr-only">${t('plBrowse')}
                </label>
            </div>
        </div>`;
    }

    function docRow(d) {
        const f = VQ.fileIcon(d.ext);
        return `<tr class="hover:bg-slate-50 transition align-top">
            <td class="ps-2 pe-1 py-3">
                <input type="checkbox" data-select="${d.id}" ${s.selected.has(d.id) ? 'checked' : ''} class="mt-0.5 w-3.5 h-3.5 accent-[#00626C] cursor-pointer" aria-label="${t('plSelect')}">
            </td>
            <td class="px-2.5 py-3">
                <button type="button" data-doc="${d.id}" class="flex items-start gap-2 text-start text-vq-teal hover:underline">
                    <i class="fa-solid ${f.icon} ${f.color} mt-0.5"></i><span class="font-medium">${esc(tx(d.title))}</span>
                </button>
            </td>
            <td class="px-2.5 py-3 text-slate-600 leading-relaxed">${esc(tx(d.summary))}</td>
            <td class="px-2.5 py-3 text-slate-600">${VQ.fmtDate(d.updated, 'long')}</td>
            <td class="px-1 py-2 text-center"><button type="button" data-download="${d.id}" class="${ui.BTN.icon}" title="${t('plDownloadFile')}"><i class="fa-solid fa-download"></i></button></td>
            <td class="px-1 py-2 text-center"><button type="button" data-edit="${d.id}" class="${ui.BTN.icon}" title="${t('plEditFile')}"><i class="fa-regular fa-pen-to-square"></i></button></td>
        </tr>`;
    }

    function table(items) {
        const th = (label, cls) => `<th class="font-medium px-2.5 py-3 ${cls || 'text-start'}">${label}</th>`;
        return `<div class="overflow-x-auto border-y border-slate-200">
            <table class="w-full text-xs min-w-[32rem]">
                <thead class="text-[11px] text-slate-500 bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="ps-2 pe-1 py-3 w-6"></th>
                        ${th(t('plFileName'), 'text-start w-[26%]')}${th(t('plDescription'))}${th(t('plModified'), 'text-start w-[22%]')}
                        ${th(t('plDownloadFile'), 'text-center w-14')}${th(t('plEditFile'), 'text-center w-14')}
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">${items.map(docRow).join('')}</tbody>
            </table>
        </div>`;
    }

    function openDoc(id) {
        const d = docOf(id);
        if (!d) return;
        ui.openDocument({
            title: tx(d.title),
            fileName: fileName(d),
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
                uploadArea() +
                ui.toolbar([
                    ui.row(
                        ui.searchInput({ id: 'plQ', value: s.q, placeholder: t('plSearch') }) +
                        ui.select({ id: 'plType', value: s.category, label: t('type'), options: [{ value: 'all', label: t('plAllTypes') }]
                            .concat(D.policyCategories.map(c => ({ value: c.key, label: tx(c.label) }))) }) +
                        `<button type="button" id="plDownload" class="${ui.BTN.primary} shrink-0"><i class="fa-solid fa-download"></i>${t('download')}</button>`
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
            const zone = e => e.target.closest && e.target.closest('#plUpload');
            const chosen = file => { if (file) VQ.toast(t('plUploadDemo', { name: file.name }), 'fa-cloud-arrow-up'); };

            root.addEventListener('input', e => {
                if (e.target.id === 'plQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('change', e => {
                if (e.target.id === 'plType') { s.category = e.target.value; s.page = 1; this.update(); }
                if (e.target.id === 'plFile') { chosen(e.target.files[0]); e.target.value = ''; }
                if (e.target.matches('[data-select]')) {
                    if (e.target.checked) s.selected.add(e.target.dataset.select);
                    else s.selected.delete(e.target.dataset.select);
                }
            });
            root.addEventListener('dragover', e => {
                e.preventDefault();
                VQ.$('#plUpload').classList.toggle('is-dragover', !!zone(e));
            });
            root.addEventListener('dragleave', e => { if (zone(e)) VQ.$('#plUpload').classList.remove('is-dragover'); });
            root.addEventListener('drop', e => {
                e.preventDefault();
                VQ.$('#plUpload').classList.remove('is-dragover');
                if (zone(e)) chosen(e.dataTransfer.files[0]);
            });
            root.addEventListener('click', e => {
                const doc = e.target.closest('[data-doc]');
                if (doc) { openDoc(doc.dataset.doc); return; }
                const dl = e.target.closest('[data-download]');
                if (dl) { VQ.toast(t('plDownloadDemo', { name: tx(docOf(dl.dataset.download).title) }), 'fa-download'); return; }
                const edit = e.target.closest('[data-edit]');
                if (edit) { VQ.toast(t('plEditDemo', { name: tx(docOf(edit.dataset.edit).title) }), 'fa-pen-to-square'); return; }
                if (e.target.closest('#plDownload')) {
                    VQ.toast(s.selected.size ? t('plDownloadSelected', { n: s.selected.size }) : t('plSelectFirst'), s.selected.size ? 'fa-download' : 'fa-circle-info');
                    return;
                }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        },

        afterBoot() {
            if (VQ.param('doc')) openDoc(VQ.param('doc'));
        }
    });
})();
