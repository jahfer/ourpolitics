import * as React from 'react';
import 'babelify/polyfill';
import {_} from 'lodash';
import {entries} from '../util';
import * as Reflux from 'reflux';

require('whatwg-fetch');
var Modal = require('react-modal');
var objectAssign = require('object-assign');
var matchMedia = require('matchmedia');

const modalStyles = (function(){
  let modalStyles = {
    content: {
      textAlign: 'center',
      backgroundColor: '#fff',
      border: 'none'
    }
  };

  if (matchMedia('(max-width: 800px)').matches) {
    modalStyles.content = objectAssign(modalStyles.content, {
      borderRadius: 0,
      left: 0,
      right: 0
    });
  }

  return modalStyles;
})();

let Actions = Reflux.createActions([
  'policyPointSelected'
]);

class PolicyPoint extends React.Component {
  onClick() {
    Actions.policyPointSelected({policy: this.props.policy, party: this.props.party, topic: this.props.topic});
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
  policy: React.PropTypes.objectOf({important: React.PropTypes.bool, summary: React.PropTypes.string})
};

class PolicyCell extends React.Component {
  createPolicyPoints(party, policies) {
    if (policies.length) {
      return policies.map((policy) => <PolicyPoint topic={this.props.topic} party={party} policy={policy} />);
    } else {
      return <li>N/A</li>;
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
  policies: React.PropTypes.array
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

class PolicyModal extends React.Component {
  render() {
    return (
      <div className="policyModal">
        <h1>{this.props.topic}</h1>
        <h2>{this.props.party}</h2>
        <p>{this.props.point.summary}</p>
        <p>{this.props.point.details}</p>
        {this.props.point.references.map(ref => <li>{ref.url}</li>)}
        <a className="modal--close" onClick={this.props.closeModal}>&lt; Go back</a>
      </div>
    );
  }
}

PolicyModal.propTypes = {
  closeModal: React.PropTypes.func,
  party: React.PropTypes.string,
  point: React.PropTypes.objectOf({
    summary: React.PropTypes.string,
    important: React.PropTypes.bool,
    references: React.PropTypes.array
  }),
  topic: React.PropTypes.string
};

const partyColors = {'NDP': '#F37021', 'Conservatives': '#1A4782', 'Liberals': '#D71920'};

export class PolicyBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, modalStyles};
  }

  componentDidMount() {
    this.loadPoliciesFromServer();
    this.unsubscribe = Actions.policyPointSelected.listen(this.updateModal.bind(this));
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
  }

  updateModal(data) {
    const overlay = {backgroundColor: partyColors[data.party]};

    this.setState({
      selectedPoint: data.policy,
      selectedParty: data.party,
      selectedTopic: data.topic,
      modalStyles: objectAssign({}, modalStyles, {overlay})
    });

    this.openModal();
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
        <h1 className="pageTitle">Policy Breakdown</h1>
        <PolicyTable data={this.state.data} />
      </div>
    );
  }
}

PolicyBreakdown.propTypes = {
  url: React.PropTypes.string
};