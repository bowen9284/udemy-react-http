import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
        axios
          .get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
          .then(response => {
            this.setState({ loadedPost: response.data });
          });
      }
    }
  }

  render() {
    let postDetail = (
      <p style={{ textAlign: 'center' }}>Please select a Post!</p>
    );
    if (this.props.id) {
      postDetail = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      postDetail = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }

    return postDetail;
  }
}

export default FullPost;
