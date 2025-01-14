// Conectar al servidor WebSocket
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${window.location.host}`);

socket.onopen = () => {
  console.log('Conexión WebSocket establecida');
};

// Escuchar mensajes desde el servidor
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.action === 'showButton') {
    // Mostrar el botón dinámico en Page 1
    const button = document.getElementById('dynamicButton');
    if (button) {
      button.style.display = 'block';
    }
  }
};

// Enviar mensaje al servidor desde Page 2
const controlButton = document.getElementById('controlButton');
if (controlButton) {
  controlButton.addEventListener('click', () => {
    socket.send(JSON.stringify({ action: 'showButton' }));
  });
}

import { ZoomMtg } from '@zoomus/websdk';

// Cargar los archivos necesarios para el SDK
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

// Datos de tu reunión (rellena con tus valores)
const sdkKey = 'UEEbOouT0wWC14opf66w';
const meetingNumber = '87423967832';
const passcode = '718510';
const userName = 'Invitado';
const signature = 'VUVFYk9vdVQwd1dDMTRvcGY2NncuODc0MjM5Njc4MzIuMTczNjgxNzI5MTg5Ny4xLitnUUxpUklHRGI3RmJHek5CYTlYSTR0YWZaQjhPQ2d3Rkd2ZWdSaEFORlE9';

// Configurar el cliente Zoom Embedded
const client = ZoomMtgEmbedded.createClient();
const meetingSDKElement = document.getElementById('zoomMeeting');

// Inicializa el cliente
client.init({
  debug: true,
  zoomAppRoot: meetingSDKElement,
  language: 'es-ES',
});

// Unirse a la reunión
client.join({
  sdkKey: sdkKey,
  meetingNumber: meetingNumber,
  passcode: passcode,
  userName: userName,
  signature: signature,
});