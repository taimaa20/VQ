/* Hotlines (BRD 6.12, 7.10 & 8.10) */
window.VQData = window.VQData || {};

VQData.hotlines = {
    /* National emergency number in Qatar */
    emergency: [
        { key: 'police', icon: 'fa-shield-halved', color: '#00626C', number: '999', label: { ar: 'الشرطة', en: 'Police' } },
        { key: 'ambulance', icon: 'fa-truck-medical', color: '#8A1538', number: '999', label: { ar: 'الإسعاف', en: 'Ambulance' } },
        { key: 'civil-defense', icon: 'fa-fire-extinguisher', color: '#D76800', number: '999', label: { ar: 'الدفاع المدني', en: 'Civil Defense' } }
    ],

    /* One contact list: service lines from the reference hotlines screen + duty contacts from the homepage */
    contacts: [
        { icon: 'fa-laptop-code', department: { ar: 'قسم نظم المعلومات', en: 'Information Systems' }, role: { ar: 'خط الخدمة', en: 'Service line' }, number: '44998080' },
        { icon: 'fa-building-circle-check', department: { ar: 'قسم الخدمات', en: 'Services' }, role: { ar: 'خط الخدمة', en: 'Service line' }, number: '44998070' },
        { icon: 'fa-users', department: { ar: 'قسم الموارد البشرية', en: 'Human Resources' }, role: { ar: 'خط الخدمة', en: 'Service line' }, number: '44997070' },
        { icon: 'fa-box-archive', department: { ar: 'قسم الأرشيف', en: 'Archive' }, role: { ar: 'خط الخدمة', en: 'Service line' }, number: '44992200' },
        { icon: 'fa-screwdriver-wrench', department: { ar: 'المرافق', en: 'Facilities' }, role: { ar: 'مسؤول المناوبة', en: 'Duty officer' }, number: '+974 4020 0003' },
        { icon: 'fa-user-shield', department: { ar: 'الأمن', en: 'Security' }, role: { ar: 'مسؤول المناوبة', en: 'Duty officer' }, number: '+974 4020 0004' }
    ]
};
