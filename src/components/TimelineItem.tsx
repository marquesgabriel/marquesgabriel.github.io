import { format, parseISO } from 'date-fns';
import { enUS, ptBR, ru, fr } from 'date-fns/locale';
import type { Locale } from 'date-fns';

interface LocaleEntry {
  dateFns: Locale;
  today: string;
}

const LOCALE_MAP: Record<string, LocaleEntry> = {
  EN: { dateFns: enUS, today: 'today' },
  PT: { dateFns: ptBR, today: 'atualmente' },
  RU: { dateFns: ru, today: 'настоящее' },
  FR: { dateFns: fr, today: "aujourd'hui" },
};

const DEFAULT_LOCALE = LOCALE_MAP.EN;

function getLocaleEntry(langCode?: string): LocaleEntry {
  return (langCode && LOCALE_MAP[langCode]) || DEFAULT_LOCALE;
}

function toDateFnsFormat(momentFormat: string): string {
  return momentFormat
    .replace(/YYYY/g, 'yyyy')
    .replace(/DD/g, 'dd');
}

interface PropTypes {
  item: any;
  dateFormat?: string;
  locale?: string;
}

const TextOrList = ({ value }: { value: any }) => {
  if (value && typeof value === 'object') {
    return (
      <ul>
        {value.map((item: any, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return value ? <ul><li>{value}</li></ul> : null;
};

export const TimelineItem = ({ item, dateFormat, locale }: PropTypes) => {
  const dateFnsFormat = toDateFnsFormat(dateFormat ?? 'MMM yyyy');
  const { dateFns: dateFnsLocale, today: todayLabel } = getLocaleEntry(locale);

  const formatDate = (dateStr: string) =>
    format(parseISO(dateStr), dateFnsFormat, { locale: dateFnsLocale });

  const endLabel = item.endDate ? formatDate(item.endDate) : todayLabel;

  return (
    <div className="timeline-item">
      <div className="title">
        {item.subTitle ? `${item.subTitle}, ` : null}{item.title}
      </div>
      <div className="date-range">
        {item.location || item.course}, {formatDate(item.startDate)} ~ {endLabel}
      </div>
      <div className="description">
        <TextOrList value={item.description} />
      </div>
    </div>
  );
};