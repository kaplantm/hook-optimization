import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
// import MarkdownPageOptimized from './pages/markdown/optimized';
import GraphPage from './pages/graph';
import GraphPageOptimized from './pages/graph/optimized';
import GraphPagePartiallyOptimized from './pages/graph/graph-partially-optimized';

function App(): React.ReactElement {
  return (
    <div className="App">
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

          {/* TODO: now not optimized version, fix nav */}
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
    </div>
  );
}

export default App;
