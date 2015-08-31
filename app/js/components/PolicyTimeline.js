import * as React from "react";
import {_} from "lodash";

Date.prototype.getWeekNumber = function(){
  var d = new Date(+this);
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

class Event extends React.Component {
  render() {
    <div className={`event backgroundColor--${this.props.party}`}></div>
  }
}

class TimelineRow extends React.Component {
  render() {
    let startOffset, endOffset;

    if (this.props.policy.references.length) {
      let referenceDate = new Date(this.props.policy.references[0].date)
      let weekOfYear = referenceDate.getWeekNumber();
      startOffset = weekOfYear-1;
      endOffset = 51-weekOfYear;
    }

    return (
      <div className="timelineRow">
        <div className={`timelineElement textColor--${this.props.party}`}>
          {this.props.policy.summary}
        </div>
        {this.props.policy.references.length > 0 &&
          <div style={{display: 'flex', flex: 1, alignItems: 'center'}}>
            <div style={{flex: startOffset}}></div>
            <div className={`event backgroundColor--${this.props.party}`}></div>
            <div style={{flex: endOffset}}></div>
          </div>
        }
      </div>
    );
  }
}

class TimelinePartyRow extends React.Component {
  render() {
    let rows = this.props.policies.map((policy) => <TimelineRow party={this.props.party} policy={policy} />)

    return (
      <div className="timelinePartyRow">
        {rows}
      </div>
    )
  }
}

export class PolicyTimeline extends React.Component {
  render() {
    let timelineRows = this.props.partyPositions.map(function (positions) {
      return positions.policies.length > 0 ? <TimelinePartyRow party={positions.party} policies={positions.policies} /> : null;
    });

    timelineRows = _.compact(timelineRows);

    return (
      <div className="policyTimeline">
        {timelineRows}
      </div>
    )
  }
}