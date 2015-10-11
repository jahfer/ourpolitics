// polyfills
import 'whatwg-fetch';
import 'babelify/polyfill';
// utils
import {_} from 'lodash';
import {PARTIES, entries} from '../util';
// libs
import React from 'react';
import HistoryActions from '../actions/HistoryActions';

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
        <h4 className={`policyCell--party textColor--${Symbol.keyFor(this.props.party)}`}>{this.props.party}</h4>
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

export default class PolicyTable extends React.Component {
  render() {
    let policyRows = [];
    for (let [topic, data] of entries(this.props.data)) {
      policyRows.push(<PolicyRow topic={topic} data={data} key={topic} />);
    }

    return (
      <div className="policyTable">
        <div className="policyRow tableHeader">
          <div className="policyCells">
            <div className="policyCell partyTitle backgroundColor--Empty">Topics</div>
            <div className="policyCell partyTitle backgroundColor--NDP">NDP</div>
            <div className="policyCell partyTitle backgroundColor--Conservatives">Conservatives</div>
            <div className="policyCell partyTitle backgroundColor--Liberals">Liberals</div>
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