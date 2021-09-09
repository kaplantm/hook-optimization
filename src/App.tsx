import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import MarkdownPageOptimized from './pages/markdown/optimized';

function App(): React.ReactElement {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* TODO: now not optimized version, fix nav */}
          <Switch>
            <Route path="/downloadOptimized">
              <MarkdownPageOptimized />
            </Route>
            <Route path="/">
              <MarkdownPageOptimized />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
