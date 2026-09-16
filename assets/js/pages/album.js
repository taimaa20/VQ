/* Album detail + full-size image viewer (BRD 8.2) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const album = D.albums.find(a => a.id === VQ.param('id')) || D.albums[0];
    let current = -1;

    function lightboxHTML(i) {
        const total = album.photos.length;
        return `<div class="fixed inset-0 z-[80] bg-slate-950/95 flex flex-col vq-lightbox" data-lightbox role="dialog" aria-modal="true">
            <div class="flex items-center justify-between gap-3 px-4 py-3 text-white">
                <div class="min-w-0">
                    <p class="text-sm font-medium truncate">${esc(tx(album.title))}</p>
                    <p class="text-[11px] text-white/60"><span dir="ltr">${i + 1} / ${total}</span></p>
                </div>
                <button type="button" data-lb-close class="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-xl" aria-label="${t('close')}"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="relative flex-1 flex items-center justify-center px-4 min-h-0" dir="ltr">
                <button type="button" data-lb-step="-1" class="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="${t('prev')}"><i class="fa-solid fa-chevron-left"></i></button>
                <img src="${VQ.photo(album.photos[i], 1800)}" alt="" class="max-w-full rounded-xl shadow-2xl object-contain" onerror="this.onerror=null;this.src=VQ.FALLBACK_IMG;">
                <button type="button" data-lb-step="1" class="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="${t('next')}"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <div class="flex justify-center gap-2 px-4 py-4 overflow-x-auto no-scrollbar" dir="ltr">
                ${album.photos.map((p, n) => `<button type="button" data-lb-go="${n}" class="shrink-0 rounded-lg overflow-hidden border-2 ${n === i ? 'border-vq-amber' : 'border-transparent opacity-60 hover:opacity-100'} transition">
                    ${VQ.img(p, 'w-16 h-12 object-cover', 200)}
                </button>`).join('')}
            </div>
        </div>`;
    }

    function openLightbox(i) {
        current = (i + album.photos.length) % album.photos.length;
        VQ.$('#vqModalRoot').innerHTML = lightboxHTML(current);
        document.documentElement.classList.add('overflow-hidden');
    }

    function closeLightbox() {
        current = -1;
        VQ.$('#vqModalRoot').innerHTML = '';
        document.documentElement.classList.remove('overflow-hidden');
    }

    VQ.boot({
        title: () => tx(album.title),

        render() {
            VQ.content(
                ui.detailHeader({
                    crumbs: [{ label: t('navPhotos'), href: VQ.href('photo-gallery') }, { label: tx(album.title) }],
                    title: esc(tx(album.title)),
                    meta: [
                        { icon: 'fa-regular fa-calendar', text: VQ.fmtDate(album.date, 'long') },
                        { icon: 'fa-regular fa-images', text: t('pgPhotos', { n: album.photos.length }) }
                    ]
                }) +
                `<div class="columns-2 md:columns-3 gap-3 [&>*]:mb-3">
                    ${album.photos.map((p, i) => `<button type="button" data-photo="${i}" class="group relative block w-full break-inside-avoid rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
                        ${VQ.img(p, `w-full ${['h-56', 'h-40', 'h-48', 'h-64', 'h-44'][i % 5]} object-cover transition duration-500 group-hover:scale-105`, 700)}
                        <span class="absolute inset-0 bg-vq-teal/0 group-hover:bg-vq-teal/30 transition flex items-center justify-center">
                            <span class="w-10 h-10 rounded-full bg-white/90 text-vq-teal flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><i class="fa-solid fa-expand"></i></span>
                        </span>
                    </button>`).join('')}
                </div>` +
                `<div>${ui.backButton(t('backTo', { x: t('navPhotos') }), VQ.href('photo-gallery'))}</div>`
            );
        },

        setup(root) {
            root.addEventListener('click', e => {
                const photo = e.target.closest('[data-photo]');
                if (photo) openLightbox(Number(photo.dataset.photo));
            });
            document.addEventListener('click', e => {
                if (current < 0) return;
                if (e.target.closest('[data-lb-close]')) { closeLightbox(); return; }
                const step = e.target.closest('[data-lb-step]');
                if (step) { openLightbox(current + Number(step.dataset.lbStep)); return; }
                const go = e.target.closest('[data-lb-go]');
                if (go) openLightbox(Number(go.dataset.lbGo));
            });
            document.addEventListener('keydown', e => {
                if (current < 0) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') openLightbox(current + 1);
                if (e.key === 'ArrowLeft') openLightbox(current - 1);
            });
        }
    });
})();
