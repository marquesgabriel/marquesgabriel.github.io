export type AboutMe = {
  id: number,
  lang_id: number
  content: string[]
}

export type Skill = {
  name: string
  description: string | string[]
}

export type Link = {
  description: string
  type: string
  url: string
}

export type Study = {
  _id: string
  title: string
  course: string
  startDate: string
  endDate: string
  description: string
}

export type Work = {
  _id: string
  title: string
  subTitle: string
  location: string
  startDate: string
  endDate: string | null,
  description: string | null | string[]
}

export type Resume = {
  aboutMe: AboutMe;
  links: Link[];
  skills: Skill[];
  study: Study[];
  work: Work[];
  titles: {
    aboutMe: string;
    links: string;
    skills: string;
    study: string;
    work: string;
  };
}

export type LanguageObj = {
  id: number
  name: string;
  description: string;
  active:boolean;
}