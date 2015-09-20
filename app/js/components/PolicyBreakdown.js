import * as React from 'react';
import 'babelify/polyfill';
import {_} from 'lodash';
import {entries} from '../util';
// import {PolicyTimeline} from './PolicyTimeline';
import * as Reflux from 'reflux';

require('whatwg-fetch');
var Modal = require('react-modal');

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
};

Modal.setAppElement(document.getElementById('modal'));

let Actions = Reflux.createActions([
  'policyPointSelected'
]);

class PolicyPoint extends React.Component {
  onClick() {
    Actions.policyPointSelected(this.props.policy);
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
  policy: React.PropTypes.objectOf({important: React.PropTypes.bool, summary: React.PropTypes.string})
};

class PolicyCell extends React.Component {
  render() {
    let listItems = (this.props.policies.length) ? this.props.policies.map((policy) => <PolicyPoint policy={policy} />) : <li>N/A</li>;

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
      .map((data) => <PolicyCell party={data.party} policies={data.policies} key={`${this.props.topic}:${data.party}`} />);

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
      <h1>{this.props.point.summary}</h1>
    );
  }
}

export class PolicyBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
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

  updateModal(policyPoint) {
    this.setState({selectedPoint: policyPoint});
    this.openModal();
  }

  render() {
    return (
      <div className="policyBreakdown">
        <Modal 
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}>
          <PolicyModal point={this.state.selectedPoint} />
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