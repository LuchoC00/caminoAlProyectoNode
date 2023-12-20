const socket = io();

console.log(socket);
socket.emit('message', 'hola como estas?');

socket.on('serverMessage', (data) => {
  console.log(data);
});

socket.on('messageAll', (data) => {
  console.log(data);
});

Swal.fire({
  title: 'hola',
  text: 'Bienvenidos',
  icon: 'info',
});
