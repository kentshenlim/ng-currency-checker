import { News } from './news';

export interface NewsEmit {
  countryCode: string;
  proposedCountryCode: string;
  news: News[];
}
