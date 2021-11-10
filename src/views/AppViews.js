import React from 'react';
// import { Button } from 'antd';

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <div id="info-layer">
        <div id="info-logo">
        ?
        </div>
        </div>
        <div id="how-to-play">
        <div id="info-text">
          <p>
          This is a hot-potato game, at least 1 sponsor and 2 players. Each person has a number. Through the system's random algorithm smart contract will get a lucky number. The person with this lucky number gets everyone else's deposit.  It's a completely random process, just luck!  Brothers!  Maybe you'll be the next lucky one!
        </p>
        </div>
        </div>
        <div id="info-layer"></div>
        <header className="App-header" id="root">
          <h1>Roulette Game</h1>
          {content}
        </header>
      </div>
    );
  }
}

exports.ConnectAccount = class extends React.Component {
  render() {
    return (
      <div>
        Please wait while we connect to your account.
        If this takes more than a few seconds, there may be something wrong.
      </div>
    )
  }
}

exports.FundAccount = class extends React.Component {
  render() {
    const {bal, standardUnit, defaultFundAmt, parent} = this.props;
    const amt = (this.state || {}).amt || defaultFundAmt;
    return (
      <div>
        <h2>Fund account</h2>
        <br />
        Balance: {bal} {standardUnit}
        <hr />
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type='number'
          placeholder={defaultFundAmt}
          onChange={(e) => this.setState({amt: e.currentTarget.value})}
        />
        <button onClick={() => parent.fundAccount(amt)}>Fund Account</button>
        <button onClick={() => parent.skipFundAccount()}>Skip</button>
      </div>
    );
  }
}

exports.DeployerOrAttacher = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div class="ui-text">
        Please select a role:
        <br />
        <p>
          <button
            onClick={() => parent.selectDeployer()}
            class="deploy-btn"
          >Deployer</button>
          <br /> Set the wager, deploy the contract.
        </p>
        <p>
          <button
            onClick={() => parent.selectAttacher()}
            class="attach-btn"
          >Attacher</button>
          <br /> Attach to the Deployer's contract.
        </p>
      </div>
    );
  }
}

export default exports;