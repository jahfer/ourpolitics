import * as React from "react";
import "babelify/polyfill";
import {_} from "lodash";
import {entries} from "../util"
import {PolicyTimeline} from "./PolicyTimeline"

class PolicyPoint extends React.Component {
  render() {
    return (
      <li className="policyPoint">
        <a className="policyPoint--link">{this.props.policy.summary}</a>
      </li>
    )
  }
}

class PolicyCell extends React.Component {
  render() {
    let listItems = (this.props.policies.length) ? this.props.policies.map((policy) => <PolicyPoint policy={policy} />) : <li>N/A</li>

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

class PolicyRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {timelineOpen: false}
  }

  findPoliciesForParty(party) {
    return _.chain(this.props.data.positions).find('party', party).value()
  }

  toggleTimeline() {
    this.setState({timelineOpen: !this.state.timelineOpen})
  }

  render() {
    let policyCells = ['NDP', 'Conservatives', 'Liberals']
      .map(this.findPoliciesForParty.bind(this))
      .map((data) => <PolicyCell party={data.party} policies={data.policies} />)

    return (
      <div className="policyRow">
        <div className="policyCells">
          <div className="policyCell policyTopic">
            <h3 className="policyTopic--title">{this.props.topic}</h3>
            <a href="#" onClick={this.toggleTimeline.bind(this)}>
              {this.state.timelineOpen ? 'Close' : 'Details'}
            </a>
          </div>
          {policyCells}
        </div>
        {this.state.timelineOpen &&
          <PolicyTimeline partyPositions={this.props.data.positions} />
        }
      </div>
    );
  }
}

class PolicyTable extends React.Component {
  render() {
    let policyRows = []
    for (let [topic, data] of entries(this.props.data)) {
      policyRows.push(<PolicyRow topic={topic} data={data} />)
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

export class PolicyBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
  }

  loadPoliciesFromServer() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((data) => this.setState({data: data.topics}))
      .catch((err) => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadPoliciesFromServer();
  }

  render() {
    return (
      <div className="policyBreakdown">
        <h1 className="pageTitle">Policy Breakdown</h1>
        <PolicyTable data={this.state.data} />
      </div>
    );
  }
}