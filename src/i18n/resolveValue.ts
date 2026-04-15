import { TranslationKey } from '@/i18n/type';

type ResolveValueProps = {
  basei18nkey?: TranslationKey;
  name: string;
  t: (key: string) => string;
};

export const resolveValue = ({
  basei18nkey,
  name,
  t,
}: ResolveValueProps): string | null => {
  const value = t(name);
  return `${basei18nkey}.${name}` != value ? value : null;
};
