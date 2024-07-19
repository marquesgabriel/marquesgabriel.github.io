
import { useState, useEffect } from "react";
import { Container, LanguageSelect, Timeline } from "./components";
import { LANGUAGES } from './i18n';

import { Resume, getVerbiages } from "./i18n/babel";
import { Link, Skill } from "./types";

function App() {
  const [language, setSelectedLanguage] = useState("EN")
  const [verbiages, setVerbiages] = useState<Resume>()

  useEffect(() => {
    const lang = navigator.languages[0].split("-")[0].toUpperCase()
    setSelectedLanguage(lang);
    getVerbiages(lang).then((res) => {
      setVerbiages(res);
    })
  }, [])

  const switchLanguage = async (event: any) => {
    setSelectedLanguage(event.target.value);
    const langObj = await getVerbiages(event.target.value)
    setVerbiages(langObj);
  }


  return (<>
    <LanguageSelect languages={LANGUAGES} value={language} switchLanguage={switchLanguage} />
    {verbiages && <div className="portfolio-content">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <div className="heading-section">
              <Container classes="abt-me" title={verbiages.titles.aboutMe}>
                <>
                  <Container classes="image" title="portrait.jpg" barButtons="close-only">
                    <img src="/data/img/styles/win98/profile.png" alt="portrait of Gabriel" />
                  </Container>
                  {verbiages?.aboutMe.map((paragraph: string) => (
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
            <Container classes="list-ctnr" title={verbiages.titles.work}>
              <Timeline list={verbiages?.work} sortingProp="startDate" />
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container classes="text-ctnr" title={verbiages.titles.study}>
              <Timeline list={verbiages?.study} sortingProp="startDate" dateFormat="YYYY" />
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container classes="text-ctnr skill-list" title={verbiages.titles.skills}>
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
            <Container classes="text-ctnr" title={verbiages.titles.links}>
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
