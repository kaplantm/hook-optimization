import {
  DonationHistorySummaryType,
  DonationHistoryType,
  DonationHistoryGraphDataResultType,
} from '../../types';
import { findIndexOfAttr } from '../../utils/array-utils';

function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateDataForYear = (
  year: number,
  numDonations: number
): { history: DonationHistoryType[]; summary: DonationHistorySummaryType } => {
  const donationArray = new Array(numDonations).fill(0);
  const startYear = new Date(year, 0).getTime();
  const endYear = new Date(year + 1, 0).getTime();
  const chunkSize = (endYear - startYear) / (numDonations + 1);

  let total = 0;
  const history = donationArray.map((el, index) => {
    const amount = Math.floor(Math.random() * 100);
    total += amount;
    return {
      date: new Date(startYear + index * chunkSize).toUTCString(),
      total,
    };
  });
  return { history, summary: { year, goal: (year - 2017) * 2000, total } };
};

const dataForAllYears: {
  [key: number]: {
    history: DonationHistoryType[];
    summary: DonationHistorySummaryType;
  };
} = {
  2018: generateDataForYear(2018, 30),
  2019: generateDataForYear(2019, 40),
  2020: generateDataForYear(2020, 80),
};

export const getDataForYear = async (
  year: number
): Promise<DonationHistoryType[]> => {
  await sleep();
  return dataForAllYears[year].history;
};

export function getGoalForYearInSummary(
  summary: DonationHistorySummaryType[],
  year: number
): number {
  const index = findIndexOfAttr(summary, 'year', year);
  return index !== -1 ? summary[index]?.goal : 0;
}

export const mockInitialData: DonationHistoryGraphDataResultType = [
  {
    response: {
      data: [
        dataForAllYears[2020].summary,
        dataForAllYears[2019].summary,
        dataForAllYears[2018].summary,
      ],
    },
    error: null,
  },
  {
    response: { data: dataForAllYears[2020].history },
    error: null,
  },
  {
    response: { data: dataForAllYears[2019].history },
    error: null,
  },
  { initialComparisonYear: 2019, currentYear: 2020 },
];
