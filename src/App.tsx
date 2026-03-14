
import { useState, useEffect } from "react";
import { Container, LanguageSelect, Timeline } from "./components";

import { LanguageObj, Resume, Link, Skill, Study, Work, StyleSwitchVerbiage } from "./types";
import { supabase } from './utils';

function App() {
  const [languages, setLanguages] = useState<LanguageObj[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [activeStyle, setActiveStyle] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");
  const [verbiages, setVerbiages] = useState<Resume>()

  useEffect(() => {
    async function loadLanguages() {
      const { data: langs } = await supabase.from('languages').select().eq('active', 'true')

      if (langs && langs.length > 0) {
        setLanguages(langs)
      }
    }
    async function loadStyles() {
      const { data: styleList } = await supabase.from('styles').select().eq('isActive', 'true')
      if (styleList && styleList.length > 0) {
        setStyles(styleList)
        // pick a random style and derive a class name
        const chosen = styleList[Math.floor(Math.random() * styleList.length)];
        const className = chosen.name;
        setActiveStyle(className);
      }
    }

    loadLanguages()
    loadStyles()
  }, [])

  useEffect(() => {
    if (!activeStyle || styles.length === 0) return;
    // compute possible style classes from loaded styles
    const possible = styles.map(s => s.name || s.class || s.cssClass || `style-${s.id}`);
    // remove any previously-applied style classes, then add the active one
    document.body.classList.remove(...possible);
    document.body.classList.add(activeStyle);

    return () => {
      document.body.classList.remove(activeStyle);
    }
  }, [activeStyle, styles]);

  useEffect(() => {
    const lang = navigator.languages[0].split("-")[0].toUpperCase();
    const selLang = languages.filter((l => l.name === lang))[0]
    setSelectedLanguage(selLang?.name || "EN");

    async function getVerbiages(lang: number) {
      const { data: resTitles } = await supabase.from('titles').select().eq('lang_id', lang)
      const { data: abtMe } = await supabase.from('about_me').select().eq('lang_id', lang)
      const { data: resLinks } = await supabase.from('links').select().eq('lang_id', lang)
      const { data: skillsXp } = await supabase.from('skills').select().eq('lang_id', lang)
      const { data: studyXp } = await supabase.from('study_experience').select().eq('lang_id', lang)
      const { data: workXp } = await supabase.from('work_experience').select().eq('lang_id', lang)
      const { data: styleSwitchVb } = await supabase.from('style_switch_verbiage').select().eq('lang_id', lang)

      setVerbiages({
        titles: resTitles && resTitles[0],
        aboutMe: abtMe && abtMe[0],
        links: resLinks as Link[],
        skills: skillsXp as Skill[],
        study: studyXp as Study[],
        work: workXp as Work[],
        styleSwitchVerbiages: styleSwitchVb && styleSwitchVb[0]
      })
    }
    getVerbiages(languages.filter((l => l.name === selectedLanguage))[0]?.id || 2)
  }, [languages])

  const switchLanguage = async (event: any) => {
    console.log("e.val", event.target.value);
    console.log("selLang", selectedLanguage);
    if (selectedLanguage !== event.target.value) {
      setSelectedLanguage(event.target.value);
      const lang = languages.filter((l => l.name === event.target.value))[0]
      const { data: resTitles } = await supabase.from('titles').select().eq('lang_id', lang.id)
      const { data: abtMe } = await supabase.from('about_me').select().eq('lang_id', lang.id)
      const { data: resLinks } = await supabase.from('links').select().eq('lang_id', lang.id)
      const { data: skillsXp } = await supabase.from('skills').select().eq('lang_id', lang.id)
      const { data: studyXp } = await supabase.from('study_experience').select().eq('lang_id', lang.id)
      const { data: workXp } = await supabase.from('work_experience').select().eq('lang_id', lang.id)
      const { data: styleSwitchVb } = await supabase.from('style_switch_verbiage').select().eq('lang_id', lang.id)

      setVerbiages({
        titles: resTitles && resTitles[0],
        aboutMe: abtMe && abtMe[0],
        links: resLinks as Link[],
        skills: skillsXp as Skill[],
        study: studyXp as Study[],
        work: workXp as Work[],
        styleSwitchVerbiages: styleSwitchVb && styleSwitchVb[0]
      })
    }
  }

  const switchStyle = () => {
    if (!styles || styles.length === 0) return;

    const deriveName = (s: any) => s.name || s.class || s.cssClass || `style-${s.id}`;

    // compute all possible class names
    const possible = styles.map(deriveName);

    // filter out the current active style
    const candidates = styles.filter(s => deriveName(s) !== activeStyle);

    // if no other candidate, just keep current (or pick the only one)
    const chosen = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : styles[Math.floor(Math.random() * styles.length)];

    const className = deriveName(chosen);

    // remove other possible classes and add the chosen one immediately
    document.body.classList.remove(...possible);
    document.body.classList.add(className);

    // update state so effect and UI stay in sync
    setActiveStyle(className);
  }

  return (<>
    {verbiages && <div className="portfolio-content">
      <LanguageSelect languages={languages} value={selectedLanguage} switchLanguage={switchLanguage} switchStyle={switchStyle} styleVerbiages={verbiages.styleSwitchVerbiages} />
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <div className="heading-section">
              <Container activeStyle={activeStyle} classes="abt-me" title={verbiages.titles.aboutMe}>
                <>
                  <Container activeStyle={activeStyle} classes="image" title="portrait.jpg" barButtons="close-only">
                    <img src={`/data/img/styles/${activeStyle}/profile.png`} alt="portrait of Gabriel" />
                  </Container>
                  {verbiages?.aboutMe.content.map((paragraph: string) => (
                    <p>
                      {paragraph}
                    </p>
                  ))}
                </>
              </Container>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container activeStyle={activeStyle} classes="list-ctnr" title={verbiages.titles.work}>
              <Timeline list={verbiages?.work} sortingProp="startDate" />
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container activeStyle={activeStyle} classes="text-ctnr" title={verbiages.titles.study}>
              <Timeline list={verbiages?.study} sortingProp="startDate" dateFormat="YYYY" />
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container activeStyle={activeStyle} classes="text-ctnr skill-list" title={verbiages.titles.skills}>
              <dl>
                {verbiages?.skills.map((skill: Skill) => {
                  const subItem = typeof skill.description === "object" ? skill.description.map((subSkill) => (<dd>{subSkill}</dd>)) : <dd>{skill.description}</dd>
                  return (<><dt>
                    {skill.name}
                  </dt>{subItem}</>)
                })}
              </dl>
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container activeStyle={activeStyle} classes="text-ctnr" title={verbiages.titles.links}>
              <ul>
                {verbiages?.links.map((link: Link) => (
                  <li>
                    <a href={link.type === "email" ? `mailto:${link.url}` : link.url} target="_blank" rel="noreferrer">{link.description}</a>
                  </li>
                ))}
              </ul>
            </Container>
          </div>
        </div>
      </div>
    </div>}
  </>);
}

export default App;
