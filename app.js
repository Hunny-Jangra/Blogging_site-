const express = require('express');
const dotenv = require('dotenv');
const auth = require('./src/router/authRouter');
const blog = require('./src/router/blogRouter');

const app = express();

app.use(express.json());

dotenv.config({
    path: './config.env'
})




app.use('/', auth);
app.use('/', blog);

module.exports = app;