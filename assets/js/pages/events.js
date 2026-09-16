/* Events & Calendars listing — BRD 7.3 (grid · calendar) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const VIEWS = ['grid', 'calendar'];
    const s = {
        q: '', category: 'all', from: '', to: '', page: 1,
        view: VIEWS.indexOf(VQ.param('view')) !== -1 ? VQ.param('view') : 'grid',
        month: VQ.isoDate(VQ.today()).slice(0, 7),   // 'YYYY-MM' shown in the calendar
        day: null                                     // selected calendar day
    };
    const PAGE_SIZE = 4;

    /* Same weekday labels as the homepage calendar (week starts on Sunday) */
    const WEEKDAYS = { ar: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'], en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] };

    const catOf = key => D.eventCategories.find(c => c.key === key);
    const hasFilters = () => s.q || s.category !== 'all' || s.from || s.to;

    function filtered() {
        const q = s.q.trim().toLowerCase();
        return D.events
            .filter(e => s.category === 'all' || e.category === s.category)
            .filter(e => !s.from || e.end >= s.from)
            .filter(e => !s.to || e.start <= s.to)
            .filter(e => !q || (e.title.ar + ' ' + e.title.en + ' ' + e.number + ' ' + e.location.ar + ' ' + e.location.en).toLowerCase().includes(q))
            .sort((a, b) => b.start.localeCompare(a.start));
    }

    function card(e) {
        const cat = catOf(e.category);
        return `<a href="${VQ.href('event-details', { id: e.id })}" class="group ${ui.CARD} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col">
            <div class="relative h-44 bg-slate-200 overflow-hidden">
                ${VQ.img(e.image, 'w-full h-full object-cover transition duration-500 group-hover:scale-105', 700)}
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                <div class="absolute top-3 start-3">${ui.dateBadge(e.start)}</div>
                <div class="absolute top-3 end-3">${ui.statusTag(VQ.status(e.start, e.end))}</div>
            </div>
            <div class="p-4 flex-1 flex flex-col gap-2">
                <span class="self-start">${ui.tag(tx(cat.label), 'teal', cat.icon)}</span>
                <h3 class="text-sm font-medium text-slate-800 leading-snug line-clamp-2">${esc(tx(e.title))}</h3>
                <p class="text-[11px] text-slate-500 flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-vq-ruby"></i>${esc(tx(e.location))}</p>
                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">${esc(tx(e.summary))}</p>
                <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[10px] text-slate-400"><span dir="ltr">${e.number}</span></span>
                    <span class="text-xs text-vq-teal font-medium inline-flex items-center gap-1.5">${t('viewDetails')} ${ui.arrow()}</span>
                </div>
            </div>
        </a>`;
    }

    /* Same overlay style as the News top story */
    function featured(e) {
        const cat = catOf(e.category);
        return `<a href="${VQ.href('event-details', { id: e.id })}" class="group relative block h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-800">
            ${VQ.img(e.image, 'absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105', 1200)}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"></div>
            <span class="absolute top-4 start-4">${ui.tag(t('evNext'), 'solidAmber', 'fa-star')}</span>
            <div class="absolute top-4 end-4">${ui.dateBadge(e.start)}</div>
            <div class="absolute inset-x-0 bottom-0 p-5 text-white">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="text-[10px] bg-vq-teal text-white px-2 py-0.5 rounded-full">${tx(cat.label)}</span>
                    <span class="text-[11px] text-white/80"><i class="fa-solid fa-location-dot me-1"></i>${esc(tx(e.location))}</span>
                    <span class="text-[11px] text-amber-300"><i class="fa-solid fa-hourglass-half me-1"></i>${t('daysLeft', { n: VQ.daysUntil(e.start) })}</span>
                </div>
                <h2 class="text-lg md:text-xl font-medium leading-snug">${esc(tx(e.title))}</h2>
                <p class="text-xs text-white/80 mt-1.5 line-clamp-2">${esc(tx(e.summary))}</p>
            </div>
        </a>`;
    }

    /* Event row — same pattern as the homepage events list */
    function calendarRow(e) {
        return `<a href="${VQ.href('event-details', { id: e.id })}" class="flex gap-3 py-3 px-2 -mx-2 rounded-xl hover:bg-slate-50 transition">
            <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                ${VQ.img(e.image, 'w-full h-full object-cover', 200)}
                <div class="absolute bottom-0 inset-x-0 bg-vq-teal/90 text-white text-center text-[9px] py-0.5">${VQ.fmtDay(e.start)} ${VQ.fmtMonth(e.start)}</div>
            </div>
            <div class="min-w-0">
                <h3 class="text-xs font-medium text-slate-800 truncate">${esc(tx(e.title))}</h3>
                <p class="text-[11px] text-slate-500 mt-0.5"><i class="fa-solid fa-location-dot text-vq-ruby me-1"></i>${esc(tx(e.location))}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">${tx(catOf(e.category).label)} · ${VQ.fmtRange(e.start, e.end, 'short')}</p>
            </div>
        </a>`;
    }

    /* Month calendar based on the homepage calendar: event days highlighted, click a day to list its events */
    function calendarView(items) {
        const [y, m] = s.month.split('-').map(Number);
        const first = new Date(y, m - 1, 1);
        const days = new Date(y, m, 0).getDate();
        const monthStart = VQ.isoDate(first);
        const monthEnd = VQ.isoDate(new Date(y, m - 1, days));
        const todayIso = VQ.isoDate(VQ.today());
        const inMonth = items.filter(e => e.start <= monthEnd && e.end >= monthStart).sort((a, b) => a.start.localeCompare(b.start));
        const on = iso => inMonth.filter(e => e.start <= iso && e.end >= iso);

        let cells = '<span></span>'.repeat(first.getDay());
        for (let d = 1; d <= days; d++) {
            const iso = VQ.isoDate(new Date(y, m - 1, d));
            const dayEvents = on(iso);
            const base = 'h-10 sm:h-11 rounded-xl flex items-center justify-center text-xs transition';
            cells += dayEvents.length
                ? `<button type="button" data-cal-day="${iso}" title="${esc(dayEvents.map(e => tx(e.title)).join(' · '))}"
                    class="${base} bg-vq-teal hover:bg-vq-teal-dark text-white font-medium ${s.day === iso ? 'ring-2 ring-offset-2 ring-vq-amber' : ''}">${d}</button>`
                : `<span class="${base} ${iso === todayIso ? 'bg-vq-amber/15 text-vq-amber font-medium' : 'text-slate-600'}">${d}</span>`;
        }

        const list = s.day ? on(s.day) : inMonth;
        const monthLabel = new Intl.DateTimeFormat(VQ.isAr() ? 'ar-u-nu-latn' : 'en-GB', { month: 'long', year: 'numeric' }).format(first);
        const stepBtn = (step, icon, label) => `<button type="button" data-cal-step="${step}" class="${ui.BTN.icon} border border-slate-200" title="${label}" aria-label="${label}"><i class="fa-solid ${icon} dir-icon text-[10px]"></i></button>`;

        return `<div>
            <div class="flex items-center justify-between gap-2 mb-3">
                ${stepBtn(-1, 'fa-chevron-right', t('prevMonth'))}
                <h2 class="text-sm font-medium text-slate-800">${monthLabel}</h2>
                ${stepBtn(1, 'fa-chevron-left', t('nextMonth'))}
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 mb-1">${WEEKDAYS[VQ.state.lang].map(d => `<span>${d}</span>`).join('')}</div>
            <div class="grid grid-cols-7 gap-1">${cells}</div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-slate-500">
                <span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-vq-teal"></span>${t('evCalEventDay')}</span>
                <span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-vq-amber/40"></span>${t('evCalToday')}</span>
            </div>
        </div>
        <div class="pt-4 border-t border-slate-100">
            <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="text-xs font-medium text-slate-800">${s.day ? VQ.fmtDate(s.day, 'long') : `${t('evCalMonth')} (${inMonth.length})`}</h3>
                ${s.day ? `<button type="button" data-cal-day="" class="text-xs text-vq-teal hover:underline font-medium">${t('evCalShowMonth')}</button>` : ''}
            </div>
            ${list.length
                ? `<div class="mt-1 divide-y divide-slate-100">${list.map(calendarRow).join('')}</div>`
                : `<p class="mt-3 text-xs text-slate-400">${t('evCalEmpty')}</p>`}
        </div>`;
    }

    VQ.boot({
        title: () => t('evTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-calendar-days', title: t('evTitle'), desc: t('evDesc'), crumbs: [{ label: t('navEvents') }] }) +
                ui.toolbar([
                    ui.row(
                        ui.searchInput({ id: 'evQ', value: s.q, placeholder: t('evSearch') }) +
                        ui.select({ id: 'evCat', value: s.category, label: t('category'), options: [{ value: 'all', label: t('evAllCategories') }]
                            .concat(D.eventCategories.map(c => ({ value: c.key, label: tx(c.label) }))) })
                    ),
                    ui.row(
                        `<div class="flex flex-col sm:flex-row gap-2 flex-1 min-w-0">${ui.dateField({ id: 'evFrom', value: s.from, label: t('from') })}${ui.dateField({ id: 'evTo', value: s.to, label: t('to') })}</div>` +
                        ui.segmented({ name: 'view', active: s.view, items: [
                            { value: 'grid', icon: 'fa-grip', label: t('gridView') },
                            { value: 'calendar', icon: 'fa-calendar-days', label: t('calendarView') }
                        ] })
                    )
                ]) +
                `<div id="results" class="space-y-4"></div>`
            );
            this.update();
        },

        update() {
            let items = filtered();
            const box = VQ.$('#results');
            if (s.view === 'calendar') { box.innerHTML = calendarView(items); return; }
            if (!items.length) { box.innerHTML = ui.resultsBar(0) + ui.emptyState('fa-calendar-xmark'); return; }

            let html = '';
            const next = !hasFilters() && D.events.filter(e => VQ.daysUntil(e.start) > 0).sort((a, b) => a.start.localeCompare(b.start))[0];
            if (next) {
                if (s.page === 1) html += featured(next);
                items = items.filter(e => e.id !== next.id);
            }

            const { slice, pages } = ui.paginate(items, s, PAGE_SIZE);
            html += ui.groupTitle(t('evAll'), 'fa-calendar-days', `<span class="text-[11px] text-slate-500">${t('resultsCount', { n: filtered().length })}</span>`) +
                `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${slice.map(card).join('')}</div>` +
                ui.pagination(s.page, pages);
            box.innerHTML = html;
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'evQ') { s.q = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('change', e => {
                const map = { evCat: 'category', evFrom: 'from', evTo: 'to' };
                if (map[e.target.id]) { s[map[e.target.id]] = e.target.value; s.page = 1; this.update(); }
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) { s[chip.dataset.chip] = chip.dataset.value; this.render(); return; }
                const day = e.target.closest('[data-cal-day]');
                if (day) { s.day = day.dataset.calDay && day.dataset.calDay !== s.day ? day.dataset.calDay : null; this.update(); return; }
                const step = e.target.closest('[data-cal-step]');
                if (step) {
                    const [y, m] = s.month.split('-').map(Number);
                    s.month = VQ.isoDate(new Date(y, m - 1 + Number(step.dataset.calStep), 1)).slice(0, 7);
                    s.day = null;
                    this.update();
                    return;
                }
                const pg = e.target.closest('[data-page-num]');
                if (pg) { s.page = Number(pg.dataset.pageNum); this.update(); VQ.$('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        }
    });
})();
