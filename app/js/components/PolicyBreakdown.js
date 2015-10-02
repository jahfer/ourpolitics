// polyfills
import 'whatwg-fetch';
import 'babelify/polyfill';
import matchMedia from 'matchmedia';
import objectAssign from 'object-assign';
// utils
import {_} from 'lodash';
import {entries} from '../util';
// libs
import * as React from 'react';
import {policyPointSelected} from '../actions/PolicyTableActions';
import {PolicyModal} from './PolicyModal';
import Modal from 'react-modal';

class PolicyPoint extends React.Component {
  onClick() {
    console.log('[POLICYPOINT] onClick fired', this.props.party);
    policyPointSelected({policy: this.props.policy, party: this.props.party, topic: this.props.topic});
  }

  render() {
    return (
      <li className={`${this.props.policy.important ? 'policyPoint customBullet customBullet--star' : 'policyPoint'}`}>
        <a onClick={this.onClick.bind(this)} className="policyPoint--link">{this.props.policy.summary}</a>
      </li>
    );
  }
}

PolicyPoint.propTypes = {
  party: React.PropTypes.string,
  policy: React.PropTypes.objectOf({important: React.PropTypes.bool, summary: React.PropTypes.string}),
  topic: React.PropTypes.string
};

class PolicyCell extends React.Component {
  createPolicyPoints(party, policies) {
    if (policies.length) {
      return policies.map((policy) => <PolicyPoint topic={this.props.topic} party={party} policy={policy} />);
    } else {
      return <li className="emptyPolicy">No policy</li>;
    }
  }

  render() {
    let listItems = this.createPolicyPoints(this.props.party, this.props.policies);

    return (
      <div className="policyCell">
        <h4 className={`policyCell--party textColor--${this.props.party}`}>{this.props.party}</h4>
        <ul className="policyCell--points">
          {listItems}
        </ul>
      </div>
    );
  }
}

PolicyCell.propTypes = {
  party: React.PropTypes.string,
  policies: React.PropTypes.array,
  topic: React.PropTypes.string
};

class PolicyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timelineOpen: false};
  }

  findPoliciesForParty(party) {
    return _.chain(this.props.data.positions).find('party', party).value();
  }

  toggleTimeline() {
    this.setState({timelineOpen: !this.state.timelineOpen});
  }

  render() {
    let policyCells = ['NDP', 'Conservatives', 'Liberals']
      .map(this.findPoliciesForParty.bind(this))
      .map((data) => <PolicyCell party={data.party} topic={this.props.topic} policies={data.policies} key={`${this.props.topic}:${data.party}`} />);

    return (
      <div className="policyRow">
        <div className="policyCells">
          <div className="policyCell policyTopic">
            <h3 className="policyTopic--title">{this.props.topic}</h3>
          </div>
          {policyCells}
        </div>
      </div>
    );
  }
}

PolicyRow.propTypes = {
  data: React.PropTypes.objectOf({positions: React.PropTypes.array}),
  topic: React.PropTypes.string
};

class PolicyTable extends React.Component {
  render() {
    let policyRows = [];
    for (let [topic, data] of entries(this.props.data)) {
      policyRows.push(<PolicyRow topic={topic} data={data} key={topic} />);
    }

    return (
      <div className="policyTable">
        <div className="policyRow tableHeader">
          <div className="policyCells">
            <div className="policyCell"></div>
            <div className="policyCell partyTitle textColor--NDP">NDP</div>
            <div className="policyCell partyTitle textColor--Conservatives">Conservatives</div>
            <div className="policyCell partyTitle textColor--Liberals">Liberals</div>
          </div>
        </div>
        {policyRows}
      </div>
    );
  }
}

PolicyTable.propTypes = {
  data: React.PropTypes.object
};

const opacity = 0.8;
const partyColors = {
  NDP: `rgba(243,112,33, ${opacity})`,
  Conservatives: `rgba(26,71,130, ${opacity})`,
  Liberals: `rgba(215,25,32, ${opacity})`
};

const modalStyles = (function(){
  let modalStyles = {
    content: {
      padding: 0,
      margin: '0 auto',
      top: '10%',
      bottom: '10%',
      border: 'none',
      maxHeight: 600,
      maxWidth: 1000,
      background: '#303030'
    }
  };

  if (matchMedia('(max-width: 650px)').matches) {
    modalStyles.content = objectAssign(modalStyles.content, {
      borderRadius: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      maxHeight: 'none'
    });
  }

  return modalStyles;
})();

export class PolicyBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, modalStyles};
  }

  componentDidMount() {
    this.loadPoliciesFromServer();
    this.unsubscribe = policyPointSelected.listen(this.updateModal.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loadPoliciesFromServer() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((data) => this.setState({data: data.topics}))
      .catch((err) => console.error(this.props.url, err.toString()));
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    return false;
  }

  updateModal(data) {
    const overlay = {backgroundColor: partyColors[data.party]};

    this.setState({
      selectedPoint: data.policy,
      selectedParty: data.party,
      selectedTopic: data.topic,
      modalStyles: objectAssign(modalStyles, {overlay})
    });

    this.openModal();
  }

  urlForIssue() {
    let body = encodeURIComponent('## Problem\n\n\n## Suggested Change\n\n\n## References\n');
    return `https://github.com/jahfer/simple-politics/issues/new?title=[General] Suggested edit&body=${body}`;
  }

  render() {
    return (
      <div className="policyBreakdown">
        <Modal 
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={this.state.modalStyles}>
          <PolicyModal point={this.state.selectedPoint} party={this.state.selectedParty} topic={this.state.selectedTopic} closeModal={this.closeModal.bind(this)} />
        </Modal>

        <PolicyTable data={this.state.data} />

        <footer>
          <p className="footerInfo">Made by <a target="_blank" href="https://twitter.com/jahfer">@jahfer</a> | <a target="_blank" href={this.urlForIssue()}>Suggest edit</a></p>
        </footer>
      </div>
    );
  }
}

PolicyBreakdown.propTypes = {
  url: React.PropTypes.string
};