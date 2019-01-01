import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  login = () => {
    window.location.assign(`${process.env.REACT_APP_BACKEND_URI}/login`);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <button style={{ width: 100, height: 100 }} onClick={this.login}>
              LOGIN
            </button>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
