// Everything you see on the site lives in this file.
// Edit the text here; the pages pick it up. Placeholders are marked TODO.

export type Lang = "en" | "tr" | "uz";
export const langs: Array<{ id: Lang; label: string; short: string }> = [
  { id: "en", label: "English", short: "EN" },
  { id: "tr", label: "Türkçe", short: "TR" },
  { id: "uz", label: "O'zbekcha", short: "UZ" },
];

type L = Record<Lang, string>;

export const profile = {
  name: "Muhsina Otahonova",
  // TODO: put your photo in apps/site/public/me.jpg and set photo: "me.jpg"
  photo: "",
  city: { en: "Istanbul", tr: "İstanbul", uz: "Istanbul" } as L, // TODO
  timeZone: "Europe/Istanbul",
  email: "hello@example.com", // TODO
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/MuhsinaOtahonova" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO
    { id: "telegram", label: "Telegram", href: "https://t.me/" }, // TODO
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" }, // TODO
  ] as const,
};

export type ProjectKind = "web" | "library" | "site";
export type Status = "live" | "progress";

export interface Project {
  id: string;
  name: string;
  year: string;
  kind: ProjectKind;
  status: Status;
  image: string;
  imageDark?: string;
  stack: string[];
  summary: L;
  live?: string;
  code?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "ielts",
    name: "Word a Day",
    year: "2026",
    kind: "web",
    status: "live",
    image: "projects/ielts-vocab.jpg",
    stack: ["React", "TypeScript", "Vite"],
    summary: {
      en: "An IELTS vocabulary app. Add a few words each day, practise them with short games, and check yourself every Friday.",
      tr: "IELTS kelime uygulaması. Her gün birkaç kelime ekle, kısa oyunlarla çalış ve her cuma kendini test et.",
      uz: "IELTS so'z boyligi uchun ilova. Har kuni bir nechta so'z qo'shing, qisqa o'yinlar bilan mashq qiling va har juma o'zingizni tekshiring.",
    },
    live: "https://muhsinaotahonova.github.io/IELTS-Vocab/",
    code: "https://github.com/MuhsinaOtahonova/IELTS-Vocab",
    featured: true,
  },
  {
    id: "design",
    name: "My Design",
    year: "2026",
    kind: "library",
    status: "live",
    image: "projects/design-template.jpg",
    imageDark: "projects/design-template-dark.jpg",
    stack: ["React", "React Native", "Turborepo", "Storybook"],
    summary: {
      en: "My design system. One set of tokens and components for web and mobile apps, with day and night themes. This site is built with it.",
      tr: "Kendi tasarım sistemim. Web ve mobil uygulamalar için tek bir token ve bileşen seti, gündüz ve gece temasıyla. Bu site de onunla yapıldı.",
      uz: "Mening dizayn tizimim. Veb va mobil ilovalar uchun yagona tokenlar va komponentlar to'plami, kunduzgi va tungi mavzu bilan. Bu sayt ham u bilan qurilgan.",
    },
    live: "https://muhsinaotahonova.github.io/my-design-template/",
    code: "https://github.com/MuhsinaOtahonova/my-design-template",
    featured: true,
  },
  {
    id: "about",
    name: "About me",
    year: "2026",
    kind: "site",
    status: "progress",
    image: "",
    stack: ["React", "TypeScript"],
    summary: {
      en: "This website. Projects, skills and contact details in three languages.",
      tr: "Bu web sitesi. Projeler, yetenekler ve iletişim bilgileri üç dilde.",
      uz: "Shu veb-sayt. Loyihalar, ko'nikmalar va aloqa ma'lumotlari uch tilda.",
    },
    code: "https://github.com/MuhsinaOtahonova/about-me",
  },
];

// TODO: replace with your real skills
export const skills: Array<{ group: L; items: string[] }> = [
  { group: { en: "Frontend", tr: "Frontend", uz: "Frontend" }, items: ["React", "TypeScript", "HTML & CSS", "Vite"] },
  { group: { en: "Mobile", tr: "Mobil", uz: "Mobil" }, items: ["React Native", "Expo"] },
  { group: { en: "Design", tr: "Tasarım", uz: "Dizayn" }, items: ["Design systems", "UI design", "Figma"] },
  { group: { en: "Tools", tr: "Araçlar", uz: "Vositalar" }, items: ["Git & GitHub", "pnpm", "Turborepo", "Storybook", "Claude"] },
];

export const languagesSpoken: Array<{ name: L; level: L }> = [
  { name: { en: "Uzbek", tr: "Özbekçe", uz: "O'zbek tili" }, level: { en: "Native", tr: "Ana dil", uz: "Ona tili" } },
  { name: { en: "Turkish", tr: "Türkçe", uz: "Turk tili" }, level: { en: "Fluent", tr: "Akıcı", uz: "Erkin" } },
  { name: { en: "English", tr: "İngilizce", uz: "Ingliz tili" }, level: { en: "Preparing for IELTS", tr: "IELTS'e hazırlanıyor", uz: "IELTSga tayyorlanmoqda" } },
];

// TODO: placeholder photos. Put your own in public/photos/ and list them here.
export const photos: Array<{ src: string; alt: L }> = [
  { src: "https://picsum.photos/seed/bosphorus/800/1000", alt: { en: "Photo 1", tr: "Fotoğraf 1", uz: "Rasm 1" } },
  { src: "https://picsum.photos/seed/desk-notes/800/600", alt: { en: "Photo 2", tr: "Fotoğraf 2", uz: "Rasm 2" } },
  { src: "https://picsum.photos/seed/old-city/800/600", alt: { en: "Photo 3", tr: "Fotoğraf 3", uz: "Rasm 3" } },
  { src: "https://picsum.photos/seed/morning-tea/800/1000", alt: { en: "Photo 4", tr: "Fotoğraf 4", uz: "Rasm 4" } },
  { src: "https://picsum.photos/seed/sea-walk/800/600", alt: { en: "Photo 5", tr: "Fotoğraf 5", uz: "Rasm 5" } },
];

export const ui = {
  en: {
    nav: { home: "Home", projects: "Projects", photos: "Photos", contact: "Contact" },
    role: "Frontend developer and designer",
    bio: "I build web apps and the design systems behind them. Right now I'm working on a component library for web and mobile, and a small app that helps me learn IELTS vocabulary.",
    localTime: "Local time",
    cta: { projects: "See projects", contact: "Get in touch" },
    selected: "Selected projects",
    allProjects: "All projects",
    projectsIntro: "Things I've built, plus the ones I'm still working on.",
    filter: { all: "All", web: "Web apps", library: "Libraries", site: "Websites" },
    status: { live: "Live", progress: "In progress" },
    kind: { web: "Web app", library: "Library", site: "Website" },
    open: "Open",
    code: "Code",
    skills: "Skills",
    languages: "Languages",
    photos: "Photos",
    photosIntro: "A few moments from outside the screen.",
    contactTitle: "Have an idea or a role in mind? Let's talk.",
    contactText: "I reply to email within a day or two.",
    copy: "Copy email",
    copied: "Copied",
    top: "Back to top",
    theme: { light: "Day", dark: "Night" },
    language: "Language",
    menu: "Menu",
  },
  tr: {
    nav: { home: "Ana sayfa", projects: "Projeler", photos: "Fotoğraflar", contact: "İletişim" },
    role: "Frontend geliştirici ve tasarımcı",
    bio: "Web uygulamaları ve onların arkasındaki tasarım sistemlerini yapıyorum. Şu sıralar web ve mobil için bir bileşen kütüphanesi ve IELTS kelimelerini öğrenmeme yardım eden küçük bir uygulama üzerinde çalışıyorum.",
    localTime: "Yerel saat",
    cta: { projects: "Projeleri gör", contact: "İletişime geç" },
    selected: "Öne çıkan projeler",
    allProjects: "Tüm projeler",
    projectsIntro: "Yaptığım işler ve hâlâ üzerinde çalıştıklarım.",
    filter: { all: "Hepsi", web: "Web uygulamaları", library: "Kütüphaneler", site: "Web siteleri" },
    status: { live: "Yayında", progress: "Devam ediyor" },
    kind: { web: "Web uygulaması", library: "Kütüphane", site: "Web sitesi" },
    open: "Aç",
    code: "Kod",
    skills: "Yetenekler",
    languages: "Diller",
    photos: "Fotoğraflar",
    photosIntro: "Ekran dışından birkaç an.",
    contactTitle: "Bir fikrin ya da iş teklifin mi var? Konuşalım.",
    contactText: "E-postalara bir iki gün içinde dönerim.",
    copy: "E-postayı kopyala",
    copied: "Kopyalandı",
    top: "Yukarı dön",
    theme: { light: "Gündüz", dark: "Gece" },
    language: "Dil",
    menu: "Menü",
  },
  uz: {
    nav: { home: "Bosh sahifa", projects: "Loyihalar", photos: "Rasmlar", contact: "Aloqa" },
    role: "Frontend dasturchi va dizayner",
    bio: "Veb-ilovalar va ularning ortidagi dizayn tizimlarini yarataman. Hozir veb va mobil uchun komponentlar kutubxonasi hamda IELTS so'zlarini o'rganishimga yordam beradigan kichik ilova ustida ishlayapman.",
    localTime: "Mahalliy vaqt",
    cta: { projects: "Loyihalarni ko'rish", contact: "Bog'lanish" },
    selected: "Tanlangan loyihalar",
    allProjects: "Barcha loyihalar",
    projectsIntro: "Men yaratgan ishlar va hali ustida ishlayotganlarim.",
    filter: { all: "Hammasi", web: "Veb-ilovalar", library: "Kutubxonalar", site: "Veb-saytlar" },
    status: { live: "Ishlamoqda", progress: "Jarayonda" },
    kind: { web: "Veb-ilova", library: "Kutubxona", site: "Veb-sayt" },
    open: "Ochish",
    code: "Kod",
    skills: "Ko'nikmalar",
    languages: "Tillar",
    photos: "Rasmlar",
    photosIntro: "Ekrandan tashqaridagi bir necha lahza.",
    contactTitle: "G'oyangiz yoki ish taklifingiz bormi? Gaplashamiz.",
    contactText: "Xatlarga bir-ikki kun ichida javob beraman.",
    copy: "Emailni nusxalash",
    copied: "Nusxalandi",
    top: "Yuqoriga",
    theme: { light: "Kunduz", dark: "Tun" },
    language: "Til",
    menu: "Menyu",
  },
} satisfies Record<Lang, unknown>;

export type UI = (typeof ui)["en"];
