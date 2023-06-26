import {verbiages as ptVerbiages} from "./PT/verbiages";
import {verbiages as enVerbiages} from "./EN/verbiages";


export const getVerbiages = (lang : string = "PT") => {
  let verbiages = null
  switch (lang) {
    case "PT": verbiages = ptVerbiages;
      break;
    case "EN": verbiages = enVerbiages;
      break;
  }
  return verbiages
}

export const translateTime = (lang : string = "PT") => {
  let verbiage = null
  switch (lang) {
    case "PT": verbiage = "hoje";
      break;
    case "EN": verbiage = "today";
      break;
  }
  return verbiage

}
