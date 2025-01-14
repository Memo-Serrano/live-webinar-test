const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Cargar los certificados SSL (para desarrollo, usa certificados autofirmados)
const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

// Servir los archivos estáticos y el bundle de Webpack
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor HTTPS
https.createServer(options, app).listen(3000, () => {
  console.log('Servidor HTTPS corriendo en https://localhost:3000');
});