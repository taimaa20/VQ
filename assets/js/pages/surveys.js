/* Surveys & polls — BRD 7.4 & 8.13 (front-end only: votes are not saved) */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const selected = {};  // poll id -> option index (before voting)
    const voted = {};     // poll id -> option index (after voting)

    function pollCard(p) {
        const hasVoted = voted[p.id] != null;
        const choice = hasVoted ? voted[p.id] : selected[p.id];
        const votes = p.votes.map((v, i) => v + (voted[p.id] === i ? 1 : 0));
        const total = votes.reduce((a, b) => a + b, 0);

        const options = D.satisfactionOptions.map((o, i) => {
            if (hasVoted) {
                const pct = total ? votes[i] / total * 100 : 0;
                const mine = voted[p.id] === i;
                return `<div class="space-y-1">
                    <div class="flex items-center justify-between gap-2 text-xs">
                        <span class="${mine ? 'text-vq-teal font-medium' : 'text-slate-700'} flex items-center gap-1.5">${mine ? '<i class="fa-solid fa-circle-check"></i>' : ''}${esc(tx(o))}</span>
                        <span class="text-slate-500 tabular-nums" dir="ltr">${pct.toFixed(1)}%</span>
                    </div>
                    <div class="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div class="poll-bar h-full rounded-full ${mine ? 'bg-vq-teal' : 'bg-vq-teal/35'}" style="width:0" data-width="${pct}"></div>
                    </div>
                </div>`;
            }
            const on = choice === i;
            return `<button type="button" data-option="${p.id}:${i}" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-xs text-start transition ${on ? 'border-vq-teal bg-vq-teal text-white' : 'border-slate-200 text-slate-700 hover:border-vq-teal hover:bg-vq-teal/5'}">
                <span class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${on ? 'border-white' : 'border-slate-300'}">${on ? '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>' : ''}</span>
                ${esc(tx(o))}
            </button>`;
        }).join('');

        return `<div class="py-5 first:pt-1 flex flex-col">
            <div class="flex items-start justify-between gap-3 mb-4">
                <h3 class="text-sm font-medium text-slate-800 leading-relaxed">${esc(tx(p.question))}</h3>
                <span class="shrink-0">${hasVoted ? ui.tag(t('svThanks'), 'green', 'fa-check') : ui.tag(t('svEnds', { d: VQ.fmtDate(p.end, 'short') }), 'slate', 'fa-clock')}</span>
            </div>
            <div class="${hasVoted ? 'space-y-3' : 'space-y-2'} mb-4">${options}</div>
            <div class="mt-auto flex flex-wrap items-center justify-between gap-2">
                ${hasVoted
                    ? `<span class="text-[10px] text-slate-400"><i class="fa-solid fa-chart-simple me-1"></i>${t('svVotes', { n: total })} · ${t('svIllustrative')}</span>
                       <button type="button" data-change="${p.id}" class="text-xs text-vq-teal hover:underline font-medium"><i class="fa-solid fa-rotate-left me-1"></i>${t('svChange')}</button>`
                    : `<button type="button" data-clear="${p.id}" class="inline-flex items-center gap-2 text-xs bg-vq-ruby/10 hover:bg-vq-ruby/15 text-vq-ruby font-medium px-4 py-2 rounded-xl transition"><i class="fa-solid fa-eraser"></i>${t('svClear')}</button>
                       <button type="button" data-vote="${p.id}" class="${ui.BTN.primary} disabled:opacity-40 disabled:pointer-events-none" ${choice == null ? 'disabled' : ''}><i class="fa-solid fa-check-to-slot"></i>${t('svVote')}</button>`}
            </div>
        </div>`;
    }

    function openIndepth(sv) {
        VQ.openModal({
            title: esc(tx(sv.title)), icon: 'fa-clipboard-list', size: 'max-w-xl',
            body: `<form id="indepthForm" class="p-5 space-y-5">
                <p class="text-[11px] text-slate-500 bg-slate-50 rounded-xl p-3 flex gap-2"><i class="fa-solid fa-circle-info text-vq-teal mt-0.5"></i>${t('svFormIntro')}</p>
                <div>
                    <p class="text-xs font-medium text-slate-800 mb-2">1. ${t('svFormQ1')}</p>
                    <div class="flex gap-1" dir="ltr">${[1, 2, 3, 4, 5].map(n => `<label class="cursor-pointer"><input type="radio" name="r" class="peer sr-only"><span class="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-xs text-slate-600 peer-checked:bg-vq-teal peer-checked:text-white peer-checked:border-vq-teal hover:border-vq-teal transition">${n}</span></label>`).join('')}</div>
                </div>
                <div>
                    <p class="text-xs font-medium text-slate-800 mb-2">2. ${t('svFormQ2')}</p>
                    <select class="vq-input vq-select">
                        <option>${t('svSelectService')}</option>
                        ${D.departments.map(x => `<option>${esc(tx(x.name))}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <p class="text-xs font-medium text-slate-800 mb-2">3. ${t('svFormQ3')}</p>
                    <textarea rows="3" class="vq-input resize-none"></textarea>
                </div>
            </form>`,
            footer: `<button type="button" class="${ui.BTN.secondary}" data-modal-close>${t('cancel')}</button>
                <button type="submit" form="indepthForm" class="${ui.BTN.primary}"><i class="fa-solid fa-paper-plane"></i>${t('submit')}</button>`
        });
        VQ.$('#indepthForm').addEventListener('submit', e => {
            e.preventDefault();
            VQ.closeModal();
            VQ.toast(t('svSubmitted'));
        });
    }

    VQ.boot({
        title: () => t('svTitle'),

        render() {
            VQ.content(
                ui.pageHeader({ icon: 'fa-square-poll-vertical', title: t('svTitle'), desc: t('svDesc'), crumbs: [{ label: t('navSurveys') }] }) +
                ui.groupTitle(t('svQuick'), 'fa-chart-simple') +
                `<div class="divide-y divide-slate-100 border-b border-slate-100">${D.polls.map(pollCard).join('')}</div>` +
                ui.groupTitle(t('svIndepth'), 'fa-clipboard-list') +
                `<div class="divide-y divide-slate-100">` +
                D.indepthSurveys.map(sv => `<div class="py-4 first:pt-1 flex flex-col md:flex-row md:items-center gap-4">
                    <span class="w-12 h-12 rounded-xl bg-vq-teal/10 text-vq-teal text-lg flex items-center justify-center shrink-0"><i class="fa-solid fa-clipboard-list"></i></span>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-slate-800">${esc(tx(sv.title))}</h3>
                        <p class="text-xs text-slate-500 mt-1">${esc(tx(sv.description))}</p>
                        <div class="flex flex-wrap gap-2 mt-2">${ui.tag(t('svMinutes', { n: sv.minutes }), 'slate', 'fa-clock')}${ui.tag(t('svEnds', { d: VQ.fmtDate(sv.end, 'short') }), 'amber', 'fa-calendar')}</div>
                    </div>
                    <button type="button" data-indepth="${sv.id}" class="${ui.BTN.primary} shrink-0">${t('svOpenForm')} <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></button>
                </div>`).join('') +
                `</div>`
            );
            requestAnimationFrame(() => requestAnimationFrame(() =>
                VQ.$$('.poll-bar').forEach(b => { b.style.width = b.dataset.width + '%'; })));
        },

        setup(root) {
            root.addEventListener('click', e => {
                const opt = e.target.closest('[data-option]');
                if (opt) {
                    const [id, i] = opt.dataset.option.split(':');
                    selected[id] = Number(i);
                    this.render();
                    return;
                }
                const vote = e.target.closest('[data-vote]');
                if (vote) {
                    voted[vote.dataset.vote] = selected[vote.dataset.vote];
                    VQ.toast(t('svThanks'), 'fa-check-to-slot');
                    this.render();
                    return;
                }
                const clear = e.target.closest('[data-clear]');
                if (clear) { delete selected[clear.dataset.clear]; this.render(); return; }
                const change = e.target.closest('[data-change]');
                if (change) {
                    selected[change.dataset.change] = voted[change.dataset.change];
                    delete voted[change.dataset.change];
                    this.render();
                    return;
                }
                const indepth = e.target.closest('[data-indepth]');
                if (indepth) openIndepth(D.indepthSurveys.find(x => x.id === indepth.dataset.indepth));
            });
        }
    });
})();
