// Conectar al servidor WebSocket
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('Conexión WebSocket establecida');
};

// Escuchar mensajes desde el servidor
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.action === 'showButton') {
    // Mostrar el botón dinámico
    const button = document.getElementById('dynamicButton');
    button.style.display = 'block';
  }
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};
