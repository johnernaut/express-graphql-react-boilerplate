import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { currentUserQuery } from '../schemas/user';

class Dashboard extends Component {
  logoutUser(e) {
    e.preventDefault();

    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  renderNav() {
    const { currentUser } = this.props.data;
    if (currentUser) {
      return (
        <div id="top">
          <Link className="rocketrides" to="/">
            Drow
          </Link>
          <div className="links">
            <Link to="/dashboard">Dashboard</Link>
            <a href="#" onClick={e => this.logoutUser(e)}>
              Logout
            </a>
          </div>
        </div>
      );
    }

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
    const { currentUser, loading } = this.props.data;
    if (currentUser) {
      return (
        <section className="top-header">
          <div className="title">
            <h1>Welcome, {currentUser.name}!</h1>
            {/* <div className="block search" /> */}
          </div>
        </section>
      );
    }

    if (loading) {
      return (
        <section className="top-header">
          <div className="title">
            <h1>Loading...</h1>
          </div>
        </section>
      );
    }
  }

  render() {
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

export default graphql(currentUserQuery, {
  options: { fetchPolicy: 'network-only' }
})(Dashboard);
