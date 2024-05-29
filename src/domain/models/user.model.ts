import { Url } from './url.model';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  urls: Url[];
  createdAt: Date;
  updateAt: Date;
};
