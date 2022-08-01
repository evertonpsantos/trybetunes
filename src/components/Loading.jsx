import React from 'react';

export default class Loading extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        { localStorage.length === 0
          ? <p>Loading...</p> : this.props.history.push('/search') }
      </div>
    );
  }
}
