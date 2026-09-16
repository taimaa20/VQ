/* Training courses, HR onboarding & safety induction (BRD 7.7 & 8.12)
   type: course · onboarding · safety  —  video: true shows the player + questionnaire */
window.VQData = window.VQData || {};

VQData.courseTypes = [
    { key: 'course', icon: 'fa-chalkboard-user', label: { ar: 'دورات تدريبية', en: 'Training courses' } },
    { key: 'onboarding', icon: 'fa-user-plus', label: { ar: 'برنامج التهيئة', en: 'HR onboarding' } },
    { key: 'safety', icon: 'fa-helmet-safety', label: { ar: 'السلامة المهنية', en: 'Safety induction' } }
];

VQData.courses = [
    {
        id: 'hospitality-leadership',
        type: 'course',
        start: '2026-10-05',
        duration: { ar: '3 أيام', en: '3 days' },
        mode: { ar: 'حضوري — برج الدوحة', en: 'In person — Doha Tower' },
        provider: { ar: 'جهة خارجية عبر الموارد البشرية', en: 'External, via Human Resources' },
        seats: 20,
        seatsLeft: 6,
        image: 'photo-1552664730-d307ca884978',
        title: { ar: 'قيادة الضيافة وتجربة الضيف', en: 'Hospitality leadership & guest experience' },
        summary: { ar: 'برنامج لقيادات الضيافة حول معايير الخدمة وتجربة الضيف.', en: 'A programme for hospitality leaders on service standards and guest experience.' },
        objectives: [
            { ar: 'فهم معايير الخدمة في قطاع الضيافة', en: 'Understand hospitality service standards' },
            { ar: 'تحسين تجربة الضيف في نقاط التواصل المختلفة', en: 'Improve the guest experience across touchpoints' },
            { ar: 'تطبيق الممارسات في بيئة العمل', en: 'Apply the practices in the workplace' }
        ]
    },
    {
        id: 'infosec-awareness',
        type: 'course',
        start: '2026-09-28',
        duration: { ar: 'يوم واحد', en: '1 day' },
        mode: { ar: 'عن بُعد — Microsoft Teams', en: 'Online — Microsoft Teams' },
        provider: { ar: 'قطر للسياحة', en: 'Visit Qatar' },
        seats: 30,
        seatsLeft: 0,
        image: 'photo-1550751827-4bd374c3f58b',
        title: { ar: 'التوعية بأمن المعلومات', en: 'Information security awareness' },
        summary: { ar: 'دورة توعوية مرتبطة بنظام إدارة أمن المعلومات ISO 27001.', en: 'An awareness course linked to the ISO 27001 information security management system.' },
        objectives: [
            { ar: 'التعرّف على مسؤوليات الموظف في حماية المعلومات', en: 'Know your responsibilities in protecting information' },
            { ar: 'التعامل الآمن مع البريد الإلكتروني والمرفقات', en: 'Handle email and attachments safely' },
            { ar: 'الإبلاغ عن الحوادث الأمنية', en: 'Report security incidents' }
        ]
    },
    {
        id: 'accessible-tourism',
        type: 'course',
        start: '2026-10-12',
        duration: { ar: 'يومان', en: '2 days' },
        mode: { ar: 'حضوري — المقر الرئيسي', en: 'In person — Head office' },
        provider: { ar: 'قطر للسياحة', en: 'Visit Qatar' },
        seats: 25,
        seatsLeft: 11,
        image: 'photo-1521737604893-d14cc237f11d',
        title: { ar: 'السياحة الميسّرة للجميع', en: 'Accessible tourism for all' },
        summary: { ar: 'مدخل إلى متطلبات السياحة الميسّرة وفق ISO 21902.', en: 'An introduction to accessible tourism requirements under ISO 21902.' },
        objectives: [
            { ar: 'التعرّف على مفهوم السياحة الميسّرة', en: 'Understand the concept of accessible tourism' },
            { ar: 'مراجعة متطلبات المعيار', en: 'Review the standard’s requirements' }
        ]
    },
    {
        id: 'event-sustainability',
        type: 'course',
        start: '2026-11-02',
        duration: { ar: 'يومان', en: '2 days' },
        mode: { ar: 'حضوري — المقر الرئيسي', en: 'In person — Head office' },
        provider: { ar: 'قطر للسياحة', en: 'Visit Qatar' },
        seats: 18,
        seatsLeft: 3,
        image: 'photo-1532996122724-e3c354a0b15b',
        title: { ar: 'إدارة استدامة الفعاليات', en: 'Event sustainability management' },
        summary: { ar: 'دورة حول أنظمة إدارة استدامة الفعاليات وفق ISO 20121.', en: 'A course on event sustainability management systems under ISO 20121.' },
        objectives: [
            { ar: 'فهم إطار إدارة استدامة الفعاليات', en: 'Understand the event sustainability management framework' },
            { ar: 'التخطيط لفعاليات أكثر استدامة', en: 'Plan more sustainable events' }
        ]
    },
    {
        id: 'hr-onboarding',
        type: 'onboarding',
        video: true,
        start: '2026-09-01',
        duration: { ar: '45 دقيقة', en: '45 min' },
        videoLength: '45:00',
        mode: { ar: 'فيديو عند الطلب', en: 'On-demand video' },
        provider: { ar: 'إدارة الموارد البشرية', en: 'Human Resources' },
        image: 'photo-1522071820081-009f0129c71c',
        title: { ar: 'برنامج تهيئة الموظفين الجدد', en: 'New employee onboarding programme' },
        summary: { ar: 'فيديو تعريفي بقطر للسياحة يليه استبيان قصير ونموذج ملاحظات.', en: 'An introduction to Visit Qatar followed by a short questionnaire and feedback form.' },
        objectives: [
            { ar: 'التعرّف على رؤية قطر للسياحة ورسالتها', en: 'Learn about Visit Qatar’s vision and mission' },
            { ar: 'التعرّف على الخدمات والأنظمة الداخلية', en: 'Get to know internal services and systems' }
        ]
    },
    {
        id: 'safety-induction',
        type: 'safety',
        video: true,
        start: '2026-08-20',
        duration: { ar: '30 دقيقة', en: '30 min' },
        videoLength: '30:00',
        mode: { ar: 'فيديو عند الطلب', en: 'On-demand video' },
        provider: { ar: 'الخدمات الإدارية', en: 'Administrative Services' },
        image: 'photo-1504307651254-35680f356dfd',
        title: { ar: 'التهيئة للسلامة المهنية', en: 'Workplace safety induction' },
        summary: { ar: 'فيديو السلامة المهنية الإلزامي يليه استبيان للتحقق من الفهم.', en: 'The mandatory workplace safety video followed by a short understanding check.' },
        objectives: [
            { ar: 'معرفة إجراءات الإخلاء في المبنى', en: 'Know the building evacuation procedures' },
            { ar: 'التعرّف على أرقام الطوارئ', en: 'Know the emergency numbers' }
        ]
    },
    {
        id: 'portal-basics',
        type: 'onboarding',
        video: true,
        start: '2026-09-01',
        duration: { ar: '15 دقيقة', en: '15 min' },
        videoLength: '15:00',
        mode: { ar: 'فيديو عند الطلب', en: 'On-demand video' },
        provider: { ar: 'الإدارة الرقمية', en: 'Digital' },
        image: 'photo-1498050108023-c5249f4df085',
        title: { ar: 'البدء باستخدام البوابة الداخلية', en: 'Getting started with the intranet' },
        summary: { ar: 'جولة سريعة في أقسام البوابة الداخلية الجديدة.', en: 'A quick tour of the new intranet portal’s sections.' },
        objectives: [
            { ar: 'التنقل بين أقسام البوابة', en: 'Navigate the portal’s sections' },
            { ar: 'استخدام البحث وعوامل التصفية', en: 'Use search and filters' }
        ]
    }
];

/* Short questionnaire shown after video content (feedback only — no scoring) */
VQData.courseQuestionnaire = [
    {
        q: { ar: 'هل كان محتوى الفيديو واضحاً؟', en: 'Was the video content clear?' },
        options: [{ ar: 'نعم', en: 'Yes' }, { ar: 'إلى حدٍ ما', en: 'Partly' }, { ar: 'لا', en: 'No' }]
    },
    {
        q: { ar: 'ما مدى فائدة المحتوى لعملك؟', en: 'How useful was the content for your role?' },
        options: [{ ar: 'مفيد جداً', en: 'Very useful' }, { ar: 'مفيد', en: 'Useful' }, { ar: 'غير مفيد', en: 'Not useful' }]
    }
];
