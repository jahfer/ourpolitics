import Reflux from 'reflux';
import PolicyActions from '../actions/PolicyActions';
import {mapPartyToSym, entries} from '../util/general';

export default Reflux.createStore({
  listenables: PolicyActions,

  init() {
    this._cache = {};
  },

  onLoadPolicies(url) {
    if (this._cache[url]) {
      return this.trigger(this._cache[url]);
    }

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
        this._cache[url] = topics;
        this.trigger(topics);
      })
      .catch((err) => console.error(err));
  }
});