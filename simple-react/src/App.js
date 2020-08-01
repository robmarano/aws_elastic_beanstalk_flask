import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import Demo from './Demo';
import Timeline from './Timeline';
import './App.css';

function App() {
  const [items, setItems] = useState([
    {
      name: 'Step 1',
      active: false,
    },
    {
      name: 'Step 2',
      active: false,
    },
    {
      name: 'Step 3',
      active: false,
    },
    {
      name: 'Step 4',
      active: false,
    },
    {
      name: 'Step 5',
      active: false,
    }
  ]);

  useEffect(() => {
    // console.log(`items = ${JSON.stringify(items, null, 2)}`);
  });

  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">Original Demo</Link>
            </li>
            <li>
              <Link to="/timeline">Timeline Demo</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/demo" component={Demo} exact />
          <Route path="/timeline">
            <Timeline items={items} setItems={setItems} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
