import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Main from './pages/Main';
import Records from './pages/Records';
import AudioPlayer from 'features/audio-player/components/BottomControls';

import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>MCR</h1>

      <nav>
        <ul>
          <li>
            <Link to="/records">Records</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/records/:id">
          <Records />
        </Route>
        <Route path="/records">
          <Main />
        </Route>
      </Switch>

      <AudioPlayer />
    </div>
  );
}

export default App;
