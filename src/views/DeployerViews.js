import React from 'react';
import PlayerViews from './PlayerViews';

const exports = {...PlayerViews};

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Deployer">
        <h2>Deployer (Sponsor)</h2>
        {content}
      </div>
    );
  }
}

exports.SetWager = class extends React.Component {
  render() {
    const {parent, defaultWager, standardUnit} = this.props;
    const wager = (this.state || {}).wager || defaultWager;
    return (
      <div>
        <input
          type='number'
          placeholder={defaultWager}
          onChange={(e) => this.setState({wager: e.currentTarget.value})}
        /> <div id={standardUnit}><div id="text-box">{standardUnit}</div></div>
        <br />
        <br />
        <button
          onClick={() => parent.setWager(wager)}
        >Set wager</button>
      </div>
    );
  }
}

exports.Deploy = class extends React.Component {
  render() {
    const {parent, wager, standardUnit} = this.props;
    return (
      <div>
        Wager (pay to deploy): <strong>{wager}</strong>
        <div id={standardUnit}><div id="text-box">{standardUnit}</div></div>
        <br />
        <button
          onClick={() => parent.deploy()}
        >Deploy</button>
      </div>
    );
  }
}

exports.Deploying = class extends React.Component {
  render() {
    return (
      <div>
        <div id="loading"></div>
        Deploying... please wait.
      </div>
    );
  }
}

exports.WaitingForAttacher = class extends React.Component {
  async copyToClipborad(button) {
    const {ctcInfoStr} = this.props;
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }

  render() {
    const {ctcInfoStr} = this.props;
    return (
      <div><div id="loading"></div>
        Waiting for Attacher to join...
        <br /> Please give them this contract info:
        <pre className='ContractInfo'>
          {ctcInfoStr}
        </pre>
        <button
          onClick={(e) => this.copyToClipborad(e.currentTarget)}
        >Copy to clipboard</button>
      </div>
    )
  }
}

exports.OpenSale = class extends React.Component {
  render() {
    return (
      <div>
        <strong>Sponsor </strong>
        saw the tickets has been start saling!
      </div>
    );
  }
}

exports.Returning = class extends React.Component {
  render() {
    const {howM} = this.props;
    return (
      <div>
        <strong>Sponsor </strong>
        saw the <strong>{howM}</strong> tickets has been Sold!
      </div>
    );
  }
}

exports.Returned = class extends React.Component {
  render() {
    const {howManyR} = this.props;
    return (
      <div>
        <strong>Sponsor </strong>
        saw the <strong>{howManyR}</strong> tickets has been revealed!
      </div>
    );
  }
}


export default exports;