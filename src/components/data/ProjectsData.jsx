const projectsData = [
  {
    id: 1,
    title: "مشروع ترميم المنازل",
    category: "القطاع الإنساني",
    price: "3000.00",
    location: "دمشق",
    progress: 40,
    executor: "شركة البناء الحديثة",
    status: "جاري التنفيذ",
    funder: "رجال الأعمال",
    image: "/houses-destroyed.jpg",
    details: "مشروع يهدف إلى ترميم المنازل المتضررة في مدينة دمشق وتحسين ظروف المعيشة.",
    requirements: [
      "ترميم 20 منزل",
      "إعادة تأهيل البنية التحتية",
      "شبكات كهرباء ومياه",
      "إزالة الأنقاض"
    ],
    bill: [
      { name: "ترميم 20 منزل", price: 1400.00 },
      { name: "إعادة تأهيل البنية التحتية", price: 800.00 },
      { name: "شبكات كهرباء ومياه", price: 500.00 },
      { name: "إزالة الأنقاض", price: 300.00 }
    ],
    images: ["/houses-destroyed.jpg", "/houses-destroyed.jpg", "/houses-destroyed.jpg"]
  },

  {
    id: 2,
    title: "مشروع دعم المستشفيات",
    category: "القطاع الصحي",
    price: "5000.00",
    location: "حلب",
    progress: 75,
    executor: "مؤسسة التطوير",
    status: "قيد التنفيذ",
    funder: "منظمات دولية",
    image: "/hospital.jpg",
    details: "تجهيز المستشفيات بالمعدات الطبية الحديثة ودعم الكوادر الطبية.",
    requirements: [
      "أجهزة طبية",
      "كوادر طبية",
      "صيانة",
      "مواد طبية"
    ],
    bill: [
      { name: "أجهزة طبية", price: 2500.00 },
      { name: "كوادر طبية", price: 1200.00 },
      { name: "صيانة", price: 800.00 },
      { name: "مواد طبية", price: 500.00 }
    ],
    images: ["/hospital.jpg", "/hospital.jpg", "/hospital.jpg"]
  },

  {
    id: 3,
    title: "مشروع إعادة تأهيل المدارس",
    category: "القطاع التعليمي",
    price: "2000.00",
    location: "إدلب",
    progress: 60,
    executor: "شركة الإعمار",
    status: "جاري التنفيذ",
    funder: "جهات محلية",
    image: "/school.jpeg",
    details: "إعادة تأهيل المدارس المتضررة لضمان استمرار العملية التعليمية.",
    requirements: [
      "ترميم الصفوف",
      "تجهيز مقاعد",
      "كهرباء",
      "مياه"
    ],
    bill: [
      { name: "ترميم الصفوف", price: 900.00 },
      { name: "تجهيز مقاعد", price: 500.00 },
      { name: "كهرباء", price: 300.00 },
      { name: "مياه", price: 300.00 }
    ],
    images: ["/school.jpeg", "/school.jpeg", "/school.jpeg"]
  },

  {
    id: 4,
    title: "مشروع توزيع سلال غذائية",
    category: "القطاع الإغاثي",
    price: "1500.00",
    location: "حمص",
    progress: 85,
    executor: "جمعية الأمل",
    status: "مكتمل جزئياً",
    funder: "تبرعات",
    image: "/Food-basketss.jpg",
    details: "توزيع سلال غذائية للعائلات المحتاجة في المناطق المتضررة.",
    requirements: [
      "مواد غذائية",
      "تغليف",
      "توزيع",
      "تخزين"
    ],
    bill: [
      { name: "مواد غذائية", price: 800.00 },
      { name: "تغليف", price: 200.00 },
      { name: "توزيع", price: 300.00 },
      { name: "تخزين", price: 200.00 }
    ],
    images: ["/Food-basketss.jpg", "/Food-basketss.jpg", "/Food-basketss.jpg"]
  },

  {
    id: 5,
    title: "مشروع تأمين مياه الشرب",
    category: "قطاع المياه",
    price: "2500.00",
    location: "درعا",
    progress: 50,
    executor: "شركة البناء الحديثة",
    status: "قيد التنفيذ",
    funder: "منظمات إنسانية",
    image: "/water.jpg",
    details: "تأمين مياه شرب نظيفة من خلال حفر آبار وإنشاء شبكات حديثة.",
    requirements: [
      "حفر آبار",
      "شبكات مياه",
      "صيانة",
      "تعقيم"
    ],
    bill: [
      { name: "حفر آبار", price: 1200.00 },
      { name: "شبكات مياه", price: 700.00 },
      { name: "صيانة", price: 400.00 },
      { name: "تعقيم", price: 200.00 }
    ],
    images: ["/water.jpg", "/water.jpg", "/water.jpg"]
  },

  {
    id: 6,
    title: "مشروع دعم الأيتام",
    category: "القطاع الاجتماعي",
    price: "4000.00",
    location: "اللاذقية",
    progress: 30,
    executor: "جمعية الأمل",
    status: "قيد التنفيذ",
    funder: "تبرعات",
    image: "/orphans.jpg",
    details: "تقديم الدعم والرعاية للأيتام من خلال برامج تعليمية واجتماعية.",
    requirements: [
      "كفالات شهرية",
      "تعليم",
      "رعاية صحية",
      "أنشطة ترفيهية"
    ],
    bill: [
      { name: "كفالات شهرية", price: 2000.00 },
      { name: "تعليم", price: 900.00 },
      { name: "رعاية صحية", price: 700.00 },
      { name: "أنشطة ترفيهية", price: 400.00 }
    ],
    images: ["/orphans.jpg", "/orphans.jpg", "/orphans.jpg"]
  },

  {
    id: 7,
    title: "تأمين مواقف ثابتة للنقل الداخلي",
    category: "القطاع الخدمي",
    price: "4000.00",
    location: "حمص",
    progress: 30,
    executor: "مؤسسة التطوير",
    status: "قيد التنفيذ",
    funder: "القطاع الخاص",
    image: "/مواقف-ذكية.webp",
    details: "إنشاء مواقف حديثة ومنظمة للنقل الداخلي لتحسين الحركة المرورية.",
    requirements: [
      "بناء مواقف",
      "تنظيم",
      "إدارة",
      "أنظمة ذكية"
    ],
    bill: [
      { name: "بناء مواقف", price: 1800.00 },
      { name: "تنظيم", price: 800.00 },
      { name: "إدارة", price: 700.00 },
      { name: "أنظمة ذكية", price: 700.00 }
    ],
    images: ["/مواقف-ذكية.webp", "/مواقف-ذكية.webp", "/مواقف-ذكية.webp"]
  }
];

export default projectsData; 