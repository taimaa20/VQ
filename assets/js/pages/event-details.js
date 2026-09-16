/* Event details — BRD 7.3 & 8.5 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const e = D.events.find(x => x.id === VQ.param('id')) || D.events[0];
    const catOf = key => D.eventCategories.find(c => c.key === key);

    VQ.boot({
        title: () => tx(e.title),

        render() {
            const cat = catOf(e.category);

            const header = ui.detailHeader({
                crumbs: [{ label: t('navEvents'), href: VQ.href('events') }, { label: tx(e.title) }],
                title: esc(tx(e.title)),
                chips: ui.tag(tx(cat.label), 'teal', cat.icon) + ui.statusTag(VQ.status(e.start, e.end)),
                meta: [
                    { icon: 'fa-regular fa-calendar', text: VQ.fmtRange(e.start, e.end, 'long') },
                    { icon: 'fa-solid fa-location-dot', text: esc(tx(e.location)) }
                ]
            });

            const article = `<article class="space-y-5">
                <div class="relative rounded-2xl overflow-hidden">
                    ${VQ.img(e.image, 'w-full aspect-[16/8] object-cover', 1400)}
                    <div class="absolute bottom-4 start-4">${ui.dateBadge(e.start)}</div>
                </div>
                <div class="space-y-5">
                    <div>
                        <h2 class="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2"><i class="fa-solid fa-file-lines text-vq-teal"></i>${t('evAbout')}</h2>
                        <div class="space-y-3 text-sm text-slate-700 leading-loose">${ui.paragraphs(e.body)}</div>
                    </div>
                    ${ui.facts([
                        { icon: 'fa-hashtag', label: t('evNumber'), value: `<span dir="ltr">${e.number}</span>` },
                        { icon: 'fa-building', label: t('department'), value: VQ.deptName(e.department) },
                        { icon: 'fa-calendar-plus', label: t('startDate'), value: VQ.fmtDate(e.start) },
                        { icon: 'fa-calendar-xmark', label: t('endDate'), value: VQ.fmtDate(e.end) }
                    ])}
                    ${e.album ? `<a href="${VQ.href('album', { id: e.album })}" class="${ui.BTN.soft}"><i class="fa-solid fa-images"></i>${t('evViewPhotos')}</a>` : ''}
                </div>
                ${ui.articleFooter(t('backTo', { x: t('navEvents') }), VQ.href('events'))}
            </article>`;

            VQ.content(header + article);
        }
    });
})();
