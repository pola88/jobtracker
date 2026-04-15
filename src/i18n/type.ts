import en from '@/../messages/en.json';

type Messages = typeof en;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & string];

type TranslationKey = NestedKeyOf<Messages>;

export type { Messages, TranslationKey };
