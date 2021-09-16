import { Box } from '@material-ui/core';
import { memo, useCallback, useEffect, useState } from 'react';
import useRenderCount from '../hooks/use-count-renders';

const UseCallbackExampleComponent: React.FunctionComponent<{
  users: { id: number; name: string }[];
}> = ({ users }) => {
  useRenderCount('UseCallbackExamplePage');
  const [userNames, setUserNames] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNamesArray = () => users.map(({ name }) => name);

  // comment this in (and line 9 above)and we'll re-render forever
  // the getNamesArray has a new reference upon each render - its an unstable dependency
  // but you could also disabled react-hooks/exhaustive-deps rule here and set the dependencies to an empty array
  // however this should be avoided since if this function changes you might forget to add needed dependencies with that rule off
  // plus if getNamesArray was more complex and actually depended on another variables value you want to get an updated reference
  // so it does an up-to-date computation
  // useEffect(() => {
  //   setUserNames(getNamesArray());
  // }, [getNamesArray]);

  // comment this in and we'll re-render one time after the first render
  // users is a stable dependency since it references the same object each time
  // it will re-render if users changes
  const getNamesArrayCallback = useCallback(
    () => users.map(({ name }) => name),
    [users]
  );
  useEffect(() => {
    setUserNames(getNamesArrayCallback());
  }, [getNamesArrayCallback]);

  return (
    <Box border="1px solid teal" p={3} m={3}>
      <h1>Hello from the useCallback example.</h1>
      <br />
      {userNames.map((el, index) => (
        <p key={users[index].id}>{el}</p>
      ))}
    </Box>
  );
};

const UseCallbackExample = memo(UseCallbackExampleComponent);
export default UseCallbackExample;
