export type ActionResponseBase = {
  success: boolean;
  message?: string;
};

export type TFunction = (key: string) => string;
