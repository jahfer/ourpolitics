/* @flow */

import * as React from "react";
import {parse} from "marked";

class Comment extends React.Component {
  render() {
    var rawMarkup = parse(this.props.children.toString(), {sanitize: true})
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map((comment) =>
      <Comment author={comment.author}>
        {comment.text}
      </Comment>
    );
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
}

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadCommentsFromServer() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((data) => this.setState({data}))
      .catch((err) => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var data = [
    {author: "Pete Hunt", text: "This is a comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
  ];

  React.render(
    <CommentBox url="/data/comments.json" pollInterval={2000} />,
    document.getElementById('content')
  )
})
