const express = require('express');
const httpProxy = require('express-http-proxy');
const cors = require('cors');
const app = express();
app.use(cors());
const userServiceProxy = httpProxy('http://localhost:8001');
const docServiceProxy = httpProxy('http://localhost:8002');
const chatPublisherProxy = httpProxy('http://localhost:8003');
const chatHistoryProxy = httpProxy('http://localhost:8004');
app.use('/user', (req, res, next) => userServiceProxy(req, res, next));
app.use('/doc', (req, res, next) => docServiceProxy(req, res, next));
app.use('/chat-a', (req, res, next) => chatPublisherProxy(req, res, next));
app.use('/chat-b', (req, res, next) => chatHistoryProxy(req, res, next));
app.listen(8000, () => {
    console.log("Gateway запущен на порту 8000");
});