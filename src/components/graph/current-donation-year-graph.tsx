import React from 'react';
import { AreaClosed, Area, Line } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { enUS } from 'date-fns/locale';
import {
  medLightBlue,
  toxicGreen,
  iceBlue,
  slateGrey,
  paleRed,
} from '../../constants/colors';
import { formatCommas } from '../../utils/number-utils';
import { DonationHistoryType } from '../../types';
import { getDate, getTotal } from './helpers';

export type AreaProps = {
  width: number;
  height: number;
  goal: number;
  totalValueScale: any;
  dateScale: any;
  boundedCurrentYearDonationHistory: DonationHistoryType[];
  scaledCurrentDate: number | undefined;
  xMax: number;
  yMax: number;
  hasError: boolean;
};

const CurrentDonationYearGraph = ({
  width,
  height,
  goal,
  totalValueScale,
  dateScale,
  boundedCurrentYearDonationHistory,
  scaledCurrentDate,
  xMax,
  yMax,
  hasError,
}: AreaProps) => {
  const formatDateTick = (date: any) => {
    const monthNum = (date as Date).getMonth();
    if (enUS.localize) {
      return enUS.localize
        .month(monthNum, { width: 'abbreviated' })
        .toUpperCase();
    }
    return date.toDateString();
  };

  const formatMoneyTick = (amount: any) => {
    const commaFormattedValue = formatCommas(amount as number);
    return `$${commaFormattedValue}`;
  };

  const scaledGoal = totalValueScale(goal);

  const maxYScaleValue = totalValueScale.invert(
    Math.min(...totalValueScale.range())
  );
  const maxYLabelWidth = maxYScaleValue.toString().length + 1;

  return (
    <g style={{ zIndex: 0 }}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#area-background-gradient)"
        rx={14}
      />
      <LinearGradient
        id="area-gradient"
        from={toxicGreen}
        to={medLightBlue}
        vertical={false}
        fromOpacity={0.5}
        toOpacity={0.5}
      />
      <LinearGradient
        id="area-gradient-stroke"
        from={toxicGreen}
        to={medLightBlue}
        vertical={false}
        fromOpacity={1}
        toOpacity={1}
      />
      {!hasError && (
        <>
          {' '}
          <AreaClosed<DonationHistoryType>
            data={boundedCurrentYearDonationHistory}
            x={d => dateScale(getDate(d))}
            y={d => totalValueScale(getTotal(d))}
            yScale={totalValueScale}
            fill="url(#area-gradient)"
          />
          <Area<DonationHistoryType>
            data={boundedCurrentYearDonationHistory}
            x={d => dateScale(getDate(d))}
            y={d => totalValueScale(getTotal(d))}
            strokeWidth={2}
            stroke="url(#area-gradient-stroke)"
            fill="url(#area-gradient)"
          />
          <Line
            from={{ x: 0, y: scaledGoal }}
            to={{ x: xMax, y: scaledGoal }}
            strokeWidth={2}
            stroke={toxicGreen}
            strokeDasharray="5"
          />
          <Line
            from={{ x: scaledCurrentDate, y: 0 }}
            to={{ x: scaledCurrentDate, y: yMax }}
            stroke={paleRed}
          />
        </>
      )}
      <AxisLeft
        stroke={iceBlue}
        left={-1}
        numTicks={6}
        scale={totalValueScale}
        tickStroke={iceBlue}
        hideZero
        tickFormat={formatMoneyTick}
        tickLabelProps={label => {
          const labelLength = `${label || ''}`.toString().length + 1;
          const x = labelLength * 7 - maxYLabelWidth;

          return {
            transform: `translate(-${15 + x},5)`,
            fill: slateGrey,
            fontSize: '.8rem',
          };
        }}
      />
      <AxisBottom
        stroke={iceBlue}
        top={yMax + 1}
        left={-1}
        scale={dateScale}
        numTicks={12}
        tickFormat={formatDateTick}
        tickStroke={iceBlue}
        tickLabelProps={() => ({
          fill: slateGrey,
          transform: 'translate(-12,10)',
          fontSize: '.8rem',
        })}
      />
    </g>
  );
};

export default React.memo(CurrentDonationYearGraph);
