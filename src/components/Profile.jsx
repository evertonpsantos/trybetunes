import React from 'react';
import Header from './Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}
