import { Button, LinearProgress } from '@material-ui/core';
import axios, { Canceler } from 'axios';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  downloadWithProgress,
  cancelTokenSource,
} from '../../utils/axios-utils';

const DownloadPageOptimized = () => {
  const [progress, setProgress] = useState(0);
  // const [cancel, setCancel] = useState<Canceler | null>(null);
  const cancelRef = useRef<Canceler | null>(null);
  const [manifest, setManifest] = useState({
    total: 0,
    expected: 0,
  });

  // If you need to use this function in and out of the useEffect, or in multiple useEffects wrap it in useCallback like so
  // const handleEventCallback = useCallback((event: any) => {
  //   setManifest(event.data.message);
  //   // Rewriting this to avoid swState dependency
  //   setSwState((prev) => (prev !== navigator.serviceWorker.controller ? navigator.serviceWorker.controller : prev));
  // }, []);

  // Moving add/remove to their own event listener with limited dependencies so it only runs once
  useEffect(() => {
    // if you only use the function in the useEffect, define it inside the hook
    // TODO: new demo bad practice - outside w/o callback
    async function cancelDownload(event: any) {
      if (cancelRef.current) {
        // TODO: demo why this is bad
        cancelRef.current();
      }
    }
    async function startDownload(event: any) {
      console.log('handleEvent');
      if (cancelRef.current) {
        // TODO: demo why this is bad
        cancelRef.current();
      }
      // await downloadWithProgress(
      //   'https://freesound.org/data/previews/394/394035_1648170-lq.mp3',
      //   new axios.CancelToken(c => {
      //     cancelRef.current = c; // TODO: now ref
      //   }),
      //   newProgress => setProgress(newProgress)
      // );
      cancelRef.current = null;
      // Rewriting this to avoid swState dependency
      // const currentSeconds = new Date().getSeconds();
      // console.log({ currentSeconds });
      // setSwState((prev) => (prev !== currentSeconds ? currentSeconds : prev));
      // setProgress(rawProgress);
    }
    console.log('add');
    window.addEventListener('focus', startDownload);
    window.addEventListener('blur', cancelDownload);
    return () => {
      console.log('remove');

      window.removeEventListener('focus', startDownload);
      window.removeEventListener('blur', cancelDownload);
    };
  }, []);

  const rawProgress = useMemo(
    () =>
      manifest.total > 0 && manifest.expected > 0
        ? Math.floor((manifest.total / manifest.expected) * 100)
        : 0,
    [manifest.total, manifest.expected]
  );
  useEffect(() => {
    if (rawProgress) {
      setProgress(rawProgress);
    }
    // add 'airbnb/hooks' to your eslintrc
    // so the react-hooks/exhaustive-deps rule screams at your about dependencies
  }, [rawProgress]);

  console.log({ progress, rawProgress });

  const updateManifest = () => {
    setManifest(prev => ({
      total: (prev.total + 5) % (prev.expected + 1),
      expected: prev.expected,
    }));
  };
  console.log('render', manifest.expected);

  return (
    <div>
      <h1>Progress: {progress}</h1>
      <LinearProgress value={progress} variant="determinate" />
      <Button onClick={updateManifest} variant="contained" color="primary">
        Mock File Download
      </Button>
    </div>
  );
};

export default DownloadPageOptimized;
