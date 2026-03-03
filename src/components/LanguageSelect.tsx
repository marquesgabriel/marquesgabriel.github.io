import { LanguageObj } from "../types";

interface PropTypes {
  languages: LanguageObj[];
  switchLanguage: any;
  defaultLanguage?: string;
  value?: string;
  switchStyle: any;
}

export const LanguageSelect = ({ value, languages, switchLanguage, defaultLanguage = "PT", switchStyle }: PropTypes) => {
  console.log(value);
  return (
    <>
      <div className="lang-select container-fluid control-wrapper p-0 m-0">
        <div className="row align-items-center justify-content-between">
          <div className="col col-6 col-md-4 col-lg-4 mt-2 mb-2 ms-3">
            <div className="lang">
              <select className="selector" name="select-language" onChange={switchLanguage} value={value ? value : defaultLanguage}>
                {languages.map((language: LanguageObj) => language.active && (
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
                Didn't like this Gabriel?
                <a className="pl-1" href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); switchStyle() }}>
                  Click here
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}