import { Box } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import useRenderCount from '../hooks/use-count-renders';
import { sleep } from '../utils/mock-utils';

const UseEffectExampleComponent: React.FunctionComponent = () => {
  useRenderCount('UseCallbackExamplePage');
  const [count, setCount] = useState(0);

  // comment this in and we'll re-render forever
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   setCount(prev => prev + 1);
  // });

  // comment this in and we'll re-render forever
  // best practice is to use the version of below
  // but you could also disabled react-hooks/exhaustive-deps rule here and set the dependencies to an empty array
  // however this should be avoided since if this function changes you might forget to add needed dependencies with that rule off
  // useEffect(() => {
  //   setCount(count + 1);
  // }, [count]);

  // comment this in and we'll re-render one time after the first render
  useEffect(() => {
    const getData = async () => {
      await sleep(); // imagine you got data from an api
      setCount(prev => prev + 1);
    };
    getData();
  }, []);

  return (
    <Box border="1px solid teal" p={3} m={3}>
      <h1>Hello from the useEffect example.</h1>
      Count: {count}
    </Box>
  );
};

const UseEffectExample = memo(UseEffectExampleComponent);
export default UseEffectExample;
