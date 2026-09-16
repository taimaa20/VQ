/* Hotlines — BRD 6.12, 7.10 & 8.10
   Structure follows the QT Mini System Guide screen: search · two tabs · one table */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const H = D.hotlines;
    const s = { q: '', tab: 'general' };

    const matches = (...parts) => {
        const q = s.q.trim().toLowerCase().replace(/\s/g, '');
        return !q || parts.join(' ').toLowerCase().replace(/\s/g, '').includes(q);
    };

    const actions = number => `<span class="flex justify-end gap-1">
        <button type="button" data-copy="${number}" class="${ui.BTN.icon}" title="${t('hlCopy')}"><i class="fa-regular fa-copy"></i></button>
        <a href="tel:${number.replace(/\s/g, '')}" class="${ui.BTN.icon}" title="${t('hlCall')}"><i class="fa-solid fa-phone"></i></a>
    </span>`;

    function table(heads, rows) {
        return `<div class="overflow-x-auto border-y border-slate-200">
            <table class="w-full text-xs min-w-[18rem]">
                <thead class="text-[11px] text-slate-500 bg-slate-50 border-b border-slate-200">
                    <tr>${heads.map(h => `<th class="text-start font-medium px-4 py-3">${h}</th>`).join('')}<th class="px-2 py-3 w-20"></th></tr>
                </thead>
                <tbody class="divide-y divide-slate-100">${rows.join('')}</tbody>
            </table>
        </div>`;
    }

    VQ.boot({
        title: () => t('hlTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-headset', title: t('hlTitle'), desc: t('hlDesc'), crumbs: [{ label: t('navHotlines') }] }) +
                ui.toolbar([ui.row(ui.searchInput({ id: 'hlQ', value: s.q, placeholder: t('hlSearch') }))]) +
                ui.tabs({ name: 'tab', active: s.tab, items: [
                    { value: 'general', label: t('hlTabGeneral') },
                    { value: 'responsible', label: t('hlTabResponsible') }
                ] }) +
                `<div id="results"></div>`
            );
            this.update();
        },

        update() {
            let html = '';
            if (s.tab === 'general') {
                const rows = H.general.filter(r => matches(r.service.ar, r.service.en, r.number));
                if (rows.length) html = table([t('hlService'), t('hlServiceNumber')], rows.map(r => `<tr class="hover:bg-slate-50 transition">
                    <td class="px-4 py-3 text-slate-800">${esc(tx(r.service))}</td>
                    <td class="px-4 py-3 text-slate-800 font-medium whitespace-nowrap"><span dir="ltr">${r.number}</span></td>
                    <td class="px-2 py-2">${actions(r.number)}</td>
                </tr>`));
            } else {
                const rows = H.responsible.filter(r => matches(r.department.ar, r.department.en, r.role.ar, r.role.en, r.number));
                if (rows.length) html = table([t('department'), t('hlResponsible'), t('hlNumber')], rows.map(r => `<tr class="hover:bg-slate-50 transition">
                    <td class="px-4 py-3 text-slate-800">${esc(tx(r.department))}</td>
                    <td class="px-4 py-3 text-slate-600 whitespace-nowrap">${esc(tx(r.role))}</td>
                    <td class="px-4 py-3 text-slate-800 font-medium whitespace-nowrap"><span dir="ltr">${r.number}</span></td>
                    <td class="px-2 py-2">${actions(r.number)}</td>
                </tr>`));
            }
            VQ.$('#results').innerHTML = html || ui.emptyState('fa-headset');
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'hlQ') { s.q = e.target.value; this.update(); }
            });
            root.addEventListener('click', e => {
                const tab = e.target.closest('[data-chip="tab"]');
                if (tab) { s.tab = tab.dataset.value; this.render(); }
            });
        }
    });
})();
