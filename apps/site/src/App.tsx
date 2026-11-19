import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Badge, ButtonLink, Icon, IconButton, Reveal, RevealGroup, TiltCard, useTheme, useToast } from "@my-design/ui-web";
import { langs, languagesSpoken, photos, profile, projects, skills, ui, type Lang, type Project, type ProjectKind } from "./content";
import { SocialIcon } from "./social";

type Route = "home" | "projects";

const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode */
    }
  },
};

function initialLang(): Lang {
  const saved = store.get("pf-lang") as Lang | null;
  if (saved && saved in ui) return saved;
  const nav = navigator.language.slice(0, 2);
  return nav === "tr" ? "tr" : nav === "uz" ? "uz" : "en";
}

const readRoute = (): Route => (window.location.hash.startsWith("#/projects") ? "projects" : "home");

export function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [route, setRoute] = useState<Route>(readRoute);
  useEffect(() => {
    document.documentElement.lang = lang;
    store.set("pf-lang", lang);
  }, [lang]);

  useEffect(() => {
    const on = () => {
      setRoute(readRoute());
      const anchor = window.location.hash.split("#")[2];
      if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }));
      else window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header lang={lang} setLang={setLang} route={route} />
      <main id="main" className="wrap md-page" key={route}>
        {route === "home" ? <Home lang={lang} /> : <ProjectsPage lang={lang} />}
      </main>
      <Footer lang={lang} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
function Header({ lang, setLang, route }: { lang: Lang; setLang: (l: Lang) => void; route: Route }) {
  const t = ui[lang];
  const { theme, setTheme } = useTheme();
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    store.set("pf-theme", next);
  };
  const links: Array<{ href: string; label: string; active: boolean }> = [
    { href: "#/", label: t.nav.home, active: route === "home" },
    { href: "#/projects", label: t.nav.projects, active: route === "projects" },
    { href: "#/#photos", label: t.nav.photos, active: false },
    { href: "#/#contact", label: t.nav.contact, active: false },
  ];
  return (
    <header className="top">
      <div className="wrap top__row">
        <a href="#/" className="brand" aria-label={profile.name}>
          <span className="brand__mark">MO</span>
          <span className="brand__name">{profile.name}</span>
        </a>
        <nav className="top__nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={l.active ? "is-active" : undefined} aria-current={l.active ? "page" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="top__tools">
          <div className="langs" role="group" aria-label={t.language}>
            {langs.map((l) => (
              <button key={l.id} type="button" className={l.id === lang ? "is-on" : undefined} aria-pressed={l.id === lang} title={l.label} onClick={() => setLang(l.id)}>
                {l.short}
              </button>
            ))}
          </div>
          <IconButton icon={theme === "dark" ? "sun" : "moon"} label={theme === "dark" ? t.theme.light : t.theme.dark} onClick={toggle} />
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------
function Home({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <Hero lang={lang} />

      <Section id="work" title={t.selected} action={<a className="more" href="#/projects">{t.allProjects} <Icon name="arrowRight" size={16} /></a>}>
        <div className="projects">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProjectRow p={p} lang={lang} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="skills" title={t.skills}>
        <div className="skills">
          <RevealGroup stagger={60} className="skills__grid">
            {skills.map((g) => (
              <div className="skills__group" key={g.group.en}>
                <h3>{g.group[lang]}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
          <Reveal className="skills__group skills__langs">
            <h3>{t.languages}</h3>
            <ul>
              {languagesSpoken.map((l) => (
                <li key={l.name.en}>
                  {l.name[lang]} <span>{l.level[lang]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="photos" title={t.photos} intro={t.photosIntro}>
        <div className="photos">
          {photos.map((ph, i) => (
            <Reveal key={ph.src} delay={(i % 3) * 70} className={i === 0 ? "photos__item photos__item--tall" : "photos__item"}>
              <img src={ph.src} alt={ph.alt[lang]} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Contact lang={lang} />
    </>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const time = useClock(profile.timeZone, lang);
  return (
    <section className="hero">
      <div className="hero__text">
        <p className="hero__meta">
          <Icon name="mapPin" size={16} />
          {profile.city[lang]}
          <span aria-hidden>·</span>
          <span>
            {t.localTime} <strong>{time}</strong>
          </span>
        </p>
        <h1>{profile.name}</h1>
        <p className="hero__role">{t.role}</p>
        <p className="hero__bio">{t.bio}</p>
        <div className="hero__actions">
          <ButtonLink href="#/projects" size="lg" variant="primary">
            {t.cta.projects}
          </ButtonLink>
          <ButtonLink href="#/#contact" size="lg" variant="outline" icon="mail">
            {t.cta.contact}
          </ButtonLink>
        </div>
      </div>
      <div className="hero__card">
        <TiltCard max={9} padding="none" variant={profile.photo ? "surface" : "brand"}>
          <div className="portrait">
            {profile.photo ? <img src={profile.photo} alt={profile.name} /> : <span className="portrait__mono">MO</span>}
          </div>
        </TiltCard>
        <ul className="hero__socials">
          {profile.socials.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function useClock(timeZone: string, lang: Lang) {
  const fmt = useMemo(() => new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang, { hour: "2-digit", minute: "2-digit", timeZone }), [timeZone, lang]);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return fmt.format(now);
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
function ProjectsPage({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [filter, setFilter] = useState<"all" | ProjectKind>("all");
  const kinds = (["all", "web", "library", "site"] as const).filter((k) => k === "all" || projects.some((p) => p.kind === k));
  const shown = filter === "all" ? projects : projects.filter((p) => p.kind === filter);
  return (
    <>
      <header className="page-head">
        <h1>{t.nav.projects}</h1>
        <p>{t.projectsIntro}</p>
        <div className="filters" role="group" aria-label={t.nav.projects}>
          {kinds.map((k) => (
            <button key={k} type="button" className={filter === k ? "is-on" : undefined} aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {t.filter[k]}
              <span>{k === "all" ? projects.length : projects.filter((p) => p.kind === k).length}</span>
            </button>
          ))}
        </div>
      </header>
      <div className="projects" key={filter}>
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <ProjectRow p={p} lang={lang} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function ProjectRow({ p, lang }: { p: Project; lang: Lang }) {
  const t = ui[lang];
  const { theme } = useTheme();
  const img = theme === "dark" && p.imageDark ? p.imageDark : p.image;
  return (
    <article className="project">
      <a className="project__shot" href={p.live ?? p.code} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden>
        <TiltCard max={7} padding="none" scale={1.01}>
          {img ? (
            <img src={img} alt="" loading="lazy" />
          ) : (
            <div className="project__blank">
              <Icon name="code" size={28} />
              <span>{p.name}</span>
            </div>
          )}
        </TiltCard>
      </a>
      <div className="project__body">
        <div className="project__title">
          <h3>{p.name}</h3>
          <span className="project__year">{p.year}</span>
        </div>
        <p>{p.summary[lang]}</p>
        <div className="project__tags">
          <Badge tone={p.status === "live" ? "success" : "warning"} dot>
            {t.status[p.status]}
          </Badge>
          <span className="chip">{t.kind[p.kind]}</span>
          {p.stack.map((s) => (
            <span className="chip chip--quiet" key={s}>
              {s}
            </span>
          ))}
        </div>
        <div className="project__links">
          {p.live && (
            <ButtonLink href={p.live} target="_blank" rel="noreferrer" size="sm" variant="primary" icon="external">
              {t.open}
            </ButtonLink>
          )}
          {p.code && (
            <ButtonLink href={p.code} target="_blank" rel="noreferrer" size="sm" variant="outline" icon="code">
              {t.code}
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Contact + footer
// ---------------------------------------------------------------------------
function Contact({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const toast = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast({ title: t.copied, tone: "success" });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <Reveal as="section" className="contact" effect="scale">
      <div id="contact" className="contact__anchor" />
      <h2>{t.contactTitle}</h2>
      <p>{t.contactText}</p>
      <div className="contact__actions">
        <ButtonLink href={`mailto:${profile.email}`} size="lg" variant="primary" icon="mail">
          {profile.email}
        </ButtonLink>
        <button type="button" className="contact__copy" onClick={copy}>
          <Icon name="copy" size={16} /> {t.copy}
        </button>
      </div>
    </Reveal>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <footer className="foot">
      <div className="wrap foot__row">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <ul className="foot__socials">
          {profile.socials.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                <SocialIcon id={s.id} size={18} />
              </a>
            </li>
          ))}
        </ul>
        <a href="#main" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" }))}>
          {t.top} <Icon name="arrowUp" size={14} />
        </a>
      </div>
    </footer>
  );
}

function Section({ id, title, intro, action, children }: { id: string; title: string; intro?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="section" id={id}>
      <div className="section__head">
        <div>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
