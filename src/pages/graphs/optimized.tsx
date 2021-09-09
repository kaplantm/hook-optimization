import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './use-styles';
import {
  getDataForYear,
  getGoalForYearInSummary,
  mockInitialData,
} from './helpers';
import { DonationHistoryGraphDataResultType } from '../../types';
import DonationHistoryGraphOnly from '../../components/graph';
import DonationHistoryGraphDropdownLegend from '../../components/graph/dropdown-legend';

const GraphsPageOptimized: React.FunctionComponent = () => {
  const classes = useStyles();
  const [
    { response: donationSummaryResponse, error: donationSummaryResponseError },
    {
      response: donationHistoryForCurrentYearResponse,
      error: donationHistoryForCurrentYearResponseError,
    },
    {
      response: donationHistoryForComparisonYearResponse,
      error: donationHistoryForComparisonYearResponseError,
    },
    { initialComparisonYear, currentYear },
  ]: DonationHistoryGraphDataResultType = mockInitialData;
  console.log({ mockInitialData });
  const [comparisonYear, setComparisonYear] = useState(initialComparisonYear);
  const [comparisonYearData, setComparisonYearData] = useState({
    loading: false,
    yearLoaded: initialComparisonYear,
    error: undefined,
    data: donationHistoryForComparisonYearResponse?.data || [],
    comparisonYearGoal: getGoalForYearInSummary(
      donationSummaryResponse.data,
      initialComparisonYear
    ),
  });

  const hasError = !!(
    donationSummaryResponseError ||
    donationHistoryForCurrentYearResponseError ||
    donationHistoryForComparisonYearResponseError ||
    comparisonYearData.error
  );

  const currentYearGoal = getGoalForYearInSummary(
    donationSummaryResponse.data,
    currentYear
  );

  useEffect(() => {
    async function loadDataForYear() {
      const data = await getDataForYear(comparisonYear);

      setComparisonYearData({
        loading: false,
        yearLoaded: comparisonYear,
        error: undefined,
        data,
        comparisonYearGoal: getGoalForYearInSummary(
          donationSummaryResponse.data,
          comparisonYear
        ),
      });
    }
    if (comparisonYearData.yearLoaded !== comparisonYear) {
      loadDataForYear();
    }
  }, [
    comparisonYear,
    comparisonYearData.yearLoaded,
    donationSummaryResponse.data,
  ]);

  const onChangeYear = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setComparisonYear(parseInt(value, 10));
    setComparisonYearData(prev => ({
      ...prev,
      loading: true,
    }));
  };

  return (
    <Box style={{ position: 'relative' }}>
      <div className={classes.loaderContainer}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flex={1}
        >
          {comparisonYearData.loading && <CircularProgress />}
        </Box>
      </div>
      <DonationHistoryGraphDropdownLegend
        donationSummaryData={donationSummaryResponse?.data}
        onChangeYear={onChangeYear}
        loading={comparisonYearData.loading}
        comparisonYear={comparisonYear}
        currentYear={currentYear}
        goal={currentYearGoal}
        comparisonYearGoal={comparisonYearData.comparisonYearGoal}
      />
      <div
        className={clsx(
          classes.graphContainer,
          comparisonYearData.loading && classes.loadingGraphContainer
        )}
      >
        <DonationHistoryGraphOnly
          comparisonYear={comparisonYearData.yearLoaded}
          currentYearData={donationHistoryForCurrentYearResponse.data || []}
          comparisonYearData={comparisonYearData.data}
          comparisonYearGoal={comparisonYearData.comparisonYearGoal}
          margin={{
            top: 30,
            right: 15,
            bottom: 30,
            left: 90,
          }}
          height={500}
          width={800}
          goal={currentYearGoal}
          hasError={hasError}
        />
      </div>
    </Box>
  );
};

export default GraphsPageOptimized;
