import { LanguageObj, StyleSwitchVerbiage } from "../types";

interface PropTypes {
  languages: LanguageObj[];
  switchLanguage: any;
  value?: string;
  switchStyle: any;
  styleVerbiages: StyleSwitchVerbiage;
}

export const LanguageSelect = ({ value, languages, switchLanguage, switchStyle, styleVerbiages }: PropTypes) => {
  return styleVerbiages && (
    <>
      <div className="lang-select container-fluid control-wrapper p-0 m-0">
        <div className="row align-items-center justify-content-between">
          <div className="col col-6 col-md-4 col-lg-4 mt-2 mb-2 ms-3">
            <div className="lang">
              <select className="selector" name="select-language" onChange={switchLanguage} value={value}>
                {languages.map((language: LanguageObj) => (
                  <option value={language.name}>
                    {language.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col col-6 col-md-4 col-lg-4 mt-2 mb-2 me-3">
            <div className="change-style text-end">
              <span>
                {styleVerbiages.verbiage}
                <a className="pl-1" href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); switchStyle() }}>
                  {styleVerbiages.button_verbiage}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}