// polyfills
import 'whatwg-fetch';
import 'babelify/polyfill';
import matchMedia from 'matchmedia';
import objectAssign from 'object-assign';
// reflux
import PolicyStore from '../stores/PolicyStore';
import HistoryActions from '../actions/HistoryActions';
import HistoryStore from '../stores/HistoryStore';
import '../stores/PolicyStore';
// utils
import {_} from 'lodash';
import {entries} from '../util/general';
import {
  LIBERAL, CONSERVATIVE, NDP, PARTIES,
  NO_POLICY_LISTED, TOPICS, MADE_BY, TRANSLATION_BY, SUGGEST_EDIT
} from '../util/constants';
import I18n from '../util/i18n';
// libs
import * as React from 'react';
import {PolicyModal} from './PolicyModal';
import Modal from 'react-modal';

class PolicyPoint extends React.Component {
  onClick() {
    ga('send', 'event', 'PolicyPoint', 'click', `${Symbol.keyFor(this.props.party)} - ${this.props.topic} - ${this.props.policy.summary}`, 1);
    let data = {policy: this.props.policy, party: this.props.party, topic: this.props.topic};
    HistoryActions.navigateToModal(data);
  }

  render() {
    return (
      <li className='policyPoint'>
        <a onClick={this.onClick.bind(this)} className="policyPoint--link">{this.props.policy.summary}</a>
      </li>
    );
  }
}

PolicyPoint.propTypes = {
  policy: React.PropTypes.objectOf({important: React.PropTypes.bool, summary: React.PropTypes.string}),
  topic: React.PropTypes.string
};

class PolicyCell extends React.Component {
  createPolicyPoints(party, policies) {
    if (policies.length) {
      return policies.map((policy) => <PolicyPoint topic={this.props.topic} party={party} policy={policy} />);
    } else {
      return <li className="emptyPolicy">{I18n.get(NO_POLICY_LISTED)}</li>;
    }
  }

  render() {
    let listItems = this.createPolicyPoints(this.props.party, this.props.policies);

    return (
      <div className="policyCell">
        <h4 className={`policyCell--party textColor--${Symbol.keyFor(this.props.party)}`}>{Symbol.keyFor(this.props.party)}</h4>
        <ul className="policyCell--points">
          {listItems}
        </ul>
      </div>
    );
  }
}

PolicyCell.propTypes = {
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
    let policyCells = PARTIES
      .map(this.findPoliciesForParty.bind(this))
      .map((data) => <PolicyCell party={data.party} topic={this.props.topic} policies={data.policies} key={`${this.props.topic}:${Symbol.keyFor(data.party)}`} />);

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
            <div className="policyCell partyTitle backgroundColor--Empty">{I18n.get(TOPICS)}</div>
            <div className="policyCell partyTitle backgroundColor--NDP">{I18n.get(NDP)}</div>
            <div className="policyCell partyTitle backgroundColor--Conservatives">{I18n.get(CONSERVATIVE)}</div>
            <div className="policyCell partyTitle backgroundColor--Liberals">{I18n.get(LIBERAL)}</div>
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
const partyColours = new Map([
  [NDP, `rgba(243,112,33, ${opacity})`],
  [CONSERVATIVE, `rgba(26,71,130, ${opacity})`],
  [LIBERAL, `rgba(215,25,32, ${opacity})`]
]);

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
      background: '#303030',
      overflow: 'hidden'
    }
  };

  if (matchMedia('(max-width: 650px)').matches) {
    modalStyles.content = objectAssign(modalStyles.content, {
      borderRadius: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      maxHeight: 'none',
      overflow: 'auto'
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
    this.unsubscribeFromHistoryStore = HistoryStore.listen(this.updateModal.bind(this));
    this.unsubscribeFromHistory = HistoryActions.closeModal.listen(this.closeModal.bind(this));
    this.unsubscribeFromPolicyChanges = PolicyStore.listen(this.setPolicies.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribeFromHistoryStore();
    this.unsubscribeFromHistory();
    this.unsubscribeFromPolicyChanges();
  }

  setPolicies(data) {
    this.setState({data});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    return false;
  }

  updateModal(data) {
    const overlay = {backgroundColor: partyColours.get(data.party)};

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
          <PolicyModal point={this.state.selectedPoint} party={this.state.selectedParty} topic={this.state.selectedTopic} />
        </Modal>

        <div className="langSelection">
          <a href="#en" className={I18n.locale === 'en' ? 'active' : null} >EN</a> | <a href="#fr" className={I18n.locale === 'fr' ? 'active' : null} >FR</a>
        </div>

        <h1 className={`pageTitle lang-${I18n.locale}`}>Our Politics</h1>
        <PolicyTable data={this.state.data} />

        <footer>
          <p className="footerInfo">{I18n.get(MADE_BY)} <a target="_blank" href="https://twitter.com/jahfer">@jahfer</a>, {I18n.get(TRANSLATION_BY).toLowerCase()} <a target="_blank" href="https://twitter.com/mlhamel">@mlhamel</a> | <a target="_blank" href={this.urlForIssue()}>{I18n.get(SUGGEST_EDIT)}</a></p>
        </footer>
      </div>
    );
  }
}
