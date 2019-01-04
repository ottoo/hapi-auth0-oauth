import React, { Component } from 'react';
import { axiosInstance } from '../api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { userinfo: null };
  }

  async componentDidMount() {
    const userinfo = await axiosInstance.get(
      `${process.env.REACT_APP_BACKEND_URI}/userinfo`
    );
    this.setState({ userinfo });
  }

  render() {
    return (
      <div>
        <h1>HOME</h1>
        <pre>{JSON.stringify(this.state.userinfo, null, 2)}</pre>
      </div>
    );
  }
}

export default Home;
