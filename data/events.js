/* Events & Calendars (BRD 7.3 & 8.5) */
window.VQData = window.VQData || {};

VQData.eventCategories = [
    { key: 'conference', icon: 'fa-microphone-lines', color: '#00626C', label: { ar: 'مؤتمرات وملتقيات', en: 'Conferences & forums' } },
    { key: 'training', icon: 'fa-chalkboard-user', color: '#D76B00', label: { ar: 'تدريب وورش عمل', en: 'Training & workshops' } },
    { key: 'entertainment', icon: 'fa-masks-theater', color: '#8A1538', label: { ar: 'ثقافة وترفيه', en: 'Culture & entertainment' } },
    { key: 'wellbeing', icon: 'fa-heart-pulse', color: '#01A786', label: { ar: 'صحة ورفاهية', en: 'Health & wellbeing' } }
];

VQData.events = [
    {
        id: 'global-perspectives',
        number: 'EV-2027-004',
        start: '2027-10-28',
        end: '2027-10-28',
        category: 'conference',
        department: 'pr',
        country: { ar: 'قطر', en: 'Qatar' },
        location: { ar: 'الدوحة', en: 'Doha' },
        image: 'photo-1505373877841-8d25f7d46678',
        title: { ar: 'وجهات نظر عالمية CNN', en: 'CNN Global Perspectives' },
        summary: { ar: 'نخبة من كبار المسؤولين والقادة في السياسة والأعمال يناقشون أبرز القضايا في الدوحة.', en: 'Senior officials and leaders in politics and business discuss today’s most pressing issues in Doha.' },
        body: [
            { ar: 'تستضيف CNN نخبة من كبار المسؤولين والقادة في السياسة والأعمال، إلى جانب أصحاب الرؤى والفكر، ضمن فعالية «وجهات نظر عالمية» (Global Perspectives) في الدوحة، لمناقشة أبرز القضايا الملحّة في مجالات متنوعة تشمل الجيوسياسة والتكنولوجيا والإعلام والثقافة.', en: 'CNN brings together senior officials and leaders in politics and business, alongside visionaries and thinkers, at “Global Perspectives” in Doha to discuss the most pressing issues across geopolitics, technology, media and culture.' },
            { ar: 'كما سيتولى صحفيو CNN إدارة الجلسات الحوارية المباشرة، إلى جانب تقديم تغطية تحريرية واسعة تشمل أبرز المقابلات والمحتوى المصاحب للحدث عبر مختلف منصات الشبكة.', en: 'CNN journalists will moderate the live panel sessions and provide extensive editorial coverage, including key interviews and content around the event across the network’s platforms.' }
        ]
    },
    {
        id: 'standup-taha',
        number: 'EV-2026-031',
        start: '2026-09-12',
        end: '2026-09-12',
        category: 'entertainment',
        department: 'pr',
        country: { ar: 'قطر', en: 'Qatar' },
        location: { ar: 'قاعة الفردان', en: 'Al Fardan Hall' },
        image: 'photo-1514525253161-7a46d19cd819',
        title: { ar: 'عرض ستاند أب كوميدي - طه دسوقي', en: 'Stand-up comedy — Taha Desouky' },
        summary: { ar: 'أمسية كوميدية مع الفنان طه دسوقي في قاعة الفردان.', en: 'A comedy evening with Taha Desouky at Al Fardan Hall.' },
        body: [
            { ar: 'تُقام أمسية ستاند أب كوميدي مع الفنان طه دسوقي في قاعة الفردان.', en: 'A stand-up comedy evening with Taha Desouky takes place at Al Fardan Hall.' },
            { ar: 'لمعرفة تفاصيل الحضور، يُرجى التواصل مع فريق العلاقات العامة والاتصال.', en: 'For attendance details, please contact the PR & Communications team.' }
        ]
    },
    {
        id: 'forbes-workshop',
        number: 'EV-2026-029',
        start: '2026-09-09',
        end: '2026-09-09',
        category: 'training',
        department: 'hr',
        country: { ar: 'قطر', en: 'Qatar' },
        location: { ar: 'برج الدوحة', en: 'Doha Tower' },
        image: 'photo-1540575467063-178a50c2df87',
        title: { ar: 'ورشة قيادات الضيافة مع فوربس للسفر', en: 'Hospitality leadership workshop with Forbes Travel' },
        summary: { ar: 'ورشة عمل لقيادات قطاع الضيافة حول معايير الخدمة وتجربة الضيف.', en: 'A workshop for hospitality leaders on service standards and guest experience.' },
        body: [
            { ar: 'ورشة عمل تجمع قيادات قطاع الضيافة لمناقشة معايير الخدمة وتجربة الضيف، بمشاركة فوربس للسفر.', en: 'A workshop bringing together hospitality leaders to discuss service standards and guest experience, with Forbes Travel.' },
            { ar: 'التسجيل متاح عبر صفحة الدورات حسب المقاعد المتوفرة.', en: 'Registration is available through the Courses page, subject to seat availability.' }
        ]
    },
    {
        id: 'health-day',
        number: 'EV-2026-027',
        start: '2026-09-05',
        end: '2026-09-05',
        category: 'wellbeing',
        department: 'hr',
        country: { ar: 'قطر', en: 'Qatar' },
        location: { ar: 'قاعة الاجتماعات الرئيسية', en: 'Main meeting hall' },
        image: 'photo-1576091160550-2173dba999ef',
        title: { ar: 'يوم التوعية الصحية للموظفين', en: 'Employee health awareness day' },
        summary: { ar: 'يوم مخصص للتوعية الصحية وأنماط الحياة الصحية للموظفين.', en: 'A day dedicated to health awareness and healthy lifestyles for employees.' },
        body: [
            { ar: 'يوم مخصص للتوعية الصحية للموظفين في قاعة الاجتماعات الرئيسية.', en: 'A health awareness day for employees in the main meeting hall.' },
            { ar: 'ندعو جميع الموظفين للمشاركة.', en: 'All employees are welcome to take part.' }
        ]
    },
    {
        id: 'partners-forum',
        number: 'EV-2026-024',
        start: '2026-09-01',
        end: '2026-09-02',
        category: 'conference',
        department: 'ceo',
        country: { ar: 'قطر', en: 'Qatar' },
        location: { ar: 'مركز قطر الوطني للمؤتمرات', en: 'Qatar National Convention Centre' },
        image: 'photo-1475721027785-f74eccf877e2',
        title: { ar: 'ملتقى الشركاء السياحيين', en: 'Tourism partners forum' },
        summary: { ar: 'ملتقى يجمع قطر للسياحة بشركائها في القطاع السياحي.', en: 'A forum bringing Visit Qatar together with its tourism sector partners.' },
        body: [
            { ar: 'ملتقى يجمع قطر للسياحة بشركائها في القطاع السياحي في مركز قطر الوطني للمؤتمرات.', en: 'A forum bringing Visit Qatar together with its tourism sector partners at the Qatar National Convention Centre.' },
            { ar: 'تتوفر صور الملتقى في معرض الصور.', en: 'Photos from the forum are available in the Photo Gallery.' }
        ],
        album: 'partners-forum'
    }
];
