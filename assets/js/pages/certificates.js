/* Visit Qatar Certificates — BRD 7.6 & 8.8 (opens a static document preview) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = { q: '', page: 1 };
    const PAGE_SIZE = 6;

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.certificates
            .filter(c => !q || (c.standard + ' ' + c.title.ar + ' ' + c.title.en).toLowerCase().includes(q))
            .sort((a, b) => b.date.localeCompare(a.date));
    }

    /* Certificate artwork drawn in HTML */
    function visual(c) {
        return `<div class="cert-paper h-full px-4 py-5 flex flex-col items-center justify-center text-center" dir="ltr">
            <span class="text-[8px] tracking-[0.35em] text-slate-400">CERTIFICATE</span>
            <span class="mt-2.5 w-11 h-11 rounded-full bg-vq-teal/10 text-vq-teal flex items-center justify-center"><i class="fa-solid ${c.icon}"></i></span>
            <span class="mt-2.5 text-lg font-medium text-vq-teal leading-none">${c.standard}</span>
            <span class="mt-2 text-[9px] text-slate-500 leading-snug line-clamp-2 px-2">${c.title.en}</span>
            <span class="mt-3 inline-flex items-center gap-1.5 text-[9px] text-slate-400"><i class="fa-solid fa-stamp text-vq-gold"></i>${c.body}</span>
        </div>`;
    }

    function card(c) {
        return `<div class="group ${ui.CARD} overflow-hidden flex flex-col hover:shadow-md transition">
            <button type="button" data-cert="${c.id}" class="block bg-gradient-to-b from-slate-50 to-slate-100 p-5" aria-label="${t('ctView')}">
                <div class="h-52 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg rounded-xl">${visual(c)}</div>
            </button>
            <div class="p-4 flex-1 flex flex-col gap-2 border-t border-slate-100">
                <span class="self-start">${ui.tag(VQ.fmtDate(c.date), 'slate', 'fa-calendar')}</span>
                <h3 class="text-sm font-medium text-slate-800"><span dir="ltr">${t('ctCardTitle', { s: c.standard })}</span></h3>
                <p class="text-[11px] text-slate-500 leading-relaxed">${esc(tx(c.title))}</p>
                <button type="button" data-cert="${c.id}" class="${ui.BTN.soft} mt-auto w-full"><i class="fa-regular fa-eye"></i>${t('ctView')}</button>
            </div>
        </div>`;
    }

    function openCertificate(id) {
        const c = D.certificates.find(x => x.id === id);
        if (!c) return;
        const scope = c.scope || D.certificateScopeGeneral;
        const dateEn = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(VQ.toDate(c.date));
        ui.openDocument({
            title: t('ctCardTitle', { s: c.standard }),
            fileName: `${c.standard.replace(/[: ]/g, '-')}-Certificate.pdf`,
            pages: 1,
            content: `<div class="p-5 sm:p-8" dir="ltr">
                <div class="border-4 border-double border-vq-gold/50 rounded-lg px-5 py-8 sm:px-10 text-center">
                    <p class="text-[10px] tracking-[0.35em] text-slate-400">${c.body.toUpperCase()}</p>
                    <h2 class="mt-3 text-2xl sm:text-3xl text-vq-teal font-medium tracking-[0.2em]">CERTIFICATE</h2>
                    <p class="mt-6 text-xs text-slate-500">This is to certify that the management system of</p>
                    <p class="mt-1.5 text-lg font-medium text-slate-800">Visit Qatar</p>
                    <p class="mt-4 text-xs text-slate-500">has been audited and found to be in accordance with the requirements of the management system standard</p>
                    <p class="mt-3 text-3xl font-medium text-vq-teal">${c.standard}</p>
                    <p class="mt-1 text-xs text-slate-600">${c.title.en}</p>
                    <div class="mt-7 text-start bg-slate-50 rounded-lg p-4">
                        <p class="text-[10px] uppercase tracking-wider text-slate-400">Scope of certification</p>
                        <p class="text-xs text-slate-700 mt-1.5 leading-relaxed">${scope.en}</p>
                    </div>
                    <div class="mt-7 flex items-end justify-between text-[10px] text-slate-500">
                        <div class="text-start">
                            <p>Certificate date</p>
                            <p class="text-xs text-slate-800 font-medium mt-0.5">${dateEn}</p>
                        </div>
                        <span class="w-16 h-16 rounded-full border-2 border-vq-gold/60 text-vq-gold flex items-center justify-center"><i class="fa-solid fa-award text-2xl"></i></span>
                    </div>
                </div>
            </div>`
        });
    }

    VQ.boot({
        title: () => t('ctTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-certificate', title: t('ctTitle'), desc: t('ctDesc'), crumbs: [{ label: t('navCerts') }] }) +
                ui.toolbar([
                    ui.row(ui.searchInput({ id: 'ctQ', value: s.q, placeholder: t('ctSearch') }))
                ]) +
                `<div id="results" class="space-y-3"></div>`
            );
            this.update();
        },

        update() {
            const items = filtered();
            const { slice, pages } = ui.paginate(items, s, PAGE_SIZE);
            VQ.$('#results').innerHTML = ui.resultsBar(items.length) + (items.length
                ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${slice.map(card).join('')}</div>` + ui.pagination(s.page, pages)
                : ui.emptyState('fa-certificate'));
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'ctQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const btn = e.target.closest('[data-cert]');
                if (btn) { openCertificate(btn.dataset.cert); return; }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); }
            });
        },

        afterBoot() {
            if (VQ.param('cert')) openCertificate(VQ.param('cert'));
        }
    });
})();
