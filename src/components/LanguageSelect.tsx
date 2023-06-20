import { LanguageObj } from "../i18n";

interface PropTypes {
 languages: LanguageObj[];
 switchLanguage: any;
 defaultLanguage?: string;
 value?: string;
}

export const LanguageSelect = ({ value, languages, switchLanguage, defaultLanguage="PT"}: PropTypes)=>{
  return(
    <>
      <div className="container-fluid control-wrapper p-0 m-0">
        <div className="row align-items-center justify-content-between">
          <div className="col col-6 col-md-4 col-lg-4 mt-2 mb-2 ml-3">
            <div className="lang">
              <select className="selector" name="select-language" onChange={switchLanguage} value={value? value: defaultLanguage}>
                {languages.map((language: LanguageObj)=>language.active &&(
                  <option value={language.name}>
                    {language.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col col-6 col-md-4 col-lg-4 mt-2 mb-2 mr-3">
            {/* <div className="change-style text-right">
              <span>
                Didn't like this Gabriel? 
                <a className="pl-1" href="#" onClick={(e)=>{e.preventDefault(); e.stopPropagation()}}>
                  Click here
                </a>
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}