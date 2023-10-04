const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');
const Chance = require('chance');
const chance = new Chance();

const storeName = '1-206-flowers';
socket.emit('join', storeName);

const intervalId = setInterval(() => {
  simulatePickupEvent(); // Emit the 'pickup' event
}, 5000);

socket.on('delivered', (payload) => {
  console.log(`VENDOR: Thank you for your order ${payload.customer}`);
});

function generateUniqueId() {
  return chance.guid(); // Generate a unique ID using Chance library
}

function generateRandomCustomerName() {
  return chance.name(); // Generate a random customer name using Chance library
}

function generateRandomAddress() {
  return chance.address(); // Generate a random address using Chance library
}

function simulatePickupEvent() {
  const orderPayload = {
    store: storeName,
    orderId: generateUniqueId(),
    customer: generateRandomCustomerName(),
    address: generateRandomAddress(),
  };
  // Emit the 'pickup' event to the socket
  socket.emit('pickup', orderPayload);
}






