import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { MenuItem, Box, Typography, TextField } from '@material-ui/core';
import { DonationHistorySummaryType } from '../../../types';
import useStyles from './use-styles';

type DonationHistoryGraphDropdownLegendProps = {
  donationSummaryData: DonationHistorySummaryType[];
  onChangeYear: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  currentYear: number;
  goal: number;
  comparisonYearGoal: number;
  comparisonYear: number;
};

const DonationHistoryGraphDropdownLegend: React.FunctionComponent<DonationHistoryGraphDropdownLegendProps> =
  ({
    donationSummaryData,
    onChangeYear,
    loading,
    comparisonYear,
    currentYear,
    goal,
    comparisonYearGoal,
  }) => {
    const classes = useStyles();

    const showDropDown =
      donationSummaryData?.length && donationSummaryData?.length > 1;

    return (
      <Box
        className={clsx(
          classes.legendDropDownContainer,
          !showDropDown && classes.flexEnd
        )}
        mb={0}
      >
        {showDropDown && (
          <TextField
            className={classes.yearDropDown}
            onChange={onChangeYear}
            select
            disabled={loading}
            value={comparisonYear}
            label="Compare to"
            name="Comparison Year"
            fullWidth
          >
            {donationSummaryData ? (
              donationSummaryData.map(option =>
                option.year !== currentYear ? (
                  <MenuItem value={option.year} key={option.year}>
                    {option.year}
                  </MenuItem>
                ) : null
              )
            ) : (
              <MenuItem className={classes.loadingText} value="Loading">
                Loading
              </MenuItem>
            )}
          </TextField>
        )}

        <div className={classes.legendContainer}>
          {!!goal && (
            <div className={classes.legendGroup}>
              <Box
                className={clsx(classes.legendLine, classes.legendCurrentLine)}
              />
              <Typography variant="body2" className={classes.legendText}>
                {currentYear} Goal
              </Typography>
            </div>
          )}
          {!!(comparisonYearGoal && comparisonYear) && (
            <div className={classes.legendGroup}>
              <Box
                className={clsx(
                  classes.legendLine,
                  classes.legendComparisonLine
                )}
              />
              <Typography variant="body2" className={classes.legendText}>
                {comparisonYear} Goal
              </Typography>
            </div>
          )}
        </div>
      </Box>
    );
  };

export default DonationHistoryGraphDropdownLegend;
