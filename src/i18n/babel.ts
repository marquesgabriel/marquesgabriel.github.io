export const getVerbiages = async(lang: string ="PT")=>{
  const abtMe = await fetch(`../data/${lang.toLowerCase()}/about-me.json`);
  const links = await fetch(`../data/${lang.toLowerCase()}/links.json`);
  const skills = await fetch(`../data/${lang.toLowerCase()}/skills.json`);
  const study = await fetch(`../data/${lang.toLowerCase()}/study.json`);
  const work = await fetch(`../data/${lang.toLowerCase()}/work.json`);

  console.log(abtMe.json());
  return {
    aboutMe: JSON.parse(abtMe),
    links: JSON.parse(links),
    skills: JSON.parse(skills),
    study: JSON.parse(study),
    work: JSON.parse(work)
  }
}