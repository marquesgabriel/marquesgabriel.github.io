import { useState, useEffect, Suspense } from 'react';
import { Container, LanguageSelect, Timeline } from './components';
import { LanguageObj, Resume, Link, Skill, Study, Work } from './types';
import { supabase } from './utils';

const CACHE_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

interface CacheEntry<T> {
  data: T;
  savedAt: number; // Unix timestamp (ms)
}

function getCached<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const entry: CacheEntry<T> = JSON.parse(raw);
    const age = Date.now() - entry.savedAt;
    if (age > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function setCached<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, savedAt: Date.now() };
  localStorage.setItem(key, JSON.stringify(entry));
}

async function loadLanguages(): Promise<LanguageObj[]> {
  const cached = getCached<LanguageObj[]>('languages');
  if (cached) return cached;
  const { data: langs } = await supabase.from('languages').select().eq('active', 'true');
  if (langs && langs.length > 0) {
    setCached('languages', langs);
    return langs as LanguageObj[];
  }
  return [];
}

async function loadStyles(): Promise<unknown[]> {
  const cached = getCached<unknown[]>('styles');
  if (cached) return cached;
  const { data: styleList } = await supabase.from('styles').select().eq('isActive', 'true');
  if (styleList && styleList.length > 0) {
    setCached('styles', styleList);
    return styleList;
  }
  return [];
}

async function getVerbiages(langId: number): Promise<Resume> {
  const cached = getCached<Resume>(`verbiages_${langId}`);
  if (cached) return cached;

  const [
    { data: resTitles },
    { data: abtMe },
    { data: resLinks },
    { data: skillsXp },
    { data: studyXp },
    { data: workXp },
    { data: styleSwitchVb },
  ] = await Promise.all([
    supabase.from('titles').select().eq('lang_id', langId),
    supabase.from('about_me').select().eq('lang_id', langId),
    supabase.from('links').select().eq('lang_id', langId),
    supabase.from('skills').select().eq('lang_id', langId),
    supabase.from('study_experience').select().eq('lang_id', langId),
    supabase.from('work_experience').select().eq('lang_id', langId),
    supabase.from('style_switch_verbiage').select().eq('lang_id', langId),
  ]);

  const verbiagesData: Resume = {
    titles: resTitles && resTitles[0],
    aboutMe: abtMe && abtMe[0],
    links: resLinks as Link[],
    skills: skillsXp as Skill[],
    study: studyXp as Study[],
    work: workXp as Work[],
    styleSwitchVerbiages: styleSwitchVb && styleSwitchVb[0],
  };
  setCached(`verbiages_${langId}`, verbiagesData);
  return verbiagesData;
}

function App() {
  const [languages, setLanguages] = useState<LanguageObj[]>([]);
  const [styles, setStyles] = useState<{ name?: string; class?: string; cssClass?: string; id: string }[]>([]);
  const [activeStyle, setActiveStyle] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('EN');
  const [verbiages, setVerbiages] = useState<Resume>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVerbiages, setIsLoadingVerbiages] = useState(true);
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      const [langs, styleList] = await Promise.all([loadLanguages(), loadStyles()]);
      setLanguages(langs);
      setStyles(styleList as typeof styles);
      if (styleList.length > 0) {
        const chosen = styleList[Math.floor(Math.random() * styleList.length)] as { name: string };
        setActiveStyle(chosen.name);
      }
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!activeStyle || styles.length === 0) return;
    const possible = styles.map((s) => s.name || s.class || s.cssClass || `style-${s.id}`);
    document.body.classList.remove(...possible);
    document.body.classList.add(activeStyle);
    return () => {
      document.body.classList.remove(activeStyle);
    };
  }, [activeStyle, styles]);

  useEffect(() => {
    if (languages.length === 0) return;

    const browserLang = navigator.languages[0].split('-')[0].toUpperCase();
    const matched = languages.find((l) => l.name === browserLang);
    const resolvedLang = matched?.name ?? 'EN';

    setSelectedLanguage(resolvedLang);

    const langObj = languages.find((l) => l.name === resolvedLang);
    if (langObj) {
      getVerbiages(langObj.id)
        .then(setVerbiages)
        .finally(() => setIsLoadingVerbiages(false));
    } else {
      setIsLoadingVerbiages(false);
    }
  }, [languages]);

  const switchLanguage = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    if (selectedLanguage === newLang) return;
    setSelectedLanguage(newLang);
    const lang = languages.find((l) => l.name === newLang);
    if (!lang) return;
    setIsSwitchingLanguage(true);
    const verbiagesData = await getVerbiages(lang.id);
    setVerbiages(verbiagesData);
    setIsSwitchingLanguage(false);
  };

  const switchStyle = () => {
    if (!styles || styles.length === 0) return;
    const deriveName = (s: { name?: string; class?: string; cssClass?: string; id: string }) =>
      s.name || s.class || s.cssClass || `style-${s.id}`;
    const possible = styles.map(deriveName);
    const candidates = styles.filter((s) => deriveName(s) !== activeStyle);
    const pool = candidates.length > 0 ? candidates : styles;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    const className = deriveName(chosen);
    document.body.classList.remove(...possible);
    document.body.classList.add(className);
    setActiveStyle(className);
  };

  const isReady = !isLoading && !isLoadingVerbiages && !isSwitchingLanguage && !!verbiages;

  return (
    <Suspense fallback={<div className="loading-spinner" />}>
      {isReady && (
        <div className="portfolio-content">
          <LanguageSelect
            languages={languages}
            value={selectedLanguage}
            switchLanguage={switchLanguage}
            switchStyle={switchStyle}
            styleVerbiages={verbiages!.styleSwitchVerbiages}
          />
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
                <div className="heading-section">
                  <Container activeStyle={activeStyle} classes="abt-me" title={verbiages!.titles.aboutMe}>
                    <>
                      <Container activeStyle={activeStyle} classes="image" title="portrait.jpg" barButtons="close-only">
                        <img src={`/data/img/styles/${activeStyle}/profile.png`} alt="portrait of Gabriel" />
                      </Container>
                      {verbiages!.aboutMe.content.map((paragraph: string, i: number) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </>
                  </Container>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
                <Container activeStyle={activeStyle} classes="list-ctnr" title={verbiages!.titles.work}>
                  <Timeline list={verbiages!.work} sortingProp="startDate" locale={selectedLanguage} />
                </Container>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
                <Container activeStyle={activeStyle} classes="text-ctnr" title={verbiages!.titles.study}>
                  <Timeline list={verbiages!.study} sortingProp="startDate" dateFormat="YYYY" locale={selectedLanguage} />
                </Container>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
                <Container activeStyle={activeStyle} classes="text-ctnr skill-list" title={verbiages!.titles.skills}>
                  <dl>
                    {verbiages!.skills.map((skill: Skill, i: number) => {
                      const subItem =
                        typeof skill.description === 'object' ? (
                          skill.description.map((s, j) => <dd key={j}>{s}</dd>)
                        ) : (
                          <dd>{skill.description}</dd>
                        );
                      return (
                        <div key={i}>
                          <dt>{skill.name}</dt>
                          {subItem}
                        </div>
                      );
                    })}
                  </dl>
                </Container>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
                <Container activeStyle={activeStyle} classes="text-ctnr" title={verbiages!.titles.links}>
                  <ul>
                    {verbiages!.links.map((link: Link, i: number) => (
                      <li key={i}>
                        <a
                          href={link.type === 'email' ? `mailto:${link.url}` : link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.description}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Container>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
}

export default App;