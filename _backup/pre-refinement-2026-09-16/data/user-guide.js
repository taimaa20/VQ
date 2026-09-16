/* User Guide for each system (BRD 6.11 & 8.9)
   systems: the same systems linked from the homepage "Software & System Links" */
window.VQData = window.VQData || {};

VQData.guideSystems = [
    { key: 'intranet', icon: 'fa-house-laptop', url: '../option1.html', name: { ar: 'البوابة الداخلية', en: 'Intranet Portal' } },
    { key: 'explorer', icon: 'fa-desktop', url: 'https://visitqatar.com', name: { ar: 'بوابة المستكشف', en: 'Explorer Portal' } },
    { key: 'hr', icon: 'fa-users', url: 'https://www.office.com', name: { ar: 'نظام موارد HR', en: 'HR System' } },
    { key: 'tawasol', icon: 'fa-headset', url: 'https://teams.microsoft.com', name: { ar: 'نظام تواصل', en: 'Tawasol Support System' } },
    { key: 'elicensing', icon: 'fa-file-contract', url: 'https://login.microsoftonline.com', name: { ar: 'التراخيص الإلكترونية', en: 'E-Licensing' } }
];

/* kind: video · image (illustrated steps) · link (external resource) */
VQData.guides = [
    {
        id: 'intranet-tour', system: 'intranet', kind: 'video', length: '04:30', image: 'photo-1498050108023-c5249f4df085',
        title: { ar: 'جولة في البوابة الداخلية', en: 'Intranet portal tour' },
        description: { ar: 'تعرّف على أقسام البوابة وكيفية التنقل بينها.', en: 'Get to know the portal’s sections and how to move between them.' }
    },
    {
        id: 'intranet-search', system: 'intranet', kind: 'image', image: 'photo-1460925895917-afdab827c52f',
        title: { ar: 'استخدام البحث وعوامل التصفية', en: 'Using search and filters' },
        description: { ar: 'خطوات مصوّرة للبحث في محتوى البوابة.', en: 'Illustrated steps for searching portal content.' },
        steps: [
            { ar: 'اكتب كلمة البحث في شريط البحث أعلى الصفحة', en: 'Type a keyword in the search bar at the top of the page' },
            { ar: 'اختر نوع المحتوى من عوامل التصفية', en: 'Choose a content type from the filters' },
            { ar: 'افتح النتيجة أو اعرض المعاينة', en: 'Open the result or view its preview' }
        ]
    },
    {
        id: 'explorer-guide', system: 'explorer', kind: 'image', image: 'photo-1518770660439-4636190af475',
        title: { ar: 'دليل بوابة المستكشف', en: 'Explorer portal guide' },
        description: { ar: 'خطوات مصوّرة لاستخدام بوابة المستكشف.', en: 'Illustrated steps for using the Explorer portal.' },
        steps: [
            { ar: 'افتح بوابة المستكشف من روابط الأنظمة', en: 'Open the Explorer portal from the system links' },
            { ar: 'اختر القسم المطلوب من القائمة', en: 'Choose the section you need from the menu' },
            { ar: 'استعرض المحتوى أو صدّره', en: 'Browse or export the content' }
        ]
    },
    {
        id: 'explorer-resources', system: 'explorer', kind: 'link', image: 'photo-1551288049-bebda4e38f71',
        title: { ar: 'مصادر تعليمية — بوابة المستكشف', en: 'Learning resources — Explorer portal' },
        description: { ar: 'رابط خارجي للمصادر التعليمية الخاصة بالبوابة.', en: 'An external link to learning resources for the portal.' }
    },
    {
        id: 'hr-guide', system: 'hr', kind: 'video', length: '06:10', image: 'photo-1521737604893-d14cc237f11d',
        title: { ar: 'دليل نظام الموارد البشرية', en: 'HR system user guide' },
        description: { ar: 'فيديو تعليمي لأهم خدمات نظام الموارد البشرية.', en: 'A video walkthrough of the HR system’s main services.' }
    },
    {
        id: 'hr-leave', system: 'hr', kind: 'image', image: 'photo-1573164713988-8665fc963095',
        title: { ar: 'تقديم طلب إجازة', en: 'Submitting a leave request' },
        description: { ar: 'خطوات مصوّرة لتقديم طلب الإجازة.', en: 'Illustrated steps for submitting a leave request.' },
        steps: [
            { ar: 'افتح نظام الموارد البشرية', en: 'Open the HR system' },
            { ar: 'اختر خدمة طلب إجازة وأدخل التواريخ', en: 'Choose the leave request service and enter the dates' },
            { ar: 'أرسل الطلب وتابع حالته', en: 'Submit the request and track its status' }
        ]
    },
    {
        id: 'tawasol-guide', system: 'tawasol', kind: 'video', length: '03:45', image: 'photo-1556742049-0cfed4f6a45d',
        title: { ar: 'دليل نظام تواصل', en: 'Tawasol system guide' },
        description: { ar: 'كيفية رفع طلب دعم ومتابعته عبر نظام تواصل.', en: 'How to raise and follow a support request in Tawasol.' }
    },
    {
        id: 'elicensing-guide', system: 'elicensing', kind: 'link', image: 'photo-1554224155-6726b3ff858f',
        title: { ar: 'دليل التراخيص الإلكترونية', en: 'E-licensing guide' },
        description: { ar: 'رابط خارجي للمصادر التعليمية لنظام التراخيص الإلكترونية.', en: 'An external link to learning resources for the e-licensing system.' }
    },
    {
        id: 'elicensing-steps', system: 'elicensing', kind: 'image', image: 'photo-1531482615713-2afd69097998',
        title: { ar: 'متابعة طلبات التراخيص', en: 'Tracking licence requests' },
        description: { ar: 'خطوات مصوّرة لمتابعة حالة الطلب.', en: 'Illustrated steps for tracking a request’s status.' },
        steps: [
            { ar: 'سجّل الدخول إلى نظام التراخيص', en: 'Sign in to the licensing system' },
            { ar: 'افتح قائمة الطلبات', en: 'Open the requests list' },
            { ar: 'اختر الطلب لعرض حالته', en: 'Select a request to view its status' }
        ]
    }
];
