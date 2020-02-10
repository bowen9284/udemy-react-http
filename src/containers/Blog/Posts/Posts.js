import React, { useState, useEffect } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

const Posts = props => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [setFetchError, fetchError] = useState(false);

  useEffect(() => {
    axios
      .get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          };
        });
        setPosts(updatedPosts);
      })
      .catch(error => {
        console.log('catch', error);
        //   this.setState({ error: true });
      });
  }, []);

  const postSelectedHandler = id => {
    props.history.push({ pathname: '/posts/' + id });
  };

  let postSection = (
    <p style={{ textAlign: 'center' }}>Something went wrong!</p>
  );

  // @todo if statement with error
  if (true) {
    postSection = posts.map(post => {
      return (
        // <Link to={'/' + post.id} key={post.id} >
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => postSelectedHandler(post.id)}
        />
        // </Link>
      );
    });
  }

  return (
    <div>
      <section className="Posts">{postSection}</section>
      <Route path={props.match.url + '/:id'} exact component={FullPost} />
    </div>
  );
};

export default Posts;
