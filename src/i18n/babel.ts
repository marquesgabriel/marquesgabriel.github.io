import { Link, Skill, Study, Work } from "../types";

export interface Resume{
  aboutMe: string[];
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

export const getVerbiages = async(lang: string ="PT")=>{
  const abtMe = await fetch(`./data/${lang.toLowerCase()}/about-me.json`).then(response => response.json());
  const links = await fetch(`./data/${lang.toLowerCase()}/links.json`).then(response => response.json());
  const skills = await fetch(`./data/${lang.toLowerCase()}/skills.json`).then(response => response.json());
  const study = await fetch(`./data/${lang.toLowerCase()}/study.json`).then(response => response.json());
  const work = await fetch(`./data/${lang.toLowerCase()}/work.json`).then(response => response.json());
  const titles = await fetch(`./data/${lang.toLowerCase()}/titles.json`).then(response => response.json());

  return {
    aboutMe: abtMe,
    links: links,
    skills: skills,
    study: study,
    work: work,
    titles: titles
  }
}