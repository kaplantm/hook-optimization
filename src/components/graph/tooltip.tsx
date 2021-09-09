import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { formatCommas } from '../../utils/string-utils';
import { DonationHistoryType } from '../../types';

type styleConfig = {
  left: number;
  top: number;
  margin: { left: number; right: number; top: number; bottom: number };
};

const useStyles = makeStyles(() => ({
  toolTip: {
    position: 'absolute',
    left: ({ left }: styleConfig) => left,
    top: ({ top }: styleConfig) => top,
  },
  toolTipNoMarginChange: {
    // Prevent Material ui from changing tooltip marign on small screens
    marginBottom: '14px',
  },
}));

type DonationGraphToolTipProps = {
  tooltipData: DonationHistoryType | undefined;
  margin: { top: number; right: number; bottom: number; left: number };
  tooltipLeft: number;
  y: number | undefined;
};
const DonationGraphToolTip: React.FunctionComponent<DonationGraphToolTipProps> =
  ({ tooltipData, margin, tooltipLeft, y }: DonationGraphToolTipProps) => {
    const classes = useStyles({
      margin,
      left: tooltipLeft + margin.left,
      top: y || 0,
    });

    // Note: Tooltip requires a child to use as a ref
    return tooltipData ? (
      <Tooltip
        open={!!tooltipData}
        arrow
        title={`$${formatCommas(Math.round(tooltipData.total))}`}
        className={classes.toolTip}
        placement="top"
        classes={{ tooltipPlacementTop: classes.toolTipNoMarginChange }}
      >
        <div />
      </Tooltip>
    ) : null;
  };

export default DonationGraphToolTip;
