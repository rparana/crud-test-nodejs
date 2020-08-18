const Koa = require('koa');
const mongoose = require('mongoose');
const koaBody = require('koa-body');

const app = new Koa();

const config = require('./config');

const enviroment = process.env.NODE_ENV === 'test' ? config.test : config.development;

mongoose.connect(enviroment.DBHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(koaBody());

// Importing Routes
const person = require('./routes/person');

app.use(person.routes());

module.exports = app;
