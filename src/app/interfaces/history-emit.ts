import { HistoryPoint } from './history-point';

export interface HistoryEmit {
  baseCurrency: string;
  targetCurrency: string;
  isMonthly: boolean;
  historyPoints: HistoryPoint[];
}
