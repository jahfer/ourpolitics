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
  openTabForReference(url) {
    let tab = window.open(url, '_blank')
    tab.focus()
  }

  render() {
    let references = this.props.policy.references.map(ref => {
      ref.weekOfYear = new Date(ref.date).getWeekNumber()
      return ref
    }).sort((a, b) => a.weekOfYear - b.weekOfYear);

    let nodes = references.reduce((acc, ref) => {
      let {elements: elements, prevWeekOfYear: prevWeekOfYear} = acc
      let spacerLength = ref.weekOfYear - (prevWeekOfYear + 1)

      elements.push(<div style={{flex: spacerLength}} className="spacer"></div>)
      elements.push(
        <div className={`event backgroundColor--${this.props.party}`} onClick={this.openTabForReference.bind(this, ref.url)}>
          <div className="referenceText">{ref.publisher}</div>
        </div>
      )

      return {elements, prevWeekOfYear: ref.weekOfYear}
    }, {elements: [], prevWeekOfYear: 0})

    if (this.props.policy.references.length) {
      let spacerLength = 52 - references.slice(-1)[0].weekOfYear
      nodes.elements.push(<div style={{flex: spacerLength}} className="spacer"></div>)
    }

    return (
      <div className="timelineRow">
        <div className={`timelineElement textColor--${this.props.party}`}>
          {this.props.policy.summary}
        </div>
        {this.props.policy.references.length > 0 &&
          <div style={{display: 'flex', flex: 1, alignItems: 'center'}}>
            {nodes.elements}
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