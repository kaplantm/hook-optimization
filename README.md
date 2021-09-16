# Hooks / Optimization Roundtable

Takeaways:

### Memoization

Memoization is an optimization technique, used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

### [useEffect](https://reactjs.org/docs/hooks-effect.html)

- Used to perform side effects / react to changes in variables
- By default runs every render, unless an array of dependencies is provided

### [useCallback](https://reactjs.org/docs/hooks-reference.html#usememo)

- Returns a memoized callback.

### useMemo

- Returns a memoized value.
- Only recomputes value when dependencies change.
- Can be used to stablize unstable inputs, to avoid unncessarily re-computer complex logic
- Not the place for side effects. Those go in useEffect.
- By default runs every render, unless an array of dependencies is provided

### Hook dependencies

- Some hooks take an array of dependencies are compared based on reference or value (for primitive types). So it you pass in an object/array/function that does not have a stable reference, useEffect will run a lot. Don't do that!
- Make sure to add airbnb/hooks to your eslint to see warnings about missing or unstable dependencies

### React.memo

- React.memo is a higher order component
- Components will rerender when their parents re-render, even it there props don't change. You can avoid this by wrapping your child component in memo(). It iwll only rerener when internal state/hooks/context changes, and when its props change.

### Vaguely Related: Redux Selectors

- [useSelector from redux uses similar logic for dependencies](<https://react-redux.js.org/api/hooks#:~:text=When%20an%20action%20is%20dispatched%2C%20useSelector()%20will%20do%20a%20reference%20comparison%20of%20the%20previous%20selector%20result%20value%20and%20the%20current%20result%20value.%20If%20they%20are%20different%2C%20the%20component%20will%20be%20forced%20to%20re-render.%20If%20they%20are%20the%20same%2C%20the%20component%20will%20not%20re-render.>) So that is also a scenario you want to be careful of returning new objects vs references to existing ones.
- [More info](https://stackoverflow.com/a/62718081)

- By creating into a new object/reference it will always return a new object. Therefore your component will re-render on every action that gets dispatched (not just ones that meaningfully change the value of the selector)
  e.g.

```
// good stuff, returning existing reference
const user = useSelector(state => state.users);
// bad! new reference
const user = useSelector(state => state.users.map(user=>user.name));
```

### eslint extends airbnb/hooks

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
