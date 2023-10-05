'use strict';
require('dotenv').config();
const io = require('socket.io-client');
const serverUrl = process.env.SERVER_URL || 'http://localhost:3002/caps';

const socket = io.connect(serverUrl);

module.exports = socket;