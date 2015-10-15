import {LIBERAL, CONSERVATIVE, NDP} from './constants';

export function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

Date.prototype.getWeekNumber = function(){
  var d = new Date(+this);
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

export const mapPartyToSym = {
  'NDP': NDP,
  'NPD': NDP,
  'Conservatives': CONSERVATIVE,
  'Conservateur': CONSERVATIVE,
  'Liberals': LIBERAL,
  'Libéral': LIBERAL
};