import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:6000/api/posts/${id}`)
                .then(response => {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                    setAuthor(response.data.author);
                })
                .catch(error => {
                    console.error('There was an error fetching the post!', error);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const post = { title, content, author };

        if (id) {
            axios.put(`http://localhost:6000/api/posts/${id}`, post)
                .then(() => navigate('/'))
                .catch(error => console.error('There was an error updating the post!', error));
        } else {
            axios.post('http://localhost:6000/api/posts', post)
                .then(() => navigate('/'))
                .catch(error => console.error('There was an error creating the post!', error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div>
                <label>Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <button type="submit">{id ? 'Update' : 'Create'} Post</button>
        </form>
    );
};

export default PostForm;
