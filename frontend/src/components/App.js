import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

// Components
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import PrivateRoute from '../utils/PrivateRoute';

import './App.css';

class App extends Component {
  renderNav() {
    return (
      <div id="top">
        <Link className="rocketrides" to="/">
          Drow
        </Link>
        <Link className="arrow" to="/login">
          Login
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>

        <footer>
          <div className="annotation">
            <a className="stripe" href="https://stripe.com">
              Stripe
            </a>
            <p>
              Drow is a demo application for{' '}
              <a href="https://stripe.com/connect">Stripe Connect</a>. It is not
              a real product.
            </p>
            <a
              className="github arrow"
              href="https://github.com/stripe/stripe-connect-rocketrides"
            >
              View on GitHub
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
