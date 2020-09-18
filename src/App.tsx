import React from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import Main from './pages/Main';
import Records from './pages/Records';
import ErrorPage from 'pages/Error';
import AudioPlayer from 'features/audio-player/components/BottomControls';

import './App.scss';

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <h1>MCR</h1>

      <nav>
        <ul>
          {pathname !== '/' && (
            <li>
              <Link to="/">Records</Link>
            </li>
          )}
        </ul>
      </nav>

      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/records/:id" component={Records} />
        <Route path="*" component={ErrorPage} />
      </Switch>

      <AudioPlayer />
    </div>
  );
}

export default App;
