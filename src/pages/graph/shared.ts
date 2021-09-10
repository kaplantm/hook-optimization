import { bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { defaultStyles } from '@vx/tooltip';

export type TooltipData = AppleStock;

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';

export const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: 'white',
};

export const marginDefault = { top: 0, right: 0, bottom: 0, left: 0 };
// util
export const formatDate = timeFormat("%b %d, '%y");

// accessors
export const getDate = (d: AppleStock): Date => new Date(d.date);
export const getStockValue = (d: AppleStock): number => d.close;
export const bisectDate = bisector<AppleStock, Date>(
  d => new Date(d.date)
).left;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  startYear: number;
  endYear: number;
};
