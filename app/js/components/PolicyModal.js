import * as React from 'react';
import Markdown from 'react-markdown';

class Spinner extends React.Component {
  render() {
    return <div className="spinner" />;
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