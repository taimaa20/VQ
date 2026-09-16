/* General Policies, Procedures & Forms (BRD 7.8 & 8.11)
   Document content is shown as a neutral placeholder preview — no real policy text */
window.VQData = window.VQData || {};

VQData.policyCategories = [
    { key: 'policies', icon: 'fa-scale-balanced', label: { ar: 'السياسات', en: 'Policies' } },
    { key: 'procedures', icon: 'fa-list-check', label: { ar: 'الإجراءات', en: 'Procedures' } },
    { key: 'forms', icon: 'fa-file-signature', label: { ar: 'النماذج', en: 'Forms' } },
    { key: 'legal', icon: 'fa-gavel', label: { ar: 'السجلات القانونية', en: 'Legal records' } }
];

VQData.policies = [
    {
        id: 'annual-leave-policy', category: 'policies', ext: 'pdf', version: '2.1', updated: '2026-09-09', department: 'hr', pages: 6,
        title: { ar: 'سياسة الإجازات السنوية', en: 'Annual Leave Policy' },
        summary: { ar: 'تنظّم أنواع الإجازات السنوية وآلية تقديم الطلبات.', en: 'Covers annual leave types and how requests are submitted.' }
    },
    {
        id: 'remote-work-policy', category: 'policies', ext: 'docx', version: '1.0', updated: '2026-08-20', department: 'hr', pages: 4,
        title: { ar: 'سياسة العمل عن بُعد', en: 'Remote Work Policy' },
        summary: { ar: 'توضح إطار العمل عن بُعد ومسؤوليات الموظف.', en: 'Sets out the remote work framework and employee responsibilities.' }
    },
    {
        id: 'infosec-policy', category: 'policies', ext: 'pdf', version: '3.0', updated: '2026-06-15', department: 'it', pages: 12,
        title: { ar: 'سياسة أمن المعلومات', en: 'Information Security Policy' },
        summary: { ar: 'السياسة المرتبطة بنظام إدارة أمن المعلومات.', en: 'The policy linked to the information security management system.' }
    },
    {
        id: 'environmental-policy', category: 'policies', ext: 'pdf', version: '1.2', updated: '2026-05-10', department: 'services', pages: 5,
        title: { ar: 'السياسة البيئية', en: 'Environmental Policy' },
        summary: { ar: 'السياسة المرتبطة بنظام الإدارة البيئية.', en: 'The policy linked to the environmental management system.' }
    },
    {
        id: 'it-support-procedure', category: 'procedures', ext: 'pdf', version: '1.4', updated: '2026-07-01', department: 'it', pages: 8,
        title: { ar: 'إجراءات طلب الدعم الفني', en: 'IT Support Request Procedure' },
        summary: { ar: 'خطوات رفع طلبات الدعم الفني ومتابعتها.', en: 'Steps for raising and following up IT support requests.' }
    },
    {
        id: 'archiving-procedure', category: 'procedures', ext: 'pdf', version: '1.1', updated: '2026-04-22', department: 'archive', pages: 7,
        title: { ar: 'إجراءات أرشفة المستندات', en: 'Document Archiving Procedure' },
        summary: { ar: 'خطوات أرشفة المستندات وحفظها.', en: 'Steps for archiving and retaining documents.' }
    },
    {
        id: 'leave-request-form', category: 'forms', ext: 'docx', version: '2.0', updated: '2026-09-09', department: 'hr', pages: 1,
        title: { ar: 'نموذج طلب إجازة', en: 'Leave Request Form' },
        summary: { ar: 'نموذج تقديم طلب الإجازة.', en: 'Form for submitting a leave request.' }
    },
    {
        id: 'business-travel-form', category: 'forms', ext: 'docx', version: '1.3', updated: '2026-06-02', department: 'hr', pages: 2,
        title: { ar: 'نموذج طلب سفر عمل', en: 'Business Travel Request Form' },
        summary: { ar: 'نموذج طلب الموافقة على سفر العمل.', en: 'Form for requesting approval for business travel.' }
    },
    {
        id: 'services-request-form', category: 'forms', ext: 'xlsx', version: '1.0', updated: '2026-05-18', department: 'services', pages: 1,
        title: { ar: 'نموذج طلب خدمات إدارية', en: 'Administrative Services Request Form' },
        summary: { ar: 'نموذج طلب خدمات المكاتب والمرافق.', en: 'Form for office and facility service requests.' }
    },
    {
        id: 'code-of-conduct', category: 'legal', ext: 'pdf', version: '1.0', updated: '2026-03-01', department: 'hr', pages: 14,
        title: { ar: 'مدونة السلوك الوظيفي', en: 'Employee Code of Conduct' },
        summary: { ar: 'المبادئ العامة للسلوك الوظيفي.', en: 'General principles of professional conduct.' }
    },
    {
        id: 'data-privacy-notice', category: 'legal', ext: 'pdf', version: '1.1', updated: '2026-02-12', department: 'it', pages: 3,
        title: { ar: 'إشعار خصوصية البيانات', en: 'Data Privacy Notice' },
        summary: { ar: 'كيفية التعامل مع البيانات الشخصية للموظفين.', en: 'How employee personal data is handled.' }
    }
];
