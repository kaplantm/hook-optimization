import React, { useMemo, useCallback } from 'react';
import { Bar, Circle } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { GridRows, GridColumns } from '@vx/grid';
import { withTooltip } from '@vx/tooltip';
import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';
import { max } from 'd3-array';
import { medLightBlue, iceBlue } from '../../constants/colors';
import { DonationHistoryType } from '../../types';
import DonationGraphToolTip from './tooltip';
import CurrentDonationYearGraph from './current-donation-year-graph';
import ComparisonDonationYearGraph from './comparison-donation-year-graph';
import {
  bisectDate,
  getBoundedDonations,
  safetlyGetMostRecentDonation,
  getTotal,
  getDate,
} from './helpers';

type TooltipData = DonationHistoryType;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  goal: number;
  currentYearData: DonationHistoryType[];
  comparisonYearData: DonationHistoryType[];
  comparisonYear: number;
  comparisonYearGoal: number;
  hasError: boolean;
};

function getComparisonYearDotY(
  boundedComparisonYearDonationHistory: DonationHistoryType[],
  comparisonYear: number,
  totalValueScale: any,
  comparisonYearDateScale: any,
  today: Date
): {
  x: number;
  y: number;
} {
  const date = new Date(comparisonYear, today.getMonth(), today.getDate());
  const x = comparisonYearDateScale(date);
  const index = bisectDate(boundedComparisonYearDonationHistory, date);
  const lastPoint = boundedComparisonYearDonationHistory[index]; // point before
  const nextPoint = boundedComparisonYearDonationHistory[index - 1]; // point after

  const scaledLastPointY = totalValueScale(lastPoint?.total);
  let y = scaledLastPointY;

  if (lastPoint && nextPoint) {
    const scaledNextPointY = totalValueScale(nextPoint.total);
    const scaledLastPointX = comparisonYearDateScale(getDate(lastPoint));
    const scaledNextPointX = comparisonYearDateScale(getDate(nextPoint));

    y =
      scaledLastPointY +
      ((scaledNextPointY - scaledLastPointY) /
        (scaledNextPointX - scaledLastPointX)) *
        (x - scaledLastPointX);
  }

  return {
    x,
    y,
  };
}

const DonationHistoryGraphOnly = withTooltip<AreaProps, TooltipData>(
  ({
    width,
    height,
    goal,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    comparisonYearData,
    currentYearData,
    comparisonYear,
    comparisonYearGoal,
    hasError,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    const { today, thisYear } = useMemo(() => {
      const now = new Date();
      return {
        today: now,
        thisYear: now.getFullYear(),
      };
    }, []);

    const startMonth = width < 400 ? 3 : 0;

    const { rangeStart, rangeEnd } = useMemo(
      () => ({
        rangeStart: new Date(thisYear, startMonth, 1),
        rangeEnd: new Date(thisYear, 9, 1),
      }),
      [startMonth, thisYear]
    );

    const { comparisonYearRangeStart, comparisonYearRangeEnd } = useMemo(
      () => ({
        comparisonYearRangeStart: new Date(comparisonYear, startMonth, 1),
        comparisonYearRangeEnd: new Date(comparisonYear, 9, 1),
      }),
      [comparisonYear, startMonth]
    );

    const boundedCurrentYearDonationHistory: DonationHistoryType[] = useMemo(
      () => getBoundedDonations(currentYearData, rangeStart, today),
      [currentYearData, rangeStart, today]
    );

    const boundedComparisonYearDonationHistory: DonationHistoryType[] = useMemo(
      () =>
        getBoundedDonations(
          comparisonYearData,
          comparisonYearRangeStart,
          today
        ),
      [comparisonYearData, comparisonYearRangeStart, today]
    );

    const mostRecentDonation = safetlyGetMostRecentDonation(
      currentYearData,
      boundedCurrentYearDonationHistory
    );

    // graph view bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [0, xMax],
          domain: [rangeStart.getTime(), rangeEnd.getTime()],
          clamp: true,
        }),
      [xMax, rangeEnd, rangeStart]
    );

    const comparisonYearDateScale = useMemo(
      () =>
        scaleTime({
          range: [0, xMax],
          domain: [
            comparisonYearRangeStart.getTime(),
            comparisonYearRangeEnd.getTime(),
          ],
          clamp: true,
        }),
      [xMax, comparisonYearRangeStart, comparisonYearRangeEnd]
    );

    const maxDonationValueCurrentYear = useMemo(
      () => max(boundedCurrentYearDonationHistory, getTotal),
      [boundedCurrentYearDonationHistory]
    );
    const maxDonationValueComparisonYear = useMemo(
      () => max(boundedComparisonYearDonationHistory, getTotal),
      [boundedComparisonYearDonationHistory]
    );
    const totalValueScale = useMemo(
      () =>
        scaleLinear({
          range: [yMax, 0],
          domain: [
            0,
            Math.max(
              maxDonationValueCurrentYear || 0,
              maxDonationValueComparisonYear || 0,
              comparisonYearGoal + 100,
              goal + 100
            ) +
              yMax / 3,
          ],
          clamp: true,
          nice: true,
        }),
      [
        yMax,
        goal,
        maxDonationValueCurrentYear,
        maxDonationValueComparisonYear,
        comparisonYearGoal,
      ]
    );

    // Used to position circles over total at current date each year
    const scaledMostRecentDonationTotal = useMemo(
      () => totalValueScale(mostRecentDonation?.total || 0),
      [mostRecentDonation?.total, totalValueScale]
    );
    const scaledCurrentDate = useMemo(
      () => dateScale(today),
      [dateScale, today]
    );
    const comparisonYearDotY = useMemo(
      () =>
        getComparisonYearDotY(
          boundedComparisonYearDonationHistory,
          comparisonYear,
          totalValueScale,
          comparisonYearDateScale,
          today
        ),
      [
        boundedComparisonYearDonationHistory,
        totalValueScale,
        comparisonYear,
        comparisonYearDateScale,
        today,
      ]
    );

    const handleTooltip = useCallback(
      (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        if (event.type === 'click' && tooltipData) {
          hideTooltip();
        } else {
          const x = scaledCurrentDate;
          showTooltip({
            tooltipData: mostRecentDonation,
            tooltipLeft: x,
            tooltipTop: scaledMostRecentDonationTotal,
          });
        }
      },
      [
        tooltipData,
        hideTooltip,
        mostRecentDonation,
        scaledCurrentDate,
        showTooltip,
        scaledMostRecentDonationTotal,
      ]
    );

    const hasComparisonYearData = !!comparisonYearData?.length;

    return (
      <div style={{ width, height, position: 'relative' }}>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <GridColumns
              scale={dateScale}
              height={yMax}
              stroke={iceBlue}
              pointerEvents="none"
              style={{ zIndex: -100 }}
            />
            <GridRows
              scale={totalValueScale}
              width={xMax}
              strokeWidth={1}
              stroke={iceBlue}
              numTicks={6}
              pointerEvents="none"
              style={{ zIndex: -100 }}
            />
            {!hasError && (
              <ComparisonDonationYearGraph
                boundedComparisonYearDonationHistory={
                  boundedComparisonYearDonationHistory
                }
                hasComparisonYearData={hasComparisonYearData}
                dateScale={comparisonYearDateScale}
                totalValueScale={totalValueScale}
                rangeEnd={comparisonYearRangeEnd}
                comparisonYearGoal={comparisonYearGoal}
              />
            )}
            <CurrentDonationYearGraph
              width={width}
              height={height}
              goal={goal}
              dateScale={dateScale}
              totalValueScale={totalValueScale}
              boundedCurrentYearDonationHistory={
                boundedCurrentYearDonationHistory
              }
              xMax={xMax}
              yMax={yMax}
              scaledCurrentDate={scaledCurrentDate}
              hasError={hasError}
            />

            {comparisonYearDotY.y > 0 && hasComparisonYearData && !hasError && (
              <Circle
                style={{
                  pointerEvents: 'none',
                }}
                cx={comparisonYearDotY.x}
                cy={comparisonYearDotY.y}
                r={6}
                fill={medLightBlue}
              />
            )}
            {tooltipData && !hasError && (
              <Circle
                style={{
                  pointerEvents: 'none',
                }}
                cx={scaledCurrentDate}
                cy={scaledMostRecentDonationTotal}
                r={9}
                fill="url(#area-gradient-stroke)"
                opacity={0.3}
              />
            )}
            {!hasError && (
              <>
                <Circle
                  style={{
                    pointerEvents: 'none',
                  }}
                  cx={scaledCurrentDate}
                  cy={scaledMostRecentDonationTotal}
                  r={6}
                  fill="url(#area-gradient-stroke)"
                />
                <Bar
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  fill="transparent"
                  rx={14}
                  onClick={handleTooltip}
                  onMouseEnter={handleTooltip}
                  onMouseLeave={hideTooltip}
                />
              </>
            )}
          </g>
        </svg>
        {!hasError && (
          <DonationGraphToolTip
            margin={margin}
            y={scaledMostRecentDonationTotal}
            tooltipLeft={tooltipLeft}
            tooltipData={tooltipData}
          />
        )}
      </div>
    );
  }
);

export default DonationHistoryGraphOnly;
