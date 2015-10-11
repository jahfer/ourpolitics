import Reflux from 'reflux';
import PolicyActions from '../actions/PolicyActions';
import {mapPartyToSym, entries} from '../util';

export default Reflux.createStore({
  listenables: PolicyActions,

  onLoadPolicies(url) {
    this._policies = {};

    fetch(url)
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
      .then((topics) => {
        this._policies = topics;
        PolicyActions.loadPolicies.completed(this.policies);
      })
      .catch((err) => PolicyActions.loadPolicies.failed(err));
  },

  get policies() {
    return this._policies;
  }
});