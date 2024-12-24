import WebSocket from 'ws';
import http from 'http';

const server = http.createServer((req, res) => {
    res.end('I am connected');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {  
    console.log('New connection');
    ws.on('message', (msg) => {
        console.log(`Received message: ${msg}`);
    });
    ws.send('Welcome to the chat room');

    ws.on('close', () => {
        console.log('Connection closed');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});
