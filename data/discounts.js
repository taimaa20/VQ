/* Discounts (BRD 7.5 & 8.7) */
window.VQData = window.VQData || {};

VQData.discountCategories = [
    { key: 'living', icon: 'fa-building', label: { ar: 'سكن ومنتجعات', en: 'Living & resorts' } },
    { key: 'dining', icon: 'fa-utensils', label: { ar: 'مطاعم ومقاهي', en: 'Restaurants & cafés' } },
    { key: 'culture', icon: 'fa-ticket', label: { ar: 'ثقافة وترفيه', en: 'Culture & entertainment' } },
    { key: 'wellness', icon: 'fa-spa', label: { ar: 'صحة ولياقة', en: 'Health & fitness' } },
    { key: 'shopping', icon: 'fa-bag-shopping', label: { ar: 'تسوق', en: 'Shopping' } },
    { key: 'leisure', icon: 'fa-umbrella-beach', label: { ar: 'شواطئ واستجمام', en: 'Beach & leisure' } }
];

VQData.discounts = [
    {
        id: 'pearl-gewan',
        category: 'living',
        percent: 25,
        start: '2026-09-12',
        end: '2026-12-31',
        image: 'photo-1566073771259-6a8506099945',
        partner: { ar: 'اللؤلؤة وجزيرة جيوان', en: 'The Pearl & Gewan Island' },
        title: { ar: 'جزيرة اللؤلؤة وجزيرة جيوان', en: 'The Pearl & Gewan Island' },
        summary: { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'All employees can now enjoy special prices and exclusive offers through a wide network of partners.' },
        body: [
            { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'We are pleased to announce that all employees can now enjoy special prices and exclusive offers through a wide network of partners.' },
            { ar: 'يشمل العرض وحدات في مدينة سنترال وقناة كوارتير وجزيرة جيوان، إضافة إلى بورتو أرابيا وفيفا بحرية، وتختلف نسبة الخصم حسب إطلالة الوحدة.', en: 'The offer covers Medina Centrale, Qanat Quartier and Gewan Island, as well as Porto Arabia and Viva Bahriya, with the discount depending on the unit’s view.' }
        ],
        offers: [
            {
                group: { ar: 'مدينة سنترال | قناة كوارتير | جزيرة جيوان', en: 'Medina Centrale | Qanat Quartier | Gewan Island' },
                rows: [
                    { percent: 15, label: { ar: 'إطلالة مباشرة', en: 'Direct views' } },
                    { percent: 20, label: { ar: 'إطلالة جزئية', en: 'Partial views' } },
                    { percent: 25, label: { ar: 'إطلالة محجوبة', en: 'Blocked views' } }
                ]
            },
            {
                group: { ar: 'بورتو أرابيا | فيفا بحرية', en: 'Porto Arabia | Viva Bahriya' },
                rows: [
                    { percent: 10, label: { ar: 'إطلالة مباشرة', en: 'Direct views' } },
                    { percent: 15, label: { ar: 'إطلالة جزئية', en: 'Partial views' } },
                    { percent: 20, label: { ar: 'إطلالة محجوبة', en: 'Blocked views' } }
                ]
            }
        ],
        terms: [
            { ar: 'رسوم قطر كول يدفعها المالك', en: 'Qatar Cool charges paid by the landlord' },
            { ar: 'رسوم الصيانة مشمولة', en: 'Maintenance charges included' },
            { ar: 'تطبق الشروط والأحكام', en: 'Terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Pearl-Gewan.pdf'
    },
    {
        id: 'restaurants',
        category: 'dining',
        percent: 20,
        start: '2026-09-10',
        end: '2026-12-31',
        image: 'photo-1517248135467-4c7edcad34c4',
        partner: { ar: 'شركاء المطاعم', en: 'Dining partners' },
        title: { ar: 'المطاعم والمقاهي', en: 'Restaurants & cafés' },
        summary: { ar: 'أسعار خاصة للموظفين لدى مجموعة من المطاعم والمقاهي الشريكة.', en: 'Special employee prices at a selection of partner restaurants and cafés.' },
        body: [
            { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة لدى مجموعة من المطاعم والمقاهي الشريكة.', en: 'All employees can now enjoy special prices at a selection of partner restaurants and cafés.' }
        ],
        terms: [
            { ar: 'تطبق الشروط والأحكام الخاصة بكل شريك', en: 'Each partner’s terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Dining.pdf'
    },
    {
        id: 'culture-tickets',
        category: 'culture',
        percent: 15,
        start: '2026-09-06',
        end: '2026-11-30',
        image: 'photo-1511578314322-379afb476865',
        partner: { ar: 'الفعاليات الثقافية', en: 'Cultural events' },
        title: { ar: 'تذاكر الفعاليات الثقافية', en: 'Cultural event tickets' },
        summary: { ar: 'خصم على تذاكر مختارة من الفعاليات الثقافية.', en: 'A discount on selected cultural event tickets.' },
        body: [
            { ar: 'يحصل الموظفون على خصم على تذاكر مختارة من الفعاليات الثقافية خلال فترة العرض.', en: 'Employees receive a discount on selected cultural event tickets during the offer period.' }
        ],
        terms: [
            { ar: 'حسب توفر التذاكر', en: 'Subject to ticket availability' },
            { ar: 'تطبق الشروط والأحكام', en: 'Terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Culture.pdf'
    },
    {
        id: 'fitness',
        category: 'wellness',
        percent: 30,
        start: '2026-09-02',
        end: '2027-03-31',
        image: 'photo-1534438327276-14e5300c3a48',
        partner: { ar: 'نوادي اللياقة الشريكة', en: 'Partner fitness clubs' },
        title: { ar: 'نوادي اللياقة البدنية', en: 'Fitness clubs' },
        summary: { ar: 'اشتراكات بأسعار خاصة في نوادي اللياقة البدنية الشريكة.', en: 'Special membership prices at partner fitness clubs.' },
        body: [
            { ar: 'يحصل الموظفون على أسعار خاصة للاشتراك في نوادي اللياقة البدنية الشريكة.', en: 'Employees can get special membership prices at partner fitness clubs.' }
        ],
        terms: [
            { ar: 'تطبق الشروط والأحكام', en: 'Terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Fitness.pdf'
    },
    {
        id: 'shopping-retail',
        category: 'shopping',
        percent: 10,
        start: '2026-08-02',
        end: '2026-12-31',
        image: 'photo-1441986300917-64674bd600d8',
        partner: { ar: 'شركاء التجزئة', en: 'Retail partners' },
        title: { ar: 'التسوق والتجزئة', en: 'Shopping & retail' },
        summary: { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'All employees can now enjoy special prices and exclusive offers through a wide network of partners.' },
        body: [
            { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية لدى شركاء التسوق والتجزئة.', en: 'All employees can now enjoy special prices and exclusive offers with shopping and retail partners.' }
        ],
        terms: [
            { ar: 'تطبق الشروط والأحكام', en: 'Terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Retail.pdf'
    },
    {
        id: 'nami-beach',
        category: 'leisure',
        percent: 15,
        start: '2026-07-06',
        end: '2026-10-31',
        image: 'photo-1507525428034-b723cf961d3e',
        partner: { ar: 'شاطئ نامي', en: 'Nami Beach' },
        title: { ar: 'شاطئ نامي', en: 'Nami Beach' },
        summary: { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'All employees can now enjoy special prices and exclusive offers through a wide network of partners.' },
        body: [
            { ar: 'يحصل الموظفون على أسعار خاصة وعروض حصرية في شاطئ نامي خلال فترة العرض.', en: 'Employees can enjoy special prices and exclusive offers at Nami Beach during the offer period.' }
        ],
        terms: [
            { ar: 'تطبق الشروط والأحكام', en: 'Terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Nami-Beach.pdf'
    },
    {
        id: 'health-beauty',
        category: 'wellness',
        percent: 20,
        start: '2026-07-02',
        end: '2026-09-30',
        image: 'photo-1544161515-4ab6ce6db874',
        partner: { ar: 'مراكز الصحة والجمال', en: 'Health & beauty centres' },
        title: { ar: 'الصحة والجمال والعافية', en: 'Health, beauty & wellness' },
        summary: { ar: 'يسرّنا أن نعلن أن جميع الموظفين يمكنهم الآن الحصول على أسعار خاصة وعروض حصرية عن طريق عدد كبير من الشركاء.', en: 'All employees can now enjoy special prices and exclusive offers through a wide network of partners.' },
        body: [
            { ar: 'يحصل الموظفون على أسعار خاصة وعروض حصرية لدى مراكز الصحة والجمال والعافية الشريكة.', en: 'Employees can enjoy special prices and exclusive offers at partner health, beauty and wellness centres.' }
        ],
        terms: [
            { ar: 'تطبق الشروط والأحكام', en: 'Terms and conditions apply' }
        ],
        document: 'STAFF-OFFER-Wellness.pdf'
    }
];
