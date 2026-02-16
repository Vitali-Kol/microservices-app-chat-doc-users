const express = require('express');
const httpProxy = require('express-http-proxy');
const cors = require('cors');
const app = express();

app.use(cors());

const userServiceProxy = httpProxy('http://localhost:8001');
const docServiceProxy = httpProxy('http://localhost:8002');
const serverServiceProxy = httpProxy('http://localhost:8003')

app.use('/user', (req, res, next) => userServiceProxy(req, res, next));
app.use('/doc', (req, res, next) => docServiceProxy(req, res, next));
app.use('/server', (req, res, next) => serverServiceProxy(req, res, next));

app.listen(8000, () => {
    console.log("Gateway запущен на порту 8000");
});