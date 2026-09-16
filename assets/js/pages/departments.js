/* Departments — BRD 7.1 & 8.1: department selector, folders & files, search (view only) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const s = {
        dept: D.departments.some(d => d.key === VQ.param('dept')) ? VQ.param('dept') : D.departments[0].key,
        folder: null,
        q: ''
    };

    const current = () => VQ.dept(s.dept);

    function folderTile(f) {
        return `<button type="button" data-folder="${f.key}" class="group rounded-xl border border-slate-200 p-3 text-start hover:border-vq-teal hover:shadow-sm transition bg-white">
            <span class="flex items-center justify-between">
                <i class="fa-solid fa-folder text-3xl text-vq-amber group-hover:text-vq-teal transition"></i>
                <span class="text-[10px] text-slate-400">${t('plFiles', { n: f.files.length })}</span>
            </span>
            <span class="block mt-2 text-xs font-medium text-slate-800 truncate">${esc(tx(f.name))}</span>
        </button>`;
    }

    function fileTile(f) {
        const icon = VQ.fileIcon(f.name);
        return `<div class="rounded-xl border border-slate-200 p-3 bg-white hover:border-vq-teal hover:shadow-sm transition flex flex-col">
            <button type="button" data-file="${esc(f.name)}" class="flex items-start gap-3 text-start">
                <span class="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-xl shrink-0 ${icon.color}"><i class="fa-solid ${icon.icon}"></i></span>
                <span class="min-w-0">
                    <span class="block text-xs font-medium text-slate-800 truncate" dir="ltr">${esc(f.name)}</span>
                    <span class="block text-[10px] text-slate-400 mt-0.5">${icon.ext} · <span dir="ltr">${f.size}</span></span>
                </span>
            </button>
            <span class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>${VQ.fmtDate(f.date, 'short')}</span>
                <span class="flex">
                    <button type="button" data-file="${esc(f.name)}" class="${ui.BTN.icon} w-7 h-7" title="${t('view')}"><i class="fa-regular fa-eye"></i></button>
                </span>
            </span>
        </div>`;
    }

    function browser() {
        const d = current();
        const folder = s.folder && d.folders.find(f => f.key === s.folder);
        const q = s.q.trim().toLowerCase();

        let folders = folder ? [] : d.folders;
        let files = folder ? folder.files : d.files;
        if (q) {
            /* Search the whole section, including files inside folders */
            folders = d.folders.filter(f => (f.name.ar + ' ' + f.name.en).toLowerCase().includes(q));
            files = d.files.concat(...d.folders.map(f => f.files)).filter(f => f.name.toLowerCase().includes(q));
        }

        const crumbs = `<div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button type="button" data-folder="" class="${folder ? 'text-slate-500 hover:text-vq-teal' : 'text-vq-teal font-medium'}"><i class="fa-solid fa-house-chimney me-1"></i>${esc(tx(d.name))}</button>
            ${folder ? `<i class="fa-solid fa-chevron-left dir-icon text-[8px] text-slate-300"></i><span class="text-vq-teal font-medium">${esc(tx(folder.name))}</span>` : ''}
        </div>`;

        const body = !folders.length && !files.length
            ? `<div class="py-12 text-center text-xs text-slate-400"><i class="fa-regular fa-folder-open text-3xl mb-2 block"></i>${t('dpEmpty')}</div>`
            : (folders.length ? `<p class="text-[11px] font-medium text-slate-500 mb-2">${t('dpFolders')}</p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">${folders.map(folderTile).join('')}</div>` : '') +
              (files.length ? `<p class="text-[11px] font-medium text-slate-500 mb-2">${t('dpFiles')}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${files.map(fileTile).join('')}</div>` : '');

        return `<div class="space-y-4">
            <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-vq-teal/10 text-vq-teal flex items-center justify-center shrink-0"><i class="fa-solid ${d.icon}"></i></span>
                <div class="flex-1 min-w-0">
                    <h2 class="text-sm font-medium text-slate-800">${esc(tx(d.name))}</h2>
                    <p class="text-xs text-slate-500">${esc(tx(d.description))}</p>
                </div>
            </div>
            <div class="py-2.5 border-y border-slate-100">${crumbs}</div>
            <div>${body}</div>
        </div>`;
    }

    VQ.boot({
        title: () => t('dpTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-sitemap', title: t('dpTitle'), desc: t('dpDesc'), crumbs: [{ label: t('navDepts') }] }) +
                ui.toolbar([
                    ui.row(
                        ui.searchInput({ id: 'dpQ', value: s.q, placeholder: t('dpSearch') }) +
                        ui.select({ id: 'dpDept', value: s.dept, label: t('dpSections'), options: D.departments.map(d => ({ value: d.key, label: tx(d.name) })) })
                    )
                ]) +
                `<div id="dpBrowser">${browser()}</div>`
            );
        },

        setup(root) {
            root.addEventListener('input', e => {
                if (e.target.id === 'dpQ') { s.q = e.target.value; VQ.$('#dpBrowser').innerHTML = browser(); }
            });
            root.addEventListener('change', e => {
                if (e.target.id === 'dpDept') { s.dept = e.target.value; s.folder = null; VQ.$('#dpBrowser').innerHTML = browser(); }
            });
            root.addEventListener('click', e => {
                const folder = e.target.closest('[data-folder]');
                if (folder) {
                    s.folder = folder.dataset.folder || null;
                    s.q = '';
                    VQ.$('#dpQ').value = '';
                    VQ.$('#dpBrowser').innerHTML = browser();
                    return;
                }
                const file = e.target.closest('[data-file]');
                if (file) {
                    const name = file.dataset.file;
                    ui.openDocument({
                        title: name, fileName: name, pages: 3,
                        content: ui.docLetterhead(`<span dir="ltr">${esc(name)}</span>`, esc(tx(current().name))) + ui.docSkeleton(4)
                    });
                }
            });
        }
    });
})();
