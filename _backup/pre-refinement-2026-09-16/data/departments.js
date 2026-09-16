/* Departments (BRD 7.1 & 8.1) — sections with folders and files
   Names come from the BRD access matrix and the reference screenshots */
window.VQData = window.VQData || {};

VQData.departments = [
    {
        key: 'ceo', icon: 'fa-user-tie',
        name: { ar: 'مكتب الرئيس التنفيذي', en: 'CEO Office' },
        description: { ar: 'إعلانات الرئيس التنفيذي والتواصل التنفيذي.', en: 'CEO announcements and executive communication.' },
        folders: [
            { key: 'messages', name: { ar: 'كلمات الرئيس التنفيذي', en: 'CEO messages' }, files: [
                { name: 'CEO-Message-FY2026.pdf', size: '1.2 MB', date: '2026-09-12' }
            ] },
            { key: 'presentations', name: { ar: 'العروض التقديمية', en: 'Presentations' }, files: [
                { name: 'Leadership-Townhall.pptx', size: '8.4 MB', date: '2026-08-30' }
            ] }
        ],
        files: [
            { name: 'Executive-Communication-Guide.pdf', size: '640 KB', date: '2026-07-14' }
        ]
    },
    {
        key: 'pr', icon: 'fa-bullhorn',
        name: { ar: 'العلاقات العامة والاتصال', en: 'PR & Communications' },
        description: { ar: 'الأخبار والإعلانات والمحتوى الإعلامي.', en: 'News, announcements and media content.' },
        folders: [
            { key: 'brand', name: { ar: 'الهوية البصرية', en: 'Brand assets' }, files: [
                { name: 'VQ-Logo-Pack.zip', size: '22 MB', date: '2026-06-01' },
                { name: 'Brand-Guidelines.pdf', size: '5.6 MB', date: '2026-06-01' }
            ] },
            { key: 'templates', name: { ar: 'القوالب', en: 'Templates' }, files: [
                { name: 'Circular-Template.docx', size: '210 KB', date: '2026-05-20' },
                { name: 'Presentation-Template.pptx', size: '3.1 MB', date: '2026-05-20' }
            ] },
            { key: 'media', name: { ar: 'التغطيات الإعلامية', en: 'Media coverage' }, files: [
                { name: 'Partners-Forum-Coverage.pdf', size: '2.3 MB', date: '2026-09-03' }
            ] }
        ],
        files: [
            { name: 'Communication-Calendar.xlsx', size: '96 KB', date: '2026-09-01' }
        ]
    },
    {
        key: 'hr', icon: 'fa-users',
        name: { ar: 'الموارد البشرية', en: 'Human Resources' },
        description: { ar: 'التدريب والتهيئة والسياسات والنماذج.', en: 'Training, onboarding, policies and forms.' },
        folders: [
            { key: 'onboarding', name: { ar: 'التهيئة', en: 'Onboarding' }, files: [
                { name: 'Onboarding-Checklist.pdf', size: '320 KB', date: '2026-09-01' },
                { name: 'Welcome-Pack.pdf', size: '4.2 MB', date: '2026-09-01' }
            ] },
            { key: 'forms', name: { ar: 'النماذج', en: 'Forms' }, files: [
                { name: 'Leave-Request-Form.docx', size: '85 KB', date: '2026-09-09' },
                { name: 'Business-Travel-Request.docx', size: '92 KB', date: '2026-06-02' }
            ] },
            { key: 'training', name: { ar: 'التدريب', en: 'Training' }, files: [
                { name: 'Training-Plan-2026.xlsx', size: '140 KB', date: '2026-08-15' }
            ] }
        ],
        files: [
            { name: 'Annual-Leave-Policy.pdf', size: '480 KB', date: '2026-09-09' }
        ]
    },
    {
        key: 'digital', icon: 'fa-laptop-code',
        name: { ar: 'الإدارة الرقمية', en: 'Digital' },
        description: { ar: 'روابط الأنظمة والمحتوى التقني.', en: 'System links and technical content.' },
        folders: [
            { key: 'guides', name: { ar: 'أدلة الأنظمة', en: 'System guides' }, files: [
                { name: 'Intranet-User-Guide.pdf', size: '2.8 MB', date: '2026-09-01' }
            ] }
        ],
        files: [
            { name: 'System-Links-Register.xlsx', size: '64 KB', date: '2026-08-10' }
        ]
    },
    {
        key: 'it', icon: 'fa-server',
        name: { ar: 'نظم المعلومات', en: 'Information Systems' },
        description: { ar: 'خدمات تقنية المعلومات وأمن المعلومات.', en: 'IT services and information security.' },
        folders: [
            { key: 'security', name: { ar: 'أمن المعلومات', en: 'Information security' }, files: [
                { name: 'Information-Security-Policy.pdf', size: '1.1 MB', date: '2026-06-15' }
            ] },
            { key: 'procedures', name: { ar: 'الإجراءات', en: 'Procedures' }, files: [
                { name: 'IT-Support-Request-Procedure.pdf', size: '560 KB', date: '2026-07-01' }
            ] }
        ],
        files: []
    },
    {
        key: 'services', icon: 'fa-building-circle-check',
        name: { ar: 'الخدمات الإدارية', en: 'Administrative Services' },
        description: { ar: 'خدمات المكاتب والمرافق.', en: 'Office and facility services.' },
        folders: [
            { key: 'facilities', name: { ar: 'المرافق', en: 'Facilities' }, files: [
                { name: 'Office-Temperature-Circular.pdf', size: '210 KB', date: '2026-09-11' }
            ] }
        ],
        files: [
            { name: 'Services-Request-Form.xlsx', size: '48 KB', date: '2026-05-18' }
        ]
    },
    {
        key: 'archive', icon: 'fa-box-archive',
        name: { ar: 'الأرشيف', en: 'Archive' },
        description: { ar: 'أرشفة المستندات وحفظها.', en: 'Document archiving and retention.' },
        folders: [
            { key: 'procedures', name: { ar: 'الإجراءات', en: 'Procedures' }, files: [
                { name: 'Document-Archiving-Procedure.pdf', size: '430 KB', date: '2026-04-22' }
            ] }
        ],
        files: []
    }
];
