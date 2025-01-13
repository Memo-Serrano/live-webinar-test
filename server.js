const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const readline = require('readline');

// Configurar Express y el servidor HTTP
const app = express();
const server = http.createServer(app);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Crear el servidor WebSocket
const wss = new WebSocket.Server({ server });

// Crear una interfaz para recibir comandos en la terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Preguntar en la terminal cuándo enviar el mensaje
  rl.question('Presiona ENTER para mostrar el botón: ', () => {
    ws.send(JSON.stringify({ action: 'showButton' }));
    rl.close();
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});