// server.js


//import express,mongoose and cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const blogRoutes = require('./routes/blogRoutes');

// Create an Instance of express
const app = express();

//Middle-ware
app.use(cors()); // Enable Cross Origin which is by-default blocked in Browsers
app.use(express.json()); // To convert incoming JSON string to JSON Object

const PORT = process.env.PORT || 6000;

// Connect to Mongo DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));



// Use routes
app.use('/api', blogRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
