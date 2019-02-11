const http = require('http');
const app = require('./app');
// variable saved on server or on .env file
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);