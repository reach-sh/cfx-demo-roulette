import React from 'react';

const exports = {};

// Player views must be extended.
// It does not have its own Wrapper view.

exports.Winner = class extends React.Component {
  render() {
    const {number} = this.props;
    return (
      <div>
        Thank you for playing. The Winner's ticket of this game was:
        <br />#{number || 'Unknown'}
        <br/>
        Winner is...
        <br/>
      <div id={"no"+number}>
        </div>
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome} = this.props;
    return (
      <div>
        Thank you for playing. The Winner's Address of this game was:
        <br />{outcome || 'Unknown'}
        <br/>
      </div>
    );
  }
}

exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;