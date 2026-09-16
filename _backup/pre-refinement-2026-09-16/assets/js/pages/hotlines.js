/* Hotlines — BRD 6.12, 7.10 & 8.10: emergency numbers + one contact list */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const H = D.hotlines;
    const s = { q: '' };

    const matches = (...parts) => {
        const q = s.q.trim().toLowerCase().replace(/\s/g, '');
        return !q || parts.join(' ').toLowerCase().replace(/\s/g, '').includes(q);
    };

    function emergencyCard(e) {
        return `<a href="tel:${e.number}" class="${ui.CARD} p-3 flex items-center gap-3 hover:shadow-md transition">
            <span class="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0" style="background:${e.color}"><i class="fa-solid ${e.icon}"></i></span>
            <span class="min-w-0 flex-1">
                <span class="block text-[11px] text-slate-500">${esc(tx(e.label))}</span>
                <span class="block text-xl font-medium text-slate-800 leading-tight" dir="ltr">${e.number}</span>
            </span>
            <i class="fa-solid fa-phone text-vq-teal text-xs"></i>
        </a>`;
    }

    VQ.boot({
        title: () => t('hlTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-headset', title: t('hlTitle'), desc: t('hlDesc'), crumbs: [{ label: t('navHotlines') }] }) +
                ui.toolbar([ui.row(ui.searchInput({ id: 'hlQ', value: s.q, placeholder: t('hlSearch') }))]) +
                `<div id="results" class="space-y-6"></div>`
            );
            this.update();
        },

        update() {
            const emergency = H.emergency.filter(e => matches(e.label.ar, e.label.en, e.number));
            const contacts = H.contacts.filter(c => matches(c.department.ar, c.department.en, c.role.ar, c.role.en, c.number));

            let html = '';
            if (emergency.length) {
                html += `<section class="space-y-3">${ui.groupTitle(t('hlEmergency'), 'fa-truck-medical')}
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">${emergency.map(emergencyCard).join('')}</div></section>`;
            }
            if (contacts.length) {
                html += ui.sectionCard({
                    title: t('hlContacts'), icon: 'fa-address-book', bodyClass: 'p-0',
                    body: `<div class="overflow-x-auto"><table class="w-full text-xs min-w-[32rem]">
                        <thead class="text-[11px] text-slate-500 border-b border-slate-100">
                            <tr>
                                <th class="text-start font-medium px-4 py-3">${t('department')}</th>
                                <th class="text-start font-medium px-4 py-3">${t('hlResponsible')}</th>
                                <th class="text-start font-medium px-4 py-3">${t('hlNumber')}</th>
                                <th class="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${contacts.map(c => `<tr class="hover:bg-slate-50 transition">
                                <td class="px-4 py-3">
                                    <span class="flex items-center gap-3">
                                        <span class="w-9 h-9 rounded-xl bg-vq-teal/10 text-vq-teal flex items-center justify-center shrink-0"><i class="fa-solid ${c.icon}"></i></span>
                                        <span class="font-medium text-slate-800">${esc(tx(c.department))}</span>
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-slate-600 whitespace-nowrap">${esc(tx(c.role))}</td>
                                <td class="px-4 py-3 text-slate-800 font-medium whitespace-nowrap"><span dir="ltr">${c.number}</span></td>
                                <td class="px-4 py-3">
                                    <span class="flex justify-end gap-1">
                                        <button type="button" data-copy="${c.number}" class="${ui.BTN.icon}" title="${t('hlCopy')}"><i class="fa-regular fa-copy"></i></button>
                                        <a href="tel:${c.number.replace(/\s/g, '')}" class="${ui.BTN.icon}" title="${t('hlCall')}"><i class="fa-solid fa-phone"></i></a>
                                    </span>
                                </td>
                            </tr>`).join('')}
                        </tbody>
                    </table></div>`
                });
            }
            VQ.$('#results').innerHTML = html || ui.emptyState('fa-headset');
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'hlQ') { s.q = e.target.value; this.update(); }
            });
        }
    });
})();
