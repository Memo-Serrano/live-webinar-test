const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Cargar los certificados SSL (si los usas)
const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

// Servir los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar el puerto de Render si está disponible o el puerto local en desarrollo
const PORT = process.env.PORT || 3000;

// Iniciar el servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en puerto ${PORT}`);
});