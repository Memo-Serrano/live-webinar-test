// Conectar al servidor WebSocket
const socket = new WebSocket(`ws://${window.location.host}`);

socket.onopen = () => {
  console.log('Conexión WebSocket establecida');
};

// Escuchar mensajes desde el servidor
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.action === 'showButton') {
    // Mostrar el botón dinámico en Page 2
    const button = document.getElementById('dynamicButton');
    if (button) {
      button.style.display = 'block';
    }
  }
};

// Enviar mensaje al servidor desde Page 1
const controlButton = document.getElementById('controlButton');
if (controlButton) {
  controlButton.addEventListener('click', () => {
    socket.send(JSON.stringify({ action: 'showButton' }));
  });
}