import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-component">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
}
