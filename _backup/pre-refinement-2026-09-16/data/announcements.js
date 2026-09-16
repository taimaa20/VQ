/* Announcements / Circulars (BRD 7.2 & 8.6)
   type: general (blue) · ceo (golden) · obituary (dark) · hr (burgundy)
   image: the circular artwork already used on the homepage */
window.VQData = window.VQData || {};

VQData.announcementTypes = [
    { key: 'general', color: '#005871', css: 'blue-background', image: 'general.png', label: { ar: 'تعميم عام', en: 'General' } },
    { key: 'ceo', color: '#a08d31', css: 'gold-background', image: 'ceo.png', label: { ar: 'الرئيس التنفيذي', en: 'CEO' } },
    { key: 'obituary', color: '#2b2c27', css: 'black-background', image: 'death.png', label: { ar: 'تعزية', en: 'Condolence' } },
    { key: 'hr', color: '#8A1538', css: 'burgundy-background', image: 'HR.png', label: { ar: 'موارد بشرية', en: 'Human Resources' } }
];

VQData.announcements = [
    {
        id: 'ceo-fiscal-year',
        number: 'VQ-CIR-2026-091',
        type: 'ceo',
        start: '2026-09-12',
        end: '2026-10-12',
        issuer: { ar: 'مكتب الرئيس التنفيذي', en: 'CEO Office' },
        title: { ar: 'كلمة الرئيس التنفيذي — بداية السنة المالية', en: 'CEO message — start of the fiscal year' },
        summary: { ar: 'توجيهات الافتتاح ومعايير الضيافة للربع الجديد.', en: 'Opening guidance and hospitality standards for the new quarter.' },
        body: [
            { ar: 'الزملاء الأعزاء،', en: 'Dear colleagues,' },
            { ar: 'يسرّنا مشاركة كلمة الرئيس التنفيذي بمناسبة بداية السنة المالية، والتي تتضمن توجيهات الافتتاح ومعايير الضيافة للربع الجديد.', en: 'We are pleased to share the CEO’s message marking the start of the fiscal year, including opening guidance and hospitality standards for the new quarter.' },
            { ar: 'يُرجى من جميع الموظفين الاطلاع على الكلمة كاملة في الملف المرفق.', en: 'All employees are kindly requested to read the full message in the attached file.' }
        ],
        attachment: 'CEO-Message-FY2026.pdf'
    },
    {
        id: 'ac-temperature',
        number: 'VQ-CIR-2026-088',
        type: 'general',
        start: '2026-09-11',
        end: '2026-10-31',
        issuer: { ar: 'قسم الخدمات الإدارية', en: 'Administrative Services' },
        title: { ar: 'تعميم درجات حرارة المكاتب وترشيد الطاقة', en: 'Office temperature and energy circular' },
        summary: { ar: 'تعليمات التشغيل الموحدة للمكاتب بشأن إعدادات أجهزة التكييف.', en: 'Unified office instructions on air-conditioning settings.' },
        body: [
            { ar: 'الزملاء الأعزاء،', en: 'Dear colleagues,' },
            { ar: 'للحفاظ على بيئة عمل مريحة وفعّالة، يُرجى من الموظفين عدم تعديل أو إغلاق أجهزة التحكم في التكييف.', en: 'To maintain a comfortable and efficient work environment, employees are kindly requested not to adjust or switch off the air-conditioning controls.' },
            { ar: 'درجة الحرارة الموصى بها داخل المبنى هي بين 18 و22 درجة مئوية.', en: 'The recommended temperature inside the building is between 18 and 22°C.' },
            { ar: 'قد تؤثر التعديلات غير المصرّح بها على توازن درجات الحرارة وأداء أنظمة التكييف، ويساعد الالتزام بالإرشادات في حماية البنية التحتية للكهرباء في المبنى والحفاظ على بيئة آمنة ومريحة.', en: 'Unauthorised changes may affect temperature balance and air-conditioning performance. Following these guidelines helps protect the building’s electrical infrastructure and keeps the workplace safe and comfortable.' },
            { ar: 'لطلب الدعم لأجهزة التكييف، يُرجى التواصل مع فريق إدارة الخدمات الإدارية.', en: 'For air-conditioning support, please contact the Administrative Services team.' },
            { ar: 'نقدّر تعاونكم ودعمكم.', en: 'We appreciate your cooperation and support.' }
        ]
    },
    {
        id: 'condolence-almarri',
        number: 'VQ-CIR-2026-087',
        type: 'obituary',
        start: '2026-09-10',
        end: '2026-09-17',
        issuer: { ar: 'إدارة الموارد البشرية', en: 'Human Resources' },
        title: { ar: 'تعزية في وفاة والد الزميل خالد المري', en: 'Condolence — father of colleague Khalid Al-Marri' },
        summary: { ar: 'نتقدم بأصدق التعازي للزميل وأسرته.', en: 'Our sincere condolences to our colleague and his family.' },
        body: [
            { ar: 'بقلوب مؤمنة بقضاء الله وقدره، تتقدم أسرة قطر للسياحة بخالص العزاء والمواساة إلى الزميل خالد المري في وفاة والده.', en: 'With hearts that accept the will of God, the Visit Qatar family extends its sincere condolences to our colleague Khalid Al-Marri on the passing of his father.' },
            { ar: 'سائلين الله أن يتغمّده بواسع رحمته، وأن يُلهم أهله وذويه الصبر والسلوان.', en: 'May God grant him mercy and give his family patience and solace.' },
            { ar: 'إنا لله وإنا إليه راجعون.', en: 'To God we belong and to Him we shall return.' }
        ]
    },
    {
        id: 'annual-leave-update',
        number: 'VQ-CIR-2026-085',
        type: 'hr',
        start: '2026-09-09',
        end: '2026-12-31',
        issuer: { ar: 'إدارة الموارد البشرية', en: 'Human Resources' },
        title: { ar: 'تحديث سياسة الإجازات السنوية', en: 'Annual leave policy update' },
        summary: { ar: 'تفاصيل السياسة الجديدة وآلية تقديم الطلب.', en: 'Details of the new policy and how to submit a request.' },
        body: [
            { ar: 'الزملاء الأعزاء،', en: 'Dear colleagues,' },
            { ar: 'تم تحديث سياسة الإجازات السنوية، ويمكنكم الاطلاع على النسخة المحدّثة وآلية تقديم الطلب في صفحة السياسات والإجراءات والنماذج.', en: 'The annual leave policy has been updated. The latest version and the request process are available on the Policies, Procedures and Forms page.' },
            { ar: 'للاستفسارات، يُرجى التواصل مع إدارة الموارد البشرية.', en: 'For any questions, please contact the Human Resources department.' }
        ],
        link: { page: 'policies', label: { ar: 'فتح السياسات العامة', en: 'Open General Policies' } }
    },
    {
        id: 'survey-reminder',
        number: 'VQ-CIR-2026-081',
        type: 'hr',
        start: '2026-09-06',
        end: '2026-09-30',
        issuer: { ar: 'إدارة الموارد البشرية', en: 'Human Resources' },
        title: { ar: 'تذكير: شارك في استطلاع بيئة العمل', en: 'Reminder: take part in the work environment poll' },
        summary: { ar: 'شاركنا رأيك حول مدى رضاك عن بيئة العمل الحالية.', en: 'Share how satisfied you are with the current work environment.' },
        body: [
            { ar: 'ندعو جميع الموظفين للمشاركة في استطلاع الرأي حول مدى الرضا عن بيئة العمل الحالية عبر صفحة الاستبيانات في البوابة.', en: 'All employees are invited to take part in the poll on satisfaction with the current work environment, available on the portal’s Survey page.' },
            { ar: 'مشاركتكم تساعدنا على تطوير بيئة العمل.', en: 'Your participation helps us improve our workplace.' }
        ],
        link: { page: 'surveys', label: { ar: 'الذهاب إلى الاستبيانات', en: 'Go to Survey' } }
    },
    {
        id: 'intranet-launch',
        number: 'VQ-CIR-2026-079',
        type: 'general',
        start: '2026-09-01',
        end: '2026-10-01',
        issuer: { ar: 'العلاقات العامة والاتصال', en: 'PR & Communications' },
        title: { ar: 'إطلاق البوابة الداخلية الجديدة لقطر للسياحة', en: 'Launch of the new Visit Qatar intranet portal' },
        summary: { ar: 'وصول موحّد إلى التعاميم والفعاليات والخصومات والسياسات والخدمات.', en: 'One place for circulars, events, discounts, policies and services.' },
        body: [
            { ar: 'يسرّنا الإعلان عن إطلاق البوابة الداخلية الجديدة لقطر للسياحة، والتي توفر وصولاً موحّداً إلى التعاميم والفعاليات والخصومات والسياسات والخدمات.', en: 'We are pleased to announce the launch of the new Visit Qatar intranet portal, providing one place for circulars, events, discounts, policies and services.' },
            { ar: 'يمكنكم الاطلاع على أدلة استخدام الأنظمة من خلال صفحة دليل المستخدم.', en: 'System user guides are available on the User Guide page.' }
        ],
        link: { page: 'user-guide', label: { ar: 'فتح دليل المستخدم', en: 'Open User Guide' } }
    },
    {
        id: 'staff-discounts',
        number: 'VQ-CIR-2026-074',
        type: 'general',
        start: '2026-08-24',
        end: '2026-12-31',
        issuer: { ar: 'العلاقات العامة والاتصال', en: 'PR & Communications' },
        title: { ar: 'عروض وخصومات حصرية للموظفين', en: 'Exclusive offers and discounts for employees' },
        summary: { ar: 'أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'Special prices and exclusive offers through a wide network of partners.' },
        body: [
            { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'We are pleased to announce that all employees can now enjoy special prices and exclusive offers through a wide network of partners.' },
            { ar: 'تفاصيل كل عرض وشروطه متاحة في صفحة الخصومات.', en: 'Details and terms for each offer are available on the Discounts page.' }
        ],
        link: { page: 'discounts', label: { ar: 'عرض الخصومات', en: 'View discounts' } }
    },
    {
        id: 'certificates-published',
        number: 'VQ-CIR-2026-066',
        type: 'general',
        start: '2026-08-12',
        end: '2026-09-12',
        issuer: { ar: 'العلاقات العامة والاتصال', en: 'PR & Communications' },
        title: { ar: 'شهادات قطر للسياحة متاحة الآن على البوابة', en: 'Visit Qatar certificates now available on the portal' },
        summary: { ar: 'اطّلع على شهادات الأيزو المعتمدة لقطر للسياحة.', en: 'View Visit Qatar’s accredited ISO certificates.' },
        body: [
            { ar: 'أصبحت شهادات الأيزو المعتمدة لقطر للسياحة متاحة للاطلاع في صفحة شهادات قطر للسياحة.', en: 'Visit Qatar’s accredited ISO certificates are now available to view on the Visit Qatar Certificates page.' }
        ],
        link: { page: 'certificates', label: { ar: 'عرض الشهادات', en: 'View certificates' } }
    }
];
