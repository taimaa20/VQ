/* ==========================================================================
   Shared Tailwind config — identical to the homepage (option1.html)
   ========================================================================== */
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                vq: {
                    teal: '#00626C',
                    'teal-dark': '#00474F',
                    'teal-light': '#008390',
                    ruby: '#8A1538',
                    amber: '#D76B00',
                    'amber-light': '#FF8A1A',
                    'amber-45': '#EDBC8C',
                    offwhite: '#FFFDF8',
                    gold: '#A18B29',
                    red: '#F22434',
                    green: '#01A786',
                    purple: '#522D6E'
                }
            },
            fontFamily: {
                vq: ['"Visit Qatar"', '"زوروا قطر"', 'Tahoma', 'sans-serif']
            },
            fontWeight: {
                light: '400',
                normal: '400',
                medium: '500',
                semibold: '500',
                bold: '500',
                extrabold: '500',
                black: '500'
            }
        }
    }
};

/* Apply the saved language + font size before first paint (same keys as the homepage).
   A link can force a language with ?lang=en or ?lang=ar */
(function () {
    var forced = new URLSearchParams(location.search).get('lang');
    if (forced === 'ar' || forced === 'en') localStorage.setItem('vq-lang', forced);
    var lang = localStorage.getItem('vq-lang') || 'ar';
    var scale = parseFloat(localStorage.getItem('vq-font-scale')) || 1;
    scale = Math.min(1.25, Math.max(0.85, scale));
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.style.fontSize = (16 * scale) + 'px';
})();
