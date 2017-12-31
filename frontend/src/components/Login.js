import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { userLoginMutation } from '../schemas/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      email: null,
      password: null
    };
  }

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
        <div className="title">
          <h1>Log in to proceed</h1>
        </div>
      </section>
    );
  }

  handleChange(e, val) {
    this.setState({
      [val]: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.props
      .mutate({
        variables: { email: this.state.email, password: this.state.password }
      })
      .then(result => {
        const { jwt } = result.data.login;
        if (jwt) {
          localStorage.setItem('token', jwt);
          this.props.history.push('/dashboard');
          return;
        }

        this.setState({
          errors: 'An error occurred.  Please try again later.'
        });
      })
      .catch(error => {
        this.setState({ errors: error.message.replace('GraphQL error: ', '') });
      });
  };

  render() {
    return (
      <div>
        <header>{this.renderNav()}</header>
        {this.renderTopHeader()}

        <div id="content">
          <section className="form account">
            {this.state.errors ? (
              <i style={{ color: 'red' }}>{this.state.errors}</i>
            ) : null}
            <form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
              <fieldset>
                <div className="row" label="Email">
                  <input
                    type="email"
                    name="email"
                    onChange={e => this.handleChange(e, 'email')}
                    placeholder="jane@example.com"
                    required
                    autoFocus
                  />
                </div>

                <div className="row" label="Password">
                  <input
                    type="password"
                    name="password"
                    onChange={e => this.handleChange(e, 'password')}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </fieldset>
              <input type="submit" value="Login" />
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default graphql(userLoginMutation)(Login);
