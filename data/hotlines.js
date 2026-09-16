/* Hotlines (BRD 6.12, 7.10 & 8.10) — two tabs, as in the reference hotlines screen */
window.VQData = window.VQData || {};

VQData.hotlines = {
    /* General emergency numbers: service lines from the reference screen + Qatar's national emergency number */
    general: [
        { service: { ar: 'قسم نظم المعلومات', en: 'Information Systems' }, number: '44998080' },
        { service: { ar: 'قسم الخدمات', en: 'Services' }, number: '44998070' },
        { service: { ar: 'قسم الموارد البشرية', en: 'Human Resources' }, number: '44997070' },
        { service: { ar: 'قسم الأرشيف', en: 'Archive' }, number: '44992200' },
        { service: { ar: 'الشرطة', en: 'Police' }, number: '999' },
        { service: { ar: 'الإسعاف', en: 'Ambulance' }, number: '999' },
        { service: { ar: 'الدفاع المدني', en: 'Civil Defense' }, number: '999' }
    ],

    /* Responsible persons: duty contacts from the homepage hotlines screen */
    responsible: [
        { department: { ar: 'المرافق', en: 'Facilities' }, role: { ar: 'مسؤول المناوبة', en: 'Duty officer' }, number: '+974 4020 0003' },
        { department: { ar: 'الأمن', en: 'Security' }, role: { ar: 'مسؤول المناوبة', en: 'Duty officer' }, number: '+974 4020 0004' }
    ]
};
