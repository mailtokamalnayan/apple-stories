import React, { Component } from 'react';
import './App.css';
import StoriesLink from './StoriesLink';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="page-title">App Store App Collections</h1>
        <StoriesLink />
      </div>
    );
  }
}

export default App;
