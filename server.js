const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log(`Device connected: ${socket.id}`);

    // Listen for data packets coming from the ESP32 hardware
    socket.on('esp32_data', (data) => {
        console.log("Receiving data from ESP32:", data);
        // Instantly relay that health data to the doctor's phone screen
        io.emit('phone_receive', data);
    });

    socket.on('disconnect', () => console.log('Device disconnected'));
});

// Start server on Port 4000
server.listen(4000, '127.0.0.1', () => console.log('Server running on port 4000'));

