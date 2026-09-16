/* Visit Qatar Certificates (BRD 7.6 & 8.8) — from the reference screenshot */
window.VQData = window.VQData || {};

VQData.certificateScopeGeneral = {
    ar: 'التخطيط الاستراتيجي والتجاري والتنظيم والترخيص وتطوير السياحة المستدامة والترويج لها في قطر.',
    en: 'Strategic and business planning, regulation, licensing, development and promotion of sustainable tourism in Qatar.'
};

VQData.certificates = [
    {
        id: 'iso-21902',
        standard: 'ISO 21902:2021',
        date: '2025-01-28',
        body: 'Bureau Veritas',
        icon: 'fa-universal-access',
        title: { ar: 'إمكانية الوصول: السياحة للجميع — المتطلبات', en: 'Accessible tourism for all — Requirements' }
    },
    {
        id: 'iso-20121',
        standard: 'ISO 20121:2012',
        date: '2025-01-18',
        body: 'Bureau Veritas',
        icon: 'fa-leaf',
        title: { ar: 'أنظمة إدارة استدامة الأحداث — المتطلبات', en: 'Event sustainability management systems — Requirements' }
    },
    {
        id: 'iso-27001',
        standard: 'ISO 27001:2013',
        date: '2025-01-15',
        body: 'Bureau Veritas',
        icon: 'fa-shield-halved',
        title: { ar: 'أنظمة إدارة أمن المعلومات — المتطلبات', en: 'Information security management systems — Requirements' },
        scope: {
            ar: 'إدارة أمن المعلومات لأنظمة وخدمات تقنية المعلومات الداعمة لإدارات التخطيط الاستراتيجي والتجاري والتنظيم والتطوير والترخيص والتسويق والترويج في قطر للسياحة.',
            en: 'Information security management of IT systems and services supporting the strategic and business planning, regulation, development, licensing, marketing and promotion departments in Qatar Tourism.'
        }
    },
    {
        id: 'iso-14001',
        standard: 'ISO 14001:2015',
        date: '2025-01-09',
        body: 'Bureau Veritas',
        icon: 'fa-earth-americas',
        title: { ar: 'أنظمة الإدارة البيئية — المتطلبات', en: 'Environmental management systems — Requirements' }
    }
];

/* Received awards (BRD 5.2 menu item) — illustrative entries only */
VQData.awards = [
    {
        id: 'award-1',
        year: '2025',
        icon: 'fa-trophy',
        title: { ar: 'جائزة التميز السياحي', en: 'Tourism Excellence Award' },
        body: { ar: 'الجهة المانحة', en: 'Awarding body' },
        summary: { ar: 'مثال توضيحي لعرض جائزة مستلمة مع وصف مختصر.', en: 'An illustrative entry showing how a received award is presented.' }
    },
    {
        id: 'award-2',
        year: '2025',
        icon: 'fa-medal',
        title: { ar: 'أفضل تجربة رقمية', en: 'Best Digital Experience' },
        body: { ar: 'الجهة المانحة', en: 'Awarding body' },
        summary: { ar: 'مثال توضيحي لعرض جائزة مستلمة مع وصف مختصر.', en: 'An illustrative entry showing how a received award is presented.' }
    },
    {
        id: 'award-3',
        year: '2024',
        icon: 'fa-award',
        title: { ar: 'تكريم السياحة المستدامة', en: 'Sustainable Tourism Recognition' },
        body: { ar: 'الجهة المانحة', en: 'Awarding body' },
        summary: { ar: 'مثال توضيحي لعرض جائزة مستلمة مع وصف مختصر.', en: 'An illustrative entry showing how a received award is presented.' }
    },
    {
        id: 'award-4',
        year: '2024',
        icon: 'fa-star',
        title: { ar: 'تكريم بيئة العمل', en: 'Workplace Recognition' },
        body: { ar: 'الجهة المانحة', en: 'Awarding body' },
        summary: { ar: 'مثال توضيحي لعرض جائزة مستلمة مع وصف مختصر.', en: 'An illustrative entry showing how a received award is presented.' }
    }
];
