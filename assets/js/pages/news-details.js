/* News details — BRD 8.4 */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const n = D.news.find(x => x.id === VQ.param('id')) || D.news[0];
    const catOf = key => D.newsCategories.find(c => c.key === key);

    VQ.boot({
        title: () => tx(n.title),

        render() {
            const header = ui.detailHeader({
                crumbs: [{ label: t('navNews'), href: VQ.href('news') }, { label: tx(n.title) }],
                title: esc(tx(n.title)),
                chips: ui.tag(tx(catOf(n.category).label), 'teal', 'fa-tag'),
                meta: [{ icon: 'fa-regular fa-calendar', text: VQ.fmtDate(n.date, 'long') }]
            });

            const article = `<article class="space-y-5">
                ${VQ.img(n.image, 'w-full aspect-[16/8] object-cover rounded-2xl', 1400)}
                <div>
                    <p class="text-sm md:text-base text-slate-800 font-medium leading-relaxed mb-4">${esc(tx(n.summary))}</p>
                    <div class="space-y-3 text-sm text-slate-700 leading-loose">${ui.paragraphs(n.body)}</div>
                </div>
                ${ui.articleFooter(t('backTo', { x: t('navNews') }), VQ.href('news'))}
            </article>`;

            VQ.content(header + article);
        }
    });
})();
