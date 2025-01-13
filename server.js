const WebSocket = require('ws');
const express = require('express');
const http = require('http');

// Configurar Express y el servidor HTTP
const app = express();
const server = http.createServer(app);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Crear el servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Escuchar mensajes desde el cliente
  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
  });

  // Enviar un mensaje al cliente para mostrar el botón
  setTimeout(() => {
    ws.send(JSON.stringify({ action: 'showButton' }));
  }, 5000); // Cambia este tiempo según lo necesites (5 segundos)
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
