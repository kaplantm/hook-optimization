import React, { memo } from 'react';
import { AreaClosed } from '@vx/shape';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@vx/curve';
import { GridRows, GridColumns } from '@vx/grid';
import { LinearGradient } from '@vx/gradient';

const stock = appleStock;
export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export type AreaProps = {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  // //   TODO: now types
  stockValueScale: any;
  innerWidth: any;
  dateScale: any;
  innerHeight: any;
};

const GraphOnlyComponent: React.FunctionComponent<AreaProps> = ({
  width,
  height,
  margin,
  stockValueScale,
  innerWidth,
  dateScale,
  innerHeight,
}) => {
  console.log('*** GraphOnlyComponent render');
  return (
    <>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#area-background-gradient)"
        rx={14}
      />
      <LinearGradient
        id="area-background-gradient"
        from={background}
        to={background2}
      />
      <LinearGradient
        id="area-gradient"
        from={accentColor}
        to={accentColor}
        toOpacity={0.1}
      />
      <GridRows
        left={margin.left}
        scale={stockValueScale}
        width={innerWidth}
        strokeDasharray="1,3"
        stroke={accentColor}
        strokeOpacity={0}
        pointerEvents="none"
      />
      <GridColumns
        top={margin.top}
        scale={dateScale}
        height={innerHeight}
        strokeDasharray="1,3"
        stroke={accentColor}
        strokeOpacity={0.2}
        pointerEvents="none"
      />
      <AreaClosed<AppleStock>
        data={stock}
        x={d => dateScale(getDate(d)) ?? 0}
        y={d => stockValueScale(getStockValue(d)) ?? 0}
        yScale={stockValueScale}
        strokeWidth={1}
        stroke="url(#area-gradient)"
        fill="url(#area-gradient)"
        curve={curveMonotoneX}
      />
    </>
  );
};

const GraphOnly = memo(GraphOnlyComponent);
export default GraphOnly;
