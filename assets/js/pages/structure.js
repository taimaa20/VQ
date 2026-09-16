/* Visit Qatar Structure & Guide — BRD 6.10 & 8.16 (illustrative chart) */
(function () {
    const { t, tx, esc, ui, D } = VQ;

    function node(d) {
        return `<a href="${VQ.href('departments', { dept: d.key })}" class="block bg-white border border-slate-200 rounded-xl px-2 py-3 text-center shadow-sm hover:border-vq-teal hover:shadow-md transition">
            <span class="mx-auto w-9 h-9 rounded-lg bg-vq-teal/10 text-vq-teal flex items-center justify-center text-sm"><i class="fa-solid ${d.icon}"></i></span>
            <span class="block mt-2 text-[11px] font-medium text-slate-700 leading-tight">${esc(tx(d.name))}</span>
        </a>`;
    }

    /* CEO on top, departments in a wrapping grid below — fits the centre column without scrolling */
    function chart() {
        return `<div class="flex flex-col items-center">
            <div class="w-52 bg-gradient-to-br from-vq-teal to-vq-teal-dark text-white rounded-2xl px-4 py-4 text-center shadow-md">
                <span class="mx-auto w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center"><i class="fa-solid fa-user-tie"></i></span>
                <span class="block mt-2 text-sm font-medium">${t('stCeo')}</span>
                <span class="block text-[10px] text-white/70">Visit Qatar</span>
            </div>
            <span class="w-px h-5 bg-slate-300"></span>
            <div class="w-full border-t border-slate-300 pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${D.departments.map(node).join('')}
            </div>
        </div>`;
    }

    function openFile() {
        ui.openDocument({
            title: t('stTitle'),
            fileName: 'VQ-Organizational-Structure.pdf',
            pages: 1,
            content: ui.docLetterhead(t('stChart'), 'Visit Qatar') + `<div class="p-6">${chart()}</div>`
        });
    }

    VQ.boot({
        title: () => t('stTitle'),

        render() {
            VQ.content(
                ui.pageHeader({
                    icon: 'fa-diagram-project', title: t('stTitle'), desc: t('stDesc'), crumbs: [{ label: t('navStructure') }],
                    actions: `<button type="button" data-open-file class="${ui.BTN.primary}"><i class="fa-solid fa-file-pdf"></i>${t('stOpenFile')}</button>`
                }) +
                ui.sectionCard({
                    title: t('stChart'), icon: 'fa-sitemap',
                    extra: ui.sampleBadge(),
                    body: chart() + `<p class="mt-5 text-[11px] text-slate-500 flex items-center gap-2"><i class="fa-solid fa-circle-info text-vq-teal"></i>${t('stNote')}</p>`
                })
            );
        },

        setup(root) {
            root.addEventListener('click', e => {
                if (e.target.closest('[data-open-file]')) openFile();
            });
        }
    });
})();
