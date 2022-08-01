import React from 'react';
import Header from './Header';

export default class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}
