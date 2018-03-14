// define all the dependencies
const express = require('express');
const http = require('http');
const path = require('path');

const api = require(path.join(__dirname, 'routes/api')) 
const mongoskin = require('mongoskin');
const dbUrl = 'mongodb://@localhost:27017/express_app';

const db = mongoskin.db(dbUrl);
const collections = {
    articles: db.collection('articles'),
};

const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

// make app instances
const app = express();

app.set('appName', 'express_app');
app.set('port', 3003);

// expose collections to the request handlers
app.use((req, res, next) => {
    if (!collections.articles) return next(new Error('No collections'));
    req.collections = collections;
    return next()
});

// configure the middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/index', api.index);
// REST API routes
app.get('/api/article', api.article.list);
app.post('/api/article', api.article.add);
app.put('/api/article/:id', api.article.edit);
app.delete('/api/article/:id', api.article.del);

// handling unlisted routes
app.all('*', (req, res) => {
  res.status(404).send()
})

// start the server
http.createServer(app)
.listen(app.get('port'), function () {
    console.info(`Express server listening on port ${app.get('port')}`)
})
