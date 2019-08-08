import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css';
import Dashboard from './containers/Dashboard'



class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Dashboard}/>
        <Redirect to='/' />
      </Switch>
    )

    return (
      <div className="App">
        {routes}
      </div>
    );

  }
}

export default App;
