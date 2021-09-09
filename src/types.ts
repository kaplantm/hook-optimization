import { AxiosError } from 'axios';

export interface DonationHistoryType {
  date: string;
  total: number;
}

export interface DonationHistorySummaryType {
  year: number;
  goal: number;
  total: number;
}

export type DonationHistoryGraphDataResultType = [
  {
    response: { data: DonationHistorySummaryType[] };
    error: AxiosError | null;
  },
  { response: { data: DonationHistoryType[] }; error: AxiosError | null },
  { response: { data: DonationHistoryType[] }; error: AxiosError | null },
  { initialComparisonYear: number; currentYear: number }
];
