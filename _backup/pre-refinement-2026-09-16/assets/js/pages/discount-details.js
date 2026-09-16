/* Discount details — BRD 7.5 & 8.7 (offer document shown as a static PDF preview) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const d = D.discounts.find(x => x.id === VQ.param('id')) || D.discounts[0];
    const catOf = key => D.discountCategories.find(c => c.key === key);

    /* The offer "PDF" page — layout follows the reference offer document */
    function offerPage() {
        const groups = d.offers
            ? d.offers.map(g => `<div>
                <h3 class="text-base font-medium">${esc(tx(g.group))}:</h3>
                <ul class="mt-2 space-y-1 text-sm text-white/90">${g.rows.map(r => `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-white/80"></span><span dir="ltr">${r.percent}%</span> ${esc(tx(r.label))}</li>`).join('')}</ul>
            </div>`).join('')
            : `<div>
                <h3 class="text-base font-medium">${esc(tx(d.partner))}:</h3>
                <p class="mt-2 text-sm text-white/90">${t('dsUpTo')} <span dir="ltr">${d.percent}%</span> ${t('dsOff')}</p>
                <p class="mt-2 text-sm text-white/80 leading-relaxed">${esc(tx(d.summary))}</p>
            </div>`;

        return `<div class="bg-gradient-to-b from-vq-teal-light to-vq-teal text-white min-h-[34rem]">
            <div class="relative h-48 overflow-hidden">
                ${VQ.img(d.image, 'absolute inset-0 w-full h-full object-cover', 1000)}
                <div class="absolute inset-0 bg-gradient-to-t from-vq-teal-light via-vq-teal-light/20 to-transparent"></div>
                <h2 class="absolute bottom-3 start-6 end-6 text-2xl sm:text-3xl font-medium drop-shadow">${esc(tx(d.title))}</h2>
            </div>
            <div class="px-6 pb-8 pt-4 space-y-5">
                ${groups}
                <div>
                    <h3 class="text-base font-medium">${t('dsTermsApply')}</h3>
                    <ul class="mt-2 space-y-1 text-sm text-white/90">${d.terms.map(term => `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-white/80"></span>${esc(tx(term))}</li>`).join('')}</ul>
                </div>
                <p class="text-[10px] text-white/70 pt-4 border-t border-white/20">${t('dsValidity')}: ${VQ.fmtRange(d.start, d.end)}</p>
            </div>
        </div>`;
    }

    VQ.boot({
        title: () => tx(d.title),

        render() {
            const cat = catOf(d.category);
            const days = VQ.daysUntil(d.end);

            const header = ui.detailHeader({
                crumbs: [{ label: t('navDiscounts'), href: VQ.href('discounts') }, { label: tx(d.title) }],
                title: esc(tx(d.title)),
                chips: ui.tag(`${t('dsUpTo')} <span dir="ltr">${d.percent}%</span>`, 'solidRuby', 'fa-percent') + ui.tag(tx(cat.label), 'teal', cat.icon),
                meta: [
                    { icon: 'fa-regular fa-calendar', text: VQ.fmtRange(d.start, d.end, 'long') },
                    { icon: 'fa-solid fa-store', text: esc(tx(d.partner)) }
                ]
            });

            const article = `<article class="${ui.CARD} overflow-hidden">
                <div class="relative h-56 md:h-64 bg-slate-800">
                    ${VQ.img(d.image, 'absolute inset-0 w-full h-full object-cover opacity-90', 1400)}
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <div class="absolute bottom-4 start-4 bg-vq-ruby text-white rounded-2xl px-4 py-2 text-center shadow-xl">
                        <span class="block text-[10px] text-white/85">${t('dsUpTo')}</span>
                        <span class="block text-3xl font-medium leading-none" dir="ltr">${d.percent}%</span>
                    </div>
                </div>
                <div class="p-5 md:p-6 space-y-5">
                    <div>
                        <h2 class="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2"><i class="fa-solid fa-gift text-vq-teal"></i>${t('dsOverview')}</h2>
                        <div class="space-y-3 text-sm text-slate-700 leading-loose">${ui.paragraphs(d.body)}</div>
                    </div>
                    <div>
                        <h2 class="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2"><i class="fa-solid fa-list-check text-vq-teal"></i>${t('dsTerms')}</h2>
                        <ul class="space-y-2">${d.terms.map(term => `<li class="flex items-start gap-2 text-xs text-slate-700"><i class="fa-solid fa-circle-check text-vq-green mt-0.5"></i>${esc(tx(term))}</li>`).join('')}</ul>
                    </div>
                    ${ui.facts([
                        { icon: 'fa-calendar-xmark', label: t('endDate'), value: VQ.fmtDate(d.end) },
                        { icon: 'fa-hourglass-half', label: t('dsTimeLeft'), value: `<span class="${days <= 30 ? 'text-vq-amber' : ''}">${days < 0 ? t('expired') : t('daysLeft', { n: days })}</span>` }
                    ])}
                    <div>
                        <h2 class="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2"><i class="fa-solid fa-file-pdf text-vq-teal"></i>${t('dsDocument')}</h2>
                        ${ui.docViewer({ fileName: d.document, pages: 1, content: offerPage(), height: '30rem' })}
                    </div>
                </div>
                ${ui.articleFooter(t('backTo', { x: t('navDiscounts') }), VQ.href('discounts'))}
            </article>`;

            VQ.content(header + article);
        }
    });
})();
