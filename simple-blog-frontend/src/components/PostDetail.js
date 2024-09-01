import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:6000/api/posts/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the post!', error);
            });
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><em>By {post.author}</em></p>
        </div>
    );
};

export default PostDetail;
