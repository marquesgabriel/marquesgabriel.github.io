export interface LanguageObj{
  name: string;
  description: string;
  flag:string;
  active:boolean;
}

export const LANGUAGES = [
  {
    name: "PT",
    description: "Português",
    flag: "",
    active: true
  },
  {
    name: "EN",
    description: "English",
    flag: "",
    active: true
  },
  {
    name: "FR",
    description: "Français",
    flag: "",
    active: false
  },
  {
    name: "RU",
    description: "Pусский",
    flag: "",
    active: false
  }
]