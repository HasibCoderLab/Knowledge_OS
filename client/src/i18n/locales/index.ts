import en from './en';
import bn from './bn';

export type TranslationKey = keyof typeof en;

export type NestedKey<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends object
      ? `${Prefix}${K}.${NestedKeyInner<T[K]>}`
      : never;
}[keyof T & string];

type NestedKeyInner<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends object
      ? `${K}.${NestedKeyInner<T[K]>}`
      : never;
}[keyof T & string];

export type TranslationKeys = NestedKey<typeof en>;

export type Translations = {
  [key: string]: string | Translations;
};

const translations: Record<string, Translations> = { en, bn } as unknown as Record<string, Translations>;

export const SUPPORTED_LOCALES = ['bn', 'en', 'hi', 'ar'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function getTranslations(locale: string): Translations {
  return (translations[locale] ?? translations.bn) as Translations;
}

export default translations;
