import axios, { CancelToken } from 'axios';

export const cancelTokenSource = axios.CancelToken.source();

export const downloadWithProgress = async (
  url: string,
  cancelToken: CancelToken,
  onProgress: (progress: number) => void
) => {
  try {
    const result = await axios.get(url, {
      cancelToken,
      onDownloadProgress: progressEvent => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log({ percentCompleted });
        onProgress(percentCompleted);
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    onProgress(0);
  }
  return null;
};
