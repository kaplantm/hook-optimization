import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Slider, Container, Typography, Grid, Button } from '@material-ui/core';
import './App.css';
import GraphPage from './pages/graph';
import GraphPageOptimized from './pages/graph/optimized';
import GraphPagePartiallyOptimized from './pages/graph/graph-partially-optimized';
import { sleep } from './utils/mock-utils';
import UseEffectExample from './pages/useEffect';
import UseMemoExample from './pages/useMemo';
import UseCallbackExample from './pages/useCallback';
import useDebounce from './hooks/use-debounce';
import useRenderCount from './hooks/use-count-renders';

// Graph component base source: https://vx-demo.vercel.app/areas

const users = [
  { id: 1, name: 'jim' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'carol' },
];

function App(): React.ReactElement {
  const checker = useRenderCount('App');
  const [uselessValue, setUselessValue] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number>(2012);
  const [minYear, setMinYear] = useState<number>(2007);
  const debouncedMaxYear = useDebounce(maxYear, 10);
  const debouncedMinYear = useDebounce(minYear, 10);

  const handleValueChange = useCallback(
    (e: ChangeEvent<any> | null, newValue: number | number[]) => {
      setUselessValue(newValue as number);
    },
    []
  );

  useEffect(() => {
    async function loadFromSaved() {
      await sleep();
      handleValueChange(null, Math.floor(Math.random() * 100) + 150);
    }
    loadFromSaved();
  }, [handleValueChange]);

  const handleMaxYearChange = (
    e: ChangeEvent<any>,
    newValue: number | number[]
  ) => {
    if (newValue > minYear) {
      setMaxYear(newValue as number);
    }
  };

  const handleMinYearChange = (
    e: ChangeEvent<any>,
    newValue: number | number[]
  ) => {
    if (newValue < maxYear) {
      setMinYear(newValue as number);
    }
  };

  const handleCheckRerendersButton = () => {
    const count = checker();
    // eslint-disable-next-line no-alert
    alert(`Rendered ${count} time(s).`);
  };
  return (
    <Container maxWidth="md" className="App">
      <Router>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <nav>
              <ul>
                <li>
                  <Link to="/useEffect">useEffect</Link>
                </li>
                <li>
                  <Link to="/useMemo">useMemo</Link>
                </li>
                <li>
                  <Link to="/useCallback">useCallback</Link>
                </li>
                <li>
                  <Link to="/graph">Graph NOT Optimized</Link>
                </li>
                <li>
                  <Link to="/graph-partially-optimized">
                    Graph Partially Optimized
                  </Link>
                </li>
                <li>
                  <Link to="/graph-optimized">Graph Optimized</Link>
                </li>
              </ul>
            </nav>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleCheckRerendersButton}>
              How many times has the app component rendered?
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <Slider
                  value={uselessValue || 0}
                  disabled={uselessValue === null}
                  onChange={handleValueChange}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="on"
                  step={0.25}
                />
                <Typography>This slider does nothing!</Typography>
              </Grid>
              <Grid item xs={4}>
                <Slider
                  value={minYear}
                  onChange={handleMinYearChange}
                  aria-labelledby="continuous-slider"
                  max={2012}
                  min={2007}
                  step={0.1}
                  valueLabelDisplay="on"
                />
                <Typography>Min year</Typography>
              </Grid>
              <Grid item xs={4}>
                <Slider
                  value={maxYear}
                  onChange={handleMaxYearChange}
                  aria-labelledby="continuous-slider"
                  max={2012}
                  min={2007}
                  step={0.1}
                  valueLabelDisplay="on"
                />
                <Typography>Max year</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route path="/useEffect">
                <UseEffectExample />
              </Route>
              <Route path="/useMemo">
                <UseMemoExample users={users} />
              </Route>
              <Route path="/useCallback">
                <UseCallbackExample users={users} />
              </Route>
              <Route path="/graph">
                <GraphPage
                  width={800}
                  height={400}
                  startYear={debouncedMinYear}
                  endYear={debouncedMaxYear}
                />
              </Route>
              <Route path="/graph-partially-optimized">
                <GraphPagePartiallyOptimized
                  width={800}
                  height={400}
                  startYear={debouncedMinYear}
                  endYear={debouncedMaxYear}
                />
              </Route>
              <Route path="/graph-optimized">
                <GraphPageOptimized
                  width={800}
                  height={400}
                  startYear={debouncedMinYear}
                  endYear={debouncedMaxYear}
                />
              </Route>
              <Route path="/">
                <GraphPageOptimized
                  width={800}
                  height={400}
                  startYear={debouncedMinYear}
                  endYear={debouncedMaxYear}
                />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </Container>
  );
}

export default App;
