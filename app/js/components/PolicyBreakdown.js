import * as React from 'react';
import 'babelify/polyfill';
import {_} from 'lodash';
import {entries} from '../util';
import * as Reflux from 'reflux';
import * as ReactMarkdown from 'react-markdown';

require('whatwg-fetch');
var Modal = require('react-modal');
var Markdown = require('react-markdown');
var objectAssign = require('object-assign');
var matchMedia = require('matchmedia');

let Actions = Reflux.createActions([
  'policyPointSelected'
]);

class PolicyPoint extends React.Component {
  onClick() {
    console.log('[POLICYPOINT] onClick fired', this.props.party);
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
  policy: React.PropTypes.objectOf({important: React.PropTypes.bool, summary: React.PropTypes.string}),
  topic: React.PropTypes.string
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

class Spinner extends React.Component {
  render() {
    return <div className="spinner" />;
  }
}

class PolicyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: '', isLoading: true};
  }

  componentWillMount() {
    this.fetchContent();
  }

  fetchContent() {
    let filePath = `./data/content/${this.props.point.details}`;
    fetch(filePath)
      .then(raw => {
        if (raw.status === 200) { return raw.text(); }
        else { throw `Article ${filePath} not found`; }
      })
      .then(content => this.setState({content, isLoading: false}))
      .catch(console.error.bind(console));
  }

  render() {
    return (
      <div className="policyModal">
        <div className="modal--content"> 
          <div className="modal--topicBox">
            <p>{this.props.topic} - {this.props.party}</p>
          </div>

          <h1 className="modal--heading modal--heading__primary">{this.props.point.summary}</h1>
          <div className="modal--details">
            {this.state.isLoading &&
              <Spinner />
            }

            {!this.state.isLoading &&
              <Markdown source={this.state.content} />
            }
          </div>
        </div>

        <div className="modal--sidebar">
          <a href="#" className="modal--close" onClick={this.props.closeModal}></a>

          <h2 className="modal--heading modal--heading__secondary">References</h2>
          <ul>
            {this.props.point.references.map(ref => <li><a href={ref.url}>{ref.publisher}</a></li>)}
          </ul>
        </div>
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
      modalStyles: objectAssign(modalStyles, {overlay})
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
        <h1 className="pageTitle">Simple Politics</h1>
        <PolicyTable data={this.state.data} />
      </div>
    );
  }
}

PolicyBreakdown.propTypes = {
  url: React.PropTypes.string
};