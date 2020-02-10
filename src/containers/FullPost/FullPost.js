import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidMount() {
    console.log(this.props);
    this.loadData()
  }

  componentDidUpdate() {
    this.loadData()

  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios.get('/posts/' + this.props.match.params.id).then(response => {
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }

  deletePostHandler = id => {
    axios.delete('/posts/' + this.props.match.params.id);
  };

  render() {
    let postDetail = (
      <p style={{ textAlign: 'center' }}>Please select a Post!</p>
    );
    if (this.props.match.params.id) {
      postDetail = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (this.state.loadedPost) {
      postDetail = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button
              className="Delete"
              onClick={() => this.deletePostHandler(this.props.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    return postDetail;
  }
}

export default FullPost;
