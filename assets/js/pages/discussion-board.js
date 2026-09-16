/* Discussion Board — BRD 7.11 (anonymous / alias posting, with a poll). Posts live only in memory. */
(function () {
    const { t, tx, esc, ui, D } = VQ;
    const topics = D.discussions.map(x => Object.assign({ liked: false, open: false }, x, { replies: x.replies.slice() }));
    const s = { sort: 'latest', identity: 'anonymous', category: 'idea', pollVote: null };

    const catOf = key => D.discussionCategories.find(c => c.key === key);
    const todayIso = () => {
        const d = VQ.today();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    function author(item, size) {
        const anon = item.identity === 'anonymous';
        return `<span class="flex items-center gap-2 min-w-0">
            <span class="${size || 'w-9 h-9'} rounded-full shrink-0 flex items-center justify-center text-xs ${anon ? 'bg-slate-200 text-slate-500' : 'bg-vq-teal text-white font-medium'}">
                ${anon ? '<i class="fa-solid fa-user-secret"></i>' : esc(item.alias.charAt(0).toUpperCase())}
            </span>
            <span class="min-w-0">
                <span class="block text-xs font-medium text-slate-800 truncate">${anon ? t('dbAnonymousEmployee') : `<span dir="ltr">@${esc(item.alias)}</span>`}</span>
                <span class="block text-[10px] text-slate-400">${VQ.fmtDate(item.date, 'short')}</span>
            </span>
        </span>`;
    }

    function composer() {
        return `<form id="dbForm" class="${ui.CARD} p-4 space-y-3">
            <div class="flex items-center gap-2">
                <span class="w-9 h-9 rounded-xl bg-vq-amber/10 text-vq-amber flex items-center justify-center"><i class="fa-solid fa-lightbulb"></i></span>
                <h3 class="text-sm font-medium text-slate-800">${t('dbShare')}</h3>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
                <input id="dbTitle" class="vq-input" placeholder="${t('dbTitlePh')}" maxlength="90">
                ${ui.select({ id: 'dbCat', value: s.category, label: t('category'), options: D.discussionCategories.map(c => ({ value: c.key, label: tx(c.label) })) })}
            </div>
            <textarea id="dbBody" rows="3" class="vq-input resize-none" placeholder="${t('dbBodyPh')}"></textarea>
            <div class="flex flex-col md:flex-row md:items-center gap-2">
                <span class="text-[11px] text-slate-500 shrink-0">${t('dbPostAs')}</span>
                ${ui.segmented({ name: 'identity', active: s.identity, items: [
                    { value: 'anonymous', icon: 'fa-user-secret', label: t('dbAnonymous') },
                    { value: 'alias', icon: 'fa-masks-theater', label: t('dbAlias') }
                ] })}
                ${s.identity === 'alias' ? `<input id="dbAlias" class="vq-input md:w-44" placeholder="${t('dbAliasPh')}" maxlength="20" dir="ltr">` : ''}
                <button type="submit" class="${ui.BTN.primary} md:ms-auto"><i class="fa-solid fa-paper-plane"></i>${t('dbPost')}</button>
            </div>
            <p class="text-[10px] text-slate-400 flex items-center gap-1.5"><i class="fa-solid fa-shield-halved text-vq-teal"></i>${t('dbIdentityNote')}</p>
        </form>`;
    }

    function topicCard(x) {
        const cat = catOf(x.category);
        return `<article class="${ui.CARD} p-4">
            <div class="flex items-start justify-between gap-3">
                ${author(x)}
                ${ui.tag(tx(cat.label), 'teal', cat.icon)}
            </div>
            <h3 class="mt-3 text-sm font-medium text-slate-800">${esc(tx(x.title))}</h3>
            <p class="mt-1 text-xs text-slate-600 leading-relaxed">${esc(tx(x.body))}</p>
            <div class="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button type="button" data-like="${x.id}" class="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition ${x.liked ? 'bg-vq-ruby/10 text-vq-ruby' : 'text-slate-500 hover:bg-slate-100'}">
                    <i class="fa-${x.liked ? 'solid' : 'regular'} fa-heart"></i><span class="tabular-nums">${x.likes + (x.liked ? 1 : 0)}</span>
                </button>
                <button type="button" data-thread="${x.id}" class="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition ${x.open ? 'bg-vq-teal/10 text-vq-teal' : 'text-slate-500 hover:bg-slate-100'}">
                    <i class="fa-regular fa-comment"></i>${t('dbReplies', { n: x.replies.length })}
                </button>
            </div>
            ${x.open ? `<div class="mt-3 space-y-2">
                ${x.replies.map(r => `<div class="bg-slate-50 rounded-xl p-3 ms-4 md:ms-10">
                    ${author(r, 'w-7 h-7')}
                    <p class="mt-2 text-xs text-slate-700 leading-relaxed">${esc(tx(r.body))}</p>
                </div>`).join('')}
                <form data-reply-form="${x.id}" class="flex gap-2 ms-4 md:ms-10">
                    <input class="vq-input" placeholder="${t('dbReplyPh')}">
                    <button type="submit" class="${ui.BTN.soft} shrink-0"><i class="fa-solid fa-reply"></i>${t('dbReply')}</button>
                </form>
            </div>` : ''}
        </article>`;
    }

    function pollCard() {
        const P = D.boardPoll;
        const votes = P.options.map((o, i) => o.votes + (s.pollVote === i ? 1 : 0));
        const total = votes.reduce((a, b) => a + b, 0);
        return ui.sectionCard({
            title: t('dbPoll'), icon: 'fa-chart-simple',
            body: `<p class="text-xs font-medium text-slate-800 mb-3">${esc(tx(P.question))}</p>
            <div class="space-y-2">${P.options.map((o, i) => {
                const pct = votes[i] / total * 100;
                const mine = s.pollVote === i;
                return `<button type="button" data-board-vote="${i}" class="relative w-full text-start rounded-xl border ${mine ? 'border-vq-teal' : 'border-slate-200 hover:border-vq-teal'} overflow-hidden transition">
                    <span class="absolute inset-y-0 start-0 ${mine ? 'bg-vq-teal/20' : 'bg-slate-100'}" style="width:${s.pollVote == null ? 0 : pct}%"></span>
                    <span class="relative flex items-center justify-between gap-2 px-3 py-2 text-xs">
                        <span class="${mine ? 'text-vq-teal font-medium' : 'text-slate-700'}">${mine ? '<i class="fa-solid fa-circle-check me-1"></i>' : ''}${esc(tx(o.label))}</span>
                        ${s.pollVote == null ? '' : `<span class="text-slate-500 tabular-nums" dir="ltr">${Math.round(pct)}%</span>`}
                    </span>
                </button>`;
            }).join('')}</div>
            ${s.pollVote == null ? '' : `<p class="mt-2 text-[10px] text-slate-400">${t('svVotes', { n: total })} · ${t('svIllustrative')}</p>`}`
        });
    }

    VQ.boot({
        title: () => t('dbTitle'),

        render() {
            const sorted = topics.slice().sort((a, b) => s.sort === 'latest'
                ? b.date.localeCompare(a.date)
                : (b.likes + (b.liked ? 1 : 0)) - (a.likes + (a.liked ? 1 : 0)));

            VQ.content(
                ui.pageHeader({ icon: 'fa-comments', title: t('dbTitle'), desc: t('dbDesc'), crumbs: [{ label: t('navDiscussion') }], badge: ui.sampleBadge() }) +
                composer() +
                `<div class="flex items-center justify-between gap-2 px-1">
                    <p class="text-[11px] text-slate-500">${t('resultsCount', { n: topics.length })}</p>
                    ${ui.chips({ name: 'sort', active: s.sort, items: [
                        { value: 'latest', label: t('dbLatest'), icon: 'fa-clock' },
                        { value: 'popular', label: t('dbPopular'), icon: 'fa-fire' }
                    ] })}
                </div>` +
                `<div class="space-y-4">${sorted.map(topicCard).join('')}</div>` +
                pollCard()
            );
        },

        setup(root) {
            root.addEventListener('change', e => {
                if (e.target.id === 'dbCat') s.category = e.target.value;
            });
            root.addEventListener('click', e => {
                const chip = e.target.closest('[data-chip]');
                if (chip) {
                    const title = VQ.$('#dbTitle')?.value;
                    const body = VQ.$('#dbBody')?.value;
                    s[chip.dataset.chip] = chip.dataset.value;
                    this.render();
                    if (title) VQ.$('#dbTitle').value = title;
                    if (body) VQ.$('#dbBody').value = body;
                    return;
                }
                const like = e.target.closest('[data-like]');
                if (like) { const x = topics.find(y => y.id === like.dataset.like); x.liked = !x.liked; this.render(); return; }
                const thread = e.target.closest('[data-thread]');
                if (thread) { const x = topics.find(y => y.id === thread.dataset.thread); x.open = !x.open; this.render(); return; }
                const vote = e.target.closest('[data-board-vote]');
                if (vote) { s.pollVote = Number(vote.dataset.boardVote); this.render(); }
            });
            root.addEventListener('submit', e => {
                e.preventDefault();
                if (e.target.id === 'dbForm') {
                    const title = VQ.$('#dbTitle').value.trim();
                    const body = VQ.$('#dbBody').value.trim();
                    if (!title || !body) { VQ.toast(t('dbFillIn'), 'fa-circle-exclamation'); return; }
                    const alias = s.identity === 'alias' ? (VQ.$('#dbAlias').value.trim() || 'Guest') : null;
                    topics.push({
                        id: 'topic-' + Date.now(), category: s.category, identity: alias ? 'alias' : 'anonymous', alias,
                        date: todayIso(), likes: 0, liked: false, open: false, replies: [],
                        title: { ar: title, en: title }, body: { ar: body, en: body }
                    });
                    s.sort = 'latest';
                    this.render();
                    VQ.toast(t('dbPosted'));
                    return;
                }
                const replyId = e.target.getAttribute('data-reply-form');
                if (replyId) {
                    const input = e.target.querySelector('input');
                    if (!input.value.trim()) return;
                    const x = topics.find(y => y.id === replyId);
                    x.replies.push({ identity: 'anonymous', date: todayIso(), body: { ar: input.value.trim(), en: input.value.trim() } });
                    this.render();
                }
            });
        }
    });
})();
