import languages from './languages.json';


export interface LanguageObj{
  name: string;
  description: string;
  flag:string;
  active:boolean;
}

export const LANGUAGES = (languages as LanguageObj[])