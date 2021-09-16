import { useCallback, useEffect, useRef, useState } from 'react';

function useRenderCount(title: string): () => number {
  // we use a ref instead of state so that internal changes to the hook's state don't cause the parent to rerender
  // but the parent can still access this value from the exported callback!
  const renderCountRef = useRef(1);
  const [state, setState] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // This isn't needed its just an example of how changing the custom hooks internal state causes its parent to re-render
  // useEffect(() => {
  //   setState(prev => prev + 1);
  // }, []);

  // eslint-disable-next-line no-console
  console.log(`${title} Render Count: ${renderCountRef.current}`);

  const checker = useCallback((): number => renderCountRef.current, []);

  return checker;
}

export default useRenderCount;
