/* Photo Gallery (BRD 8.2) and Video Library (BRD 8.3) */
window.VQData = window.VQData || {};

VQData.albums = [
    {
        id: 'partners-forum', date: '2026-09-02', cover: 'photo-1475721027785-f74eccf877e2',
        title: { ar: 'ملتقى الشركاء السياحيين', en: 'Tourism partners forum' },
        photos: ['photo-1475721027785-f74eccf877e2', 'photo-1505373877841-8d25f7d46678', 'photo-1540575467063-178a50c2df87', 'photo-1515187029135-18ee286d815b', 'photo-1542744173-8e7e53415bb0', 'photo-1587825140708-dfaf72ae4b04', 'photo-1600880292203-757bb62b4baf']
    },
    {
        id: 'forbes-workshop', date: '2026-09-09', cover: 'photo-1552664730-d307ca884978',
        title: { ar: 'ورشة قيادات الضيافة', en: 'Hospitality leadership workshop' },
        photos: ['photo-1552664730-d307ca884978', 'photo-1557804506-669a67965ba0', 'photo-1522071820081-009f0129c71c', 'photo-1531482615713-2afd69097998', 'photo-1524178232363-1fb2b075b655']
    },
    {
        id: 'health-day', date: '2026-09-05', cover: 'photo-1576091160550-2173dba999ef',
        title: { ar: 'يوم التوعية الصحية للموظفين', en: 'Employee health awareness day' },
        photos: ['photo-1576091160550-2173dba999ef', 'photo-1545389336-cf090694435e', 'photo-1517836357463-d25dfeac3438', 'photo-1482049016688-2d3e1b311543', 'photo-1529156069898-49953e39b3ac']
    },
    {
        id: 'katara-season', date: '2026-09-07', cover: 'photo-1470229722913-7c0e2dbbafd3',
        title: { ar: 'موسم الفعاليات الثقافية في كتارا', en: 'Katara cultural season' },
        photos: ['photo-1470229722913-7c0e2dbbafd3', 'photo-1500530855697-b586d89ba3ee', 'photo-1501281668745-f7f57925c3b4', 'photo-1533174072545-7a4b6ad7a6c3', 'photo-1514525253161-7a46d19cd819', 'photo-1492684223066-81342ee5ff30']
    },
    {
        id: 'summer-campaign', date: '2026-09-01', cover: 'photo-1507525428034-b723cf961d3e',
        title: { ar: 'حملة صيف قطر — الوجهات الساحلية', en: 'Qatar summer — coastal destinations' },
        photos: ['photo-1507525428034-b723cf961d3e', 'photo-1519046904884-53103b34b206', 'photo-1509316785289-025f5b846b35', 'photo-1451337516015-6b6e9a44a8a3', 'photo-1512917774080-9991f1c4c750']
    },
    {
        id: 'airport-recognition', date: '2026-08-28', cover: 'photo-1436491865332-7a61a109cc05',
        title: { ar: 'تكريم فرق الضيافة في المطار', en: 'Airport hospitality recognition' },
        photos: ['photo-1436491865332-7a61a109cc05', 'photo-1530521954074-e64f6810b32d', 'photo-1523580494863-6f3031224c94', 'photo-1528605248644-14dd04022da1']
    }
];

VQData.videoCategories = [
    { key: 'onboarding', icon: 'fa-user-plus', label: { ar: 'التهيئة', en: 'Onboarding' } },
    { key: 'training', icon: 'fa-chalkboard-user', label: { ar: 'مواد تدريبية', en: 'Training' } },
    { key: 'safety', icon: 'fa-helmet-safety', label: { ar: 'السلامة', en: 'Safety induction' } },
    { key: 'tutorial', icon: 'fa-building', label: { ar: 'شروحات الإدارات', en: 'Department tutorials' } },
    { key: 'guide', icon: 'fa-book-open', label: { ar: 'أدلة الأنظمة', en: 'System guides' } }
];

VQData.videos = [
    {
        id: 'welcome-onboarding', category: 'onboarding', department: 'hr', date: '2026-09-01', length: '45:00', thumb: 'photo-1522071820081-009f0129c71c',
        title: { ar: 'مرحباً بك في قطر للسياحة', en: 'Welcome to Visit Qatar' },
        description: { ar: 'فيديو التهيئة للموظفين الجدد.', en: 'The onboarding video for new employees.' }
    },
    {
        id: 'safety-induction', category: 'safety', department: 'services', date: '2026-08-20', length: '30:00', thumb: 'photo-1504307651254-35680f356dfd',
        title: { ar: 'التهيئة للسلامة المهنية', en: 'Workplace safety induction' },
        description: { ar: 'إجراءات السلامة والإخلاء في المبنى.', en: 'Safety and evacuation procedures in the building.' }
    },
    {
        id: 'forbes-highlights', category: 'training', department: 'hr', date: '2026-09-10', length: '08:20', thumb: 'photo-1540575467063-178a50c2df87',
        title: { ar: 'ورشة فوربس للسفر — أبرز اللقطات', en: 'Forbes Travel workshop — highlights' },
        description: { ar: 'أبرز لقطات ورشة قيادات الضيافة.', en: 'Highlights from the hospitality leadership workshop.' }
    },
    {
        id: 'infosec-basics', category: 'training', department: 'it', date: '2026-07-18', length: '12:05', thumb: 'photo-1550751827-4bd374c3f58b',
        title: { ar: 'أساسيات أمن المعلومات', en: 'Information security basics' },
        description: { ar: 'مقدمة توعوية لأمن المعلومات.', en: 'An awareness introduction to information security.' }
    },
    {
        id: 'portal-search', category: 'guide', department: 'digital', date: '2026-09-01', length: '04:30', thumb: 'photo-1498050108023-c5249f4df085',
        title: { ar: 'البحث في البوابة الداخلية', en: 'Searching the intranet' },
        description: { ar: 'كيفية استخدام البحث وعوامل التصفية.', en: 'How to use search and filters.' }
    },
    {
        id: 'hr-leave-request', category: 'guide', department: 'hr', date: '2026-09-09', length: '06:10', thumb: 'photo-1573164713988-8665fc963095',
        title: { ar: 'نظام الموارد البشرية: طلب إجازة', en: 'HR system: leave requests' },
        description: { ar: 'خطوات تقديم طلب إجازة في نظام الموارد البشرية.', en: 'Steps for submitting a leave request in the HR system.' }
    },
    {
        id: 'archive-tutorial', category: 'tutorial', department: 'archive', date: '2026-04-25', length: '05:40', thumb: 'photo-1554224155-6726b3ff858f',
        title: { ar: 'أرشفة المستندات', en: 'Archiving documents' },
        description: { ar: 'شرح إجراءات أرشفة المستندات.', en: 'An explanation of the document archiving procedure.' }
    },
    {
        id: 'pr-templates', category: 'tutorial', department: 'pr', date: '2026-05-22', length: '03:15', thumb: 'photo-1552664730-d307ca884978',
        title: { ar: 'استخدام قوالب الاتصال', en: 'Using communication templates' },
        description: { ar: 'كيفية استخدام قوالب التعاميم والعروض.', en: 'How to use the circular and presentation templates.' }
    }
];
