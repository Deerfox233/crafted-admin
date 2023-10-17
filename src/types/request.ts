export interface ResponseData<T> {
  code: number;
  data: T | null;
  message?: string;
}
