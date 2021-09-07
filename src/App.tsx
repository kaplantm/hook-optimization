import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import DownloadPageOptimized from './pages/download/optmized';

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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/downloadOptimized">
              <DownloadPageOptimized />
            </Route>
            <Route path="/">
              <DownloadPageOptimized />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
