import { TimelineItem } from "./TimelineItem";

interface PropTypes{
  list: any[];
  sortingProp: string;
  direction?: 'ASC' | 'DESC';
  dateFormat?: string;
  lang?: string;
}

export const Timeline = ({list, sortingProp, direction='DESC', dateFormat, lang = "PT"}:PropTypes)=>{
  const ordered = list.sort((a, b)=>{
    if(a[sortingProp] < b[sortingProp]){
      return direction === 'ASC' ? - 1 : 1;
    }else if(a[sortingProp] > b[sortingProp]){
      return direction === 'ASC' ? 1 : -1;
    }else{
      return 0;
    }
  });
  return (<>{ordered.map((item)=>(<TimelineItem key={item._id} item={item} lang={lang} dateFormat={dateFormat}/>))}</>)
}