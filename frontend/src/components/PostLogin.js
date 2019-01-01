import React, { Component } from 'react';
import { Redirect } from 'react-router';
import qs from 'query-string';

/**
 * When the user logs in, he is redirected to /post-login route. Set access token and expiration
 * time to local storage here.
 */
class PostLogin extends Component {
  componentDidMount() {
    localStorage.setItem(
      'access_token',
      qs.parse(this.props.location.search).access_token
    );
    const expires_in = qs.parse(this.props.location.search).expires_in;
    localStorage.setItem(
      'expires_at',
      expires_in * 1000 + new Date().getTime()
    );
  }

  render() {
    return <Redirect to="/home" />;
  }
}

export default PostLogin;
