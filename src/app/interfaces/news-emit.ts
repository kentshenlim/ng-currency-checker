import { News } from './news';

export interface NewsEmit {
  countryCode: string;
  news: News[];
}
