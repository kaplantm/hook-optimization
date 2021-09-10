import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Slider, Container, Typography, Box } from '@material-ui/core';
import { max, min } from 'd3-array';
import './App.css';
// import MarkdownPageOptimized from './pages/markdown/optimized';
import GraphPage from './pages/graph';
import GraphPageOptimized from './pages/graph/optimized';
import GraphPagePartiallyOptimized from './pages/graph/graph-partially-optimized';
import { getStockValue, stock } from './pages/graph/shared';
import { sleep } from './utils/mock-utils';

// Graph component base source: https://vx-demo.vercel.app/areas

function App(): React.ReactElement {
  const [value, setValue] = useState<number | null>(null);

  const handleValueChange = useCallback(
    (e: ChangeEvent<any> | null, newValue: number | number[]) => {
      setValue(newValue as number);
    },
    []
  );

  // Guess what happens when useCallback is not used?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleValueChange = (
  //   e: ChangeEvent<any> | null,
  //   newValue: number | number[]
  // ) => {
  //   setValue(newValue as number);
  // };

  useEffect(() => {
    async function loadFromSaved() {
      await sleep();
      handleValueChange(null, Math.floor(Math.random() * 100) + 150);
    }
    loadFromSaved();
  }, [handleValueChange]);

  return (
    <Container maxWidth="md" className="App">
      <Router>
        <div>
          <nav>
            <ul>
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
          <Box border="1px solid grey" p={3} m={6}>
            <Slider
              value={value || 0}
              disabled={value === null}
              onChange={handleValueChange}
              aria-labelledby="continuous-slider"
              max={max(stock, getStockValue) || 0}
              min={min(stock, getStockValue) || 0}
              valueLabelDisplay="on"
              step={0.25}
            />{' '}
            <Typography>
              This slider is unrelated to the graphs. It does nothing!
            </Typography>
          </Box>

          <Switch>
            <Route path="/graph">
              <GraphPage width={800} height={400} />
            </Route>
            <Route path="/graph-partially-optimized">
              <GraphPagePartiallyOptimized width={800} height={400} />
            </Route>
            <Route path="/graph-optimized">
              <GraphPageOptimized width={800} height={400} />
            </Route>
            <Route path="/">
              <GraphPageOptimized width={800} height={400} />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
