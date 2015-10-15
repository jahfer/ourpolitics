import Reflux from 'reflux';
import HistoryActions from '../actions/HistoryActions';

export default Reflux.createStore({
  listenables: HistoryActions,

  init() {
    window.onpopstate = HistoryActions.pageBack;
  },

  onNavigateToModal(data) {
    history.pushState({
      party: Symbol.keyFor(data.party),
      topic: data.topic,
      policy: data.policy
    }, data.topic, `#${Symbol.keyFor(data.party)}/${data.topic}/${data.policy.key}`.toLowerCase());

    this.trigger(data);
  },

  onPageBack() {
    history.pushState({}, 'Our Politics', '#');
  }
});