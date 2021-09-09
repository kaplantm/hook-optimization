import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Button, Container, LinearProgress } from '@material-ui/core';
import axios, { Canceler } from 'axios';
import { downloadWithProgress } from '../../utils/axios-utils';
import BuildingAnimation from '../../components/BuildingAnimation';

const roundToNearest = 1;

const DownloadPageOptimized = () => {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  // const [cancel, setCancel] = useState<Canceler | null>(null);
  const cancelRef = useRef<Canceler | null>(null);
  const [hasRequestedDownload, setHasRequestedDownload] = useState(false);

  // If you need to use this function in and out of the useEffect, or in multiple useEffects wrap it in useCallback like so
  const cancelDownload = useCallback((event: any) => {
    if (cancelRef.current) {
      // TODO: demo why this is bad
      cancelRef.current();
    }
  }, []);

  // Moving add/remove to their own event listener with limited dependencies so it only runs once
  useEffect(() => {
    // if you only use the function in the useEffect, define it inside the hook
    // async function cancelDownload(event: any) {
    //   if (cancelRef.current) {
    //     // TODO: demo why this is bad
    //     cancelRef.current();
    //   }
    // }
    function removeEventListeners() {
      window.removeEventListener('focus', startDownload);
      window.removeEventListener('blur', cancelDownload);
    }
    async function startDownload(event?: any) {
      console.log('handleEvent');
      if (cancelRef.current) {
        // TODO: demo why this is bad
        cancelRef.current();
      }
      await downloadWithProgress(
        // 'https://freesound.org/data/previews/394/394035_1648170-lq.mp3', // LONG! 5hrs
        'https://freesound.org/data/previews/586/586044_10659034-lq.mp3', // 6mins
        new axios.CancelToken(c => {
          cancelRef.current = c; // TODO: now ref
        }),
        newProgress =>
          setProgress(prev => {
            const roundedProgress =
              Math.floor(newProgress / roundToNearest) * roundToNearest;
            return roundedProgress === prev ? prev : roundedProgress;
          })
      );
      cancelRef.current = null;
    }
    if (hasRequestedDownload) {
      console.log('adds');
      startDownload();
      window.addEventListener('focus', startDownload);
      window.addEventListener('blur', cancelDownload);
    } else {
      removeEventListeners();
    }
    return removeEventListeners;
  }, [hasRequestedDownload, cancelDownload]);

  const onClickDownload = () => {
    setHasRequestedDownload(true);
  };

  const segments: [number, number][] = [[0, 50]];
  return (
    <Container>
      <Button onClick={() => setPlaying(prev => !prev)}>
        {playing ? 'pause' : 'play'}
      </Button>
      {/* <h1>HasRequestedDownload: {hasRequestedDownload ? 'true' : 'false'}</h1>
      <h2>Progress: {progress}</h2>
      <LinearProgress value={progress} variant="determinate" />
      <Button onClick={onClickDownload} variant="contained" color="primary">
        File Download
      </Button>
      <Button
        onClick={cancelDownload}
        variant="contained"
        color="secondary"
        disabled={!hasRequestedDownload}
      >
        Cancel File Download
      </Button> */}
      <BuildingAnimation play={playing} segments={segments} />
    </Container>
  );
};

export default DownloadPageOptimized;
