import * as React from 'react';
import Markdown from 'react-markdown';
import {shopURL} from '../config';
import {SUGGEST_EDIT} from '../util/constants';
import I18n from '../util/i18n';
import HistoryActions from '../actions/HistoryActions';

class Spinner extends React.Component {
  render() {
    return <div className="spinner" />;
  }
}

class Reference extends React.Component {
  render() {
    return (
      <li className="reference">
        <a target="_blank" href={this.props.source.url}><h2 className="reference--title">{this.props.source.title}</h2></a>
        <div className="reference--meta">{this.props.source.publisher}</div>
      </li>
    );
  }
}

export class PolicyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: '', isLoading: true};
  }

  componentWillMount() {
    this.fetchContent();
  }

  fetchContent() {
    let filePath = `${shopURL}/app/data/content/${I18n.locale}/${this.props.point.details}`;
    fetch(filePath)
      .then(raw => {
        if (raw.status === 200) { return raw.text(); }
        else { throw `Article ${filePath} not found`; }
      })
      .then(content => this.setState({content, isLoading: false}))
      .catch(console.error.bind(console));
  }

  urlForIssue() {
    let body = encodeURIComponent('## Problem\n\n\n## Suggested Change\n\n\n## References\n');
    return `https://github.com/jahfer/simple-politics/issues/new?title=[${this.props.topic} - ${Symbol.keyFor(this.props.party)}] Suggested edit for "${this.props.point.summary}"&body=${body}`;
  }

  render() {
    return (
      <div className="policyModal">
        <div className="modal--content">
          <div className="modal--headingContainer">
            <div className="modal--headingInfo">
              <div className="modal--topicBox">
                <p>{this.props.topic} - {I18n.get(this.props.party)}</p>
              </div>

              <a href={this.urlForIssue()} target="_blank">{I18n.get(SUGGEST_EDIT)}</a>
            </div>
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
          <a href="#" className="modal--close" onClick={HistoryActions.pageBack}></a>

          <h2 className="modal--heading modal--heading__secondary">References</h2>
          <ul className="reference--list">
            {this.props.point.references.map(ref => <Reference source={ref} />)}
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
