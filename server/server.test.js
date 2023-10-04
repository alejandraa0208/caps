const http = require('http');
const io = require('socket.io-client');
const server = require('./server'); // Import your server module

describe('Socket.io Server', () => {
  let httpServer;

  beforeAll(() => {
    httpServer = http.createServer(server);
    httpServer.listen(3001); // Listen on the desired port
  });

  afterAll(() => {
    httpServer.close();
  });

  test('Socket.io server should be running', (done) => {
    const clientSocket = io('http://localhost:3001');

    clientSocket.on('connect', () => {
      clientSocket.close();
      done();
    });
  });
});

