import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import {
  Grid,
  Box,
  Button,
  Container,
  Typography,
  Slider,
  CircularProgress,
  Paper,
  TextField,
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { VolumeDown, VolumeUp } from '@material-ui/icons';
import { loadMarkdownFromSaved, saveMarkdown } from './helpers';
import useStyles from './use-styles';
import useDebounce from '../../hooks/use-debounce';

const MarkdownPageOptimized = () => {
  const classes = useStyles();
  const [markdownInput, setMarkdownInput] = useState<string | undefined>(
    undefined
  ); // TODO: now demo disallowed character (prev)
  const [sliderValue, setSliderValue] = React.useState(30);

  useEffect(() => {
    loadMarkdownFromSaved(setMarkdownInput);
  }, []);

  useEffect(() => {
    saveMarkdown(markdownInput);
  }, [markdownInput]);

  if (markdownInput === undefined) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const handleSliderChange = (
    event: ChangeEvent<any>,
    newValue: number | number[]
  ) => {
    setSliderValue(newValue as number);
  };
  const handleMarkdownInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(e.target.value);
  };

  return (
    <Container>
      <Typography id="continuous-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={6}>
          <TextField
            multiline
            onChange={handleMarkdownInputChange}
            value={markdownInput}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <div className={classes.gridContainer}>
            {/* this is the suggested approach in the lib docs */}
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={markdownInput || ''} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MarkdownPageOptimized;
