import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>nothing.chat</h1>
        <p>{window.__nothing__.chatId}</p>
      </div>
    );
  }
}

export default App;
