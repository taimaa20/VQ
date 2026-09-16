/* ==========================================================================
   Visit Qatar Intranet — Design Option 1 (static prototype)
   core.js — language, formatting, shared layout (header · menu · footer),
             header search, modal, toast and small shared behaviours.
   No backend: everything reads from the /data files.
   ========================================================================== */
(function () {
    'use strict';

    const ROOT = document.body.getAttribute('data-root') || '..';
    const PAGE = document.body.getAttribute('data-page') || '';

    /* Set a date such as '2026-09-16' to freeze "today" (countdowns, statuses) for a rehearsed demo */
    const PROTOTYPE_TODAY = null;

    const D = window.VQData || {};
    const I18N = window.VQ_I18N;

    const state = {
        lang: localStorage.getItem('vq-lang') === 'en' ? 'en' : 'ar',
        fontScale: parseFloat(localStorage.getItem('vq-font-scale')) || 1,
        searchFilter: 'all',
        searchQuery: ''
    };

    let page = null;

    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

    /* ---------- Text ---------- */

    function t(key, vars) {
        let s = I18N[state.lang][key];
        if (s == null) s = I18N.ar[key];
        if (s == null) {
            console.warn('[VQ] missing text key:', key);
            return key;
        }
        if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
        return s;
    }

    /* Pick the current language from a {ar, en} object */
    function tx(v) {
        if (v == null) return '';
        if (typeof v !== 'object') return String(v);
        return v[state.lang] != null ? v[state.lang] : (v.ar || '');
    }

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    const isAr = () => state.lang === 'ar';

    /* ---------- Dates ---------- */

    function toDate(iso) {
        const [y, m, d] = iso.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    function today() {
        const d = PROTOTYPE_TODAY ? toDate(PROTOTYPE_TODAY) : new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }

    function fmtDate(iso, style) {
        if (!iso) return '';
        /* en-GB abbreviates September as "Sept" — build "02 Sep 2026" instead */
        if (style === 'short' && !isAr()) return `${fmtDay(iso)} ${fmtMonth(iso)} ${toDate(iso).getFullYear()}`;
        const opts = style === 'long'
            ? { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }
            : style === 'short'
                ? { day: '2-digit', month: 'short', year: 'numeric' }
                : { day: '2-digit', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat(isAr() ? 'ar-u-nu-latn' : 'en-GB', opts).format(toDate(iso));
    }

    function fmtRange(start, end, style) {
        if (!end || end === start) return fmtDate(start, style);
        return `${fmtDate(start, style)} — ${fmtDate(end, style)}`;
    }

    const fmtDay = iso => String(toDate(iso).getDate()).padStart(2, '0');
    const fmtMonth = iso => new Intl.DateTimeFormat(isAr() ? 'ar-u-nu-latn' : 'en-US', { month: 'short' }).format(toDate(iso));

    /* Whole days from today until the given date (negative = in the past) */
    const daysUntil = iso => Math.round((toDate(iso) - today()) / 86400000);

    function status(start, end) {
        if (daysUntil(start) > 0) return 'upcoming';
        if (daysUntil(end || start) >= 0) return 'ongoing';
        return 'past';
    }

    /* ---------- Links & media ---------- */

    function href(target, params) {
        if (target === 'home') return ROOT + '/option1.html';
        let url = ROOT + '/pages/' + target + '.html';
        if (params) {
            const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== '')).toString();
            if (qs) url += '?' + qs;
        }
        return url;
    }

    const param = name => new URLSearchParams(location.search).get(name);

    const FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#00626C"/><stop offset="1" stop-color="#00474F"/></linearGradient></defs>' +
        '<rect width="400" height="250" fill="url(#g)"/><g fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="2">' +
        '<rect x="170" y="95" width="60" height="60"/><rect x="170" y="95" width="60" height="60" transform="rotate(45 200 125)"/></g></svg>');

    /* Unsplash ids ("photo-…"), full URLs, or files in the project root (e.g. general.png) */
    function photo(src, w) {
        if (!src) return FALLBACK_IMG;
        if (/^(https?:|data:)/.test(src)) return src;
        if (src.indexOf('photo-') === 0) return `https://images.unsplash.com/${src}?auto=format&fit=crop&w=${w || 900}&q=80`;
        return ROOT + '/' + src;
    }

    function img(src, cls, w, alt) {
        return `<img src="${photo(src, w)}" alt="${esc(alt || '')}" class="${cls || ''}" loading="lazy" onerror="this.onerror=null;this.src=VQ.FALLBACK_IMG;">`;
    }

    function fileIcon(nameOrExt) {
        const ext = String(nameOrExt).split('.').pop().toLowerCase();
        const map = {
            pdf: ['fa-file-pdf', 'text-red-600'],
            doc: ['fa-file-word', 'text-sky-600'],
            docx: ['fa-file-word', 'text-sky-600'],
            xls: ['fa-file-excel', 'text-emerald-600'],
            xlsx: ['fa-file-excel', 'text-emerald-600'],
            ppt: ['fa-file-powerpoint', 'text-orange-600'],
            pptx: ['fa-file-powerpoint', 'text-orange-600'],
            zip: ['fa-file-zipper', 'text-amber-600'],
            png: ['fa-file-image', 'text-violet-600'],
            jpg: ['fa-file-image', 'text-violet-600']
        };
        const [icon, color] = map[ext] || ['fa-file-lines', 'text-slate-500'];
        return { icon, color, ext: ext.toUpperCase() };
    }

    const dept = key => (D.departments || []).find(d => d.key === key);
    const deptName = key => (dept(key) ? tx(dept(key).name) : '');

    /* ---------- Menu definition (main group = homepage menu, BRD 5.2) ---------- */

    const NAV_MAIN = [
        { key: 'navHome', icon: 'fa-house', page: 'home' },
        { key: 'navDepts', icon: 'fa-sitemap', page: 'departments' },
        { key: 'navAnnouncements', icon: 'fa-bullhorn', page: 'announcements', also: ['announcement-details'] },
        { key: 'navDiscounts', icon: 'fa-tags', page: 'discounts', also: ['discount-details'] },
        { key: 'navCerts', icon: 'fa-certificate', page: 'certificates' },
        { key: 'navAwards', icon: 'fa-award', page: 'awards' },
        { key: 'navEvents', icon: 'fa-calendar-days', page: 'events', also: ['event-details'] },
        { key: 'navNews', icon: 'fa-newspaper', page: 'news', also: ['news-details'] },
        { key: 'navSurveys', icon: 'fa-square-poll-vertical', page: 'surveys' },
        { key: 'navPolicies', icon: 'fa-folder-open', page: 'policies' },
        { key: 'navHotlines', icon: 'fa-headset', page: 'hotlines' },
        { key: 'navCourses', icon: 'fa-graduation-cap', page: 'courses', also: ['course-details'] }
    ];

    /* Discussion Board and VQ Structure pages still exist but are not part of this design option's menu */
    const NAV_MORE = [
        { key: 'navUserGuide', icon: 'fa-book-open', page: 'user-guide' },
        { key: 'navPhotos', icon: 'fa-images', page: 'photo-gallery', also: ['album'] },
        { key: 'navVideos', icon: 'fa-circle-play', page: 'video-library' },
        { key: 'navEmployees', icon: 'fa-address-book', page: 'employees' }
    ];

    const isCurrent = n => n.page === PAGE || (n.also || []).indexOf(PAGE) !== -1;

    /* ---------- Header (mirrors the homepage header) ---------- */

    function headerHTML() {
        const filter = (key, label) => `<button type="button" data-filter="${key}"
            class="search-filter px-2.5 py-1 rounded-full text-[10px] font-medium ${state.searchFilter === key ? 'is-active bg-vq-teal text-white' : 'bg-slate-100 text-slate-600'}">${label}</button>`;

        return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between gap-3 min-h-16 py-2">
                <a href="${href('home')}" id="homeLogo" class="shrink-0 flex items-center p-1.5 rounded-xl" title="${t('logoHome')}">
                    <img src="https://visitqatar.com/etc.clientlibs/visitqatar/clientlibs/clientlib-static/resources/img/vq-logo-white.svg" alt="Visit Qatar" class="h-11">
                </a>

                <div class="flex items-center gap-2 sm:gap-3 flex-1 justify-end min-w-0">
                    <div class="relative flex-1 max-w-md min-w-0" id="searchWrap">
                        <label for="globalSearch" class="sr-only">${t('searchLabel')}</label>
                        <input id="globalSearch" type="search" autocomplete="off" value="${esc(state.searchQuery)}" placeholder="${t('searchPlaceholder')}"
                            class="w-full py-2 ps-3 pe-10 text-xs bg-white/15 border border-white/25 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-vq-amber focus:bg-white/25 transition">
                        <button type="button" id="searchSubmit" class="absolute top-1/2 -translate-y-1/2 end-2.5 text-white/80 hover:text-white" aria-label="${t('searchLabel')}">
                            <i class="fa-solid fa-magnifying-glass text-xs"></i>
                        </button>
                        <div id="searchPanel" class="hidden bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                            <div class="p-3 border-b border-slate-100 bg-slate-50">
                                <p class="text-[10px] font-medium text-slate-500 mb-2">${t('searchFiltersTitle')}</p>
                                <div class="flex flex-wrap gap-1.5" id="searchFilters">
                                    ${filter('all', t('filterAll'))}${filter('pages', t('filterPages'))}${filter('people', t('filterPeople'))}${filter('documents', t('filterDocuments'))}${filter('images', t('filterImages'))}${filter('videos', t('filterVideos'))}
                                </div>
                            </div>
                            <div class="max-h-72 overflow-y-auto divide-y divide-slate-100" id="searchResults"></div>
                            <a id="searchAll" href="${href('search')}" class="block p-2.5 text-center text-xs font-medium text-vq-teal bg-slate-50 border-t border-slate-100 hover:bg-vq-teal/5 transition">${t('searchViewAll')}</a>
                        </div>
                    </div>

                    <div class="flex items-center rounded-xl overflow-hidden shrink-0" title="Font size">
                        <button type="button" id="decreaseFont" class="header-chip w-8 h-8 text-[10px] font-medium" title="${t('decreaseFont')}">A−</button>
                        <button type="button" id="increaseFont" class="header-chip w-8 h-8 text-sm font-medium border-s-0" title="${t('increaseFont')}">A+</button>
                    </div>

                    <div class="flex items-center rounded-xl overflow-hidden shrink-0" role="group" aria-label="Language">
                        <button type="button" id="langAr" class="header-chip ${isAr() ? 'is-active' : ''} px-2.5 h-8 text-[11px] font-medium">AR</button>
                        <button type="button" id="langEn" class="header-chip ${!isAr() ? 'is-active' : ''} px-2.5 h-8 text-[11px] font-medium">EN</button>
                    </div>

                    <div class="flex items-center gap-2 shrink-0 ps-1 sm:ps-2 border-s border-white/20">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="User"
                            onerror="this.onerror=null;this.src='https://placehold.co/80x80/00626C/FFFFFF?text=User';"
                            class="w-9 h-9 rounded-xl object-cover border border-white/40 shadow-sm">
                        <div class="hidden md:block leading-tight text-start">
                            <div class="text-xs font-medium text-white">${t('userName')}</div>
                            <div class="text-[10px] text-white/85">${t('userTitle')}</div>
                            <div class="text-[10px] text-white/70">${t('userDept')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /* ---------- Menu card (same style as the homepage menu) ---------- */

    function navHTML() {
        const link = n => {
            const active = isCurrent(n);
            const cls = active
                ? 'flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-vq-teal bg-vq-teal/10 rounded-xl border-s-4 border-vq-teal'
                : 'flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-slate-600 hover:text-vq-teal hover:bg-vq-teal/10 rounded-xl transition';
            return `<a href="${href(n.page)}" class="${cls}" ${active ? 'aria-current="page"' : ''}>
                <i class="fa-solid ${n.icon} w-5 text-center text-vq-teal"></i> <span>${t(n.key)}</span></a>`;
        };
        const current = NAV_MAIN.concat(NAV_MORE).find(isCurrent);

        return `
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 lg:p-4 relative">
            <button type="button" id="navToggle" class="lg:hidden w-full flex items-center justify-between gap-3 text-xs font-medium text-slate-700" aria-expanded="false" aria-controls="navList">
                <span class="flex items-center gap-2 shrink-0">
                    <span class="bg-vq-teal text-white w-8 h-8 rounded-lg flex items-center justify-center"><i class="fa-solid fa-bars"></i></span>
                    ${t('navMenu')}
                </span>
                <span class="flex items-center gap-2 text-vq-teal min-w-0">
                    <span class="truncate">${current ? t(current.key) : (PAGE === 'search' ? t('navSearch') : '')}</span>
                    <i class="fa-solid fa-chevron-down text-[10px] transition" id="navChevron"></i>
                </span>
            </button>
            <div id="navList" class="hidden lg:block mt-3 lg:mt-0">
                <nav class="space-y-1">${NAV_MAIN.map(link).join('')}</nav>
                <p class="px-3 pt-4 pb-2 mt-3 border-t border-slate-100 text-[10px] font-medium text-slate-400">${t('navGroupMore')}</p>
                <nav class="space-y-1">${NAV_MORE.map(link).join('')}</nav>
            </div>
        </div>`;
    }

    /* ---------- Side widgets (same markup as the homepage left rail: 6.6, 6.7, 6.8, 6.12) ---------- */

    function widgetsHTML() {
        const days = [['wxTomorrow', 'fa-sun text-vq-amber', 37], ['wxTue', 'fa-cloud-sun text-vq-teal', 35], ['wxWed', 'fa-cloud text-slate-400', 34], ['wxThu', 'fa-sun text-vq-amber', 36]];
        const prayers = [['prFajr', '04:15'], ['prSunrise', '05:19'], ['prDhuhr', '11:30', true], ['prAsr', '14:59'], ['prMaghrib', '17:40'], ['prIsha', '19:10']];
        const systems = [
            ['https://visitqatar.com', 'fa-desktop', 'sysExplorer'],
            ['https://www.office.com', 'fa-users', 'sysHr'],
            ['https://teams.microsoft.com', 'fa-headset', 'sysTawasol'],
            ['https://login.microsoftonline.com', 'fa-file-contract', 'sysLicensing']
        ];

        return `
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h4 class="text-xs font-medium text-slate-800 flex items-center gap-1.5"><i class="fa-solid fa-cloud-sun text-vq-teal"></i> <span>${t('hpWeather')}</span></h4>
                <span class="text-[10px] text-slate-400">${t('wxCity')}</span>
            </div>
            <div class="flex items-center justify-between bg-vq-teal/5 rounded-xl p-3 mb-3">
                <div>
                    <div class="text-2xl font-medium text-vq-teal">36°</div>
                    <div class="text-[11px] text-slate-500">${t('hpWeatherToday')}</div>
                </div>
                <i class="fa-solid fa-sun text-vq-amber text-3xl"></i>
            </div>
            <div class="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                ${days.map(([key, icon, temp]) => `<div class="bg-slate-50 rounded-lg p-1.5"><span class="block text-slate-400">${t(key)}</span><i class="fa-solid ${icon} my-1"></i><span class="font-medium">${temp}°</span></div>`).join('')}
            </div>
        </div>

        <div class="bg-gradient-to-br from-vq-teal to-vq-teal-dark rounded-2xl text-white p-4 shadow-sm">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <h4 class="text-xs font-medium flex items-center gap-1.5"><i class="fa-solid fa-mosque text-amber-300"></i> <span>${t('hpPrayer')}</span></h4>
                <span class="text-[10px] bg-vq-amber text-white px-2 py-0.5 rounded-lg">${t('hpNextPrayer')}</span>
            </div>
            <div class="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                ${prayers.map(([key, time, next]) => next
                    ? `<div class="bg-vq-amber rounded-lg px-1.5 py-2 font-medium"><span class="block text-amber-100">${t(key)}</span><span class="mt-1 block">${time}</span></div>`
                    : `<div class="bg-white/5 rounded-lg px-1.5 py-2"><span class="block text-white/70">${t(key)}</span><span class="font-medium mt-1 block">${time}</span></div>`).join('')}
            </div>
            <p class="text-[10px] text-white/60 mt-3">${t('hpPrayerSource')}</p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h4 class="text-xs font-medium text-slate-800 flex items-center gap-1.5"><i class="fa-solid fa-laptop-code text-vq-teal"></i> <span>${t('hpSystems')}</span></h4>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
                ${systems.map(([url, icon, key]) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 hover:bg-vq-teal/5 border border-slate-100 transition">
                    <i class="fa-solid ${icon} text-vq-teal text-base mb-1"></i><span class="text-[11px] text-center">${t(key)}</span></a>`).join('')}
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-3 bg-slate-50 border-b border-slate-100">
                <h4 class="text-xs font-medium text-slate-800 flex items-center gap-1.5"><i class="fa-solid fa-headset text-vq-teal"></i> <span>${t('navHotlines')}</span></h4>
            </div>
            <div class="p-3">
                <p class="text-[11px] text-slate-500 leading-relaxed">${t('hpHotlinesText')}</p>
                <a href="${href('hotlines')}" class="mt-3 block w-full text-center text-xs bg-vq-teal hover:bg-vq-teal-dark text-white font-medium px-4 py-2 rounded-xl transition">${t('hpHotlinesBtn')}</a>
            </div>
        </div>`;
    }

    /* ---------- Footer (mirrors the homepage footer) ---------- */

    function footerHTML() {
        const social = [
            ['https://www.instagram.com/visitqatar/', 'Instagram', 'fa-instagram'],
            ['https://www.facebook.com/VisitQatar', 'Facebook', 'fa-facebook-f'],
            ['https://x.com/VisitQatar', 'X', 'fa-x-twitter'],
            ['https://www.youtube.com/@VisitQatar', 'YouTube', 'fa-youtube'],
            ['https://www.tiktok.com/@visitqatar', 'TikTok', 'fa-tiktok'],
            ['https://www.linkedin.com/company/visit-qatar', 'LinkedIn', 'fa-linkedin-in']
        ];
        return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div class="flex flex-col md:flex-row items-center justify-between gap-5">
                <p class="text-xs text-white/90 order-3 md:order-1">
                    <span>${t('copyrightPrefix')}</span> © Visit Qatar <span>${new Date().getFullYear()}</span>
                </p>
                <div class="flex items-center gap-2 order-1 md:order-2" aria-label="Visit Qatar social media">
                    ${social.map(([url, name, icon]) => `<a class="footer-social" href="${url}" target="_blank" rel="noopener noreferrer" title="${name}" aria-label="${name}"><i class="fa-brands ${icon}"></i></a>`).join('')}
                </div>
                <a href="${href('certificates')}" class="flex items-center gap-2 flex-wrap justify-center order-2 md:order-3" title="${t('footerCerts')}">
                    <span class="sr-only">${t('footerCerts')}</span>
                    <img class="footer-cert" src="https://placehold.co/120x64/FFFFFF/00626C?text=VQ+Quality" alt="Visit Qatar Quality Certificate">
                    <img class="footer-cert" src="https://placehold.co/120x64/FFFFFF/8A1538?text=Safe+Travels" alt="Safe Travels Certificate">
                    <img class="footer-cert" src="https://placehold.co/120x64/FFFFFF/D76800?text=ISO" alt="ISO Certificate">
                </a>
            </div>
        </div>`;
    }

    /* ---------- Search index (all static data) ---------- */

    function searchIndex() {
        const list = [];
        const both = v => (typeof v === 'object' ? Object.values(v).join(' ') : String(v));
        const add = (type, icon, color, title, meta, url, extra) =>
            list.push({ type, icon, color, title: tx(title), meta, url, haystack: (both(title) + ' ' + meta + ' ' + (extra || '')).toLowerCase() });

        NAV_MAIN.concat(NAV_MORE).forEach(n =>
            add('pages', n.icon, 'text-vq-teal', { ar: I18N.ar[n.key], en: I18N.en[n.key] }, t('filterPages'), href(n.page)));
        (D.announcements || []).forEach(a =>
            add('pages', 'fa-bullhorn', 'text-vq-teal', a.title, `${t('navAnnouncements')} · ${a.number}`, href('announcement-details', { id: a.id }), both(a.summary)));
        (D.events || []).forEach(e =>
            add('pages', 'fa-calendar-days', 'text-vq-teal', e.title, `${t('navEvents')} · ${fmtDate(e.start)}`, href('event-details', { id: e.id }), both(e.location)));
        (D.news || []).forEach(n =>
            add('pages', 'fa-newspaper', 'text-vq-teal', n.title, `${t('navNews')} · ${fmtDate(n.date)}`, href('news-details', { id: n.id })));
        (D.discounts || []).forEach(d =>
            add('pages', 'fa-tags', 'text-vq-ruby', d.title, `${t('navDiscounts')} · ${d.percent}%`, href('discount-details', { id: d.id }), both(d.partner)));
        (D.courses || []).forEach(c =>
            add('pages', 'fa-graduation-cap', 'text-vq-teal', c.title, `${t('navCourses')} · ${tx(c.duration)}`, href('course-details', { id: c.id })));
        (D.employees || []).forEach(p =>
            add('people', 'fa-user', 'text-indigo-600', p.name, `${tx(p.position)} · ${deptName(p.department)}`, href('employees', { id: p.id }), p.id + ' ' + both(p.position)));
        (D.policies || []).forEach(doc => {
            const f = fileIcon(doc.ext);
            add('documents', f.icon, f.color, doc.title, `${f.ext} · ${t('navPolicies')}`, href('policies', { doc: doc.id }));
        });
        (D.certificates || []).forEach(c =>
            add('documents', 'fa-certificate', 'text-vq-gold', { ar: `${c.standard} — ${c.title.ar}`, en: `${c.standard} — ${c.title.en}` }, t('navCerts'), href('certificates', { cert: c.id })));
        (D.albums || []).forEach(a =>
            add('images', 'fa-image', 'text-amber-600', a.title, `${t('navPhotos')} · ${t('pgPhotos', { n: a.photos.length })}`, href('album', { id: a.id })));
        (D.videos || []).forEach(v =>
            add('videos', 'fa-circle-play', 'text-vq-ruby', v.title, `${t('navVideos')} · ${v.length}`, href('video-library', { id: v.id })));
        (D.guides || []).forEach(g => {
            const type = g.kind === 'video' ? 'videos' : g.kind === 'image' ? 'images' : 'pages';
            const icon = g.kind === 'video' ? 'fa-circle-play' : g.kind === 'image' ? 'fa-image' : 'fa-arrow-up-right-from-square';
            add(type, icon, 'text-vq-amber', g.title, t('navUserGuide'), href('user-guide', { id: g.id }));
        });
        return list;
    }

    function searchItems(query, filter) {
        const q = String(query || '').trim().toLowerCase();
        return searchIndex().filter(item =>
            (filter === 'all' || !filter || item.type === filter) && (!q || item.haystack.indexOf(q) !== -1));
    }

    function resultRow(item) {
        return `<a href="${item.url}" class="w-full flex items-center gap-3 p-3 text-start hover:bg-slate-50 transition">
            <span class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 ${item.color}"><i class="fa-solid ${item.icon}"></i></span>
            <span class="min-w-0 flex-1">
                <span class="block text-xs font-medium text-slate-800 truncate">${esc(item.title)}</span>
                <span class="block text-[10px] text-slate-500 truncate">${esc(item.meta)}</span>
            </span>
        </a>`;
    }

    function renderHeaderResults() {
        const box = $('#searchResults');
        if (!box) return;
        const items = searchItems(state.searchQuery, state.searchFilter).slice(0, 6);
        box.innerHTML = items.length
            ? items.map(resultRow).join('')
            : `<div class="p-4 text-xs text-slate-500">${t('noResults')}</div>`;
        $('#searchAll').href = href('search', { q: state.searchQuery, type: state.searchFilter !== 'all' ? state.searchFilter : '' });
    }

    const openSearchPanel = () => { $('#searchPanel')?.classList.remove('hidden'); renderHeaderResults(); };
    const closeSearchPanel = () => $('#searchPanel')?.classList.add('hidden');

    /* ---------- Chrome rendering & bindings ---------- */

    function applyFontScale() {
        state.fontScale = Math.min(1.25, Math.max(0.85, state.fontScale));
        document.documentElement.style.fontSize = (16 * state.fontScale) + 'px';
        localStorage.setItem('vq-font-scale', String(state.fontScale));
    }

    function bindHeader() {
        $('#langAr').addEventListener('click', () => setLanguage('ar'));
        $('#langEn').addEventListener('click', () => setLanguage('en'));
        $('#increaseFont').addEventListener('click', () => { state.fontScale += 0.05; applyFontScale(); });
        $('#decreaseFont').addEventListener('click', () => { state.fontScale -= 0.05; applyFontScale(); });

        const input = $('#globalSearch');
        input.addEventListener('focus', openSearchPanel);
        input.addEventListener('input', () => { state.searchQuery = input.value; openSearchPanel(); });
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') location.href = href('search', { q: input.value, type: state.searchFilter !== 'all' ? state.searchFilter : '' });
        });
        $('#searchSubmit').addEventListener('click', () => {
            if (input.value.trim()) location.href = href('search', { q: input.value });
            else { input.focus(); openSearchPanel(); }
        });
        $('#searchFilters').addEventListener('click', e => {
            const btn = e.target.closest('.search-filter');
            if (!btn) return;
            state.searchFilter = btn.getAttribute('data-filter');
            $$('.search-filter').forEach(el => {
                const on = el === btn;
                el.classList.toggle('is-active', on);
                el.classList.toggle('bg-vq-teal', on);
                el.classList.toggle('text-white', on);
                el.classList.toggle('bg-slate-100', !on);
                el.classList.toggle('text-slate-600', !on);
            });
            renderHeaderResults();
        });
    }

    function bindNav() {
        const toggle = $('#navToggle');
        toggle.addEventListener('click', () => {
            const list = $('#navList');
            const open = list.classList.toggle('hidden') === false;
            toggle.setAttribute('aria-expanded', String(open));
            $('#navChevron').style.transform = open ? 'rotate(180deg)' : '';
        });
    }

    function renderChrome() {
        $('#siteHeader').innerHTML = headerHTML();
        bindHeader();
        $('#vqNav').innerHTML = navHTML();
        bindNav();
        $('#vqWidgets').innerHTML = widgetsHTML();
        $('#siteFooter').innerHTML = footerHTML();
    }

    function mountShell() {
        document.body.insertAdjacentHTML('afterbegin', `
            <header id="siteHeader" class="sticky top-0 z-50 text-white border-b shadow-xl"></header>
            <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <aside id="vqNav" class="lg:col-span-3"></aside>
                    <section id="pageContent" class="lg:col-span-6 space-y-6 min-w-0"></section>
                    <aside id="vqWidgets" class="lg:col-span-3 space-y-6"></aside>
                </div>
            </main>
            <footer id="siteFooter" class="mt-auto text-white"></footer>
            <div id="vqModalRoot"></div>
            <div id="vqToast" class="vq-toast" role="status" aria-live="polite"></div>`);
    }

    /* ---------- Language ---------- */

    function setLanguage(lang) {
        state.lang = lang === 'en' ? 'en' : 'ar';
        localStorage.setItem('vq-lang', state.lang);
        document.documentElement.lang = state.lang;
        document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
        closeModal();
        renderChrome();
        renderPage();
    }

    /* ---------- Modal ---------- */

    function openModal({ title, icon, body, footer, size }) {
        stopVideos();
        $('#vqModalRoot').innerHTML = `
        <div class="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" data-modal-overlay>
            <div class="bg-white rounded-3xl ${size || 'max-w-3xl'} w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col" role="dialog" aria-modal="true">
                <div class="bg-vq-teal text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
                    <h3 class="text-sm font-medium flex items-center gap-2 min-w-0">
                        <i class="fa-solid ${icon || 'fa-circle-info'} text-amber-300"></i><span class="truncate">${title}</span>
                    </h3>
                    <button type="button" data-modal-close class="text-white hover:text-amber-300 text-2xl leading-none" aria-label="${t('close')}">&times;</button>
                </div>
                <div class="overflow-y-auto">${body}</div>
                ${footer ? `<div class="bg-slate-50 px-4 py-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2 shrink-0">${footer}</div>` : ''}
            </div>
        </div>`;
        document.documentElement.classList.add('overflow-hidden');
    }

    function closeModal() {
        const root = $('#vqModalRoot');
        if (!root || !root.innerHTML) return;
        stopVideos(root);
        root.innerHTML = '';
        document.documentElement.classList.remove('overflow-hidden');
    }

    /* ---------- Toast ---------- */

    let toastTimer = null;

    function toast(message, icon) {
        const el = $('#vqToast');
        el.innerHTML = `<div class="flex items-center gap-2 bg-vq-teal-dark text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl">
            <i class="fa-solid ${icon || 'fa-circle-check'} text-amber-300"></i><span>${esc(message)}</span></div>`;
        el.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
    }

    function copyText(text) {
        try { navigator.clipboard.writeText(text); } catch (e) { /* clipboard not available */ }
    }

    /* ---------- Video player mock ---------- */

    const playing = new Set();

    const clock = sec => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

    function toggleVideo(el) {
        const bar = $('[data-video-bar]', el);
        const time = $('[data-video-time]', el);
        const icon = $('[data-video-icon]', el);
        const length = el.getAttribute('data-length') || '05:00';
        const [m, s] = length.split(':').map(Number);
        const total = m * 60 + s;

        if (el._timer) {
            clearInterval(el._timer);
            el._timer = null;
            playing.delete(el);
            el.classList.remove('is-playing');
            icon.className = 'fa-solid fa-play';
            return;
        }
        el.classList.add('is-playing');
        icon.className = 'fa-solid fa-pause';
        playing.add(el);
        el._timer = setInterval(() => {
            el._pos = Math.min(total, (el._pos || 0) + Math.max(1, total / 160));
            bar.style.width = (el._pos / total * 100) + '%';
            time.textContent = `${clock(el._pos)} / ${length}`;
            if (el._pos >= total) toggleVideo(el);
        }, 200);
    }

    function stopVideos(scope) {
        playing.forEach(el => {
            if (!scope || scope.contains(el)) toggleVideo(el);
        });
    }

    /* ---------- Global delegated behaviours ---------- */

    function bindGlobal() {
        document.addEventListener('click', e => {
            if (e.target.closest('[data-modal-close]') || e.target.matches('[data-modal-overlay]')) {
                closeModal();
                return;
            }

            const toastBtn = e.target.closest('[data-toast]');
            if (toastBtn) {
                e.preventDefault();
                toast(t(toastBtn.getAttribute('data-toast')), toastBtn.getAttribute('data-toast-icon'));
            }

            const copyBtn = e.target.closest('[data-copy]');
            if (copyBtn) {
                e.preventDefault();
                copyText(copyBtn.getAttribute('data-copy'));
                toast(t('copied'), 'fa-copy');
            }

            const zoom = e.target.closest('[data-doc-zoom]');
            if (zoom) {
                const viewer = zoom.closest('.doc-viewer');
                const pageEl = $('[data-doc-page]', viewer);
                const label = $('[data-doc-zoom-label]', viewer);
                const next = Math.min(1.5, Math.max(0.6, (parseFloat(pageEl.dataset.zoom) || 1) + Number(zoom.getAttribute('data-doc-zoom')) * 0.1));
                pageEl.dataset.zoom = next;
                pageEl.style.transform = `scale(${next})`;
                label.textContent = Math.round(next * 100) + '%';
            }

            const video = e.target.closest('[data-video]');
            if (video && (e.target.closest('[data-video-play]') || e.target.closest('[data-video-toggle]') || video.classList.contains('is-playing'))) {
                toggleVideo(video);
            }

            const wrap = $('#searchWrap');
            if (wrap && !wrap.contains(e.target)) closeSearchPanel();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeModal();
                closeSearchPanel();
            }
        });
    }

    /* ---------- Page lifecycle ---------- */

    function content(html) {
        $('#pageContent').innerHTML = html;
    }

    function renderPage() {
        stopVideos();
        page.render();
        if (page.title) document.title = `${page.title()} — Visit Qatar Intranet`;
    }

    /* Each page calls VQ.boot({ title, render, setup }) */
    function boot(def) {
        page = def;
        applyFontScale();
        mountShell();
        renderChrome();
        bindGlobal();
        if (def.setup) def.setup($('#pageContent'));
        renderPage();
        if (def.afterBoot) def.afterBoot();
    }

    window.VQ = {
        ROOT, PAGE, D, state, FALLBACK_IMG,
        $, $$, t, tx, esc, isAr,
        toDate, today, fmtDate, fmtRange, fmtDay, fmtMonth, daysUntil, status,
        href, param, photo, img, fileIcon, dept, deptName,
        searchItems, openModal, closeModal, toast, copyText, stopVideos,
        content, boot, renderPage
    };
})();
