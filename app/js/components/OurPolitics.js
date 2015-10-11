import React from 'react';
import matchMedia from 'matchmedia';
import objectAssign from 'object-assign';
import HistoryStore from '../stores/HistoryStore';
import Modal from 'react-modal';
import PolicyModal from './PolicyModal';
import PolicyTable from './PolicyTable';
import HistoryActions from '../actions/HistoryActions';
import {LIBERAL, CONSERVATIVE, NDP, mapPartyToSym, entries} from '../util';

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

export default class OurPolitics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, modalStyles};
  }

  componentDidMount() {
    this.loadPoliciesFromServer();
    this.unsubscribeFromHistoryStore = HistoryStore.listen(this.updateModal.bind(this));
    this.unsubscribeFromHistory = HistoryActions.pageBack.listen(this.closeModal.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribeFromHistoryStore();
    this.unsubscribeFromHistory();
  }

  loadPoliciesFromServer() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((raw) => {
        let result = {};
        for (let [topic, data] of entries(raw.topics)) {
          const symbolizedParties = data.positions.map(function(position) {
            position.party = mapPartyToSym[position.party];
            return position;
          });
          data.positions = symbolizedParties;
          result[topic] = data;
        }
        return result;
      })
      .then((topics) => this.setState({data: topics}))
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

        <h1 className="pageTitle">Our Politics</h1>
        <PolicyTable data={this.state.data} />

        <footer>
          <p className="footerInfo">Made by <a target="_blank" href="https://twitter.com/jahfer">@jahfer</a> | <a target="_blank" href={this.urlForIssue()}>Suggest edit</a></p>
        </footer>
      </div>
    );
  }
}

OurPolitics.propTypes = {
  url: React.PropTypes.string
};