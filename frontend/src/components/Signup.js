import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { userSignupMutation } from '../schemas/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      email: null,
      name: null,
      password: null,
      password_confirmation: null
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
          <h1>Sign up to proceed</h1>
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

    try {
      const result = await this.props.mutate({
        variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      });

      const { jwt } = result.data.signup;
      console.log(result.data);
      if (jwt) {
        localStorage.setItem('token', jwt);
        this.props.history.push('/dashboard');
        return;
      }

      this.setState({ errors: 'An error occurred.  Please try again later.' });
    } catch (error) {
      this.setState({ errors: error.message.replace('GraphQL error: ', '') });
    }
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

                <div className="row" label="Name">
                  <input
                    type="text"
                    name="name"
                    onChange={e => this.handleChange(e, 'name')}
                    placeholder="Jane Doe"
                    required
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

                <div className="row" label="Password Confirmation">
                  <input
                    type="password"
                    name="password_confirmation"
                    onChange={e =>
                      this.handleChange(e, 'password_confirmation')
                    }
                    placeholder="••••••••"
                    required
                  />
                </div>
              </fieldset>
              <input type="submit" value="Create Account" />
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default graphql(userSignupMutation)(Signup);
