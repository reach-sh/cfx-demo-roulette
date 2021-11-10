import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/render';
import './index.css';
import * as backend from './build/index.main.mjs';
import {loadStdlib} from '@reach-sh/stdlib';

const reach = loadStdlib({REACH_CONNECTOR_MODE: 'CFX'});

const SelectTerm = {'YES': true, 'NO': false};
const {standardUnit} = reach;
const defaults = {defaultWager: '3', standardUnit};
var isA = false;
var isB;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'ConnectAccount', ...defaults};
  }
  async componentDidMount() {
    this.setState({view: 'SelectNetwork'});
  }
  async selectNetwork(network) {
    if (network) { reach.setProviderByName(network); }
    const acc = await reach.getDefaultAccount();
    acc.setGasLimit(5000000);
    this.setState({view: 'DeployerOrAttacher', acc});
  }
  selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
  selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
  render() { return renderView(this, AppViews); }
}

class Player extends React.Component {
  random() {
    return reach.hasRandom.random();
  }

  showWinner(winNum) {
    this.setState({view: 'Winner', number: winNum.toString()});
  }

  showOutcome(addr) {
    this.setState({view: 'Done', outcome: addr.toString()});
  }

  informTimeout() {
    this.setState({view: 'Timeout'});
  }

  async log(...args) {
    const now = await reach.getNetworkTime();
    console.log(
      now.toString(),
      (new Date()).toLocaleTimeString('en-US', {hour12: false}),
      ...args.map(x => x.toString()),
    );
  }

}

class Deployer extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'SetWager'};
  }

  setWager(wager) { this.setState({view: 'Deploy', wager}); }
  
  async deploy() {

    const ctc = this.props.acc.deploy(backend);
    this.setState({view: 'Deploying', ctc});
    this.wager = reach.parseCurrency(this.state.wager);
    this.deadline = reach.connector === 'CFX' ? 200 : 30;
    backend.Sponsor(ctc, this);
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
    this.setState({view: 'WaitingForAttacher', ctcInfoStr});
  }
  
  showOpen() { this.setState({view: 'OpenSale'}); }
  showReturning(howM) { this.setState({view: 'Returning', howM: howM.toString()}); }
  showReturned(howManyR) { this.setState({view: 'Returned', howManyR: howManyR.toString()}); }
  render() { return renderView(this, DeployerViews); }
}

class Attacher extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'Attach'}; 
    
  }


  attach(ctcInfoStr) {
    const ctc = this.props.acc.attach(backend, JSON.parse(ctcInfoStr));
    this.setState({view: 'Attaching'});
    backend.Player(ctc, this);
    
  }


  async shouldBuy(wagerAtomic) {

    if (isA) {return false};
    const wager = reach.formatCurrency(wagerAtomic, 4);
    const isAccept = await new Promise(resolveAcceptedP => {
        this.setState({view: 'ShouldBuy', wager, resolveAcceptedP});
    }); 
    this.setState({view: 'WaitingForTurn', isAccept}); 
    isB = SelectTerm[isAccept];                                           
    return isB;
  }

  showBuy(isAccept){
    this.state.resolveAcceptedP(isAccept);
  }

  buyerWas() {
    this.setState({view: 'BuyerWas'});
    isA = true;
  }

  returnerWas(ticket) {
    this.setState({view: 'ReturnerWas', ticket:ticket.toString()})
  }

  render() { return renderView(this, AttacherViews); }
}

renderDOM(<App />);
export default App;
