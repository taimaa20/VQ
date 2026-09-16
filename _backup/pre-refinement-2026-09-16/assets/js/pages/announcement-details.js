/* Announcement details — BRD 7.2 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const a = D.announcements.find(x => x.id === VQ.param('id')) || D.announcements[0];
    const typeOf = key => D.announcementTypes.find(x => x.key === key);

    function openAttachment() {
        ui.openDocument({
            title: tx(a.title),
            fileName: a.attachment,
            pages: 2,
            content: ui.docLetterhead(esc(tx(a.title)), a.number) + ui.docSkeleton(4)
        });
    }

    VQ.boot({
        title: () => tx(a.title),

        render() {
            const ty = typeOf(a.type);

            const header = ui.detailHeader({
                crumbs: [{ label: t('navAnnouncements'), href: VQ.href('announcements') }, { label: tx(a.title) }],
                title: esc(tx(a.title)),
                chips: `<span class="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-lg text-white" style="background:${ty.color}">${tx(ty.label)}</span>`,
                meta: [{ icon: 'fa-regular fa-calendar', text: VQ.fmtDate(a.start, 'long') }]
            });

            const article = `<article class="${ui.CARD} overflow-hidden">
                <img src="${VQ.photo(ty.image)}" alt="" class="w-full aspect-[16/8] object-cover">
                <div class="p-5 md:p-6 space-y-3 text-sm text-slate-700 leading-loose">${ui.paragraphs(a.body)}</div>
                <div class="px-5 md:px-6 pb-5">${ui.facts([
                    { icon: 'fa-hashtag', label: t('annNumber'), value: `<span dir="ltr">${a.number}</span>` },
                    { icon: 'fa-building', label: t('issuedBy'), value: esc(tx(a.issuer)) },
                    { icon: 'fa-calendar-plus', label: t('startDate'), value: VQ.fmtDate(a.start) },
                    { icon: 'fa-calendar-xmark', label: t('endDate'), value: VQ.fmtDate(a.end) }
                ])}</div>
                ${a.attachment ? `<div class="mx-5 md:mx-6 mb-5 flex flex-wrap items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <span class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-red-600"><i class="fa-solid fa-file-pdf"></i></span>
                    <div class="min-w-0 flex-1">
                        <p class="text-xs font-medium text-slate-800 truncate"><span dir="ltr">${a.attachment}</span></p>
                        <p class="text-[10px] text-slate-500">PDF · 1.2 MB</p>
                    </div>
                    <button type="button" data-open-attachment class="${ui.BTN.soft}"><i class="fa-regular fa-eye"></i>${t('viewAttachment')}</button>
                </div>` : ''}
                ${a.link ? `<div class="px-5 md:px-6 pb-5"><a href="${VQ.href(a.link.page)}" class="${ui.BTN.primary}">${esc(tx(a.link.label))} ${ui.arrow()}</a></div>` : ''}
                ${ui.articleFooter(t('backTo', { x: t('navAnnouncements') }), VQ.href('announcements'))}
            </article>`;

            VQ.content(header + article);
        },

        setup(root) {
            root.addEventListener('click', e => {
                if (e.target.closest('[data-open-attachment]')) openAttachment();
            });
        }
    });
})();
