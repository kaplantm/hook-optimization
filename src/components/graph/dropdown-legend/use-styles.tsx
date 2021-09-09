import { makeStyles } from '@material-ui/core/styles';
import {
  slateGrey,
  medLightBlue,
  toxicGreen,
  paleRed,
  lightBlue,
} from '../../../constants/colors';

const useStyles = makeStyles(theme => ({
  loadingText: {
    color: slateGrey,
  },
  yearDropDown: {
    maxWidth: '11em',
    minWidth: '7em',
  },
  legendDropDownContainer: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  flexEnd: {
    justifyContent: 'flex-end !important',
  },
  legendContainer: {
    marginTop: theme.spacing(1),
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: '20rem',
  },
  legendGroup: {
    display: 'flex',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(0.25, 1, 0.25, 3),
    maxWidth: '8rem',
  },
  legendLine: {
    display: 'flex',
    flex: 1,
    height: 0,
    minWidth: '2rem',
    maxWidth: '4rem',
    marginRight: '1em',
  },
  legendComparisonLine: {
    borderTop: `2px dashed ${medLightBlue}`,
  },
  legendCurrentLine: {
    borderTop: `2px dashed ${toxicGreen}`,
  },
  legendText: {
    whiteSpace: 'nowrap',
    flex: 1,
  },
  calloutBox: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: 4,
    backgroundColor: lightBlue,
    flex: 1,
  },
  calloutBoxError: {
    backgroundColor: `${paleRed} !important`,
  },
  donateLink: {
    fontWeight: 600,
  },
}));

export default useStyles;
