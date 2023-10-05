'use strict';

const socket = require('../socket');

function handlePickup(payload) {
  console.log('DRIVER: picked up ' + payload.orderId);

  socket.emit('in-transit', payload);

  setTimeout(() => {
    console.log('DRIVER: delivered up ' + payload.orderId);
    socket.emit('delivered', payload);
  }, 2000);
}

module.exports = handlePickup;

