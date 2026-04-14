import { TimelineItem } from './TimelineItem';

interface PropTypes {
  list: any[];
  sortingProp: string;
  direction?: 'ASC' | 'DESC';
  dateFormat?: string;
  locale?: string;
}

export const Timeline = ({ list, sortingProp, direction = 'DESC', dateFormat, locale }: PropTypes) => {
  const ordered = [...list].sort((a, b) => {
    if (a[sortingProp] < b[sortingProp]) return direction === 'ASC' ? -1 : 1;
    if (a[sortingProp] > b[sortingProp]) return direction === 'ASC' ? 1 : -1;
    return 0;
  });

  return (
    <>
      {ordered.map((item) => (
        <TimelineItem key={item._id} item={item} dateFormat={dateFormat} locale={locale} />
      ))}
    </>
  );
};