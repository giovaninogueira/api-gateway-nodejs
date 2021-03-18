const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();
const cookieParser = require('cookie-parser');

const userServiceProxy = httpProxy('http://localhost:3001');
const productServiceProxy = httpProxy('http://localhost:3002');

// Proxy Request
app.get('/users', (req, res, next) => {
    userServiceProxy(req, res, next);
});

app.get('/product', (req, res, next) => {
    productServiceProxy(req, res, next);
});

app.use(logger('dev')); // logger request
app.use(helmet()); // security
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

const server = http.createServer(app);
server.listen(3000);