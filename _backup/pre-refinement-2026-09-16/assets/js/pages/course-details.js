/* Course details — BRD 7.7 (display only: no registration in this prototype) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const c = D.courses.find(x => x.id === VQ.param('id')) || D.courses[0];
    const typeOf = key => D.courseTypes.find(x => x.key === key);

    VQ.boot({
        title: () => tx(c.title),

        render() {
            const type = typeOf(c.type);

            const header = ui.detailHeader({
                crumbs: [{ label: t('navCourses'), href: VQ.href('courses') }, { label: tx(c.title) }],
                title: esc(tx(c.title)),
                chips: ui.tag(tx(type.label), 'teal', type.icon),
                meta: [
                    { icon: 'fa-regular fa-calendar', text: VQ.fmtDate(c.start, 'long') },
                    { icon: 'fa-regular fa-clock', text: esc(tx(c.duration)) }
                ]
            });

            const media = c.video
                ? `<div class="p-3 bg-slate-900">${ui.videoPlayer({ poster: c.image, title: tx(c.title), length: c.videoLength })}</div>`
                : VQ.img(c.image, 'w-full aspect-[16/8] object-cover', 1400);

            const article = `<article class="${ui.CARD} overflow-hidden">
                ${media}
                <div class="p-5 md:p-6 space-y-5">
                    <div>
                        <h2 class="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2"><i class="fa-solid fa-file-lines text-vq-teal"></i>${t('crOverview')}</h2>
                        <p class="text-sm text-slate-700 leading-loose">${esc(tx(c.summary))}</p>
                    </div>
                    <div>
                        <h2 class="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2"><i class="fa-solid fa-bullseye text-vq-teal"></i>${t('crObjectives')}</h2>
                        <ul class="space-y-2">
                            ${c.objectives.map(o => `<li class="flex items-start gap-2 text-xs text-slate-700"><i class="fa-solid fa-circle-check text-vq-green mt-0.5"></i>${esc(tx(o))}</li>`).join('')}
                        </ul>
                    </div>
                    ${ui.facts([
                        { icon: 'fa-location-dot', label: t('crMode'), value: esc(tx(c.mode)) },
                        { icon: 'fa-building', label: t('crProvider'), value: esc(tx(c.provider)) }
                    ])}
                </div>
                ${ui.articleFooter(t('backTo', { x: t('navCourses') }), VQ.href('courses'))}
            </article>`;

            VQ.content(header + article);
        }
    });
})();
