import { Box } from '@material-ui/core';
import { memo, useEffect, useMemo, useState } from 'react';
import useRenderCount from '../hooks/use-count-renders';

const UseMemoExampleComponent: React.FunctionComponent<{
  users: { id: number; name: string }[];
}> = ({ users }) => {
  useRenderCount('UseMemoExamplePage');
  const [userNames, setUserNames] = useState<string[]>([]);

  const namesArray = users.map(({ name }) => name);

  // comment this in and we'll re-render forever
  // namesArray generates a new object reference upon each render - its an unstable dependency
  // but you could also disabled react-hooks/exhaustive-deps rule here and set the dependencies to an empty array
  // however this should be avoided since if this function changes you might forget to add needed dependencies with that rule off
  // useEffect(() => {
  //   setUserNames(namesArray);
  // }, [namesArray]);

  // comment this in and we'll re-render one time after the first render
  // users is a stable dependency since it references the same object each time
  // it will re-render if users changes
  // useEffect(() => {
  //   const namesArrayDefinedInsideTheUseEffect = users.map(({ name }) => name);
  //   setUserNames(namesArrayDefinedInsideTheUseEffect);
  // }, [users]);

  // comment this in and we'll re-render one time after the first render
  // another approach, useful if you need to share the variable in/outside the useEffect
  // we use useMemo to create a stable dependency from a newly generated object
  // it will re-render if users changes
  // you could make this even more memoized e.g. only have users.length as a dependency, so we only care if the length changes
  // or something more complex where we only recomputer if the ids sent to us change
  const memoizedNamesArray = useMemo(
    () => users.map(({ name }) => name),
    [users]
  );
  useEffect(() => {
    setUserNames(memoizedNamesArray);
  }, [memoizedNamesArray]);

  return (
    <Box border="1px solid teal" p={3} m={3}>
      <h1>Hello from the useMemo example.</h1>
      <br />
      {userNames.map((el, index) => (
        <p key={users[index].id}>{el}</p>
      ))}
    </Box>
  );
};

const UseMemoExample = memo(UseMemoExampleComponent);
export default UseMemoExample;
