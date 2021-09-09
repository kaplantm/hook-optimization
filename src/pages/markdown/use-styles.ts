import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    border: '1px solid dodgerblue',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  inputContainer: {
    // border: '1px solid red',
  },
  markdownContainer: {
    // border: '1px solid green',
  },
}));

export default useStyles;
