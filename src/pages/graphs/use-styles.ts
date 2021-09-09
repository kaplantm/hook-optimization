import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  graphContainer: {
    transition: 'opacity .5s',
  },
  loadingGraphContainer: {
    opacity: 0.3,
  },
  loaderContainer: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    pointerEvents: 'none',
    height: 500,
  },
}));

export default useStyles;
