import {
  ar,
  bn,
  de,
  enUS,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  mn,
  pt,
  ptBR,
  ru,
  th,
  uk,
  vi,
  zhCN,
  zhHK,
  zhTW,
} from 'date-fns/locale';

import type { ILocaleSymbol } from './type';

const DateLocaleMap: Record<Exclude<ILocaleSymbol, 'system'>, Locale> = {
  en: enUS,
  'en-US': enUS,
  'zh-CN': zhCN,
  'zh-HK': zhHK,
  'zh-TW': zhTW,
  'ja-JP': ja,
  'ko-KR': ko,
  'bn': bn,
  'de': de,
  'es': es,
  'fr-FR': fr,
  'hi-IN': hi,
  'it-IT': it,
  // 'mn-MN': mn,
  'pt': pt,
  'ru': ru,
  'th-TH': th,
  'uk-UA': uk,
  'vi': vi,
  'id': id,
  'pt-BR': ptBR,
  // no fil in date-fns
  // 'fil': enUS,
};

export { DateLocaleMap };
