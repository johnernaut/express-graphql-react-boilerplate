import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import isAuthenticated from '../utils/IsAuthenticated';

class Home extends Component {
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

  renderTopHeader() {
    return (
      <section className="top-header">
        <div className="intro">
          <div className="illustration">
            <div className="rocket" />
          </div>
          <div className="callout">
            <h1>Get ready for take off.</h1>
            <h2>
              Rocket Rides is the world’s leading air travel platform. <br />
              Join our elite team of pilots and help people travel faster than
              ever.
            </h2>
            <Link className="button" to="/signup">
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    );
  }

  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <header>{this.renderNav()}</header>
        {this.renderTopHeader()}

        <div id="content">
          <div className="features">
            <section className="schedule">
              <h3>Fly when you want</h3>
              <p>
                You can be a part of the Rocket Rides pilots team anytime—you
                pick your own schedule. Fly as little or as much as you want.
              </p>
            </section>
            <section className="earnings">
              <h3>Earn more with each trip</h3>
              <p>
                Trip fares increase with time and distance. Cash out whenever
                you want and get instant transfers to your account.
              </p>
            </section>
            <section className="app">
              <h3>Augmented reality app</h3>
              <p>
                Ready, set, download. Get weather and air traffic updates,
                directions, and 24/7 support. Don’t have a smartphone? No
                problem.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
