
import {useState, useEffect} from "react";
import { Container, LanguageSelect, Timeline } from "./components";
import { LANGUAGES } from './i18n';

import profilePic from "./data/styles/win98/profile.png"
import { getVerbiages } from "./i18n/babel";
import { Link, Skill } from "./types";

function App() {
  const [language, setSelectedLanguage] = useState("EN")
  const [verbiages, setVerbiages] = useState(getVerbiages("EN"))

  useEffect(()=>{
    const lang = navigator.languages[0].split("-")[0].toUpperCase()
    setSelectedLanguage(lang);
    setVerbiages(getVerbiages(lang));
  },[])
  
  const switchLanguage = (event: any)=>{
    setSelectedLanguage(event.target.value);
    setVerbiages(getVerbiages(event.target.value));
  }

  return (<>
    <LanguageSelect languages={LANGUAGES} value={language} switchLanguage={switchLanguage}/>
    {verbiages && <div className="portfolio-content">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <div className="heading-section">
              <Container classes="abt-me" title={verbiages.aboutMe.title}>
                <>
                <Container classes="image" title="portrait.jpg" barButtons="close-only">
                <img src={profilePic} alt="portrait of Gabriel"/>
              </Container>
                  {verbiages.aboutMe.data.map((paragraph: string)=>(
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
            <Container classes="list-ctnr" title={verbiages.work.title}>
              <Timeline lang={language} list={verbiages.work.data} sortingProp="startDate"/>
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container classes="text-ctnr" title={verbiages.study.title}>
              <Timeline lang={language} list={verbiages.study.data} sortingProp="startDate" dateFormat="YYYY" />
            </Container>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col align-self-center p-0 col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <Container classes="text-ctnr skill-list" title={verbiages.skills.title}>
              <dl>
                {verbiages.skills.data.map((skill: Skill)=>{
                  const subItem = typeof skill.description === "object"? skill.description.map((subSkill)=> (<dd>{subSkill}</dd>)): <dd>{skill.description}</dd>
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
            <Container classes="text-ctnr" title={verbiages.links.title}>
              <ul>
                {verbiages.links.data.map((link: Link)=>(
                  <li>
                    <a href={link.type === "email" ? `mailto:${link.url}`: link.url} target="_blank" rel="noreferrer">{link.description}</a>
                  </li>
                ))}
              </ul>
            </Container>
          </div>
        </div>
      </div>
    </div>}
        {/* <Container classes="text-ctnr gamer" title="Gamer">
          <ul>
            <li>
              Steam: naturallis
            </li>
            <li>
              Origin/ EA: NaturallisCambe
            </li>
            <li>
              Magic Arena: Naturallis#666
            </li>
            <li>
              League of Legends: NaturallisS
            </li>
            <li>
              Join our discord: Pipinha
            </li>
          </ul>
        </Container> */}
  </>);
}

export default App;
