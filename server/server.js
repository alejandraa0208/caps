const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());

app.post('/pickup', (req, res) => {
  const { store, orderId, customer, address } = req.body;

  io.of('/caps').emit('pickup', {
    store,
    orderId,
    customer,
    address,
  });

  res.status(200).json({ message: 'Pickup event triggered successfully.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

