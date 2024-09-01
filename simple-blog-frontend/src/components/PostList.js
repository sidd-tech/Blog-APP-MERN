import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/posts/')
            .then(response => {
                console.log(response);
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts!', error);
            });
   
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
