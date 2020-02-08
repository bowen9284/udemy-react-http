import React, { useState, useEffect } from 'react';
import Post from '../../components/Post/Post';
import axios from '../../axios';
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

  const postSelectedHandler = id => setSelectedPostId(id);

  let postSection = (
    <p style={{ textAlign: 'center' }}>Something went wrong!</p>
  );


  if (true) {
    postSection = posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => postSelectedHandler(post.id)}
        />
      );
    });
  }

  return <section className="Posts">{postSection}</section>;
};

export default Posts;
