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

  // Escuchar mensajes desde los clientes
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.action === 'showButton') {
      // Enviar a todos los clientes conectados para mostrar el botón
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ action: 'showButton' }));
        }
      });
    }
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});