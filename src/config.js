module.exports = {
  development: {
    port: process.env.PORT || 3333,
    // DBHost: 'mongodb+srv://admin:XH1oieESqW8qUL3a@medprev.zmq39.mongodb.net/development?retryWrites=true&w=majority',
    DBHost: 'mongodb://127.0.0.1:27017',
  },
  test: {
    port: process.env.PORT || 3333,
    DBHost: 'mongodb://127.0.0.1:27017',
    // DBHost: 'mongodb+srv://admin:XH1oieESqW8qUL3a@medprev.zmq39.mongodb.net/test?retryWrites=true&w=majority',
  },
};
