const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Middleware to handle CORS
app.use(cors());

const users = {};

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, this is the API route!');
});

app.use('/.netlify/nodeServer/api', router);

// Export the app and handler for Netlify Functions
module.exports = app;
module.exports.handler = serverless(app);
