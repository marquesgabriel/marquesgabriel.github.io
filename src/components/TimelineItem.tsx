import moment from "moment";
import 'moment/locale/pt';

import { translateTime } from "../i18n/babel";

interface PropTypes{
  item: any;
  dateFormat?: string;
  lang?: string;
}

const TextOrList = ({value}: {value: any}) =>{
  if(value && typeof value === "object"){
    return (<ul>{
      value.map((item:any)=>(<li>
        {item}
      </li>))
    }</ul>)
  }else {
    return value ? <ul><li>{value}</li></ul>: null
  }
}

export const TimelineItem = ({item, dateFormat, lang="PT"}: PropTypes)=>{
  const format = dateFormat? dateFormat: "MMM YYYY";
  moment.locale(lang);
  return (
  <div className="timeline-item">
    <div className="title">
      {item.subTitle? `${item.subTitle}, `: null}{item.title}
    </div>
    <div className="date-range">
      {item.location}, {moment(item.startDate).format(format)} ~ {item.endDate? moment(item.endDate).format(format) : translateTime(lang)}
    </div>
    <div className="description">
      <TextOrList value={item.description}/>
    </div>
  </div>)
}