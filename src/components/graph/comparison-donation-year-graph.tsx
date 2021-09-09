import React from 'react';
import { Area, Line } from '@vx/shape';
import { medLightBlue } from '../../constants/colors';
import { DonationHistoryType } from '../../types';
import { getDate, getTotal } from './helpers';

export type AreaProps = {
  totalValueScale: any;
  dateScale: any;
  boundedComparisonYearDonationHistory: DonationHistoryType[];
  comparisonYearGoal: number;
  rangeEnd: Date;
  hasComparisonYearData: boolean;
};

const ComparisonDonationYearGraph = ({
  totalValueScale,
  dateScale,
  boundedComparisonYearDonationHistory,
  comparisonYearGoal,
  hasComparisonYearData,
}: AreaProps) => {
  const goalY = totalValueScale(comparisonYearGoal);

  return (
    <g>
      {hasComparisonYearData && (
        <Area<DonationHistoryType>
          data={boundedComparisonYearDonationHistory}
          x={(d: any) => dateScale(getDate(d))}
          y={(d: any) => totalValueScale(getTotal(d))}
          strokeWidth={2}
          stroke={medLightBlue}
          fill="none"
        />
      )}
      {comparisonYearGoal && (
        <Line
          from={{ x: 0, y: goalY }}
          to={{
            x: Math.max(...dateScale.range()),
            y: goalY,
          }}
          strokeWidth={2}
          stroke={medLightBlue}
          strokeDasharray="5"
        />
      )}
    </g>
  );
};

export default React.memo(ComparisonDonationYearGraph);
