import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';


function App() {
    return (
        <Router basename='/'>
            <div className="App">
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/create" element={<PostForm />} />
                    <Route path="/edit/:id" element={<PostForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
