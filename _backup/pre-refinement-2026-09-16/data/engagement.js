/* Survey polls (BRD 7.4 & 8.13) and Discussion Board (BRD 7.11)
   Vote counts are illustrative so the result chart can be demonstrated. */
window.VQData = window.VQData || {};

VQData.satisfactionOptions = [
    { ar: 'راضٍ جداً', en: 'Very satisfied' },
    { ar: 'راضٍ', en: 'Satisfied' },
    { ar: 'محايد', en: 'Neutral' },
    { ar: 'غير راضٍ', en: 'Dissatisfied' },
    { ar: 'غير راضٍ تماماً', en: 'Very dissatisfied' }
];

VQData.polls = [
    {
        id: 'work-environment', type: 'quick', end: '2026-09-30',
        question: { ar: 'ما مدى رضاك عن بيئة عملك الحالية؟', en: 'How satisfied are you with your current work environment?' },
        votes: [18, 31, 12, 5, 2]
    },
    {
        id: 'recent-events', type: 'quick', end: '2026-10-15',
        question: { ar: 'ما رأيك في الفعاليات المقدمة مؤخراً من قبل الجهة؟', en: 'What do you think of the events recently organised by Visit Qatar?' },
        votes: [22, 26, 9, 3, 1]
    },
    {
        id: 'recent-announcements', type: 'quick', end: '2026-10-15',
        question: { ar: 'ما رأيك في الإعلانات المقدمة مؤخراً من قبل الجهة؟', en: 'What do you think of the announcements recently published by Visit Qatar?' },
        votes: [14, 29, 15, 4, 2]
    }
];

VQData.indepthSurveys = [
    {
        id: 'service-quality', end: '2026-10-31', minutes: 10,
        title: { ar: 'استبيان جودة الخدمات الداخلية', en: 'Internal service quality survey' },
        description: { ar: 'نموذج تفصيلي لجمع البيانات تابع لقسم الجودة.', en: 'A detailed data collection form owned by the Quality department.' }
    }
];

VQData.discussionCategories = [
    { key: 'idea', icon: 'fa-lightbulb', label: { ar: 'فكرة جديدة', en: 'New idea' } },
    { key: 'improvement', icon: 'fa-arrow-trend-up', label: { ar: 'تحسين', en: 'Improvement' } },
    { key: 'question', icon: 'fa-circle-question', label: { ar: 'سؤال', en: 'Question' } }
];

/* Sample posts — anonymous or under an alias, as described in the BRD */
VQData.discussions = [
    {
        id: 'topic-1', category: 'idea', identity: 'alias', alias: 'Falcon', date: '2026-09-14', likes: 24,
        title: { ar: 'دليل رقمي للزوار في الفعاليات', en: 'A digital visitor guide at events' },
        body: { ar: 'اقتراح بتوفير دليل رقمي عبر رمز QR في مواقع الفعاليات يعرض البرنامج والخرائط.', en: 'A proposal to offer a digital guide through a QR code at event venues, showing the programme and maps.' },
        replies: [
            { identity: 'anonymous', date: '2026-09-14', body: { ar: 'فكرة ممتازة، ويمكن ربطها بصفحة الفعاليات.', en: 'Great idea — it could link to the Events page.' } },
            { identity: 'alias', alias: 'Pearl', date: '2026-09-15', body: { ar: 'أقترح دعم اللغتين العربية والإنجليزية.', en: 'I suggest supporting both Arabic and English.' } }
        ]
    },
    {
        id: 'topic-2', category: 'improvement', identity: 'anonymous', date: '2026-09-12', likes: 17,
        title: { ar: 'تبسيط التسجيل في الدورات', en: 'Simpler course registration' },
        body: { ar: 'عرض عدد المقاعد المتبقية بوضوح وإرسال تذكير قبل موعد الدورة.', en: 'Show remaining seats clearly and send a reminder before the course date.' },
        replies: [
            { identity: 'alias', alias: 'Dhow', date: '2026-09-13', body: { ar: 'التذكير عبر Teams سيكون مفيداً.', en: 'A reminder in Teams would be helpful.' } }
        ]
    },
    {
        id: 'topic-3', category: 'question', identity: 'alias', alias: 'Oryx', date: '2026-09-08', likes: 6,
        title: { ar: 'هل يمكن إضافة عروض جديدة للخصومات؟', en: 'Can new partner offers be suggested?' },
        body: { ar: 'هل توجد آلية لاقتراح شركاء جدد لبرنامج خصومات الموظفين؟', en: 'Is there a way to suggest new partners for the employee discount programme?' },
        replies: []
    }
];

VQData.boardPoll = {
    question: { ar: 'أي فكرة تفضّل أن نبدأ بها؟', en: 'Which idea should we start with?' },
    options: [
        { label: { ar: 'دليل رقمي للزوار', en: 'Digital visitor guide' }, votes: 21 },
        { label: { ar: 'تبسيط التسجيل في الدورات', en: 'Simpler course registration' }, votes: 14 },
        { label: { ar: 'اقتراح شركاء جدد للخصومات', en: 'Suggest new discount partners' }, votes: 9 }
    ]
};
