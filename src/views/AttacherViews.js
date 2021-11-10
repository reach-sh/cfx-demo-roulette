import React from 'react';
import PlayerViews from './PlayerViews';

const exports = {...PlayerViews};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Attacher">
        <h2>Attacher (Player)</h2>
        {content}
      </div>
    );
  }
}

exports.Attach = class extends React.Component {
  render() {
    const {parent} = this.props;
    const {ctcInfoStr} = this.state || {};
    return (
      <div>
        Please paste the contract info to attach to:
        <br />
        <textarea spellcheck="false"
          className='ContractInfo'
          onChange={(e) => this.setState({ctcInfoStr: e.currentTarget.value})}
          placeholder='{}'
        />
        <br />
        <button
          disabled={!ctcInfoStr}
          onClick={() => parent.attach(ctcInfoStr)}
        >Attach</button>
      </div>
    );
  }
}

exports.Attaching = class extends React.Component {
  render() {
    return (
      <div>
        <div id="loading"></div>
        Attaching, please wait...
      </div>
    );
  }
}

exports.ShouldBuy = class extends React.Component {
  render() {
    const {wager, standardUnit, parent} = this.props;
    const {disabled} = this.state || {};
    return (
      <div>
        You are trying to buy a ticket for
        <strong>{wager} {standardUnit}</strong>
        <br />
        <button
          disabled={disabled}
          onClick={() => {
            this.setState({disabled: true});
            parent.showBuy('YES');
          }}
        >Buy a ticket</button>
        <button
          disabled={disabled}
          onClick={() => {
            this.setState({disabled: true});
            parent.showBuy('NO');
          }}
        >No</button>
      </div>
    );
  }
}

exports.WaitingForTurn = class extends React.Component {
  render() {
    return (
      <div><div id="loading"></div> 
      <br/>
        Waiting for the other player...
        <br />Hope you have a happy game!
      </div>
    );
  }
}

exports.BuyerWas = class extends React.Component {
  render() {
    // const {player} = this.props;
    return (
      <div>
        Congratulations!<br/>
        <strong>You</strong><br/>
        bought a ticket!
        <br/>
        Please waiting for your ticket number!
        <br/>
        <div id="random-num">
        </div>
      </div>
    );
  }
}
exports.ReturnerWas = class extends React.Component {
  render() {
    const {ticket} = this.props;
    return (
      <div>
        Player returned 
      <br/>
      and revealed ticket #{ticket}.
      <br/>
      Your ticket number is
      <br/>
      <div id={"no"+ticket}>
      </div>
      <br/>
      <br/>
      Winner is...
      <br/>
      <div id="random-num">
        </div>
      </div>
    );
  }
}

export default exports;